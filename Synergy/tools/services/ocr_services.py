import platform
import pytesseract
from PIL import Image

# Only set the command path if you are on Windows
if platform.system() == 'Windows':
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
# Note: No 'else' block! 
# On Linux, pytesseract will now automatically look in the system PATH.

def extract_text_from_image(image_file):
    img = Image.open(image_file)
    extracted_text = pytesseract.image_to_string(img)
    return extracted_text