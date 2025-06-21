#!/bin/bash

# Script to add edge runtime to all dashboard and auth pages

# Dashboard pages
DASHBOARD_PAGES=(
    "src/app/dashboard/account/page.js"
    "src/app/dashboard/inbox/page.jsx"
    "src/app/dashboard/outliner/page.js"
    "src/app/dashboard/ideas/page.js"
    "src/app/dashboard/task/page.jsx"
    "src/app/dashboard/lesson/page.jsx"
    "src/app/dashboard/trends/page.js"
    "src/app/dashboard/subscription/page.js"
    "src/app/dashboard/scout/page.js"
    "src/app/dashboard/projects/page.js"
    "src/app/dashboard/optimize/page.js"
    "src/app/dashboard/group/page.jsx"
    "src/app/dashboard/tools/page.js"
    "src/app/dashboard/note/page.js"
    "src/app/dashboard/tools/tag-generator/page.js"
    "src/app/dashboard/research/page.js"
    "src/app/dashboard/settings/page.js"
    "src/app/dashboard/projects/[...id]/page.js"
)

# Auth pages
AUTH_PAGES=(
    "src/app/sign-in/[[...sign-in]]/page.jsx"
    "src/app/sign-up/[[...sign-up]]/page.jsx"
)

# Combine all pages
ALL_PAGES=("${DASHBOARD_PAGES[@]}" "${AUTH_PAGES[@]}")

echo "Adding edge runtime to all pages..."

for page in "${ALL_PAGES[@]}"; do
    if [[ -f "$page" ]]; then
        echo "Processing: $page"
        
        # Check if the file already has the runtime export
        if ! grep -q "export const runtime = 'edge'" "$page"; then
            # Create a temporary file with the edge runtime export at the top
            echo "export const runtime = 'edge';" > temp_file
            echo "" >> temp_file
            cat "$page" >> temp_file
            mv temp_file "$page"
            echo "✅ Added edge runtime to $page"
        else
            echo "⚠️  Edge runtime already exists in $page"
        fi
    else
        echo "❌ File not found: $page"
    fi
done

echo "✅ All pages processed!"
