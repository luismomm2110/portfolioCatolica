# Dockerfile

# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the source code and requirements.txt into the container
COPY src/ /app/src
COPY tests/ /app/tests
COPY resources/ /app/resources
COPY requirements.txt /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose any necessary ports (if applicable)
EXPOSE 8080

