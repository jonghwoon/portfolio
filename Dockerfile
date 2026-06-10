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

# Next.js 빌드(정적 분석) 시 Prisma 클라이언트가 환경 변수를 요구하므로 더미 값을 설정합니다.
ENV POSTGRES_USER="dummy" POSTGRES_PASSWORD="dummy" POSTGRES_HOST="localhost" POSTGRES_PORT="5432" POSTGRES_DB="dummy"

# Next.js 빌드(정적 분석) 시 Prisma가 환경 변수를 요구하므로 RUN 명령어에 직접 더미 값을 주입합니다.
# ENV로 설정 시 발생하는 보안 경고(SecretsUsedInArgOrEnv)도 해결됩니다.
RUN POSTGRES_USER=dummy POSTGRES_PASSWORD=dummy POSTGRES_HOST=localhost POSTGRES_PORT=5432 POSTGRES_DB=dummy npm run build


# 3. 실행 환경
FROM base AS runner
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]