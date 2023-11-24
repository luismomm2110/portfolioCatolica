# Dockerfile

# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

COPY requirements.txt /app

COPY server/src/ src/
COPY server/tests/ tests/
COPY server/resources/ resources/
COPY server/settings.py /app

# Copy the iata.csv file into the container
COPY server/resources/iata.csv resources/iata.csv

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

ENV PYTHONPATH /app

WORKDIR /app/src/endpoints
# Run the endpoints.py when the container launches

EXPOSE 5000
CMD ["python3", "flask_app.py"]

