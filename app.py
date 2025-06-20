import os
from flask import Flask, request, render_template, send_file
from PIL import Image
import rembg
import io

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remove-bg', methods=['POST'])
def remove_bg():
    if 'file' not in request.files:
        return 'No file part', 400
    
    file = request.files['file']

    if file.filename == '':
        return 'No selected file', 400

    if file:
        try:
            input_image = Image.open(file.stream)
            
            # Convert image to RGBA if it's not already, as rembg requires it
            if input_image.mode != 'RGBA':
                input_image = input_image.convert('RGBA')

            output_image = rembg.remove(input_image)
            
            # Save the result to a bytes buffer
            img_io = io.BytesIO()
            output_image.save(img_io, 'PNG')
            img_io.seek(0)
            
            return send_file(
                img_io, 
                mimetype='image/png', 
                as_attachment=True, 
                download_name='background_removed.png'
            )

        except Exception as e:
            return str(e), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
