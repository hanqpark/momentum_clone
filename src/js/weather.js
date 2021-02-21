const COORDS = 'coords',
    weather = document.querySelector(".weather");


function getWeather(lat, lon){
    fetch(
        `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`
    ).then(function(r){
        return r.json();
    }).then(function(json){
        console.log(json);
        const temp = Math.round(json.main.temp);
        const place = json.name;
        const state = json.weather[0].description;
        weather.innerText = `${place}, ${temp}℃, ${state}`
    })
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude.toFixed(2);
    const longitude = position.coords.longitude.toFixed(2);
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}


function handleGeoError(){
    weather.innerHTML = "Can't access geo location info";
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init();