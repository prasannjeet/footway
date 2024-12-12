# Use an official Python runtime as the base image
FROM python:3.10.12-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Set the environment to production
ENV FLASK_ENV=production

# Command to run the Flask app
CMD ["python", "app.py"]