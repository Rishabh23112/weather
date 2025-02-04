
# Weather App

This is a simple weather application built using **HTML**, **CSS**, and **JavaScript**. It fetches real-time weather data from the **Open-Meteo API** and displays the current weather for a given location.

## Features
- Get the current weather for a specific location.
- View temperature, weather condition, humidity, wind speed, and more.
- Simple and user-friendly interface.

## Tech Stack
- HTML: For the structure of the app.
- CSS: For styling and layout.
- JavaScript: For fetching data from the Open-Meteo API and dynamically updating the UI.

## API
The app uses the [Open-Meteo API](https://open-meteo.com/) to fetch weather data. It is a free API with no authentication required, making it easy to integrate into web applications.

## How to Use

### 1. Clone the repository
git clone https://github.com/yourusername/weather-app.git
cd weather-app


### 2. Open the app
Simply open the `index.html` file in any modern web browser to start using the weather app.

### 3. Enter a location
You can enter the name of any city in the search box to get the current weather data for that location.

## Code Overview
- index.html: The main HTML structure of the app.
- style.css*: The styles used to make the app visually appealing.
- script.js: Contains the logic for fetching data from the API and displaying it in the UI.

## Example API Request
Here is an example of the API endpoint used to fetch weather data:

fetch(`https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`)

This will fetch the current weather data for the given latitude and longitude.



