const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const errorHandling = require('./middleware/errorHandling');
const app = express();

// middleware

app.use(cors({
    origin: '*',
    methods: "GET"
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routing

const routes = require('./routes/routes');

app.use('/api/v1', routes);
app
  .route('*')
  .get((req, res) => {
    res.send("page yang kamu tuju tidak ada");
  })
  .post((req, res) => {
    res.send("page yang kamu tuju tidak ada");
  })
  .put((req, res) => {
    res.send("page yang kamu tuju tidak ada");
  })
  .delete((req, res) => {
    res.send("page yang kamu tuju tidak ada");
  });

// error handling
app.use(errorHandling);

const port = 3000;
app.listen(port, () => {
  console.log(`listen on http://localhost:${port}`);
});
