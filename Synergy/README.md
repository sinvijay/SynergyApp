# Synergy

utility_platform/
├── manage.py
├── core_project/              # Main Django configuration directory
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py                # Needed later for real-time chatbot websockets
│
├── accounts/                  # App 1: Custom User, Profile, & Auth
│   ├── models.py              # Custom User (email, phone, name, 
|                                ban status)
│   ├── views.py               # Signup, Login, Profile Update views
│   ├── forms.py               # Auth & profile forms
│   ├── admin.py               # Customized Admin interface for banning users
│   └── urls.py
│
├── tools/                     # App 2: File Processing & Conversion Logic
│   ├── models.py              # Usage logs, Converted files history
│   ├── views.py               # Handles form submissions / API requests
│   ├── urls.py
│   ├── tasks.py              # Celery tasks for heavy tasks (OCR, emailing)
│   └── services/              # Pure Python logic (NO Django view code here)
│       ├── pdf_services.py    # Convert, Merge, Edit, Compress PDF logic
│       ├── excel_services.py  # Excel to PDF / PDF to Excel logic
│       ├── image_services.py  # Edit, Remove BG, Compress image logic
│       ├── ocr_services.py    # Tesseract / OCR processing logic
│       └── email_services.py  # Send converted files to user email
│
└── assistant/                 # App 3: Dedicated Chatbot
    ├── models.py              # Chat history / logs
    ├── views.py               # Chat API endpoint or view
    ├── bot_engine.py          # AI / NLP logic or rule-based parser
    └── urls.py