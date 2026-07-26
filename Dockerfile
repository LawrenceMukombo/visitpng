FROM node:22-bookworm-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/app/data/visitpng.db
VOLUME ["/app/data"]
EXPOSE 3000
CMD ["npm","start"]
