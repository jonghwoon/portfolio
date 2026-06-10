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
RUN npx prisma generate

# Next.js 빌드(정적 분석) 시 Prisma 클라이언트가 환경 변수를 요구하므로 더미 값을 설정합니다.
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm run build

# 3. 실행 환경
FROM base AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]