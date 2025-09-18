 

#!/usr/bin/env bash
set -euo pipefail

# File extensions to check
EXTENSIONS="go js ts tsx py sh java c cpp yaml yml html xml vue css scss svelte dart"

# Track missing files
MISSING=()

for ext in $EXTENSIONS; do
  for file in $(git ls-files "*.$ext"); do
    # Skip the check script itself
    [[ "$file" == "scripts/check_license.sh" ]] && continue

    if ! grep -q "DriveLite - The self-hostable file storage solution.
Copyright (C) 2025" "$file"; then
      MISSING+=("$file")
    fi
  done
done

if [ ${#MISSING[@]} -ne 0 ]; then
  echo "❌ License header missing in the following files:"
  for f in "${MISSING[@]}"; do
    echo " - $f"
  done
  echo "Please run ./scripts/add_license"
  exit 1
else
  echo "✅ All files have license headers."
fi
