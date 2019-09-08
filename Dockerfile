FROM node:alpine

MAINTAINER Marc Nuri <marc@marcnuri.com>
LABEL MAINTAINER="Marc Nuri <marc@marcnuri.com>"

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/src/index.js"]
