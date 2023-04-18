const container = document.querySelector(".container");
const historyContainer = document.querySelector(".history-container");
let historyArray = localStorage.getItem('locations') ? JSON.parse(localStorage.getItem('locations')) : [];
console.log(historyArray);
// historyArray.push("tppty");
localStorage.clear();
if(historyArray.length == 0){
    let message = document.createElement('h1');
    message.className = "message";
    message.textContent = "Nothing here";
    historyContainer.appendChild(message);
}
else{
    let message = document.querySelector('.message');
        if(message != null) message.remove();
}

historyArray.forEach((location) => {
    
    location = location.toLowerCase();
    location = location[0].toUpperCase()+location.slice(1);
    url = "https://api.openweathermap.org/data/2.5/weather?q=";
    fetch(url+location+"&appid=b69aad09b93027c2964380fa99fa3f0c&units=metric")
    .then(res => {return res.json()})
    .then(data =>{
        let newLi = document.createElement('li');
        const icon = data['weather'][0]['icon'];
        const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    
        newLi.className = "location";
        newLi.innerHTML = `<h3>${location}</h3>
                        <div class="info">
                            <h3>${data['main']['temp']}°C</h3>
                            <img src=${imageURL} alt="">
                        </div>`
        historyContainer.appendChild(newLi);
    })
    
    
    
})