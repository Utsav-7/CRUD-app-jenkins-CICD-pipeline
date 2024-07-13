# Use the official lightweight Node.js image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Use the smaller node image for the final image
FROM node:18-alpine

# Copy only the production files
COPY --from=builder /app/node_modules .
COPY --from=builder /app/public .
COPY --from=builder /app/app.js .
COPY --from=builder /app/package-lock.json .

# Expose the port the application runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]
