#Base Image to dockerize backend
FROM node:20.18.1

#Creating Workdirectory
WORKDIR /usr/src/app

#Installing Backend dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

#Copy backend files
COPY . .

#Allocatingport for backend
EXPOSE 3000

#Run Command
CMD ["npm","start"]