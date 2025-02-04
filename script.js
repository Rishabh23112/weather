document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city-input').value.trim();
    
    if (city === '') {
        showError("Please enter a city name.");
        return;
    }

    // First, get city coordinates using OpenStreetMap Nominatim API
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                // If no results are found, show "City not found" message
                showError("City not found. Please try again.");
                return;
            }

            const { lat, lon, display_name } = data[0];

            // Now fetch weather data from Open-Meteo API
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            return fetch(weatherUrl);
        })
        .then(response => response.json())
        .then(weatherData => {
            if (!weatherData) return;

            updateWeatherUI(weatherData);
        })
        .catch(() => showError("Error fetching data. Please try again."));
});

function updateWeatherUI(data) {
    document.getElementById('city-name').textContent = `Weather for ${document.getElementById('city-input').value}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.current_weather.temperature}°C`;
    document.getElementById('humidity').textContent = `Humidity: Data not available`; // Open-Meteo doesn’t provide humidity directly
    document.getElementById('condition').textContent = `Wind Speed: ${data.current_weather.windspeed} km/h`;

    // Since Open-Meteo doesn't provide weather icons, use a placeholder icon
    document.getElementById('weather-icon').src = getWeatherIcon(data.current_weather.weathercode);
    
    document.getElementById('weather-result').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
}

function showError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('error-message').classList.remove('hidden');
    document.getElementById('weather-result').classList.add('hidden');
}

// Function to map Open-Meteo weather codes to generic icons
function getWeatherIcon(weatherCode) {
    const iconMap = {
        0: "https://cdn-icons-png.flaticon.com/512/869/869869.png",  // Clear sky
        1: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png", // Mainly clear
        2: "https://cdn-icons-png.flaticon.com/512/414/414825.png",   // Partly cloudy
        3: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // Overcast
        45: "https://cdn-icons-png.flaticon.com/512/1779/1779802.png",// Fog
        48: "https://cdn-icons-png.flaticon.com/512/1779/1779802.png",// Fog
        51: "https://cdn-icons-png.flaticon.com/512/3093/3093390.png",// Drizzle
        61: "https://cdn-icons-png.flaticon.com/512/2412/2412673.png",// Rain
        71: "https://cdn-icons-png.flaticon.com/512/2698/2698194.png",// Snow
        80: "https://cdn-icons-png.flaticon.com/512/1779/1779804.png",// Rain showers
    };
    return iconMap[weatherCode] || "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Default to clear sky
}
