FROM node:18

LABEL maintainer="IDgis bv <info@idgis.nl>"

# Create app directory
WORKDIR /usr/src/app

# Expose port for service
EXPOSE 3000

# Install and configure serve
RUN npm install -g serve

# Copy package.json first for better cache results
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of source code to image
COPY . .

# Switch to node user
RUN chown -R node /usr/src/app
USER node

# Give user permission to run script
RUN chmod u+x run.sh

# Build app and start server from script
CMD ["/usr/src/app/run.sh"]
