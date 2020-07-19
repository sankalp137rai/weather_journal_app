//global variable
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '10e75cfbb8ab866d099a6f91978372dc&units=imperial';

// date & day
let d = new Date();
let date = ('0' + d.getDate()).slice(-2);
let month = ('0' + (d.getMonth() + 1)).slice(-2);
let year = d.getFullYear();
let newDate = date + '/' + month + '/' + year;

let weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';
let n = weekday[d.getDay()];

//adding day and date in UI
document.querySelector("#hello-its").innerHTML = n;
document.querySelector("#date").innerHTML = newDate;

// add class for day hover, etc.
document.getElementById('app').classList.add('center');
document.querySelector('#hello-its').classList.add('hvr-buzz-out');

// day or night
let nightTimeStart = 19;
let nightTimeEnd = 6;
let currentHour = d.getHours();
let dayNight = document.querySelector('.headline-day-night');
if (currentHour > nightTimeStart || currentHour < nightTimeEnd) {
  dayNight.style.background = "url('night.png') no-repeat center";
  dayNight.style.backgroundSize = '50px 50px';
} else {
  dayNight.style.background = "url('day.png') no-repeat center";
  dayNight.style.backgroundSize = '50px 50px';
}

//adding action listerner on send button
document.getElementById('generate').addEventListener('click', performAction);
function performAction(){
  const zip = document.getElementById('zip').value;
  const userFeelings = document.getElementById('feelings').value;
  getWeather(baseUrl, zip, apiKey)
  .then(function(data){
  let temp = Math.round((data.main.temp-32)*5/9);
  console.log(temp);
  let city = data.name;
  let country = data.sys.country;
  let humidity = data.main.humidity;
  let nature = data.weather[0].description;
  console.log(nature);
  postWeather('http://localhost:3000/addWeather',{city: city, country: country, temprature: temp,
  humidity: humidity, feeling: userFeelings, nature: nature});
  updateUI();
  });
}


const updateUI = async() => {
  const request = await fetch('http://localhost:3000/all');
  try{
  const allData = await request.json();
  document.getElementById('temp').innerHTML = allData.temperature+'°C ';
  document.getElementById('city').innerHTML = allData.city;
  document.getElementById('country').innerHTML = 'country: '+allData.country;
  document.getElementById('humidity').innerHTML = 'Humidity: '+allData.humidity+'%';
  document.getElementById('content').innerHTML = allData.feeling;
  document.getElementById('nature').innerHTML = allData.nature;
  }catch(error){
  console.log("error", error);
  }
  }

//function to post data
const postWeather = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
  'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  });
  try {
  const newData = await response.json();
  return newData;
  }catch(error) {
  console.log("error", error);
  }
  };
/* Function to GET Web API Data*/
const getWeather = async (baseUrl, zip, apikey) => {
    const res = await fetch (baseUrl+zip+'&appid='+apikey);
    try{
        const data = await res.json();
        console.log(data);
        console.log(data.name);
        return data;
    }catch(error){
        console.log("error: "+error);
    }
}

