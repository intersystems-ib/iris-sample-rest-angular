# base image
FROM node:12.14.1-alpine

# install dependencies
USER node
WORKDIR /app
COPY package.json /app
USER root
RUN npm install

# run dev server
COPY . /app
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "500"]