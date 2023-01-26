function GetInfo() {
    let newName = document.getElementById("cityInput").value;
    let cityName = document.getElementById("cityName");
    cityName.innerHTML = newName;

//For updating online status
function updateOnlineStatus(event) {
    let status = document.getElementById("status");
    if(navigator.onLine){
        // status.innerHTML = "online";
    }
    else {
        alert("You Are Offline!\nPlease Turn On Your Internet Connection.");
        // status.innerHTML = "offline";
    }
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName+'&appid=32ba0bfed592484379e51106cef3f204')
.then(response => {
    if (!response.ok) {
      switch (response.status) {
        case 400:
          throw new Error('Bad request:\nThe server could not understand the request due to invalid syntax.');
        case 401:
          throw new Error('Unauthorized:\nThe request requires user authentication.');
        case 403:
          throw new Error('Forbidden:\nThe server understood the request, but it refuses to authorize it.');
        case 404:
          throw new Error('Not found:\nThe requested resource could not be found.');
        default:
          throw new Error('An error occurred:\nAn error occurred on the server side.');
      }
    }
    return response.json();
  })
.then(data => {

    if(!data.list){
        throw new Error("The entered city is invalid!");
    }
    //Getting the min and max values for each day
    for(let i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(2)+ "°C";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(let i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
    }
    //------------------------------------------------------------

    //Getting Weather Icons
     for(let i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)
})
.catch(error =>  {
    alert(error);
});
}
function DefaultScreen(){
    document.getElementById("cityInput").value = "Durgapur";
    GetInfo();
}

//Getting and displaying the text for the upcoming five days of the week
let d = new Date();
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

for(let i = 0; i<5; i++){
    document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
}
