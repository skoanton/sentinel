# 1. Byggfas (minimerar slutlig bildstorlek)
FROM node:23-alpine AS builder
WORKDIR /app

# Installera beroenden först (för att cachelagra bättre)
COPY package.json package-lock.json ./
RUN npm install

# Kopiera resten av koden och bygg Remix-appen
COPY . .
RUN npm run build

# 2. Runtime-fas (kör den optimerade appen i en lättviktigare container)
FROM node:23-alpine
WORKDIR /app

# Kopiera den byggda koden från build-stegen
COPY --from=builder /app /app

# Installera Prisma klienten
RUN npx prisma generate

# Exponera Remix på port 3000
EXPOSE ${PORT}

# Kör Prisma-migreringar och starta Remix
CMD ["sh", "-c", "npm run prisma:migrate && npm run prisma:seed && npm start"]