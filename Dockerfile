# Use the official Node.js runtime as base image :18 is the version of node
FROM node:20 AS frontend-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Second stage : backend server build
FROM node:20 AS backend-builder
WORKDIR /usr/src/app/server
COPY server/package*.json ./
RUN npm install
COPY . . 


# Expose the port the app will run on 4000
# as we have configured it on the config.env file 
EXPOSE 3000

# Command to run the application both
CMD [ "npm", "start" ]

