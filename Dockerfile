
FROM nginxinc/nginx-unprivileged:alpine

WORKDIR /usr/share/nginx/html

COPY ./src .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1