import face_recognition
from flask import Flask, request, jsonify
import base64
import cv2
import numpy as np
import os

app = Flask(__name__)

# Load employee images and encode faces (This can be done once and saved)
employee_images = {
    'employee_1': face_recognition.load_image_file(r"./backend/image.jpg"),  # Use raw string
    # 'employee_2': face_recognition.load_image_file(r"./backend/another_image.jpg"),
    # Add more employees as needed
}

# Ensure we have at least one image
if employee_images:
    employee_encodings = {name: face_recognition.face_encodings(image)[0] for name, image in employee_images.items() if face_recognition.face_encodings(image)}
else:
    employee_encodings = {}

@app.route('/api/verify-face', methods=['POST'])
def verify_face():
    # Get the image data from the request
    image_data = request.form.get('image')
    latitude = request.form.get('latitude')
    longitude = request.form.get('longitude')

    if not image_data:
        return jsonify({"verified": False, "message": "No image data provided."}), 400

    # Decode the image (since it's base64 encoded)
    image_data = image_data.split(',')[1]  # Remove base64 header
    image = base64.b64decode(image_data)
    np_image = np.frombuffer(image, dtype=np.uint8)
    img = cv2.imdecode(np_image, cv2.IMREAD_COLOR)

    # Find face encodings in the captured image
    captured_encodings = face_recognition.face_encodings(img)

    if not captured_encodings:
        return jsonify({"verified": False, "message": "No face found in the image."}), 400

    # Compare the captured encoding to the employee encodings
    captured_encoding = captured_encodings[0]

    # Check for matches
    for employee_name, employee_encoding in employee_encodings.items():
        matches = face_recognition.compare_faces([employee_encoding], captured_encoding)

        if True in matches:
            # If a match is found, return success
            return jsonify({"verified": True, "employee_name": employee_name})

    # If no match is found
    return jsonify({"verified": False, "message": "Face not recognized."}), 404

if __name__ == '__main__':
    app.run(debug=True)
