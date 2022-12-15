import { useState, useEffect } from "react";

import axios from "axios";

const Button = (props) => {
  return <button type="button">show</button>;
};

const Display = (props) => {};

const Weather = (props) => {
  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${props.city}&mode=json&units=metric&APPID=${props.api_key}`
      )
      .then((response) => {
        props.setWeather([].concat(response.data));
      });
  }, []);

  const weatherObject = [...props.weather];

  return (
    <div>
      {weatherObject.map((weatherData) => (
        <div>
          <p>temperature {weatherData.main.temp}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather.map(
              (weatherIcon) => weatherIcon.icon
            )}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weatherData.wind.speed}</p>
        </div>
      ))}
    </div>
  );
};
const Filter = (props) => {
  const filterCountries = () => {
    return props.countries.filter((country) =>
      country.name.common
        .toLocaleLowerCase()
        .includes(props.searchCountries.toLocaleLowerCase())
    );
  };

  const filterCountriesArray = [...filterCountries()];

  const showCountries =
    props.searchCountries === "" ? props.countries : filterCountriesArray;

  if (filterCountriesArray.length === 1) {
    return (
      <div>
        find countries:{" "}
        <input
          value={props.searchCountries}
          onChange={props.handleFilterChange}
        />
        {showCountries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.values(country.languages).map((languageObject) => (
                <li key={languageObject}>{Object.values(languageObject)}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt="flag" />

            <h3>Weather in {country.capital}</h3>
            <Weather
              city={country.capital}
              api_key={props.api_key}
              weather={props.weather}
              setWeather={props.setWeather}
            />
          </div>
        ))}
      </div>
    );
  } else if (filterCountriesArray.length <= 10) {
    return (
      <div>
        find countries:{" "}
        <input
          value={props.searchCountries}
          onChange={props.handleFilterChange}
        />
        {showCountries.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button
              type="button"
              onClick={() => props.setCountries([].concat(country))}
            >
              show
            </button>
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        find countries:{" "}
        <input
          value={props.searchCountries}
          onChange={props.handleFilterChange}
        />
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [showSingleCountry, setShowSingleCountry] = useState([]);
  const [weather, setWeather] = useState([]);

  const handleFilterChange = (event) => {
    setSearchCountries(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <Filter
        countries={countries}
        setCountries={setCountries}
        handleFilterChange={handleFilterChange}
        searchCountries={searchCountries}
        setSearchCountries={setSearchCountries}
        showSingleCountry={showSingleCountry}
        setShowSingleCountry={setShowSingleCountry}
        weather={weather}
        setWeather={setWeather}
        api_key={api_key}
      />
    </div>
  );
};

export default App;
