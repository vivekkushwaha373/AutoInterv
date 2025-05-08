# Use official Node.js image to build the React app
FROM node:20 as build

ARG REACT_APP_BASE_URL            
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL  
# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage for serving the built React app using Nginx
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
