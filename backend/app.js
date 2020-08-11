const express = require('express');
const app = express();
const port = 5000;

const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

/*ENV*/
const jwtPass = 'labai noriu dirbt, priimkite i darba';

/*DB*/
const dbEmail = 'frontend@isawesome.com';
const dbPass = 'cool';

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    exposedHeaders: [
      'Accept',
      'authorization',
      'Content-Type',
      'If-None-Match',
      'SourceType',
    ],
  })
);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.send(true);
});

app.post('/login', (req, res) => {
  if (req.body.username === dbEmail && req.body.password === dbPass) {
    const token = jwt.sign(req.body.username, jwtPass);
    return res.send({ token });
  } else return res.status(400).send('Wrog username or passowrd');
});

app.post('/logedin', (req, res) => {
  const payload = jwt.verify(req.body.token, jwtPass);
  if (payload === dbEmail) return res.send('sucess');
  else return res.status(400).send('token expired');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
