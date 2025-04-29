# Menggunakan Node.js Alpine untuk tahap build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm install -g bun
RUN bun install
RUN bun build --mode production
RUN npm prune --production

# Menggunakan Node.js Alpine untuk tahap final
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 8080
ENV NODE_ENV=production
CMD ["bun", "build", "--mode", "production"]
