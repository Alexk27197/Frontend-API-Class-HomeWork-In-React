import React, { useState, useEffect } from "react";
import "./SearchAboutMe.css";
import Navbar from "../Navbar/Navbar";

const SearchAboutMe = () => {
  const [name, setName] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [highestProbability, setHighestProbability] = useState(null);

  const handlePrediction = async (e) => {
    setPredictions([]);
    setHighestProbability(null);
    e.preventDefault();
    try {
      const response = await fetch(`https://api.nationalize.io/?name=${name}`);
      const data = await response.json();

      if (data.country && data.country.length > 0) {
        let maxProbability = 0;
        let maxProbabilityIndex = 0;

        for (let i = 0; i < data.country.length; i++) {
          const countryId = data.country[i].country_id;
          try {
            const response2 = await fetch(
              `https://restcountries.com/v3.1/alpha/${countryId}`
            );
            const data2 = await response2.json();

            const prediction = {
              country_name: data2[0]?.altSpellings[2]
                ? data2[0]?.altSpellings[2]
                : data2[0]?.altSpellings[1]
                ? data2[0]?.altSpellings[0]
                : data2[0]?.altSpellings[0],
              probability: data.country[i].probability,
              flag_url: data2[0]?.flags?.png || "",
            };

            setPredictions((prevPredictions) => [
              ...prevPredictions,
              prediction,
            ]);
            if (data.country[i].probability > maxProbability) {
              maxProbability = data.country[i].probability;
              maxProbabilityIndex = i;
            }
          } catch (error) {
            console.log(error);
          }
        }
        setHighestProbability(data.country[maxProbabilityIndex]);
        setName("");
      } else {
        console.log("No countries found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-about-me-container">
      <Navbar />
      <div className="wrapper">
        <h1>Name Nationality Prediction</h1>
        <form onSubmit={handlePrediction} className="search-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="card-container">
          {predictions.map((prediction, index) => {
            if (prediction.probability === highestProbability?.probability) {
              return (
                <div key={index} className="card highest-probability">
                  <h3>{prediction.country_name}</h3>
                  <p style={{ color: "red", fontSize: "20px" }}>
                    Probability: {prediction.probability}
                  </p>
                  <img
                    src={prediction.flag_url}
                    alt={prediction.country_name}
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className="card">
                  <h3>{prediction.country_name}</h3>
                  <p>Probability: {prediction.probability}</p>
                  <img
                    src={prediction.flag_url}
                    alt={prediction.country_name}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchAboutMe;
