FROM node:20-alpine AS base


# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install deps
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile


# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Build your Next.js application
RUN yarn build


# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

###################
# Typical commands
#
# Builds the image
# docker build -t observatoire .
#
# Run the image in a container
# docker run -d -p 3000:3000 --name observatoire-container observatoire
#
# Stop the container
# docker stop observatoire-container
