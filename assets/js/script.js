function requestApi() {

    // main vars

    let cityName = document.querySelector("#inputbox").value;

    // api key

    let APIKey = "60ebe634619c5700bf67dc2646a55408";
    let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + APIKey;

    // requestUrl function to get api

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        if (data.length === 0) {
            return alert('Please check your search input');
        }

        console.log(data);

        latitude = data[0].lat;
        longitude = data[0].lon;

        getWeatherLatLon(latitude, longitude);
    })
    lastSearch();
}

// search func | using 'e' instead of event (both mean same thing)
function runSearch(e) {
    // get input value and check for match in localstorage then get item
    document.querySelector("#inputbox").value = localStorage.getItem(e.target.innerText)
    requestApi();
}

function lastSearch() {

    // main vars

    let cityName = document.querySelector('#inputbox').value;
    let lastSearchBtn = document.createElement('button');

    localStorage.setItem(document.querySelector('#inputbox').value, document.querySelector('#inputbox').value);

    lastSearchBtn.id = 'lastSearchBtnOverride' + cityName;
    lastSearchBtn.innerText = cityName;

    lastSearchBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-override', 'lastSearchBtnOverride');
    document.querySelector('#lastsearch').appendChild(lastSearchBtn);

    let lastSearchButtons = document.getElementsByClassName('lastSearchBtnOverride');
    for (var i = 0; i < lastSearchButtons.length; i++) {
        lastSearchButtons[i].addEventListener('click', runSearch);
    }
}

function getWeatherLatLon(latitude, longitude) {
    let APIKey = "60ebe634619c5700bf67dc2646a55408";
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey;
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        document.getElementById('day0').innerHTML = '';
        document.getElementById('day1').innerHTML = '';
        document.getElementById('day2').innerHTML = '';
        document.getElementById('day3').innerHTML = '';
        document.getElementById('day4').innerHTML = '';
        document.getElementById('day5').innerHTML = '';

        let forcecastDays = 5;
        let objLocationCount = 0;

        for(var i = 0; i < (forcecastDays + 1); i++) {
            if (+objLocationCount === 40) {
                objLocationCount = 39;
            }

        // Get data 
        
        // Get Name
        let currentCityApi = data.city.name;
        let currentCityElement = document.createElement("p");
        currentCityElement.innerText = 'City: ' + currentCityApi;
        document.querySelector('#day' + i).appendChild(currentCityElement);

        // Get Date
        let currentDateFromAPI = data.list[objLocationCount].dt_txt;
        let currentDateElement = document.createElement('p');
        currentDateElement.innerText = 'Date: ' + currentDateFromAPI.slice(0, 11);
        document.querySelector('#day' + i).appendChild(currentDateElement);

        // Get weather descr
        var iconNum = data.list[objLocationCount].weather[0].icon
        var iconUrl = 'https://openweathermap.org/img/wn/' + iconNum + "@2x.png";
        var currentWeatherIcon = document.createElement("img");
        currentWeatherIcon.src = iconUrl;
        document.querySelector('#day' + i).appendChild(currentWeatherIcon);

        // weather condition
        var currentConditionFromAPI = data.list[objLocationCount].weather[0].description;
        var currentConditionElement = document.createElement("p");
        currentConditionElement.innerText = currentConditionFromAPI.toUpperCase();
        document.querySelector('#day' + i).appendChild(currentConditionElement);

        var APIKelvinTemp = data.list[objLocationCount].main.temp;

        var FahrenTemp = (APIKelvinTemp - 273.15) * 9/5 + 32;

        var cleanTempinFahren = Math.round(FahrenTemp);

        var TempinCel = APIKelvinTemp - 273.15;
        var cleanTempinCel = Math.round(TempinCel);

        var temperatureElement = document.createElement("p");
        temperatureElement.innerText = "Temp: " + cleanTempinFahren + "°F / " + cleanTempinCel + "°C";
        document.getElementById("day" + i).appendChild(temperatureElement);

        // Get humidity lvls
        var humidityFromApi = data.list[objLocationCount].main.humidity;
        var humidityElement = document.createElement("p");

        // convert to %
        humidityElement.innerText = "Humidity: " + humidityFromApi + "%";
        document.getElementById("day" + i).appendChild(humidityElement);

        // Get Wind Speed
        var windSpeedAPI = data.list[objLocationCount].wind.speed;
        var windSpeedElement = document.createElement("p");
        windSpeedElement.innerText = "Wind Speed: " + windSpeedAPI + " meters per second";
        document.getElementById("day" + i).appendChild(windSpeedElement);

        objLocationCount = objLocationCount + 7;
        }
    }
)
}

document.getElementById("submitBtn").addEventListener('click', checkInput);

function checkInput() {
    let inputCheck = document.querySelector("#inputbox").value;
        
    if (inputCheck === "") {
        alert("Box cannot be blank");
    } else {
      requestApi();
    } 
}