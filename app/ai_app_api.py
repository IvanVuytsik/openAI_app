from fastapi import FastAPI, HTTPException
from ai_app import generate_branding_snippet, generate_keywords 
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

#Mangum is an adapter for using ASGI applications with AWS
# Lambda & API Gateway. It is intended to provide an easy-to-use, 
# configurable wrapper for any ASGI application deployed in an AWS Lambda 
# function to handle API Gateway requests and responses.
#Documentation: https://mangum.io/

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGTH = 32


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_len(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet,"keywords": []}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_len(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": None,"keywords": keywords}


@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
    validate_input_len(prompt)
    keywords = generate_keywords(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet,"keywords": keywords}


def validate_input_len(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(status_code=400, detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters")
    


#uvicorn ai_app_api:app --reload