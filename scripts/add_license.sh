#!/usr/bin/env bash
set -euo pipefail

# License text without comment chars
LICENSE_TEXT="Copyright 2025.

Licensed under the Apache License, Version 2.0 (the \"License\");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an \"AS IS\" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License."

# Function: wrap license with correct comment style
function license_header() {
  case "$1" in
    go|js|ts|java|c|cpp)
      echo "$LICENSE_TEXT" | sed 's/^/\/\/ /'
      ;;
    py|sh|rb|yaml|yml)
      echo "$LICENSE_TEXT" | sed 's/^/# /'
      ;;
    html|xml|vue|svelte)
      echo "<!--"
      echo "$LICENSE_TEXT"
      echo "-->"
      ;;
    css|scss)
      echo "/*"
      echo "$LICENSE_TEXT"
      echo "*/"
      ;;
    *)
      return 1
      ;;
  esac
}

# Extensions to check
EXTENSIONS="go js ts py sh java c cpp yaml yml html xml vue svelte css scss"

for ext in $EXTENSIONS; do
  for file in $(git ls-files "*.$ext"); do
    if ! grep -q "Copyright 2025" "$file"; then
      echo "Adding license header to $file"
      tmpfile=$(mktemp)
      license_header "$ext" > "$tmpfile"
      echo "" >> "$tmpfile"
      cat "$file" >> "$tmpfile"
      mv "$tmpfile" "$file"
    fi
  done
done
