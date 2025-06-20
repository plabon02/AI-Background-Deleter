# AI Background Deletion Web App

This is a powerful and easy-to-use web application built with Python (Flask) and `rembg` that allows users to remove the background from any image quickly and efficiently. The app features a modern, responsive user interface with a live demo slider and an upload section.

**Creator:** [Apnan Ahmed](https://github.com/your-github-username) *(You can replace this link with your actual GitHub profile link)*

## Features

- **Live Demo Slider:** A beautiful before/after slider to showcase the background removal capability on a demo image.
- **Image Upload:** Users can upload their own images (JPG, PNG, etc.) to remove the background.
- **Instant Preview:** See the original and the background-removed image side-by-side.
- **Download Result:** Easily download the final image with a transparent background.
- **Responsive Design:** The application is fully responsive and works seamlessly on desktop and mobile devices.

## Technologies Used

- **Backend:** Python, Flask
- **Background Removal:** `rembg` library
- **Image Processing:** `Pillow`
- **Frontend:** HTML, CSS, JavaScript

## Setup and Installation

Follow these steps to run the project on your local machine.

### 1. Prerequisites

- Python 3.9 or higher
- `pip` (Python package installer)

### 2. Clone the Repository

```bash
git clone https://github.com/your-github-username/your-repo-name.git
cd your-repo-name
```

### 3. Create a Virtual Environment

It's highly recommended to use a virtual environment to manage project dependencies.

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies

Install all the required packages using the `requirements.txt` file.

```bash
pip install -r requirements.txt
```

## How to Run the Application

Once the setup is complete, you can run the Flask application with the following command:

```bash
flask run
```

Or, by running the Python script directly:

```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000` in your web browser.

## Project Structure

```
. 
├── app.py # Main Flask application
├── static # Contains all static files
│   ├── css/style.css
│   ├── js/script.js
│   └── images/
│       ├── Before.jpg
│       └── After.png
├── templates
│   └── index.html # Main HTML file
├── requirements.txt # Project dependencies
├── .gitignore # Files to be ignored by Git
└── README.md # This file
```
