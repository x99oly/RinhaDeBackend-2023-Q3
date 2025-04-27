# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json e package-lock.json primeiro para instalar as dependências
COPY package.json package-lock.json ./
COPY env.txt .env

# Instalar as dependências
# RUN npm install
# (Sera?) Se você tem package-lock.json, o npm ci é melhor pra reprodutibilidade:
RUN npm ci

# Copiar o restante dos arquivos do projeto
COPY tsconfig.json ./
COPY src/ ./src
COPY prisma ./prisma

# Gerar os arquivos do Prisma
RUN npx prisma generate
RUN npx prisma migrate deploy

# Compilar o código (caso esteja usando TypeScript)
RUN npm run build

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Copiar do estágio de build os arquivos necessários para rodar a aplicação
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 3000

# Iniciar o servidor
CMD ["npm", "start"]
