FROM node:15 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:15-alpine
WORKDIR /app
COPY --from=builder /app ./
COPY documentation dist/documentation
CMD ["npm", "run", "start:prod"]
