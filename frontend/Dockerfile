# Base Image to serve the frontend
FROM nginx:alpine

# Copy the local build folder to Nginx's HTML directory
COPY ./build /usr/share/nginx/html

# Allocating port for frontend
EXPOSE 80