#!/bin/sh
set -e

SRC_DB=""
[ -f /app/app/game.db ] && SRC_DB="/app/app/game.db"
[ -z "$SRC_DB" ] && [ -f /app/game.db ] && SRC_DB="/app/game.db"

if [ ! -f /data/game.db ] && [ -n "$SRC_DB" ]; then
  cp -n "$SRC_DB" /data/game.db || true
fi

ln -sf /data/game.db /app/app/game.db

exec "$@"
