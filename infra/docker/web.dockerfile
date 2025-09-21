# Use the correct image name - it's "oven/bun" not "over/bun"
FROM oven/bun:1.2-alpine AS builder

WORKDIR /app

# First, create the directory structure
RUN mkdir -p apps/web apps/desktop packages/core packages/i18n packages/ui

# Copy package files to their respective directories
COPY package.json bun.lock ./
COPY packages/core/package.json ./packages/core/
COPY packages/i18n/package.json ./packages/i18n/
COPY packages/ui/package.json ./packages/ui/
COPY apps/web/package.json ./apps/web/
COPY apps/desktop/package.json ./apps/desktop/

# Install dependencies for the web workspace only
RUN bun install --frozen-lockfile --filter "web" 

# Copy source code
COPY apps/web ./apps/web
COPY packages/core ./packages/core
COPY packages/i18n ./packages/i18n
COPY packages/ui ./packages/ui

# Build the web app
RUN bun run build:web

# Production stage
FROM oven/bun:1.2-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/web/build ./build
COPY --from=builder /app/node_modules ./node_modules

# Start the application
CMD ["bun", "run", "build/index.js"]
