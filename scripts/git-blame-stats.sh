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

# This script produces the list of authors that are "git blame"d for lines in 
# .go , .tsx , .ts , .jsx , .js under the current directory. 
#
# The regular expression for filenames can be overriden on the command line.
# To include all files, use a dot:
#   git-blame-stats.sh .

FILE_REGEXP='\.go$|\.tsx$|\.ts$|\.jsx$|\.js$'
if [ -n "$1" ]; then FILE_REGEXP=$1; fi


git ls-tree -r HEAD \
  | cut -f 2 \
  | grep -E "$FILE_REGEXP" \
  | xargs -n1 git blame --line-porcelain \
  | grep "author " \
  | sort \
  | uniq -c \
  | sort -nr

