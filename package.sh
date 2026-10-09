#!/usr/bin/env bash
# Zips each skill into dist/<skill>.zip for upload or sharing.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
for skill in resume-tailor interview-prep; do
  rm -f "dist/$skill.zip"
  zip -qr "dist/$skill.zip" "$skill" -x '*/node_modules/*' -x '*.DS_Store'
  echo "dist/$skill.zip"
done
