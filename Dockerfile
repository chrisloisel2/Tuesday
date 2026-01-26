FROM node:22 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine

# Copier le build React
COPY --from=build /app/build /app/build

# Copier la config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Installer Node pour le backend
RUN apk add --no-cache nodejs npm

# Copier le backend
COPY backend /app/backend
WORKDIR /app/backend
RUN npm install

EXPOSE 3000

ENV MONGO_URI=mongodb+srv://christoloisel:rose@cluster0.ppyauvl.mongodb.net/Tuesday

# Lancer nginx et le backend
CMD sh -c "node /app/backend/index.js & nginx -g 'daemon off;'"
