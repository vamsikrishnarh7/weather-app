
let cityNameInput = document.querySelector("#city-input");
let searchbtn = document.querySelector(".search-btn");
let cityName = document.querySelector(".city-name");
let temp = document.querySelector(".temparature");
let description = document.querySelector(".description-text");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");

let apikey = "b69aad09b93027c2964380fa99fa3f0c";
// let apikey = "18f8e57adf39ea6b7fc53d7eb6de8fe3"

//localstorage
var historyArray = localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [];

function tempConverter(k){
    return (k - 273).toFixed(2)
}
searchbtn.addEventListener('click',()=>{

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityNameInput.value+'&appid='+apikey)
        .then(res => {
            return res.json();
            // console.log(res.status)
        })
        .then(data => {
            const icon = data['weather'][0]['icon'];
            // console.log(icon);
            let timeZone = data['timezone'];
            var sunriseunix = data['sys']['sunrise'];
            let x = moment.utc(sunriseunix,'X').add(timeZone,'seconds').format('HH:mm a');
            var sunsetunix = data['sys']['sunset'];
            let y = moment.utc(sunsetunix,'X').add(timeZone,'seconds').format('HH:mm a')
            var temparature = data['main']['temp'];
            cityName.textContent = `${data['name']}`;
            temp.textContent = `${tempConverter(temparature)}°C`;
            description.innerHTML = `Feels like ${tempConverter(data['main']['feels_like'])}°C<br>${data['weather'][0]['description']}, winds at ${data['wind']['speed']} m/s`;
            humidity.textContent = `${data['main']['humidity']}%`;
            wind.textContent = `${data['wind']['speed']}m/s`;
            sunrise.textContent = x;
            sunset.textContent = y;
            historyArray.push(cityNameInput.value);
            //removing duplicate locations from localStorage
            historyArray = [...new Set(historyArray)];
            localStorage.setItem('locations',JSON.stringify(historyArray));
            console.log(historyArray);

    })
    .catch(err => alert("Sorry!!! We can't find your city😔"))
})
