# Build stage - frontend build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Copy production dependencies and server
COPY package.json ./
RUN npm install --production

COPY server ./server
COPY --from=builder /app/dist ./dist

# Copy env file
COPY .env ./

ENV NODE_ENV=production

EXPOSE 3001

CMD ["node", "server/index.js"]
