# tools/services/pdf_services.py
import io
from pypdf import PdfWriter, PdfReader

# Add these imports at the top of tools/services/pdf_services.py
import os
import tempfile
from pdf2docx import Converter

import subprocess
import tempfile
import os

def merge_multiple_pdfs(pdf_file_list):
    merger = PdfWriter()
    
    for pdf_file in pdf_file_list:
        merger.append(pdf_file)
        
    output_buffer = io.BytesIO()
    merger.write(output_buffer)
    
    # Reset the buffer's cursor to the beginning so Django can read it
    output_buffer.seek(0)
    
    return output_buffer


def convert_pdf_to_word(uploaded_pdf):
    """
    Takes an uploaded PDF, securely saves it as a temporary file, 
    converts it to Word, loads it into memory, and deletes the temp files.
    """
    # 1. Create a temporary file on the server just for the PDF
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
        # Write the uploaded file chunks to the temp file safely
        for chunk in uploaded_pdf.chunks():
            temp_pdf.write(chunk)
        temp_pdf_path = temp_pdf.name

    # Create a name for the output docx file
    temp_docx_path = temp_pdf_path.replace('.pdf', '.docx')

    try:
        # 2. Run the conversion
        cv = Converter(temp_pdf_path)
        cv.convert(temp_docx_path)
        cv.close()

        # 3. Read the finished Word document back into our RAM (BytesIO)
        with open(temp_docx_path, 'rb') as docx_file:
            output_buffer = io.BytesIO(docx_file.read())
        
        output_buffer.seek(0)
        
    finally:
        # 4. CRITICAL: Always delete the temp files, even if the conversion crashes!
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
        if os.path.exists(temp_docx_path):
            os.remove(temp_docx_path)

    return output_buffer


def compress_pdf(input_path, output_path):
    """
    Uses Ghostscript to aggressively compress the PDF.
    """
    # Ghostscript command for high-quality but compressed PDF
    # -dPDFSETTINGS=/screen is for smallest size (viewing on screen)
    # -dPDFSETTINGS=/ebook is for better quality but still compressed
    cmd = [
        "gs",
        "-sDEVICE=pdfwrite",
        "-dCompatibilityLevel=1.4",
        "-dPDFSETTINGS=/screen",
        "-dNOPAUSE",
        "-dQUIET",
        "-dBATCH",
        f"-sOutputFile={output_path}",
        input_path
    ]
    
    # Run the compression
    subprocess.run(cmd, check=True)
    return output_path