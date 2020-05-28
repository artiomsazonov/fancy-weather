import countrys from './country.js';
const urlImg = "https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=tjuTknKjnJDYCcxiACbpfs3na5IwzY0fpGc75GLqI1Y";
const urlWeather = "https://api.openweathermap.org/data/2.5/forecast?q=Minsk&lang=ua&units=metric&appid=0c155cccd3a72d79d594e3d7b1381dae"
const city = document.querySelector(".weather-data-cluster__location")
const temperatureToday = document.querySelector(".weather-data-cluster__temperature-today")
const Latitude = document.querySelector(".lat")
const Longitude = document.querySelector(".lon");

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
    var data = new Date();
    var days = document.querySelectorAll(".forecast__day");
    var daysWeekRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    var daysWeekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month_num = data.getMonth();
    var activ = document.querySelector(".inactive")
    for (let i = 0; i < days.length; i++) {
        if (activ.innerText == "En") {
            days[i].innerHTML = daysWeekEn[month_num + 1]
            month_num++
        } else {
            days[i].innerHTML = daysWeekRu[month_num + 1]
            month_num++
        }
    }

}
// language selection
var languages = document.querySelectorAll(".language")
languages[0].onclick = function() {
    languages[1].classList.remove("inactive")
    languages[0].classList.add("inactive")
    getDayWeek();
    getLatLon()
}
languages[1].onclick = function() {
    languages[0].classList.remove("inactive")
    languages[1].classList.add("inactive")
    getDayWeek();
    getLatLon()
}

// search region
function getWeather() {
    fetch(urlWeather)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            temperatureToday.innerHTML = Math.round(data.list[0].main.temp)

            for (let i = 0; i < countrys.length; i++) {
                if (countrys[i].alpha2 == data.city.country) {
                    city.innerHTML = data.city.name + ", " + countrys[i].english
                }
            }
        });
}
getWeather()

function getLatLon() {
    fetch(urlWeather)
        .then(res => res.json())
        .then(data => {
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
getLatLon()
