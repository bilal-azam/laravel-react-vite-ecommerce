FROM node:current-alpine

WORKDIR /app/frontend

COPY package*.json ./

COPY . .

EXPOSE 3000

ADD .tools/scripts/ /srv/

ENTRYPOINT ["/bin/sh", "/srv/startup.sh"]