FROM node:18-alpine AS base

# 1. 의존성 설치
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. 빌드
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# 3. 실행 환경
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start"]