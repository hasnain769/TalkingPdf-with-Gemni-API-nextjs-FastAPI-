from typing import Union
from fastapi import FastAPI ,WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from models import PDFFile
from session import get_session
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from sqlmodel import Session ,select
import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.responses import Response
from uuid import UUID 
import json
import logging
import PyPDF2
from io import BytesIO

def extract_text_from_pdf(pdf_content: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(BytesIO(pdf_content))
    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text

load_dotenv()
logging.basicConfig(level=logging.INFO)


genai.configure(api_key=os.environ["GEMINI_API_KEY"])
# Upload the file and print a confirmat

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/uploadPdf")
async def upload_pdf(name: str = Form(...), file: UploadFile = File(...), session: Session = Depends(get_session)):
    try:
        file_content = await file.read()
        pdf_entry = PDFFile(name=name, file=file_content)
        session.add(pdf_entry)
        session.commit()
        return {"message": "File uploaded successfully", "id": pdf_entry.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/pdfs/{pdf_id}")
async def download_pdf(pdf_id: UUID, session: Session = Depends(get_session)):
    pdf_file = session.query(PDFFile).filter(PDFFile.id == pdf_id).first()
    if not pdf_file:
        raise HTTPException(status_code=404, detail="PDF not found")
    return Response(content=pdf_file.file, media_type="application/pdf")

@app.get("/api/pdfs")
async def get_pdfs(session: Session = Depends(get_session)):
    try:
        pdf_files = session.query(PDFFile).all()
        return [{"id": pdf.id, "name": pdf.name} for pdf in pdf_files]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.delete("/api/pdfs/{pdf_id}")
async def delete_pdf(pdf_id: UUID, session: Session = Depends(get_session)):
    pdf_file = session.query(PDFFile).filter(PDFFile.id == pdf_id).first()
    if not pdf_file:
        raise HTTPException(status_code=404, detail="PDF not found")
    session.delete(pdf_file)
    session.commit()
    return {"detail": "PDF deleted successfully"}

@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    # Receive initial message which might contain pdf_id
    data = await websocket.receive_text()
    message = json.loads(data)
    pdf_id = message.get("pdf_id")  # Extract pdf_id if provided

    if isinstance(pdf_id, dict):
        pdf_id = pdf_id.get("pdf_id")

    print("Extracted pdf_id:", pdf_id)
    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(
        history=[
            {"role": "user", "parts": "Hello"},
            {"role": "model", "parts": "Great to meet you. What would you like to know?"},
        ]
    )

    if pdf_id:
        session = next(get_session())
        statement = select(PDFFile).where(PDFFile.id == UUID(pdf_id))
        pdf_file = session.exec(statement).first()

        if not pdf_file:
            print("pdf not found")
            await websocket.send_text("error: PDF not found")
            return  # Close the WebSocket if PDF is not found
        else:
            # Extract text from PDF
            extracted_text = extract_text_from_pdf(pdf_file.file)
            # //print("Extracted text:", extracted_text[:500])  # Log the first 500 characters for verification

            # Send the extracted text to the LLM
            llm_response = chat.send_message(extracted_text)
            await websocket.send_text(llm_response.text)
    
    while True:
        data = await websocket.receive_text()
        response = chat.send_message(data)
        await websocket.send_text(f"{response.text}")