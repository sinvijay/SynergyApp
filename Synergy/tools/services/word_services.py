import subprocess
import os

def convert_word_to_pdf(uploaded_word_file):
    # Save the uploaded file temporarily
    temp_dir = "/tmp"
    input_path = os.path.join(temp_dir, uploaded_word_file.name)
    
    with open(input_path, 'wb+') as destination:
        for chunk in uploaded_word_file.chunks():
            destination.write(chunk)
            
    # Use LibreOffice to convert
    try:
        subprocess.run(['soffice', '--headless', '--convert-to', 'pdf', '--outdir', temp_dir, input_path], check=True)
        
        # Determine the output path (LibreOffice names it input.pdf)
        output_filename = os.path.splitext(uploaded_word_file.name)[0] + ".pdf"
        output_path = os.path.join(temp_dir, output_filename)
        
        # Read into buffer
        with open(output_path, 'rb') as f:
            pdf_data = f.read()
            
        # Cleanup
        os.remove(input_path)
        os.remove(output_path)
        
        import io
        return io.BytesIO(pdf_data)
    except Exception as e:
        raise Exception(f"Conversion failed: {str(e)}")