# Stage 1: Build the frontend app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci

# Copy source code and build
COPY . .

#Build the React app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine


RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx configuration file
COPY nginx.conf  /etc/nginx/conf.d/default.conf

#Copy built frontend files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
