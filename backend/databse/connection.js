const mongoose = require('mongoose');

const dbUser = process.env.DB_USER;

const dbPassword = process.env.DB_PASS;

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.my3ny.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0`
  );

  const connection = mongoose.connection;

  connection.on('error', () => {
    console.error('Error ao conectar com o mongoDB Atlas');
  });

  connection.on('open', () => {
    console.log('Conectado com sucesso ao MongoDB Atlas!');
  });
};

connect();

module.exports = mongoose;
