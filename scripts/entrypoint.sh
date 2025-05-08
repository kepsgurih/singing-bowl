#!/bin/bash

# Buat file .env dari environment yang sudah diset di docker-compose
cat <<EOF > /app/.env
DATABASE_URL=${DATABASE_URL}
ORIGIN=${ORIGIN}
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
RESEND_API_KEY=${RESEND_API_KEY}
EOF

# Jalankan server
exec bun run preview
