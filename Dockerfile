# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code
COPY server /app/server

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r /server/requirements.txt

# Set the PYTHONPATH to recognize your application and tests directories
ENV PYTHONPATH "${PYTHONPATH}:/app/src:/app/tests"

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Define the default command to run your app
CMD ["python", "server/src/flight_search/app.py"]
