#!/bin/bash

# Script to fix the order of directives in client pages

echo "Fixing directive order in client pages..."

# Find all pages that have both "use client" and edge runtime
for file in $(grep -l "use client" src/app/dashboard/**/*.js* src/app/sign-*/**/*.js*); do
    if grep -q "export const runtime = 'edge'" "$file"; then
        echo "Processing: $file"
        
        # Create a temp file with correct order
        {
            echo '"use client";'
            echo 'export const runtime = '\''edge'\'';'
            echo ''
            # Remove existing directives and add the rest
            grep -v -E '^"use client";|^export const runtime = .*edge.*' "$file"
        } > temp_file
        
        mv temp_file "$file"
        echo "✅ Fixed $file"
    fi
done

echo "✅ All client pages fixed!"
