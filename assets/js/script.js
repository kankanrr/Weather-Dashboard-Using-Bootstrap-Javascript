function requestApi() {

    // main vars

    let cityName = document.querySelector("#inputbox").value;

    // api key

    let APIKey = "60815d1795f8f58191b37d7318357fa3";
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

        latitude = data[0].lat;
        longitude = data[0].lon;

        getWeatherDataByLatandLong(latitude, longitude);
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

    localStorage.setItem(document.querySelector('#inputbox').value);

    lastSearchBtn.id = 'lastSearchBtnOverride' + cityName;
    lastSearchBtn.innerText = cityName;

    lastSearchBtn.classList.add('btn', 'btn-secondary', 'btn-lg', 'btn-override', 'lastSearchBtnOverride');
    document.querySelector('#lastsearch').appendChild(lastSearchBtn);

    let lastSearchButtons = document.getElementsByClassName('lastSearchBtnOverride');
    for (var i = 0; i < lastSearchButtons.length; i++) {
        lastSearchButtons[i].addEventListener('click', runSearch);
    }
}

function getWeatherLatLon() {
    let APIKey = "60815d1795f8f58191b37d7318357fa3";
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + APIKey;

    fetch(requestUrl)
    .then(function (response) {
        return response.json;
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
        }

        // Get data
        
        // Get Name
        let currentCityApi = data.city.name;
        let currentCityElements = document.createElement('p');
        currentCityElements.innerText = 'City: ' + currentCityApi;
        document.getElementById('day ' + i).appendChild(currentCityElements);

        // Get Date
        let currentDateFromAPI = data.list[objLocationCount].dt_txt;
        let currentDateElement = document.createElement('p');
        currentDateElement.innerText = 'Date: ' + currentDateFromAPI.slice(0, 11);
        document.getElementById('day ' + i).appendChild(currentDateElement);

        // Get weather descr
        var iconNum = data.list[objectLocationCounter].weather[0].icon
        var iconUrl = 'https://openweathermap.org/img/wn/' + iconNum + "@2x.png";
        var currentWeatherIcon = document.createElement("img");
        currentWeatherIcon.src = iconUrl;
        document.getElementById("day" + i).appendChild(currentWeatherIcon);

        // weather condition
        var currentConditionFromAPI = data.list[objectLocationCounter].weather[0].description;
        var currentConditionElement = document.createElement("p");
        currentConditionElement.innerText = currentConditionFromAPI.toUpperCase();
        document.getElementById("day" + i).appendChild(currentConditionElement);

        var APIKelvinTemp = data.list[objectLocationCounter].main.temp;

        var FahrenTemp = (APIKelvinTemp - 273.15) * 9/5 + 32;

        var cleanTempinFahren = Math.round(FahrenTemp);

        var TempinCel = TempInKelvinFromAPI - 273.15;
        var cleanTempinCel = Math.round(TempinCel);

        var temperatureElement = document.createElement("p");
        temperatureElement.innerText = "Temp: " + cleanTempinFahren + "°F / " + cleanTempinCel + "°C";
        document.getElementById("day" + i).appendChild(temperatureElement);

        // Get humidity lvls
        var humidityFromApi = data.list[objectLocationCounter].main.humidity;
        var humidityElement = document.createElement("p");

        // convert to %
        humidityElement.innerText = "Humidity: " + humidityFromApi + "%";
        document.getElementById("day" + i).appendChild(humidityElement);

        // Get Wind Speed
        var windSpeedAPI = data.list[objLocationCount].wind.speed;
        var windSpeedElement = document.createElement("p");
        windSpeedElement.innerText = "Wind Speed: " + windSpeedAPI + " meters per second";
        document.getElementById("day" + i).appendChild(windSpeedElement);

        objectLocationCounter = objectLocationCounter + 7; 
    })
}