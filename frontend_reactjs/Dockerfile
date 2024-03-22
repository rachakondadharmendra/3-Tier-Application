FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
WORKDIR /usr/local/bin
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /app/.env /usr/share/nginx/html/
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY env.sh .
RUN chmod +x env.sh
EXPOSE 80
CMD ["/bin/sh", "env.sh"]
