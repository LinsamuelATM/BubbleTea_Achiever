var city = document.getElementById("city");
var temperature = document.getElementById("temp");
var condition =  document.getElementById("condition");



const API_KEY = '9fc09f16c94ad2e092e873fa8f558df0';
var current_City = '';
var weather_condition = '';
var main = '';
var temp = '';
var Lat = '';
var Lon = '';



document.addEventListener('DOMContentLoaded', getLocation)



//fetching the geolocation: Lat and Lon
function getLocation() {

  /*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPositionSuccess ,getPosErr);
  } else { 
    city.innerHTML = "Geolocation is not supported by this browser.";
  }
  */

  var URLRequest = 'http://ip-api.com/json/'
  fetch(URLRequest)
  .then(response => response.json())
  .then(data =>{
    console.log('location fetched')
    Lat = data.lat;
    Lon = data.lon;
    fetchWeatherAPI(Lat, Lon)
  }).catch(error => {
    console.log(error)
})
}

/*
function getPositionSuccess(position) {
  Lat = position.coords.latitude;
  Lon = position.coords.longitude;
  localStorage.setItem('Lat', JSON.stringify(Lat))
  localStorage.setItem('Lon', JSON.stringify(Lon))
  fetchWeatherAPI(Lat, Lon)

}
*/

// getCurrentPosition: Error returned
function getPosErr(err) {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case err.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case err.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}


//Fetching weather API with params lat and lon 
function fetchWeatherAPI(geoLat , geoLon){
  var URLRequest = 'http://api.openweathermap.org/data/2.5/weather?lat='+ geoLat + '&lon='+ geoLon + '&appid=' + API_KEY
  fetch(URLRequest)
  .then(response => response.json())
  .then(data => {

    console.log('fetched')
    current_City = data.name;
    weather_condition = data.weather[0].description;
    temp = Math.trunc(data.main.temp - 273.15) + "C";
    main = data.weather[0].main

    city.innerHTML = current_City ;
    condition.innerHTML = weather_condition;
    chooseWeather_Icon(main)
    temperature.innerHTML = temp;

  }
    )
  .catch(error => {
    console.log(error)
})
}


//Chooses which weather icon to display depending on the weather condition 
function chooseWeather_Icon(condition){
  var icons = new Skycons({"color": "white"});  // setting the colour of icons to white

  // Using date to determine daytime or night time icon
  var date = new Date()
  var time = date.getHours();


  switch(condition){
    case 'Clear':
      if(time < 18){
        icons.set("icon", Skycons.CLEAR_DAY);
        break;
      }else{
        icons.set("icon", Skycons.NIGHT);
        break;
      }
    case 'Clouds':
      if(time < 18){
        icons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
        break;
      }else{
        icons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
        break;
      }
    case 'Thunderstorm':
        icons.set("icon", Skycons.SLEET);
        break;
    case 'Drizzle':
        icons.set("icon", Skycons.RAIN);
        break;
    case 'Rain':
        icons.set("icon", Skycons.SLEET);
        break;
    case 'Snow':
        icons.set("icon", Skycons.SNOW);
        break;
    default:
        icons.set("icon", Skycons.FOG);
        break;
  }
  icons.play();

}



