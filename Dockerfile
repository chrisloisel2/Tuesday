FROM node:22

WORKDIR /app

COPY . /app

RUN npm install && cd backend && npm install

EXPOSE 3000 3001

ENV MONGO_URI=mongodb+srv://christoloisel:rose@cluster0.ppyauvl.mongodb.net/Tuesday

CMD sh -c "cd /app/backend && npm start & cd /app && npm start"
