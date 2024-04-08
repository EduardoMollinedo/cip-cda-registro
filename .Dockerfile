# Usar la imagen oficial de Node.js como base
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el contenido del directorio actual al directorio de trabajo del contenedor
COPY . .

# Instalar las dependencias del proyecto
RUN npm install

# Exponer el puerto 3000 para que pueda ser accedido desde el exterior del contenedor
EXPOSE 3000

# Comando para iniciar el servidor web
CMD ["node", "index.js"]