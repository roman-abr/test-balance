FROM node:24-alpine AS build

WORKDIR /tmp/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

# -------------------
FROM node:24-alpine AS production

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production
# Copy node_modules
# COPY --from=build /tmp/app/node_modules ./node_modules

# Copy built files
COPY --from=build /tmp/app/dist ./

# Start server
CMD ["node", "main"]
EXPOSE 3000