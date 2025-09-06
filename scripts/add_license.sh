 

#!/usr/bin/env bash
set -euo pipefail

# License text without comment chars
LICENSE_TEXT="DriveLite - The self-hostable file storage solution.
Copyright (C) 2025  

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>."

# Function: wrap license with correct comment style
function license_header() {
  case "$1" in
    go|js|ts|java|c|cpp|tsx)
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
EXTENSIONS="go js ts tsx py sh java c cpp yaml yml html xml vue svelte css scss"

for ext in $EXTENSIONS; do
  for file in $(git ls-files "*.$ext"); do
    if ! grep -q "DriveLite - The self-hostable file storage solution.
Copyright (C) 2025" "$file"; then
      echo "Adding license header to $file"
      tmpfile=$(mktemp)
      license_header "$ext" > "$tmpfile"
      echo "" >> "$tmpfile"
      cat "$file" >> "$tmpfile"
      mv "$tmpfile" "$file"
    fi
  done
done
