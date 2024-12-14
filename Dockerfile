# Use an official Python runtime as the base image
FROM python:3.10.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code into the container
COPY app ./app

# Copy the React build folder (frontend/dist)
COPY frontend ./frontend

# Optionally copy the React project folder (if needed for debugging or serving static files from the project folder)
COPY project ./project

# Expose the port the Flask app runs on
EXPOSE 5000

# Set the environment to production
ENV FLASK_ENV=production

# Command to run the Flask app
CMD ["python", "app.py"]