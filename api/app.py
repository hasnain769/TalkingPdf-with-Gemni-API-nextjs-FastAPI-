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

# Load environment variables from .env file
load_dotenv()

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


@app.get("/api/pdfs", response_model=list[PDFFile])
async def get_all_pdfs(session: Session = Depends(get_session)):
    try:
        statement = select(PDFFile)
        results = session.exec(statement).all()
        if not results:
            raise HTTPException(status_code=404, detail="No PDFs found")
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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

@app.websocket("/api/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    chat = model.start_chat(
        history=[
            {"role": "user", "parts": "Hello"},
            {"role": "model", "parts": "Great to meet you. What would you like to know?"},
        ]
    )

    while True:
        try:
            # Receive message from WebSocket client
            data = await websocket.receive_text()
            
            # Send the received message to the generative model's chat
            response = chat.send_message(data , stream=True)
            
            # Send the model's response back to the WebSocket client
            await websocket.send_text(f" {response.text}")

        
        except WebSocketDisconnect:
            print("WebSocket connection closed")
            