#!/usr/bin/env bash 
set -e 

echo "Clearing Go build cache..."
go clean -cache -modcache -testcache

echo "Removing temporary files..."
find . -type d \( -name "dist" -o -name "build" \) -prune -exec rm -rf '{}' \;

echo "✅ Cache cleared!"

