FROM node:lts-alpine3.19 

# Set working directory inside the container
WORKDIR /server

# Install dependencies
COPY package.json .
RUN npm install

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
