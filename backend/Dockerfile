# --- Build Stage ---
FROM golang:1.25-alpine AS builder

# Install git for go modules (if needed)
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum first for caching dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the Go binary
RUN go build -o /app/bin/api ./cmd/api/main.go

# --- Final Stage ---
FROM alpine:latest

# Install CA certificates for HTTPS calls
RUN apk --no-cache add ca-certificates

# Set working directory
WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/bin/api .

# Command to run the binary
CMD ["./api"]
