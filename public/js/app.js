const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgCurrentTemp = document.querySelector('.current-temp')
const msgLocName = document.querySelector(".location")
const msgCurrentSummary = document.querySelector(".current-summary")
const iconCurrentCond = document.querySelector(".current-cond-icon")
const msgCurrentUVIndex = document.querySelector(".current-uv-index-val")
const msgCurrentHumdity = document.querySelector(".current-humdity-val")
const msgCurrentDew = document.querySelector(".current-dew-val")
const msgCurrentWindGust = document.querySelector(".current-windgust-val")
const msgCurrentWindSpeed = document.querySelector(".current-windspeed-val")
const msgCurrentWindBearing = document.querySelector(".current-windbearing-val")
const msgCurrentCloudCover = document.querySelector(".current-cloudcover-val")
const msgCurrentVisibility = document.querySelector(".current-visibility-val")
const msgCurrentPressure = document.querySelector(".current-pressure-val")

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
        // form input value
    const location = search.value

    fetch('/weather?address=' + location).then((response) => {


        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                msgLocName.innerHTML = "Current Weather: &nbsp &nbsp &nbsp" + data.location;
                msgCurrentTemp.innerHTML = Math.round(data.currently.temperature * 10) / 10 + "&#176";
                msgCurrentSummary.innerHTML = data.currently.summary;
                iconCurrentCond.src = "/img/" + data.currently.icon + ".png";
                msgCurrentUVIndex.innerHTML = data.currently.uvIndex;
                msgCurrentHumdity.innerHTML = Math.round(data.currently.humidity * 100) + "%";
                msgCurrentWindGust.innerHTML = data.currently.windGust + " m/s";
                msgCurrentWindSpeed.innerHTML = data.currently.windSpeed + " m/s";
                msgCurrentWindBearing.innerHTML = data.currently.windBearing + "&#176 " + degToCompass(data.currently.windBearing);
                msgCurrentCloudCover.innerHTML = Math.round(data.currently.cloudCover * 100) + "%";
                msgCurrentVisibility.innerHTML = Math.round(data.currently.visibility * 10) / 10 + " km";
                msgCurrentPressure.innerHTML = Math.round(data.currently.pressure) + " hPa";

            }

        })
    })
})

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPostion);

    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}


function showPostion(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log("Latitue: " + latitude + " longitude: " + longitude);
    // Display local weather 

    fetch('/weatherGeolocateAll?latitude=' + latitude + '&longitude=' + longitude).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                msgLocName.innerHTML = "Current Weather   &nbsp &nbsp &nbsp" + data.location + "&nbsp &nbsp &nbsp &nbsp Time: " + getTimeNow();
                msgCurrentTemp.innerHTML = Math.round(data.currently.temperature * 10) / 10 + "&#176";
                msgCurrentSummary.innerHTML = data.currently.summary;
                iconCurrentCond.src = "/img/" + data.currently.icon + ".png";
                msgCurrentUVIndex.innerHTML = data.currently.uvIndex;
                msgCurrentHumdity.innerHTML = Math.round(data.currently.humidity * 100) + "%";
                msgCurrentWindGust.innerHTML = data.currently.windGust + " m/s";
                msgCurrentWindSpeed.innerHTML = data.currently.windSpeed + " m/s";
                msgCurrentWindBearing.innerHTML = data.currently.windBearing + "&#176  " + degToCompass(data.currently.windBearing);
                msgCurrentCloudCover.innerHTML = Math.round(data.currently.cloudCover * 100) + "%";
                msgCurrentVisibility.innerHTML = Math.round(data.currently.visibility * 10) / 10 + " km";
                msgCurrentPressure.innerHTML = Math.round(data.currently.pressure) + " hPa";
            }


        })



    })

    function timeCovert(t) {
        var datetime = new Date();
        datetime.setTime(t);
        var year = datetime.getFullYear();
        var month = datetime.getMonth();
        var date = datetime.getDate();
        var hr = datetime.getHours();
        var mm = datetime.getMinutes();
        var ss = datetime.getSeconds();
        return year + "-" + month + "-" + date + " " + hour + ":" + mm + ":" + ss;

    }

    function getTimeNow() {
        var today = new Date();
        var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date + " " + time;
    }


    function degToCompass(num) {
        var directIndex = Math.floor((num / 22.5) + 0.5);
        var directArr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return directArr[(directIndex % 16)];

    }






}











getLocation();