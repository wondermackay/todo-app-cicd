# Utiliser une image de base officielle de Node.js pour construire l'application
FROM node:14 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image de base de serveur web léger pour servir l'application
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire approprié du serveur web
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port sur lequel l'application tourne
EXPOSE 80

# Démarrer le serveur web
CMD ["nginx", "-g", "daemon off;"]
