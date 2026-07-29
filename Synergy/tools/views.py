import os
import io
import json
import tempfile
from django.shortcuts import render
from django.http import FileResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages

# Import services
from .services.pdf_services import merge_multiple_pdfs, convert_pdf_to_word, compress_pdf
from .services.image_services import remove_image_background, compress_image
from .services.word_services import convert_word_to_pdf
from .services.ocr_services import extract_text_from_image
from .services.chatbot_services import get_chatbot_response


@login_required
def merge_pdf_view(request):
    if request.method == 'POST':
        uploaded_pdfs = request.FILES.getlist('pdf_files')
        if len(uploaded_pdfs) < 2:
            messages.error(request, "Please upload at least 2 PDF files to merge.")
        else:
            try:
                merged_buffer = merge_multiple_pdfs(uploaded_pdfs)
                return FileResponse(merged_buffer, as_attachment=True, filename='merged_output.pdf')
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
    return render(request, 'tools/merge_pdf.html')

@login_required
def remove_bg_view(request):
    if request.method == 'POST':
        uploaded_image = request.FILES.get('image_file')
        if not uploaded_image:
            messages.error(request, "Please upload an image file.")
        else:
            try:
                processed_buffer = remove_image_background(uploaded_image)
                return FileResponse(processed_buffer, as_attachment=True, filename='transparent_output.png')
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
    return render(request, 'tools/remove_bg.html')

@login_required
def pdf_to_word_view(request):
    if request.method == 'POST':
        uploaded_pdf = request.FILES.get('pdf_file')
        if not uploaded_pdf:
            messages.error(request, "Please upload a PDF file.")
        elif not uploaded_pdf.name.lower().endswith('.pdf'):
            messages.error(request, "The uploaded file must be a PDF.")
        else:
            try:
                docx_buffer = convert_pdf_to_word(uploaded_pdf)
                return FileResponse(docx_buffer, as_attachment=True, filename=uploaded_pdf.name.replace('.pdf', '.docx'))
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
    return render(request, 'tools/pdf_to_word.html')

@login_required
def word_to_pdf_view(request):
    if request.method == 'POST':
        uploaded_word = request.FILES.get('word_file')
        if not uploaded_word:
            messages.error(request, "Please upload a Word document.")
        elif not (uploaded_word.name.lower().endswith('.docx') or uploaded_word.name.lower().endswith('.doc')):
            messages.error(request, "The uploaded file must be a Word document (.docx or .doc).")
        else:
            try:
                pdf_buffer = convert_word_to_pdf(uploaded_word)
                new_filename = uploaded_word.name.rsplit('.', 1)[0] + '.pdf'
                return FileResponse(pdf_buffer, as_attachment=True, filename=new_filename)
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
    return render(request, 'tools/word_to_pdf.html')

@login_required
def compress_pdf_view(request):
    if request.method == 'POST':
        uploaded_pdf = request.FILES.get('pdf_file')
        if not uploaded_pdf:
            messages.error(request, "Please upload a PDF file.")
        else:
            # Create temp files for Ghostscript
            with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_input:
                for chunk in uploaded_pdf.chunks():
                    temp_input.write(chunk)
                temp_input_path = temp_input.name
            
            temp_output_path = temp_input_path.replace(".pdf", "_compressed.pdf")

            try:
                compress_pdf(temp_input_path, temp_output_path)
                with open(temp_output_path, 'rb') as f:
                    pdf_buffer = io.BytesIO(f.read())
                return FileResponse(pdf_buffer, as_attachment=True, filename=f"compressed_{uploaded_pdf.name}")
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
            finally:
                if os.path.exists(temp_input_path): os.remove(temp_input_path)
                if os.path.exists(temp_output_path): os.remove(temp_output_path)
                    
    return render(request, 'tools/compress_pdf.html')

@login_required
def ocr_view(request):
    extracted_text = None
    if request.method == 'POST':
        uploaded_image = request.FILES.get('image_file')
        if not uploaded_image:
            messages.error(request, "Please upload an image file.")
        else:
            try:
                extracted_text = extract_text_from_image(uploaded_image)
                if not extracted_text.strip():
                    messages.warning(request, "No text was found in that image.")
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
    return render(request, 'tools/ocr.html', {'extracted_text': extracted_text})

@login_required
def chatbot_api_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_msg = data.get('message', '')
            history = request.session.get('chat_history', [])
            bot_reply, updated_history = get_chatbot_response(user_msg, history)
            request.session['chat_history'] = updated_history
            return JsonResponse({"reply": bot_reply})
        except Exception as e:
            return JsonResponse({"error": "Failed to process message"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)



@login_required
def compress_image_view(request):
    if request.method == 'POST':
        uploaded_image = request.FILES.get('image_file')
        quality = int(request.POST.get('quality', 60))
        
        if not uploaded_image:
            messages.error(request, "Please upload an image.")
        else:
            try:
                # Call the service function here
                compressed_buffer = compress_image(uploaded_image, quality)
                
                # Prepare filename
                new_filename = uploaded_image.name.rsplit('.', 1)[0] + "_compressed.jpg"
                
                return FileResponse(compressed_buffer, as_attachment=True, filename=new_filename)
            except Exception as e:
                messages.error(request, f"An error occurred: {str(e)}")
                
    return render(request, 'tools/compress_image.html')