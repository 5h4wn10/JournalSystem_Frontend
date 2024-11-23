# Använd en Node-bild som bas för att bygga applikationen
FROM node:16-alpine as build

# Sätt arbetskatalogen i containern
WORKDIR /app

# Kopiera beroendehanteringsfiler
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera hela projektet
COPY . .

# Bygg applikationen för produktion
RUN npm run build

# Använd en lättviktig Nginx-bild för att servera den byggda applikationen
FROM nginx:alpine

# Kopiera byggfiler från föregående steg till Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponera port 3000 (eller den port din frontend använder)
EXPOSE 3000

# Starta Nginx när containern körs
CMD ["nginx", "-g", "daemon off;"]
