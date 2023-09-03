require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
console.log('Começou!');
const path = require('path')

//static Images Folder

app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from your Angular app
  credentials: true, // Allow cookies and other credentials
}));

app.use(cookieParser());

// forma de ler JSON

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// rotas da API

const commentRoutes = require('./routes/commentRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/comment', commentRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/user', userRoutes);

// db.js

(async () => {
  const database = require('./db');
  await database.sync();
})();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
