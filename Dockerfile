# Build stage
FROM imbios/bun-node:latest-iron-alpine AS builder

ARG VITE_HOST_URL
ENV VITE_HOST_URL=$VITE_HOST_URL

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM imbios/bun-node:latest-iron-alpine AS production

WORKDIR /app

# Copy only the built output from builder
COPY --from=builder /app/.output ./.output

# Set production environment
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "start"]
