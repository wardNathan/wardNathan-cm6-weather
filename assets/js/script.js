var button = document.querySelector('#search');
var inputBox = document.querySelector('#inputBox');
var city = document.querySelector('#city');
var day = document.querySelector('#currentDay');
var desc = document.querySelector('image1');
var temp = document.querySelector('#currentTemp');
var wind = document.querySelector('#currentWind');
var humidity = document.querySelector('#currentHumidity');
var cityName = [];

var date = $('#date')

function displayDate() {
    var rightNow = dayjs().format('M/D/YYYY');
    date.text(rightNow);
}

displayDate()

function getCurrentApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+inputBox.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);

        var tempValue = data['main']['temp'];
        var descImg = "<img src =http://openweathermap.org/img/wn/" + data['weather'][0]['icon'] + ".png>";
        var humidityValue = data['main']['humidity'];
        var windValue = data['wind']['speed'];

        currentTemp.innerHTML = "Temperature: " + tempValue;
        currentDesc.innerHTML = descImg;
        currentHumidity.innerHTML = "Humidity: " + humidityValue + "%";
        currentWind.innerHTML = "Wind: " + windValue + " MPH";
    });
}
button.addEventListener('click', getCurrentApi);

function getApi() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+inputBox.value+'&appid=06b380e6671f5b35874bb3a59ed6a6df&units=imperial';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for(i = 3; i < 36; i+=8){
            document.getElementById("temp" +(i+1)).innerHTML ="Temperature: " +data['list'][i]['main']['temp'];  
        }
        for(i = 3; i < 36; i+=8){
            document.getElementById("day" +(i+1)).innerHTML ="Date: " +dayjs(data['list'][i]['dt_txt']).format('M/D/YYYY');
        }
        for(i = 3; i < 36; i+=8){
            document.getElementById("img" +(i+1)).src ="http://openweathermap.org/img/wn/" + data['list'][i]['weather'][0]['icon']+".png";
        }
        for(i = 3; i < 36; i+=8){
            document.getElementById("wind" +(i+1)).innerHTML +"Wind: " +data['list'][i]['wind']['speed'] + " MPH";
            console.log
        }
        for(i = 3; i < 36; i+=8){
            document.getElementById("humidity" +(i+1)).innerHTML +"Humidity: " +data['list'][i]['main']['humidity']+ " %";
        }

    var nameValue = data['city']['name'];
    city.innerHTML = nameValue;
    localStorage.setItem('cityName', cityName);
    console.log(cityName);
    searchBarFunction()
    });
}

button.addEventListener('click', getApi);

function searchBarFunction(data) {
    cityName.push($('#inputBox').val());
    $('#inputBox').val("");
    $('#searchHistory').text("");

    $.each(cityName, function(index, value) {
        $('#searchHistory').append("<li class='historyItem' onclick='addtotextbox(" + index + ")'>" + value + '</li>');
    });
}

function addtotextbox(id) {
    $('#searchBar').val(cityName[id]);
}