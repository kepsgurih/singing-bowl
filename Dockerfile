FROM oven/bun:latest

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bunx prisma generate


RUN bun run build --mode production

EXPOSE 8080

CMD ["bun", "run", "preview"]
