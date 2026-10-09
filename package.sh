#!/usr/bin/env bash
# Zips each skill into downloads/<skill>.zip for upload or sharing.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p downloads
for skill in resume-tailor interview-prep pipeline-tracker; do
  rm -f "downloads/$skill.zip"
  zip -qr "downloads/$skill.zip" "$skill" -x '*/node_modules/*' -x '*.DS_Store'
  echo "downloads/$skill.zip"
done
