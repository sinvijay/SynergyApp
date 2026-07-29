# tools/services/chatbot_services.py
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
# PASTE YOUR API KEY HERE (In a production app, you would hide this in a .env file!)
API_KEY = os.environ.get("GEMINI_API_KEY")
genai.configure(api_key=API_KEY)

def get_chatbot_response(user_message, chat_history):
    try:
        model = genai.GenerativeModel(
    # Use the free tier Flash model from your list
        model_name="gemini-3.1-flash-lite", 
        system_instruction=(
        "You are the official support assistant for 'Utility Hub', a website that provides free tools. "
        "The available tools are: Merge PDFs, Compress PDF, PDF to Word, Word to PDF, Remove Image Background, "
        "Compress Image, and OCR (Image to Text). "
        "Your job is to kindly and concisely guide users to the right tool. "
        "Keep answers under 3 sentences."
        )
    )
        
        
        # 1. Format the session history so Gemini understands it
        formatted_history = []
        for msg in chat_history:
            formatted_history.append({
                "role": msg["role"], 
                "parts": [msg["text"]]
            })

        # 2. Start a chat session using the past memory
        chat = model.start_chat(history=formatted_history)
        
        # 3. Send the new message
        response = chat.send_message(user_message)
        
        # 4. Update our history list to save back to Django
        chat_history.append({"role": "user", "text": user_message})
        chat_history.append({"role": "model", "text": response.text})
        
        # Return both the reply and the new memory!
        return response.text, chat_history
        
    except Exception as e:
        print(f"AI Error: {e}")
        return "My AI brain is currently resting. Please try again!", chat_history