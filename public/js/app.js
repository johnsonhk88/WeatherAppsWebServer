const weatherForm = document.querySelector('form.search-city')
const search = document.querySelector('input.search-location')
const loginForm = document.querySelector('form.loginForm')
const loginUsername = document.querySelector('input.username')
const loginPassword = document.querySelector('input.password')
const background = document.querySelector('.title-navbar')
const loginSection = document.querySelector('#loginSection')
const loginedSection = document.querySelector('#loginedSection')
const logoutButton = document.querySelector('#logoutButton')
const themeRadios = document.querySelectorAll('input[type=radio][name="theme"]')
const themeRadio1 = document.querySelector('input.theme1')
const themeRadio2 = document.querySelector('input.theme2')
const themeRadio3 = document.querySelector('input.theme3')
const themeRadio4 = document.querySelector('input.theme4')
const welcome = document.querySelector('#welcome')
const themeForm = document.querySelector('form.themeForm')
const checkedRadio = document.querySelectorAll('input[type=radio][name="theme"]:checked')
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

loginForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const username = loginUsername.value;
    const password = loginPassword.value;

    fetch('/login?username=' + username+'&password='+password).then((response) => {
        response.json().then((data) => {
            if (!data.accessToken) {
                console.log(data.error);
            } else {
                window.sessionStorage.setItem('weatherAppAccessToken',data.accessToken);
                setBackground(data.background);
                loginSection.style.display ="none";
                loginedSection.style.display ="block";
                welcome.innerHTML="Welcome "+data.username+",";
            }
        })
    })
})

logoutButton.addEventListener('click', (event) => {
    event.preventDefault()

    window.sessionStorage.removeItem('weatherAppAccessToken');
    loginedSection.style.display ="none";
    loginSection.style.display ="block";
    location.reload();
})

function changeHandler(event) {
    event.preventDefault()
    setBackground(this.value);
}

Array.prototype.forEach.call(themeRadios, function(radio) {
    radio.addEventListener('change', changeHandler);
 });

themeForm.addEventListener('submit', (event) => {
    event.preventDefault()

    var themeChoice;
    Array.prototype.forEach.call(themeRadios, function(radio) {
        if(radio.checked) { 
            themeChoice=radio.value;
        }
    });

    var userAccTok = window.sessionStorage.getItem('weatherAppAccessToken');
    fetch('/changeTheme?background=' + themeChoice+'&accessToken='+userAccTok).then((response) => {
        response.json().then((data) => {
            if (!data.background) {
                console.log(data.error);
            } else {
                //Or do nothing is ok
                setBackground(data.background);
                loginSection.style.display ="none";
                loginedSection.style.display ="block";
                welcome.innerHTML="Welcome "+data.username+",";
            }
        })
    })
})

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

function setBackground(bg){
    if(bg=="1"){
        background.style.backgroundColor ="#364f6b";
    }else if(bg=="2"){
        background.style.backgroundColor ="#009933";
    }else if(bg=="3"){
        background.style.backgroundColor ="#8B008B";
    }else if(bg=="4"){
        background.style.backgroundColor ="#000080";
    } 
    checkRadio(bg);
}

function checkRadio(themeInput){
    if(themeInput=="1"){
        themeRadio1.checked=true;
    }else if(themeInput=="2"){
        themeRadio2.checked=true;
    }else if(themeInput=="3"){
        themeRadio3.checked=true;
    }else if(themeInput=="4"){
        themeRadio4.checked=true;
    } 
}


function checkSession() {
    if (window.sessionStorage.getItem('weatherAppAccessToken')) {
        var userAT = window.sessionStorage.getItem('weatherAppAccessToken');
        fetch('/checkSession?accessToken=' + userAT).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    console.log("CheckSession: WeatherAppAccessToken exist");
                    loginSection.style.display ="none";
                    loginedSection.style.display ="block";
                    setBackground(data.background);
                    welcome.innerHTML="Welcome "+data.username+",";
                }
            })
        })
    } else {
        console.log("CheckSession: No weatherAppAccessToken");
        loginedSection.style.display ="none";
        loginSection.style.display ="block";
    }
}



getLocation();
checkSession();