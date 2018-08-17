FROM node:9.11.1-slim

# Install Python, tools and Nginx
WORKDIR /resources/
RUN ./setconfigs.sh

RUN cd ./app && npm install express && npm install node

# STDOUT LOG
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

ONBUILD ADD app /app/

WORKDIR /app

EXPOSE 80
ONBUILD ENTRYPOINT /resources/runservices.sh
