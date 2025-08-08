import React, { useState, useEffect } from "react";

import "../style/Update.css";
import { useParams, useNavigate } from "react-router-dom";
const UpdateDetails = () => {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [tShirtSize, setTshirtSize] = useState("");
  const sizes = [
    "Small",
    "Medium",
    "Large",
    "X Large",
    "XX Large",
    "XXX Large",
    "I don't need",
  ];
  const [shortSize, setShortSize] = useState("");
  const short = [
    "Small",
    "Medium",
    "Large",
    "X Large",
    "XX Large",
    "XXX Large",
    "I don't need",
  ];
  const [food, setFood] = useState("");
  const dinner = [
    "Non-Vegetarian",
    "Vegetarian",
    "I won't be there for Gala dinner",
  ];
  const [stay, setStay] = useState("");
  const selectstay = ["Yes", "No"];
  const [event1, setEvent1] = useState("");
  const selectevent1 = ["75+", "90+", "105+", "120+"];
  const [partner1, setPartner1] = useState("");
  const [event2, setEvent2] = useState("");
  const selectevent2 = ["75+", "90+", "105+", "120+"];
  const [partner2, setPartner2] = useState("");

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (playerId) {
      getUserDetails();
      fetchPlayers();
    }
  }, [playerId]);

  const fetchPlayers = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await fetch(`http://localhost:5000/api/v1/player/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the response for debugging
      console.log("Response status:", result.status);
      console.log("Response headers:", result.headers);
      const contentType = result.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (!contentType || !contentType.includes("application/json")) {
        console.error("Invalid response, expected JSON.");
        return setPlayers([]);
      }

      const data = await result.json();
      if (data.error) {
        console.error("Error:", data.error);
        return setPlayers([]);
      }

      setPlayers(data.data || []); // safer

      console.log("Fetched players:", data);
    } catch (err) {
      console.error("Error fetching players:", err);
      setPlayers([]);
    }
  };

  const getUserDetails = async () => {
    try {
      const result = await fetch(
        `http://localhost:5000/api/v1/player/partner/details/${playerId}`
      );

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();
      console.log("Fetched player data:", data);
      setName(data.name);
      setWhatsappNumber(data.whatsappNumber);
      setDob(data.dob);
      setCity(data.city);
      setTshirtSize(data.tShirtSize);
      setShortSize(data.shortSize);
      setFood(data.food);
      setStay(data.stay);
      setEvent1(data.event1?.eventName || "");
      setPartner1(data.event1?.partner?._id || "");
      setEvent2(data.event2?.eventName || "");
      setPartner2(data.event2?.partner?._id || ""); // store partner's ID
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const Updatedetail = async () => {
    const token = localStorage.getItem("token"); 
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/player/partner/update-details/${playerId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            whatsappNumber,
            dob,
            city,
            tShirtSize,
            shortSize,
            food,
            stay,
            event1Name: event1,
            event1Partner: partner1 || null,
            event2Name: event2,
            event2Partner: partner2 || null,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(`${data.message}\n${data.details?.join('\n') || ''}`);
        return;
      }
      

      alert("Details updated successfully!");
      navigate(`/user-details/${playerId}`);
    } catch (error) {
      alert("Failed to update details.");
      console.error(error);
    }
  };

  return (
    <div className="registration">
      <div className="registration-form">
        <h1>Update Details</h1>
        <div className="input-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-form">
          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
          />
        </div>
        <div className="input-form">
          <input
            type="date"
            placeholder="DOB"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="input-form">
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="input-form-option">
          <h2 htmlFor="tshirt_size">Indian tree t-shirt size</h2>
          {sizes.map((size) => (
            <label key={size} className="block">
              <input
                type="radio"
                name="tshirt_size"
                value={size}
                checked={tShirtSize === size}
                onChange={(e) => setTshirtSize(e.target.value)}
              />
              {size}
            </label>
          ))}
        </div>
        <div className="input-form-option">
          <h2 htmlFor="short_size">Indian tree short size</h2>
          {short.map((short) => (
            <label key={short} className="block">
              <input
                type="radio"
                name="short_size"
                value={short}
                checked={shortSize === short}
                onChange={(e) => setShortSize(e.target.value)}
              />
              {short}
            </label>
          ))}
        </div>
        <div className="input-form-option">
          <h2 htmlFor="gala-dinner">Gala Dinner Food Preference</h2>
          {dinner.map((dinner) => (
            <label key={dinner} className="block">
              <input
                type="radio"
                name="gala-dinner"
                value={dinner}
                checked={food === dinner}
                onChange={(e) => setFood(e.target.value)}
              />
              {dinner}
            </label>
          ))}
        </div>
        <div className="input-form-option">
          <h2 htmlFor="tournament-stay">
            Do you want the Tournament Management to arrange for your stay?
          </h2>
          {selectstay.map((selectstay) => (
            <label key={selectstay} className="block">
              <input
                type="radio"
                name="tournament-stay"
                value={selectstay}
                checked={stay === selectstay}
                onChange={(e) => setStay(e.target.value)}
              />
              {selectstay}
            </label>
          ))}
        </div>

        <div className="input-form-option">
          <h2 htmlFor="event1">Your First Event :</h2>
          {selectevent1.map((selectevent1) => (
            <label key={selectevent1} className="block">
              <input
                type="radio"
                name="event1"
                value={selectevent1}
                checked={event1 === selectevent1}
                onChange={(e) => setEvent1(e.target.value)}
              />
              {selectevent1}
            </label>
          ))}
        </div>
        <div className="input-form-option">
          <h2 htmlFor="partner1">Select partner1</h2>
          <select
            name="partner1"
            value={partner1}
            onChange={(e) => setPartner1(e.target.value)}
          >
            <option value="">Partner not selected yet</option>
            {Array.isArray(players) &&
              players
                .filter(
                  (p) =>
                    String(p._id) !== String(playerId) && // exclude self
                    String(p._id) !== String(partner2) // exclude partner2's selection
                )
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
          </select>
        </div>
        <div className="input-form-option">
          <h2 htmlFor="event2">Your Second Event :</h2>
          {selectevent2.map((selectevent2) => (
            <label key={selectevent2} className="block">
              <input
                type="radio"
                name="event2"
                value={selectevent2}
                checked={event2 === selectevent2}
                onChange={(e) => setEvent2(e.target.value)}
              />
              {selectevent2}
            </label>
          ))}
        </div>
        <div className="input-form-option">
          <h2 htmlFor="partner2">Select partner2</h2>
          <select
            name="partner2"
            value={partner2}
            onChange={(e) => setPartner2(e.target.value)}
          >
            <option value="">Partner not selected yet</option>
            {Array.isArray(players) &&
              players
                .filter(
                  (p) =>
                    String(p._id) !== String(playerId) && // exclude self
                    String(p._id) !== String(partner1) // exclude partner1's selection
                )
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
          </select>
        </div>
        <button className="rt-btn" onClick={Updatedetail}>
          Next
        </button>
      </div>
    </div>
  );
};
export default UpdateDetails;
