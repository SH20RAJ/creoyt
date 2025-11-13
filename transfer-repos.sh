#!/bin/bash

# ==============================
# 🚀 Bulk GitHub Repo Transfer
# Author: Shaswat Raj (@sh20raj)
# ==============================

# --- CONFIG ---
USERNAME="sh20raj"
ORG="sh20raj-dump"
TOKEN="${GITHUB_TOKEN}"
INPUT_FILE="to-transfer.txt"
LOG_FILE="transfer_log.txt"

# --- Sanity Checks ---
if [[ ! -f "$INPUT_FILE" ]]; then
  echo "❌ No $INPUT_FILE file found! Please create one (each line = repo name)."
  exit 1
fi

if [[ -z "$TOKEN" ]]; then
  echo "❌ GITHUB_TOKEN environment variable not set!"
  echo "💡 Please set your GitHub Personal Access Token:"
  echo "   export GITHUB_TOKEN=your_token_here"
  echo "   Or run: GITHUB_TOKEN=your_token_here bash transfer-repos.sh"
  exit 1
fi

echo "🚀 Starting bulk transfer of repositories from @$USERNAME → @$ORG"
echo "📦 Repositories listed in: $INPUT_FILE"
echo "🪶 Logging results to: $LOG_FILE"
echo "" > "$LOG_FILE"

# --- Transfer Loop ---
while read -r REPO; do
  # Skip empty lines or commented ones
  [[ -z "$REPO" || "$REPO" =~ ^# ]] && continue
  
  echo "➡️ Transferring $USERNAME/$REPO ..."
  
  HTTP_STATUS=$(curl -s -o response.json -w "%{http_code}" \
    -X POST \
    -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "https://api.github.com/repos/$USERNAME/$REPO/transfer" \
    -d "{\"new_owner\":\"$ORG\"}")

  if [[ "$HTTP_STATUS" == "202" ]]; then
    echo "✅ $REPO -> Transfer initiated" | tee -a "$LOG_FILE"
  else
    MESSAGE=$(jq -r '.message' response.json)
    echo "❌ $REPO -> Failed ($HTTP_STATUS): $MESSAGE" | tee -a "$LOG_FILE"
  fi

  # Delay to avoid rate limits
  sleep 1
done < "$INPUT_FILE"

echo ""
echo "✅ All transfer requests completed!"
echo "📋 Check $LOG_FILE for details."
echo "🔔 Approve pending transfers in https://github.com/notifications"
echo "🚀 Happy Coding!ss  🚀"
