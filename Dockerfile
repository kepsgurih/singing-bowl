FROM node:20-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV VITE_BUILD_MODE=$NODE_ENV

COPY package.json bun.lockb ./

RUN npm install --global bun

RUN bun install

COPY . .

RUN bunx prisma generate


RUN bun run build --mode $VITE_BUILD_MODE

EXPOSE 8080

CMD ["bun", "run", "preview"]
