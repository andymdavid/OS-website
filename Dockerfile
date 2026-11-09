FROM node:24.22.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24.22.1-alpine
RUN apk add --no-cache nginx
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/server /app/server
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh && cd /app/server && npm ci --omit=dev
EXPOSE 80
CMD ["/app/start.sh"]
