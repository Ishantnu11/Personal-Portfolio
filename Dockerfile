# Build both frontend and backend, then serve the static frontend from backend Express
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Install frontend dependencies and build assets
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm install

# Install backend dependencies
COPY backend/package.json ./backend/
RUN cd backend && npm install

# Copy source files and build frontend
COPY frontend ./frontend
COPY backend ./backend
RUN cd frontend && npm run build

# Runtime image
FROM node:20-alpine AS release
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/backend ./backend
COPY --from=builder /usr/src/app/frontend/build ./frontend/build

ENV NODE_ENV=production
WORKDIR /usr/src/app/backend
EXPOSE 5000
CMD ["node", "server.js"]
