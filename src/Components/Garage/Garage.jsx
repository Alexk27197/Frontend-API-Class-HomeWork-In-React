import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Garage.css";
import Navbar from "../Navbar/Navbar";
const Garage = ({ name, details }) => {
  const [showModal, setShowModal] = useState(false);

  const openDetailsWindow = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="garage">
      <h3>{name}</h3>
      <button className="more-details" onClick={openDetailsWindow}>
        More Details
      </button>

      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5 title">{name}</h1>
              </div>
              <div className="modal-body">
                <h3>
                  <span>כתובת:</span>
                  {details?.ktovet}
                </h3>
                <h3>
                  <span>טלפון:</span>
                  {details?.telephone}
                </h3>
                <h3>
                  <span>דירוג:</span>
                  {details?.rank?.toFixed(2)}
                </h3>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GarageSearch = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/royts/israel-cities/master/israel-cities.json"
      );
      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);

    try {
      if (selectedCity !== "") {
        const response = await axios.get(
          `https://data.gov.il/api/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=1000&q=${selectedCity}`
        );
        setGarages(response.data.result.records);
      } else {
        setGarages([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="garage-search">
        <h2>Garage Search</h2>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">Select a City</option>
          {cities.map((city) => (
            <option key={city?.semel_yeshuv} value={city?.name}>
              {city?.name}
            </option>
          ))}
        </select>

        {selectedCity.length === 0 ? (
          <div></div>
        ) : garages.length === 0 ? (
          <div>No garages found in the selected city</div>
        ) : (
          <div className="garage-list">
            {garages.map((garage) => (
              <Garage
                key={garage._id}
                name={garage.shem_mosah}
                details={garage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GarageSearch;
