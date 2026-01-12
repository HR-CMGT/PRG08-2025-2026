// key aanmaken via https://openweathermap.org/api

const city = "Rotterdam"
const apiKey = process.env.MY_WEATHER_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
const response = await fetch(url);
const data = await response.json();
if (data.weather) {
    console.log(`Het is ${data.weather[0].description} en ${data.main.temp}°C in ${city}.`);
} else {
    console.log(`Sorry, ik kon het weer voor ${city} niet ophalen.`);
}