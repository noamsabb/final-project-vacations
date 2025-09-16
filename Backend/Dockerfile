# Inherit from existing Dockerfile containing Linux Alpine + Node.js:
FROM node:24-alpine3.22

# Create an empty folder inside the root of our Alpine image:
WORKDIR /app

# Copy only package.json from current folder into image /app: 
COPY package.json /app

# Install node_modules inside image /app:
RUN npm i

# Copy local project current folder into image /app while ignoring the content inside .dockerignore:
COPY . /app

# ---------------------------------------------------

# When the container start - which command should run our app: 
ENTRYPOINT ["npm", "start"]

