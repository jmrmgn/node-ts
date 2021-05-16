FROM node:14.15.5-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build ts
RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3000
CMD [ "node", "app.js" ]