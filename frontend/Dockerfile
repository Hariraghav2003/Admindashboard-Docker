#Base Image to dockerize backend
FROM node:20.18.1 AS frontendbuild

#Creating Workdirectory
WORKDIR /usr/src/app

#Installing Backend dependencies
COPY package.json ./
RUN npm install

#Copy backend files
COPY . .
RUN npm run build

#to serve the build image
FROM nginx:alpine
COPY --from=frontendbuild /usr/src/app/build /usr/share/nginx/html
#Allocatingport for backend
EXPOSE 80

