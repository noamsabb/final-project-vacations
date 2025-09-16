FROM node:24-alpine3.22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Vite dev server needs to listen on 0.0.0.0 for Docker
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
