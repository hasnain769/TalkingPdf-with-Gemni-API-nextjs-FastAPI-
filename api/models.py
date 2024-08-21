from sqlmodel import SQLModel, Field ,create_engine
from typing import Optional
import uuid
from dotenv import load_dotenv
import os

class PDFFile(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    name: str
    file: bytes

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL , echo=True)
SQLModel.metadata.create_all(engine)
