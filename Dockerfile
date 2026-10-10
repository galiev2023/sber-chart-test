# Use a minimal Node.js image
FROM node:slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (production only to reduce image size)
RUN npm install --production

# Copy the entire project into the container
COPY . .

# Expose the port your Express.js app listens on (default: 3000)
EXPOSE 3000

# Define the default command to start your application
CMD node ./bin/www
