FROM node:20-bullseye AS base
WORKDIR /app
COPY package*.json ./

FROM base AS build
ENV NODE_ENV=development
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:20-bullseye AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/.env.production .env

EXPOSE 5000

CMD sh -c "npx prisma generate && npx prisma db push && node dist/main"
        