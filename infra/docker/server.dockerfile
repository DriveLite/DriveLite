# Build stage
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Copy Go module files first for better caching
COPY apps/server/go.mod apps/server/go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY apps/server/ ./

# Build the application with optimizations
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server ./cmd/api

FROM alpine:3.21

# Copy the built binary
COPY --from=builder /app/server .

# Copy any static files or templates
COPY apps/server/migration migration

# Run the application
CMD ["/app/server"]
