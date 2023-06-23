FROM node:18.13.0-alpine

#Expose port
EXPOSE 5555

ENV NAME manage-order-data

#create project directory
RUN mkdir /${NAME} 

#Working Dir
WORKDIR /${NAME}

#Copy Package Json Files
COPY package*.json .

#Install Node Modules
RUN npm install

#Copy Source Files
COPY . .

#Start App Server
CMD ["npm", "--trace-warnings" , "start"]