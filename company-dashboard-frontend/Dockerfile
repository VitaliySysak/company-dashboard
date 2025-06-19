FROM node:20-bullseye AS base
WORKDIR /app
COPY package*.json ./

FROM base AS build
ENV NODE_ENV=development 
COPY . .
COPY .env.production .env
RUN npm install
RUN npm run build

FROM node:20-bullseye AS production
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g serve
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/.env ./
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
        