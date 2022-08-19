require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const stats_model = require('./stats_model');

var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const listener = app.listen(process.env.PORT || 5000, ()=>{
  console.log('App is running on Port ' + listener.address().port)
});

app.get('/', (req, res) => res.send('Hello from Express!'));

app.post('/api/users', (req,res)=> {
  stats_model.createGamer(req.body.username)
  .then(response => {
    res.status(200).send(JSON.stringify(response));
  })
  .catch(error => {
    res.status(500).send(error);
  })

});

app.post('/api/stats/:id', (req,res)=> {
  stats_model.createStat(req.body)
  .then(response => {
    res.status(200).send(JSON.stringify(response));
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/api/stats/:id', (req,res)=>{
  let gamerId = req.params.id;
  stats_model.getStats(gamerId)
  .then(response => {
    res.status(200).send(JSON.stringify(response));
  })
  .catch(error => {
    res.status(500).send(JSON.stringify("Invalid Id"));
  })
});
