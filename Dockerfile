FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .

# Link di donazione PayPal: le variabili NEXT_PUBLIC_* sono fissate in fase di build
ARG NEXT_PUBLIC_PAYPAL_DONATE_URL=""
ENV NEXT_PUBLIC_PAYPAL_DONATE_URL=$NEXT_PUBLIC_PAYPAL_DONATE_URL

RUN npm run build

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start", "--", "-H", "0.0.0.0", "-p", "3000"]
