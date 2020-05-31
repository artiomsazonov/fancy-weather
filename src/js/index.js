import countrys from './country.js';
const urlImg = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tjuTknKjnJDYCcxiACbpfs3na5IwzY0fpGc75GLqI1Y";
const nameCity = "Minsk"
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const temperatureToday = document.querySelector(".weather-data-cluster__temperature-today")
const Latitude = document.querySelector(".lat")
const Longitude = document.querySelector(".lon");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind-speed");
const feels = document.querySelector(".feels");
const descriptionWeather = document.querySelector(".description")
var farengate = document.querySelector(".farengate");
var celsiu = document.querySelector(".celsiu");
const preload = document.querySelector(".preload")

function getLinkToImage() {
    fetch(urlImg)
        .then(res => res.json())
        .then(data => {
            document.querySelector("body").style.backgroundImage = " linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0)), url(" + data.urls.regular + ")";
            document.querySelector("body").style.backgroundRepeat = "no-repeat";
        });
}
getLinkToImage()

window.onload = function() {
    window.setInterval(function() {
        var now = new Date();
        var clock = document.getElementById("clock");
        var daysRu = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        var daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var month_num = now.getMonth();
        var day = now.getDate();
        var monthRu = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря");
        var monthEn = new Array("January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December");
        var activ = document.querySelector(".inactive")
        if (activ.innerText == "En") {
            clock.innerHTML = daysEn[now.getDay()] + " " + day + " " + monthEn[month_num] + " " + now.toLocaleTimeString();
        } else {
            clock.innerHTML = daysRu[now.getDay()] + " " + day + " " + monthRu[month_num] + " " + now.toLocaleTimeString();
        }


    }, 1000);
};
// name on 3 day
function getDayWeek() {
    var date = new Date();
    var days = document.querySelectorAll(".forecast__day");
    var daysWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    var daysWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month_num = date.getMonth();
    var activ = document.querySelector(".inactive")
    for (let i = 0; i < days.length; i++) {
        if (activ.innerText == "En") {
            days[i].innerHTML = daysWeekEn[month_num + 4]
            month_num++
        } else {
            days[i].innerHTML = daysWeekRu[month_num + 4]
            month_num++
        }
    }
}
getDayWeek()
    // preload
var activPreloud = document.querySelector(".activ-prelod")
preload.onclick = function() {
        getDayWeek();
        getLatLon()
        getHumidity();
        activPreloud.setAttribute("src", "./img/Reload.svg");
        window.setTimeout(function() {
            activPreloud.setAttribute("src", "./img/Reload.png");
        }, 1000)
    }
    // language selection
var languages = document.querySelectorAll(".language")
languages[0].onclick = function() {
    languages[1].classList.remove("inactive")
    languages[0].classList.add("inactive")
    getDayWeek();
    getLatLon(city.textContent)
    getHumidity(city.textContent)
}
languages[1].onclick = function() {
    languages[0].classList.remove("inactive")
    languages[1].classList.add("inactive")
        // cityTranslation()
    getDayWeek();
    getLatLon(city.textContent)
    getHumidity(city.textContent)
}
var weatherIcon = document.querySelector(".weather-data-cluster__weather-icon")
    // search region


function getWeather(Ncity) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Ncity}&lang=ua&units=metric&appid=0c155cccd3a72d79d594e3d7b1381dae`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            temperatureToday.innerHTML = Math.round(data.list[0].main.temp) + "°"
            weatherIcon.setAttribute("alt", data.list[0].weather[0].main);
            weatherIcon.setAttribute("src", "./img/" + data.list[0].weather[0].main + ".png");
            for (let i = 0; i < countrys.length; i++) {
                if (countrys[i].alpha2 == data.city.country) {
                    city.innerHTML = data.city.name;
                    country.innerHTML = ", " + countrys[i].english;
                }
            }

        });

}

getWeather(nameCity)

function getLatLon(Ncity) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Ncity}&lang=ua&units=metric&appid=0c155cccd3a72d79d594e3d7b1381dae`)
        .then(res => res.json())
        .then(data => {
            getMap(data.city.coord.lon, data.city.coord.lat)
            var lon = Math.floor(data.city.coord.lon)
            var lat = Math.floor(data.city.coord.lat)
            var desLon = data.city.coord.lon - lon
            var desLat = data.city.coord.lat - lat
            var activ = document.querySelector(".inactive")
            if (activ.innerText == "En") {
                Longitude.innerHTML = "Longitude: " + lon + "°" + Math.floor(desLon * 60) + "'"
                Latitude.innerHTML = "Latitude: " + lat + "°" + Math.floor(desLat * 60) + "'"
            } else {
                Longitude.innerHTML = "Долгота: " + lon + "°" + Math.floor(desLon * 60) + "'"
                Latitude.innerHTML = "Широта: " + lat + "°" + Math.floor(desLat * 60) + "'"
            }
        });
}
getLatLon(nameCity)

function getHumidity(Ncity) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Ncity}&lang=ua&units=metric&appid=0c155cccd3a72d79d594e3d7b1381dae`)
        .then(res => res.json())
        .then(data => {
            var activ = document.querySelector(".inactive")
            if (activ.innerText == "En") {
                humidity.innerHTML = "HUMIDITY: " + data.list[0].main.humidity + "%";
                windSpeed.innerHTML = "WIND: " + data.list[0].wind.speed + " m/s"
                feels.innerHTML = "FEELS LIKE: " + data.list[0].main.feels_like + "°";
                descriptionWeather.innerHTML = data.list[0].weather[0].main;
            } else {
                humidity.innerHTML = "Влажность: " + data.list[0].main.humidity + "%";
                windSpeed.innerHTML = "Ветер: " + data.list[0].wind.speed + " м/с"
                feels.innerHTML = "ОЩУЩАЕТСЯ КАК: " + data.list[0].main.feels_like + "°";
                descriptionWeather.innerHTML = data.list[0].weather[0].description;
            }
        });
}

getHumidity(nameCity)

var tomorrow = document.querySelector(".tomorrow");
var dayAfterTomorrow = document.querySelector(".day-after-tomorrow");
var dayAfterAfterTomorrow = document.querySelector(".after-after-tomorrow");
var date = new Date;

function getTemperatureFuture(Ncity) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${Ncity}&lang=ua&units=metric&appid=0c155cccd3a72d79d594e3d7b1381dae`)
        .then(res => res.json())
        .then(data => {
            var x = Number(date.getHours())
            if (x >= 0 && x < 3) {
                tomorrow.innerHTML = Math.round(data.list[12].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[20].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[28].main.temp) + "°";
                tomorrow.classList.add(data.list[0].weather[0].id);
                tomorrow.nextSibling.setAttribute("alt", data.list[12].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[20].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[28].weather[0].icon);
            } else if (x >= 3 && x < 5) {
                tomorrow.innerHTML = Math.round(data.list[11].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[19].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[27].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[11].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[19].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[27].weather[0].icon);
            } else if (x >= 6 && x < 8) {
                tomorrow.innerHTML = Math.round(data.list[10].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[18].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[26].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[10].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[18].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[26].weather[0].icon);
            } else if (x >= 9 && x < 11) {
                tomorrow.innerHTML = Math.round(data.list[9].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[17].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[25].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[9].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[17].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[25].weather[0].icon);
            } else if (x >= 12 && x < 15) {
                tomorrow.innerHTML = Math.round(data.list[8].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[16].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[24].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[8].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[16].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[24].weather[0].icon);
            } else if (x >= 15 && x < 18) {
                tomorrow.innerHTML = Math.round(data.list[7].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[15].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[23].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[7].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[15].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[23].weather[0].icon);
            } else if (x >= 18 && x < 20) {
                tomorrow.innerHTML = Math.round(data.list[6].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[14].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[22].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[6].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[14].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[22].weather[0].icon);
            } else if (x >= 21 && x < 24) {
                tomorrow.innerHTML = Math.round(data.list[5].main.temp) + "°";
                dayAfterTomorrow.innerHTML = Math.round(data.list[13].main.temp) + "°";
                dayAfterAfterTomorrow.innerHTML = Math.round(data.list[21].main.temp) + "°";
                tomorrow.nextSibling.setAttribute("alt", data.list[5].weather[0].icon);
                dayAfterTomorrow.nextSibling.setAttribute("alt", data.list[13].weather[0].icon);
                dayAfterAfterTomorrow.nextSibling.setAttribute("alt", data.list[21].weather[0].icon);
            }
            getIcon()
            clearInputs()
        });
}
getTemperatureFuture(nameCity);

// search weather

let search = document.querySelector(".loading");
let searchIcon = document.querySelector(".voice-input");
let input = document.querySelector('input');
search.onclick = function() { getInputValue(); }
searchIcon.onclick = function() { getInputValue(); }
input.addEventListener("keydown", function(event) {
    if (event.which == 13 || event.keyCode == 13) {
        getInputValue()
        return false;
    }
    return true;
});

function getInputValue() {
    event.preventDefault()
    let searchValue = document.querySelector('input').value
    checkLanguage(searchValue);

};

function checkLanguage(word) {
    if (/^[а-яё]+$/i.test(word)) {
        let txt = document.querySelector('input')
        var request = new XMLHttpRequest();
        var text = encodeURIComponent(word);
        var key = "trnsl.1.1.20200506T144225Z.cdbaf785b66148d2.1647f625bc419ac1eafd91f742de43be8cfb34c6";
        var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&text=" + text + "&lang=ru-en&format=plain&options=1"
        request.open('GET', url, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                txt.value = data.text;
                getWeather(txt.value);
                getTemperatureFuture(txt.value);
                getHumidity(txt.value);
                getLatLon(txt.value);
                getWeather(txt.value);
                getMap(txt.value);
            }
        };
        request.send();
    } else {
        getWeather(word);
        getTemperatureFuture(word);
        getHumidity(word);
        getLatLon(word);
        getWeather(word);
        getMap(word);
    }

}

function clearInputs() {
    input.value = ""
}

function getIcon() {
    var forecastIcon = document.querySelectorAll(".forecast__icon")
    for (let i = 0; i < forecastIcon.length; i++) {
        if (forecastIcon[i].getAttribute('alt') == "10d") {
            forecastIcon[i].setAttribute("src", "./img/Rain.png");
        } else if (forecastIcon[i].getAttribute('alt') == "01d" || forecastIcon[i].getAttribute('alt') == "01n") {
            forecastIcon[i].setAttribute("src", "./img/Clear.png");
        } else if (forecastIcon[i].getAttribute('alt') == "04n" || forecastIcon[i].getAttribute('alt') == "04d") {
            forecastIcon[i].setAttribute("src", "./img/Clouds.png");
        } else if (forecastIcon[i].getAttribute('alt') == "02d" || forecastIcon[i].getAttribute('alt') == "02n" || forecastIcon[i].getAttribute('alt') == "03d" || forecastIcon[i].getAttribute('alt') == "03n") {
            forecastIcon[i].setAttribute("src", "./img/partly-cloudy-day.png");
        }
    }
}

// search map
function getMap(ln, lt) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ0eW9tc2F6IiwiYSI6ImNrYXY4Z3QycTFhc2kzMG1zcTQ0c2ZiancifQ.5_N_lS32ursdGVxqZVwgcA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ln, lt],
        zoom: 9.2
    });

    var marker = new mapboxgl.Marker()
        .setLngLat([ln, lt])
        .addTo(map);
}
// F->C

farengate.onclick = function() {
    celsiu.classList.remove("inactive")
    farengate.classList.add("inactive")
    temperatureConverterFarengate(tomorrow)
    temperatureConverterFarengate(dayAfterTomorrow);
    temperatureConverterFarengate(dayAfterAfterTomorrow);
    temperatureConverterFarengate(temperatureToday);
}
celsiu.onclick = function() {
    farengate.classList.remove("inactive")
    celsiu.classList.add("inactive")
    temperatureConverterCelsiu(tomorrow)
    temperatureConverterCelsiu(dayAfterTomorrow);
    temperatureConverterCelsiu(dayAfterAfterTomorrow);
    temperatureConverterCelsiu(temperatureToday);
}

function temperatureConverterFarengate(num) {
    var valNum = parseFloat(num.textContent);
    num.innerHTML = Math.round(((valNum * 1.8) + 32)) + "F";
}

function temperatureConverterCelsiu(num) {
    var valNum = parseFloat(num.textContent);
    num.innerHTML = Math.round((valNum - 32) / 1.8) + "°";
}
// city ​​translation
// function cityTranslation() {
//     console.log(city.textContent)
//     var txt = city.textContent;
//     var request = new XMLHttpRequest();
//     var text = encodeURIComponent(txt.value);
//     var key = "trnsl.1.1.20200506T144225Z.cdbaf785b66148d2.1647f625bc419ac1eafd91f742de43be8cfb34c6";
//     var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&text=" + text + "&lang=en-ru&format=plain&options=1"
//     request.open('GET', url, true);
//     request.onload = function() {
//         if (request.status >= 200 && request.status < 400) {
//             var data = JSON.parse(request.responseText);
//             city.innerHTML = data.text;
//         }
//     };
//     request.send();
// }
