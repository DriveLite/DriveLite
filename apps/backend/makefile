# =========================
# Go Backend Makefile
# =========================

# Binary name
BINARY_NAME := backend
# Go module path
GO_MOD := ./cmd/api
# Environment file
ENV_FILE := .env
# Hurl tests directory
HURL_DIR := hurl

# =========================
# Default target
# =========================
.PHONY: all
all: build

# =========================
# Load .env (for make variables only)
# =========================
ifneq (,$(wildcard $(ENV_FILE)))
		include $(ENV_FILE)
		export
endif

# =========================
# Build
# =========================
.PHONY: build
build:
	@echo "Building $(BINARY_NAME)..."
	go build -o $(BINARY_NAME) $(GO_MOD)

# =========================
# Run
# =========================
.PHONY: run
run: build
	@echo "Running $(BINARY_NAME)..."
	@if [ -f $(ENV_FILE) ]; then \
		env $$(grep -v '^#' $(ENV_FILE) | grep -v '^$$' | xargs) ./$(BINARY_NAME); \
	else \
		./$(BINARY_NAME); \
	fi

# =========================
# Test
# =========================
.PHONY: test
test:
	@echo "Running tests..."
	go test ./internal/... ./pkg/... -v -cover

# =========================
# Lint
# =========================
.PHONY: lint
lint:
	@echo "Running golangci-lint..."
	golangci-lint run ./...

# =========================
# Docker
# =========================
.PHONY: docker-build
docker-build:
	docker build -t $(BINARY_NAME) .

.PHONY: docker-run
docker-run:
	@if [ -f $(ENV_FILE) ]; then \
		docker run --rm --env-file $(ENV_FILE) -p $${PORT:-8080}:$${PORT:-8080} $(BINARY_NAME); \
	else \
		docker run --rm -p $${PORT:-8080}:$${PORT:-8080} $(BINARY_NAME); \
	fi

# =========================
# Hurl API tests
# =========================
.PHONY: hurl
hurl:
	@echo "Running Hurl tests..."
	@if [ -f $(ENV_FILE) ]; then \
		env $$(grep -v '^#' $(ENV_FILE) | grep -v '^$$' | xargs) hurl $(HURL_DIR)/*.hurl; \
	else \
		echo "Error: $(ENV_FILE) not found"; \
		exit 1; \
	fi

# =========================
# Install dependencies
# =========================
.PHONY: deps
deps:
	@echo "Installing dependencies..."
	go mod download
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# =========================
# Clean
# =========================
.PHONY: clean
clean:
	@echo "Cleaning..."
	go clean
	rm -f $(BINARY_NAME)

# =========================
# Help
# =========================
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all        - Build the binary (default)"
	@echo "  build      - Build the binary"
	@echo "  run        - Build and run the application with env vars"
	@echo "  test       - Run Go tests"
	@echo "  lint       - Run golangci-lint"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run - Run Docker container with env vars"
	@echo "  hurl       - Run Hurl API tests with env vars"
	@echo "  deps       - Install dependencies"
	@echo "  clean      - Clean build artifacts"
	@echo "  help       - Show this help message"
