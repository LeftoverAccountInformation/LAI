#!/usr/bin/env bash

# This script will scrape all the apps from apk-dl.com website

site=https://apk-dl.com/apps/

declare -a categories=("books-reference" "business" "comics" "communication" 
                       "education" "entertainment" "finance" "health-fitness" 
                       "libraries-demo" "lifestyle" "media-video" "medical"
                       "music-audio" "news-magazines" "personalization"
                       "photography" "productivity" "shopping" "social"
                       "tools" "transportation" "travel-local" "weather" "word")

for c in "${categories[@]}"; do
    html=$(curl -s $site$c)
    grep --color=never -oP "(?<=\"card-click-target\" href=\"/).*?(?=\")" <<< "$html" | sed 's/^.*\///g' | awk '!NF || !seen[$0]++'
    for p in {2..20}; do
        html=$(curl -s $site$c?page=$p)
        grep --color=never -oP "(?<=\"card-click-target\" href=\"/).*?(?=\")" <<< "$html" | sed 's/^.*\///g' | awk '!NF || !seen[$0]++'
    done
done
