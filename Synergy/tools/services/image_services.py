# tools/services/image_services.py
import io
from PIL import Image



def remove_image_background(image_file):
    # Open the uploaded image file
    from rembg import remove
    input_image = Image.open(image_file)
    
    # Process the image through the rembg AI
    output_image = remove(input_image)
    
    # Create an in-memory buffer
    output_buffer = io.BytesIO()
    
    # Save the new image to the buffer as a PNG to keep the transparency
    output_image.save(output_buffer, format="PNG")
    
    # Reset the buffer cursor
    output_buffer.seek(0)
    
    return output_buffer

# Add this function to the bottom of tools/services/image_services.py

def compress_image(uploaded_image, quality=60):
    """
    Compresses an image using Pillow.
    """
    img = Image.open(uploaded_image)
    
    # Convert to RGB if necessary (handles PNG transparency issues)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
        
    output_buffer = io.BytesIO()
    
    # Save with compression
    img.save(output_buffer, format="JPEG", quality=quality, optimize=True)
    output_buffer.seek(0)
    
    return output_buffer