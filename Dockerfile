FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
RUN apk add --no-cache nginx
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/server/index.js /app/server/index.js
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && npm install express
EXPOSE 80
CMD ["/app/start.sh"]
