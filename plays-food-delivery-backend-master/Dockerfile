FROM node:12
ARG BACKEND_PORT
ARG GCS_SA_KEY
ENV GCS_SA_KEY=$GCS_SA_KEY

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# generate utils/gcs/bucketKey.json
RUN npm run gen-bucket-key-json

EXPOSE $BACKEND_PORT

ENV BACKEND_PORT=$BACKEND_PORT

CMD [ "node_modules/.bin/babel-node", "server/index.js"]
