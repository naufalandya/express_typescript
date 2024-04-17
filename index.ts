import express, {Express} from "express";
import morgan from "morgan";
import path from "path";
import * as pug from "pug"
import axios from "axios";

const app : Express = express()

app.set('views', path.join(__dirname, './src/views'));

// Set view engine
app.set('view engine', 'pug');


if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

import {tourRouter} from './src/routes/index'

app.use('/api/v1/tours', tourRouter)

app.get('/data', async (req, res) => {
    try {

      const response = await axios.get('http://localhost:4765/api/v1/tours/');
      const data = response.data.data.tour; // asumsi data berada dalam properti 'data'
  
      res.render('andra', { tours: data });
    } catch (error) {
      // Tangani error jika gagal mengambil data
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.use((req, res, next) => {
    res.status(404).render('404');
});

export default app;