# 用 Debian glibc，避开 sqlite3 ELF 坑
FROM node:18-bullseye-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ dos2unix \
    && rm -rf /var/lib/apt/lists/*

# 第一次安装（仅用 app 子目录的 package.json）
COPY app/package*.json ./app/
RUN cd app && npm ci --omit=dev

# 复制全部源码（此时 .dockerignore 会过滤掉本机 node_modules）
COPY . .

# 双保险：若有人把 node_modules 带进来了，删掉并重新装一次
RUN rm -rf /app/app/node_modules && cd /app/app && npm ci --omit=dev \
    && npm rebuild sqlite3 --build-from-source

# 入口脚本：初始化 /data/game.db 并软链接
COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

ENV NODE_ENV=production
ENV PORT=3000

# 运行目录固定到 app 子目录
WORKDIR /app/app

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node","src/app.js"]
