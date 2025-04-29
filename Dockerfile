FROM oven/bun:latest

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

ENV ORIGIN=https://theravickya.com

COPY package.json bun.lockb ./
RUN bun install

COPY . .

RUN bunx prisma generate


RUN bun run build

EXPOSE 8080

CMD ["bun", "run", "preview"]
