# DriveLite - The self-hostable file storage solution.
# Copyright (C) 2025  
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
# 
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.


#!/bin/bash

CODE_EXTENSIONS=("*.js" "*.ts" "*.tsx" "*.jsx" "*.go" "*.py" "*.md" "*.sh" "*.html" "*.css" "*.scss" "*.yml" "*.yaml" "*.hurl")

EXCLUDE_DIRS=(
    "node_modules" 
    "public"
    "vendor" 
    "dist" 
    "build" 
    ".git" 
    ".next" 
    ".cache" 
    "__pycache__"
)

TOTAL_FILES=0
TOTAL_LINES=0

find_excludes=()
for dir in "${EXCLUDE_DIRS[@]}"; do
    find_excludes+=(-not -path "*/$dir/*")
done

count_lines() {
    local file=$1
    local lines=$(grep -v '^[[:space:]]*$' "$file" | wc -l | awk '{print $1}')
    echo "$lines"
}

echo "Counting code files (excluding common non-code directories)..."
echo "----------------------------------------------------------"

for dir in */; do
    [[ "$dir" == .*/ ]] && continue
    for exclude in "${EXCLUDE_DIRS[@]}"; do
        [[ "$dir" == "$exclude/" ]] && continue 2
    done
    echo -n "Counting $dir..."
    DIR_FILES=0
    DIR_LINES=0
    FILE_LIST=()
    for ext in "${CODE_EXTENSIONS[@]}"; do
        while IFS= read -r -d $'\0' file; do
            if [ -f "$file" ]; then
                lines=$(count_lines "$file")
                DIR_FILES=$((DIR_FILES + 1))
                DIR_LINES=$((DIR_LINES + lines))
                FILE_LIST+=("$file")
            fi
        done < <(find "$dir" -type f -name "$ext" "${find_excludes[@]}" -print0 2>/dev/null)
    done
    echo " ${DIR_FILES} files, ${DIR_LINES} lines"
    TOTAL_FILES=$((TOTAL_FILES + DIR_FILES))
    TOTAL_LINES=$((TOTAL_LINES + DIR_LINES))
done

ROOT_FILES=0
ROOT_LINES=0
ROOT_FILE_LIST=()
for ext in "${CODE_EXTENSIONS[@]}"; do
    while IFS= read -r -d $'\0' file; do
        if [ -f "$file" ]; then
            lines=$(count_lines "$file")
            ROOT_FILES=$((ROOT_FILES + 1))
            ROOT_LINES=$((ROOT_LINES + lines))
            ROOT_FILE_LIST+=("$file")
        fi
    done < <(find . -maxdepth 1 -type f -name "$ext" "${find_excludes[@]}" -print0 2>/dev/null)
done

if [ $ROOT_FILES -gt 0 ]; then
    echo "Root directory: ${ROOT_FILES} files, ${ROOT_LINES} lines"
    TOTAL_FILES=$((TOTAL_FILES + ROOT_FILES))
    TOTAL_LINES=$((TOTAL_LINES + ROOT_LINES))
fi

echo "----------------------------------------------------------"
echo "TOTAL: ${TOTAL_FILES} files, ${TOTAL_LINES} lines"
