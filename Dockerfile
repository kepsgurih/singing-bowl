FROM oven/bun:latest

WORKDIR /app

ARG NODE_ENV=production
ENV VITE_BUILD_MODE=$NODE_ENV

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bun run build --mode $VITE_BUILD_MODE

EXPOSE 8080

CMD ["bun", "run", "preview"]
