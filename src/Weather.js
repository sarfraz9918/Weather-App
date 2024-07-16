import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  var fetchWeather = async () => {
    if (city === '') {
      setError('Please Enter The City');
      return;
    }
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=1ed5b38bdb464b07900202344241507&q=${city}&aqi=no`
      );
      const data = await response.json();
console.log(data.error)
      if (data.error) {
        setError(`Error: ${data.error.message}`);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError('');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something wrong plase try again');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
        
        <h1 className='weatherapp'>Weather App</h1>
    
      
      <div className="weather-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}</h2>
          <h2>Temperature: {weatherData.current.temp_c}°C</h2>
          <h2>Condition: {weatherData.current.condition.text}</h2>
          <h2></h2>
        </div>
      )}
    </div>
  );
};

export default Weather;
