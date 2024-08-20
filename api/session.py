from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql://syedhasnain769:ksdEp3uAx9Oe@ep-weathered-forest-a509tbmy.us-east-2.aws.neon.tech/talkingPdf?sslmode=require"

engine = create_engine(DATABASE_URL , echo=True)

def get_session():
    with Session(engine) as session:
        yield session

