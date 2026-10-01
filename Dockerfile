FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG PUBLIC_ADSTERRA_ENABLED=true
RUN PUBLIC_ADSTERRA_ENABLED="$PUBLIC_ADSTERRA_ENABLED" npm run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 80
