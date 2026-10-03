FROM node:22-bookworm-slim

WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
ENV DATABASE_URL=file:/data/szczep.db
ENV SESSION_SECRET=docker-demo-session-secret-change-me-32

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && npx tsx prisma/seed.ts && npm run start"]
