from sqlmodel import SQLModel, Field ,create_engine
from typing import Optional
import uuid

class PDFFile(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    name: str
    file: bytes


DATABASE_URL = "postgresql://syedhasnain769:ksdEp3uAx9Oe@ep-weathered-forest-a509tbmy.us-east-2.aws.neon.tech/talkingPdf?sslmode=require"

engine = create_engine(DATABASE_URL , echo=True)


SQLModel.metadata.create_all(engine)
