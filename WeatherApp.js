//WEATHER APP using Javascript & JSON
const weatherForm =document.querySelector('.weatherForm')
const cityInput =document.querySelector('.cityInput')
const weatherCard =document.querySelector('.weatherCard')
const apiKey ='259f691f3433741c7b13c70f37cbe09f'

weatherForm.addEventListener('submit',async event=>{
    event.preventDefault()

    const city =cityInput.value ;

    if(city){
        try{
         const weatherData =await getWeatherData(city) ;
         displayWeatherInfo(weatherData)
        }
        catch(error){
        console.error(error)
        displayError(error)
        }
    }

    else{
      displayError("Please enter a city name!")
    }
})

async function getWeatherData(city){
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

const response =await fetch(apiUrl)

if(!response.ok){
    throw new Error('Could not fetch weather data');
}
return await response.json();
}


function displayWeatherInfo(data){

    const {name:city ,
           main:{temp,humidity},
           weather:[{description,id}]} =data ;

           weatherCard.textContent="";
           weatherCard.style.display="flex";

           const cityDisplay =document.createElement('h1');
           const tempDisplay =document.createElement('p');
           const humidityDisplay =document.createElement('p');
           const descDisplay =document.createElement('p');
           const weatherEmoji =document.createElement('p');

           cityDisplay.textContent =city ;
           cityDisplay.classList.add('cityDisplay');
           weatherCard.appendChild(cityDisplay);

           tempDisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`;
           tempDisplay.classList.add('TempDisplay');
           weatherCard.appendChild(tempDisplay);

           humidityDisplay.textContent= `Humidity : ${humidity}%`;
           humidityDisplay.classList.add('humidityDisplay');
           weatherCard.appendChild(humidityDisplay);

           descDisplay.textContent= `${description}`;
           descDisplay.classList.add('descDisplay');
           weatherCard.appendChild(descDisplay)

           weatherEmoji.textContent = getWeatherEmoji(id) ;
           weatherEmoji.classList.add('weatherEmoji') ;
           weatherCard.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherID){

    switch(true){

        case(weatherID >= 200 && weatherID < 300) :
        return "⛈" ;

        case(weatherID >= 300 && weatherID < 400) :
        return "🌧" ;

        case(weatherID >= 500 && weatherID < 600) :
        return "🌧" ;

        case(weatherID >= 600 && weatherID < 700) :
        return "❄" ;

        case(weatherID >= 700 && weatherID < 800) :
        return "🌫" ;

        case(weatherID === 800) :
        return "🌞" ;

        case(weatherID >= 801 && weatherID < 810) :
        return "☁" ;

        default :
        return "❓" ;
    }
}

function displayError(message){
const errorDisplay =document.createElement("p");
errorDisplay.textContent =message ;
errorDisplay.classList.add('ErrorDisplay');

weatherCard.textContent="" ;
weatherCard.style.display='flex' ;
weatherCard.appendChild(errorDisplay);
}