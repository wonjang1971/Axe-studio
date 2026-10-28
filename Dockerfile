FROM node:22-bookworm-slim AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate
COPY . .
RUN pnpm install --frozen-lockfile
ENV BASE_PATH=/ PORT=8080 NODE_ENV=production
RUN node artifacts/axstudio/node_modules/vite/bin/vite.js build --config artifacts/axstudio/vite.config.ts
RUN node artifacts/api-server/build.mjs

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/artifacts/api-server/dist ./artifacts/api-server/dist
COPY --from=build /app/artifacts/axstudio/dist/public ./artifacts/axstudio/dist/public
USER node
CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
