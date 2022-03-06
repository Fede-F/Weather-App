

let units = 'metric';

weatherbyLocation('Buenos Aires',units);
getBrowserLocation();

btn_search.addEventListener('click', searchLocation);

(function displayController() {
    const inpt_location = document.getElementById("inpt_location");
    const btn_search = document.getElementById("btn_search");
    const txt_errorMessage = document.getElementById("txt_errorMessage");
    const txt_temperature = document.getElementById("txt_temperature");
    


    return {
        inpt_location,
        btn_search,
        txt_errorMessage,
        txt_temperature,
        units,
    }
})();

function searchLocation() {
    if (inputValidation()) {
        const location = inpt_location.value;
        weatherbyLocation(location,units);
        inpt_location.value = '';
        txt_errorMessage.textContent = '';
    }

};

//Se envia la solicitud de Ubicacion al navegador del usuario
function getBrowserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLatLon, showError);
    } else {
        console.log('The Browser Does not Support Geolocation');
    }
}

function getLatLon(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    weatherbyLatLon(latitude, longitude,units);
}

function showError() {
    if (error.PERMISSION_DENIED) {
        console.log("The User have denied the request for Geolocation.");
    }
}

function inputValidation() {
    if (inpt_location.value === '') {

        showErrorMessage('Este campo no puede quedar vacío');
        return false;
    } else if (!inpt_location.value.match(/^[A-Za-z]+$/)) {
        showErrorMessage('No puedes ingresar números');
        return false;
    } else return true;

};

function showErrorMessage(text) {
    txt_errorMessage.textContent = text;

}

function weatherbyLocation(location,units) {
    const link = 'http://api.openweathermap.org/data/2.5/weather?q=' + location+'&units='+units+ '&APPID=6c2db17ab4d39ced92ad400d8952c7b9';
    getWeatherInfo(link);
}

function weatherbyLatLon(latitude, longitude,units) {
    const link = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude+'&units='+units + '&APPID=6c2db17ab4d39ced92ad400d8952c7b9';
    getWeatherInfo(link);
}

async function getWeatherInfo(link) {
    try {
        const response = await fetch(link, { mode: 'cors' });
        const weatherData = await response.json();
        //await para el resto de las variables no hace falta ya que ya esta guardado en weatherData
        let temperatura =  weatherData.main.temp;
        let feels_like =  weatherData.main.feels_like;
        let temp_min =  weatherData.main.temp_min;
        let temp_max =  weatherData.main.temp_max;
        let humidity =  weatherData.main.humidity;
        let wind =  weatherData.wind.speed;
        let city_name =  weatherData.name;
        showInfo(temperatura,feels_like,temp_min,temp_max,humidity,wind,city_name);
    } catch (err) {
        console.log(err);
    }
};

function showInfo(temperatura,feels_like,temp_min,temp_max,humidity,wind,city_name){
    


};