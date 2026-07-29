# accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        # Fields to collect from the user during sign up
        fields = ('email', 'first_name', 'last_name', 'mobile_number')

# accounts/forms.py (Add this to the bottom)

class CustomUserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'mobile_number')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Lock the email field so it cannot be edited by the user
        self.fields['email'].disabled = True
        self.fields['email'].help_text = "Contact support if you need to change your email."