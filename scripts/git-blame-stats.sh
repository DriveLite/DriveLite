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

