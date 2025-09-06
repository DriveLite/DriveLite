# Copyright 2025.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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

