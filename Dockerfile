# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY server /app

WORKDIR /app

ENV PYTHONPATH "${PYTHONPATH}:/app/src"

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5001 available to the world outside this container
EXPOSE 5001

WORKDIR /app/src/flight_search

# Define the command to run your app
CMD ["python", "app.py"]
