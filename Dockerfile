FROM node:18.14.1 
 
LABEL authors="Eduardo Mollinedo" 
 
WORKDIR . 
 
COPY package*.json ./ 
 
RUN npm install 
 
COPY . . 
 
EXPOSE 3000 
 
CMD ["npm", "start"]