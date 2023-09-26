const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;



const hbs = exphbs.create({
  defaultLayout: 'main', 
  extname: '.handlebars', 
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

// Ruta para mostrar los resultados de la búsqueda
app.get('/results', async (req, res) => {
  const query = req.query.query;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`);
    const articles = response.data.articles;
    res.render('news', { articles });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda de noticias.');
  }
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
