# --- Stage 1: Build the frontend ---
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the code and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy build output from previous stage into Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
