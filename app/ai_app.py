import os
from typing import List
import openai
import argparse
import re
# pip install python-dotenv

MAX_INPUT_LENGTH = 32

def main():
   # print('Running application')
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f'User input: {user_input}')
    if validate_length(user_input):
        generate_branding_snippet(user_input) # user input -> gets enriched
        generate_keywords(user_input) # user input -> gets enriched
    else:
        raise ValueError(f"Your input must be under {MAX_INPUT_LENGTH}. Current input: {len(user_input)}.")

def validate_length(prompt: str):
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_branding_snippet(prompt: str) -> str:
    #Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("KEY")
    enriched_prompt = f"Give me some advice about {prompt}?"
    print(enriched_prompt)
    response = openai.Completion.create(
            engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=64)
    #print(response)

    branding_text: str = response["choices"][0]["text"]
    branding_text = branding_text.strip()
    last_char = branding_text[-1]
    if last_char not in {".","!","?"}:
        branding_text += "..."

    print(f"Snippet: {branding_text}")
    return branding_text

def generate_keywords(prompt: str) -> List[str]:
    openai.api_key = os.getenv("KEY")
    enriched_prompt = f"Generate keywords related to {prompt} "
    print(enriched_prompt)
    response = openai.Completion.create(
            engine="davinci-instruct-beta-v3", prompt=enriched_prompt, max_tokens=16)
    keywords_text: str = response["choices"][0]["text"]
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-",keywords_text)
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array


if __name__== "__main__":
    main()