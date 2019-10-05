import axios from "axios";
import React, { useEffect, useState } from "react";
import Results from "./components/Results";
import Search from "./components/Search";

const COUNTRY_API = "https://restcountries.eu/rest/v2/all";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(COUNTRY_API)
      .then(response => {
        setCountries(response.data);
        console.log("countries loaded:", response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const onCountryClick = name => () => {
    setFilter(name);
  };

  const results = filter
    ? countries.filter(country =>
        country.name.toLowerCase().includes(filter.trim().toLowerCase())
      )
    : [];

  return (
    <div className="App">
      <Search onChange={handleFilterChange} value={filter} />

      {!filter ? (
        <p>
          Total countries available: {countries.length}
          <br />
          Please enter a filter.
        </p>
      ) : !results.length ? (
        <p>no matches</p>
      ) : results.length > 10 ? (
        <p>Too many matches ({results.length})</p>
      ) : (
        <Results value={results} onItemClick={onCountryClick} />
      )}
    </div>
  );
}

export default App;
