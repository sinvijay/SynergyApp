# tools/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('merge-pdf/', views.merge_pdf_view, name='merge_pdf'),
    path('remove-bg/', views.remove_bg_view, name='remove_bg'),
    path('pdf-to-word/', views.pdf_to_word_view, name='pdf_to_word'),
    path('word-to-pdf/', views.word_to_pdf_view, name='word_to_pdf'),
    path('compress-image/', views.compress_image_view, name='compress_image'),
    path('compress-pdf/', views.compress_pdf_view, name='compress_pdf'),
    path('ocr/', views.ocr_view, name='ocr'),
    path('api/chatbot/', views.chatbot_api_view, name='chatbot_api'),
    
]