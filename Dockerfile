FROM node:20-alpine AS base

# 1. 의존성 설치
FROM base AS deps
# Alpine 리눅스에서 Prisma 및 Next.js 네이티브 모듈 빌드에 필요한 시스템 패키지 설치
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN POSTGRES_USER=dummy POSTGRES_PASSWORD=dummy POSTGRES_HOST=dummy POSTGRES_PORT=5432 POSTGRES_DB=dummy npx prisma generate


RUN POSTGRES_USER=dummy POSTGRES_PASSWORD=dummy POSTGRES_HOST=localhost POSTGRES_PORT=5432 POSTGRES_DB=dummy npm run build

# 3. 실행 환경
FROM base AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]