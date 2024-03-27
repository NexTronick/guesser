FROM node:lts-alpine3.19 as build
WORKDIR /client

COPY package.json .
RUN npm install

#copy source code
COPY . .

# Build the application
RUN npm run build

# Serve the application
FROM nginx:alpine

# Copy build files from the build stage
COPY --from=build /client/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]