// fetch weather data from api using "endpoint.js"

// The free api provides: 
// - 60 calls/minute 1,000,000 calls/month
// - Current weather and 3-hour Forecast 5-days
// - Basic Weather Maps
// - Weather Dashboard
// - Air Pollution API
// - Geocoding API
// - Weather widgets
// - 95% uptime

// As the above api provide limited functionalities we have to come up with a plan to minimize these calls: 
// - Track IP address of user to limit daily calls, eg: 3 calls/day per IP
// - Prompt user to purchase subscription to unlock more calls
// - If possible check whether the user is using any vpn.

const BaseURL = "https://api.weatherapi.com/v1/";
const key = "e1f20b7ba5f840509ea94914240105";
const lang = "en";
const currentApi ="current.json";
let city = "Rawalpindi";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const windDirections = {
    'N':0, 'NNE': 22.5, 'NE':45, 'ENE': 67.5, 'E':90, 'ESE': 112.5,
    'SE': 135, 'SSE': 157.5, 'S': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5
}

const getWeatherBtn = document.getElementById("currentweather");
const weatherdetail = document.querySelector("#weatherdetail");
const searchInputBox = document.getElementById("search");

const countryTxt = document.querySelector(".country h1");
const cityTxt = document.querySelector(".city h3");
const dateTxt = document.querySelector(".date p");

const tempTxt = document.querySelector(".temperature h1");
const feelLikeTxt = document.querySelector(".temperature p b");
const conditionIcon = document.querySelector(".condition_icon img");
const conditionTxt = document.querySelector(".condition_details h3");
const timeTxt = document.querySelector(".condition_details p");

const rainValueTxt = document.querySelector(".rain_cube_value p");
const windValueTxt = document.querySelector(".wind_cube_value p");
const windDirImage = document.getElementById("wind_direction_image");
const humidValueTxt = document.querySelector(".humidity_cube_value p");
const pressureValueTxt = document.querySelector(".pressure_cube_value p");


const GetCurrentWeather = async () => {
    
    if(searchInputBox.value != "")
        city = searchInputBox.value;

    const endpoint = BaseURL+`${currentApi}?q=${city}&lang=${lang}&key=${key}`;

    let response = await fetch(endpoint);

    if(response != null) {
        let data = await response.json();

        countryTxt.innerText = data.location.country;
        cityTxt.innerText = city;

        feelLikeTxt.innerText = Math.round(data.current.feelslike_c);
        tempTxt.innerText = Math.round(data.current.temp_c);

        conditionTxt.innerText = data.current.condition.text;

        let last_updated = data.current.last_updated;
        let dateTime = last_updated.split(" ");
        let date = dateTime[0].split('-');        
        var now = new Date(`${date[0]}-${date[1]}-${date[2]}`);        
        dateTxt.innerHTML = months[now.getMonth()]+" "+now.getDate()+", "+days[now.getDay()]
        timeTxt.innerHTML = dateTime[1]+"h";

        rainValueTxt.innerHTML = Math.round(data.current.precip_in)+" %";
        windValueTxt.innerText = Math.round(data.current.wind_kph)+" kph";
        humidValueTxt.innerHTML = Math.round(data.current.humidity)+" %";
        pressureValueTxt.innerText = Math.round(data.current.pressure_mb)+" mb";

        conditionIcon.src = data.current.condition.icon;

        for(const [key, val] of Object.entries(windDirections)){
            if(key === data.current.wind_dir) {
                windDirImage.style.transform = 'rotate(' + val + 'deg)';
            }
        }
        
    }
};

// Fetch data from API on Page Load
window.addEventListener("load", () => {
    GetCurrentWeather();
})

getWeatherBtn.addEventListener("click", GetCurrentWeather);
