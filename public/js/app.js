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
const forecastTodayDate = document.querySelector(".forecast-today-header")
const forecast2ndDate = document.querySelector(".forecast-2nd-header")
const forecast3rdDate = document.querySelector(".forecast-3rd-header")
const forecast4thDate = document.querySelector(".forecast-4th-header")
const forecast5thDate = document.querySelector(".forecast-5th-header")
const forecastTodaySummary = document.querySelector(".forecast-today-summary")
const forecast2ndSummary = document.querySelector(".forecast-2nd-summary")
const forecast3rdSummary = document.querySelector(".forecast-3rd-summary")
const forecast4thSummary = document.querySelector(".forecast-4th-summary")
const forecast5thSummary = document.querySelector(".forecast-5th-summary")
const forecastTodayCondIcon = document.querySelector(".forecast-today-cond-icon")
const forecast2ndCondIcon = document.querySelector(".forecast-2nd-cond-icon")
const forecast3rdCondIcon = document.querySelector(".forecast-3rd-cond-icon")
const forecast4thCondIcon = document.querySelector(".forecast-4th-cond-icon")
const forecast5thCondIcon = document.querySelector(".forecast-5th-cond-icon")
const forecastTodayLowHighTemp = document.querySelector(".forecast-today-low-high-temp")
const forecast2ndLowHighTemp = document.querySelector(".forecast-2nd-low-high-temp")
const forecast3rdLowHighTemp = document.querySelector(".forecast-3rd-low-high-temp")
const forecast4thLowHighTemp = document.querySelector(".forecast-4th-low-high-temp")
const forecast5thLowHighTemp = document.querySelector(".forecast-5th-low-high-temp")
const forecastTodayHumdity = document.querySelector(".forecast-today-humdity")
const forecast2ndHumdity = document.querySelector(".forecast-2nd-humdity")
const forecast3rdHumdity = document.querySelector(".forecast-3rd-humdity")
const forecast4thHumdity = document.querySelector(".forecast-4th-humdity")
const forecast5thHumdity = document.querySelector(".forecast-5th-humdity")


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

                // forecast daily weather
                forecastTodayDate.innerHTML = timeStampConvertToDDMM(data.daily.data[0].time);
                forecast2ndDate.innerHTML = timeStampConvertToDDMM(data.daily.data[1].time);
                forecast3rdDate.innerHTML = timeStampConvertToDDMM(data.daily.data[2].time);
                forecast4thDate.innerHTML = timeStampConvertToDDMM(data.daily.data[3].time);
                forecast5thDate.innerHTML = timeStampConvertToDDMM(data.daily.data[4].time);

                forecastTodaySummary.innerHTML = data.daily.data[0].summary;
                forecast2ndSummary.innerHTML = data.daily.data[1].summary;
                forecast3rdSummary.innerHTML = data.daily.data[2].summary;
                forecast4thSummary.innerHTML = data.daily.data[3].summary;
                forecast5thSummary.innerHTML = data.daily.data[4].summary;

                forecastTodayCondIcon.src = "/img/" + data.daily.data[0].icon + ".png";
                forecast2ndCondIcon.src = "/img/" + data.daily.data[1].icon + ".png";
                forecast3rdCondIcon.src = "/img/" + data.daily.data[2].icon + ".png";
                forecast4thCondIcon.src = "/img/" + data.daily.data[3].icon + ".png";
                forecast5thCondIcon.src = "/img/" + data.daily.data[4].icon + ".png";


                forecastTodayLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[0].temperatureLow) + " | " + Math.round(data.daily.data[0].temperatureHigh) + "&#176C";
                forecast2ndLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[1].temperatureLow) + " | " + Math.round(data.daily.data[1].temperatureHigh) + "&#176C";
                forecast3rdLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[2].temperatureLow) + " | " + Math.round(data.daily.data[2].temperatureHigh) + "&#176C";
                forecast4thLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[3].temperatureLow) + " | " + Math.round(data.daily.data[3].temperatureHigh) + "&#176C";
                forecast5thLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[4].temperatureLow) + " | " + Math.round(data.daily.data[4].temperatureHigh) + "&#176C";

                forecastTodayHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[0].humidity * 100) + "%";
                forecast2ndHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[1].humidity * 100) + "%";
                forecast3rdHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[2].humidity * 100) + "%";
                forecast4thHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[3].humidity * 100) + "%";
                forecast5thHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[4].humidity * 100) + "%";

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
                // console.log("Convert Stamp time to date: " + timeStampToDate(data.currently.time));
                msgLocName.innerHTML = "Current Weather   &nbsp &nbsp &nbsp" + data.location + "&nbsp &nbsp &nbsp &nbsp Time: " + timeStampToDate(data.currently.time);
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

                // forecast daily weather
                forecastTodayDate.innerHTML = timeStampConvertToDDMM(data.daily.data[0].time);
                forecast2ndDate.innerHTML = timeStampConvertToDDMM(data.daily.data[1].time);
                forecast3rdDate.innerHTML = timeStampConvertToDDMM(data.daily.data[2].time);
                forecast4thDate.innerHTML = timeStampConvertToDDMM(data.daily.data[3].time);
                forecast5thDate.innerHTML = timeStampConvertToDDMM(data.daily.data[4].time);

                forecastTodaySummary.innerHTML = data.daily.data[0].summary;
                forecast2ndSummary.innerHTML = data.daily.data[1].summary;
                forecast3rdSummary.innerHTML = data.daily.data[2].summary;
                forecast4thSummary.innerHTML = data.daily.data[3].summary;
                forecast5thSummary.innerHTML = data.daily.data[4].summary;

                forecastTodayCondIcon.src = "/img/" + data.daily.data[0].icon + ".png";
                forecast2ndCondIcon.src = "/img/" + data.daily.data[1].icon + ".png";
                forecast3rdCondIcon.src = "/img/" + data.daily.data[2].icon + ".png";
                forecast4thCondIcon.src = "/img/" + data.daily.data[3].icon + ".png";
                forecast5thCondIcon.src = "/img/" + data.daily.data[4].icon + ".png";

                forecastTodayLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[0].temperatureLow) + " | " + Math.round(data.daily.data[0].temperatureHigh) + "&#176C";
                forecast2ndLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[1].temperatureLow) + " | " + Math.round(data.daily.data[1].temperatureHigh) + "&#176C";
                forecast3rdLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[2].temperatureLow) + " | " + Math.round(data.daily.data[2].temperatureHigh) + "&#176C";
                forecast4thLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[3].temperatureLow) + " | " + Math.round(data.daily.data[3].temperatureHigh) + "&#176C";
                forecast5thLowHighTemp.innerHTML = "&nbsp" + Math.round(data.daily.data[4].temperatureLow) + " | " + Math.round(data.daily.data[4].temperatureHigh) + "&#176C";

                forecastTodayHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[0].humidity * 100) + "%";
                forecast2ndHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[1].humidity * 100) + "%";
                forecast3rdHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[2].humidity * 100) + "%";
                forecast4thHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[3].humidity * 100) + "%";
                forecast5thHumdity.innerHTML = "&nbsp &nbsp &nbsp &nbsp" + Math.round(data.daily.data[4].humidity * 100) + "%";
            }


        })



    })

    function timeStampToDate(t) {

        var milliseconds = t * 1000;
        var dateObject = new Date(milliseconds);

        return dateObject.toLocaleString();
    }

    function timeStampConvertToDDMM(t) {
        var milliseconds = t * 1000;
        var dateObject = new Date(milliseconds);
        var dd = dateObject.toLocaleString("en-US", { day: "numeric" });
        var mm = dateObject.toLocaleString("en-US", { month: "long" });

        return dd + " " + mm.slice(0, 3);
    }

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