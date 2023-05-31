function requestApi() {

    // main vars

    let cityName = document.querySelector("#inputbox").value;

    // api key

    let APIKey = "60815d1795f8f58191b37d7318357fa3"
    var requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + APIKey;

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
    })
}