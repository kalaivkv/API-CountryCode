import React, { useEffect, useState } from "react";
import './App.css'; 

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error found");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data.data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSelect = (event) => {
    const countryCode = event.target.value;
    const country = countries.find((c) => c.code === countryCode);
    setSelectedCountry(country);
  };

  return (
    <div className="container">
      <h1 className="title">Country Selector</h1>

      <select
        onChange={handleSelect}
        className="dropdown"
      >
        <option value="">Select a Country...</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name} ({country.code}) - {country.dial_code}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <div className="details">
          <h2 >Country Details</h2>
          <p><strong>Name:</strong> {selectedCountry.name}</p>
          <p><strong>Code:</strong> {selectedCountry.code}</p>
          <p><strong>Dial Code:</strong> {selectedCountry.dial_code}</p>
        </div>
      )}
    </div>
  );
};

export default App;
