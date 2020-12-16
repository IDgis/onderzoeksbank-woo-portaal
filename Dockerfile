FROM node:15.4.0

LABEL maintainer="IDgis bv <info@idgis.nl>"

# Create app directory
WORKDIR /usr/src/app

# Expose port for service
EXPOSE 5000

# Install and configure serve
RUN npm install -g serve

# Copy source code to image
COPY . .

# Install dependencies
RUN npm install

# Switch to node user
RUN chown -R node /usr/src/app
USER node

# Give user permission to run script
RUN chmod u+x run.sh

# Build app and start server from script
CMD ["/usr/src/app/run.sh"]
