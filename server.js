// empty object to act as endpoint for all routes
let projectData = {};

// express setup for server & routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// start up an instance of app
const app = express();

// config express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// сors for cross origin allowance
app.use(cors());

// the main project folder
app.use(express.static('website'));

// server 
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  console.log(`server is running on localhost:${port}`);
};

// the callback function of the GET takes two parameters: req and res
// request (req) is the data provided by the GET request
// response (res) is the data returned to the GET request

// GET route to retrieve projectData
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route to store date, temp & feeling in projectData
app.post('/addWeather', addWeather);

function addWeather(req, res){
  console.log(req.body.temp);
  console.log(req.body.city);
  console.log(req.body);
  const newEntry = {
  temperature: req.body.temprature,
  city: req.body.city,
  country: req.body.country,
  humidity: req.body.humidity,
  feeling: req.body.feeling,
  nature: req.body.nature
  }
  projectData=newEntry
  console.log(projectData);
  res.json(projectData);
  }
