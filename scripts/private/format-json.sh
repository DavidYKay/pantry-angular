#!/bin/bash

#####
# Helper script for pretty formatting of json files
#####

for file in `ls -a app/recipes | grep -v \\\.\$`; do
  cat app/recipes/$file | python -mjson.tool > tmp.json
  rm app/recipes/$file
  mv tmp.json app/recipes/$file
done
