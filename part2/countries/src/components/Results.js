import axios from "axios";
import React, { useEffect, useState } from "react";

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API = "http://api.weatherstack.com/current";
//https://api.weatherstack.com/current?access_key=55a1e0c34c811b51a82202100a81dcd4&query=New%20York

export default ({ value, onItemClick }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (value.length === 1) {
      const weather_query = `${WEATHER_API}?access_key=${WEATHER_API_KEY}&query=${value[0].capital}`;
      axios
        .get(weather_query)
        .then(response => {
          const {
            current: {
              temperature = 0,
              weather_icons = [],
              wind_speed = 0,
              wind_dir = "N"
            }
          } = response.data;
          setWeather({ temperature, weather_icons, wind_speed, wind_dir });
        })
        .catch(error => {
          console.log(error);
        });

      return () => {
        setWeather(null);
      };
    }
  }, [value]);

  if (value && value.length > 1)
    return (
      <>
        <ul>
          {value.map(item => (
            <li key={item.alpha3Code}>
              {item.name} <button onClick={onItemClick(item.name)}>show</button>
            </li>
          ))}
        </ul>
        <div>{value.length} found</div>
      </>
    );

  return value.map(item => (
    <div key={item.alpha3Code}>
      <h2>{item.name}</h2>
      <div>capital {item.capital}</div>
      <div>population {item.population}</div>
      <h3>languages</h3>
      <ul>
        {item.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img style={{ height: "100px" }} src={item.flag} alt="flag" />

      {weather && (
        <>
          <h2>Weather in {item.capital}</h2>
          <div>
            <strong>Temperature:</strong> {weather.temperature} celcius
          </div>
          <img
            style={{ height: "64px" }}
            src={weather.weather_icons[0]}
            alt="weather icon"
          />
          <div>
            <strong>Wind:</strong> {weather.wind_speed} kph {weather.wind_dir}
          </div>
        </>
      )}
    </div>
  ));
};
