// RegistrationPage1.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/RegistrationPage.css";
import tennisCourt from "../assets/reg.jpg";

const RegistrationPage1 = () => {
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [tShirtSize, setTshirtSize] = useState("");
  const sizes = ["Small", "Medium", "Large", "X Large", "XX Large", "XXX Large", "I don't need"];
  const [shortSize, setShortSize] = useState("");
  const short = ["Small", "Medium", "Large", "X Large", "XX Large", "XXX Large", "I don't need"];
  const [food, setFood] = useState("");
  const dinner = ["Non-Vegetarian", "Vegetarian", "I won't be there for Gala dinner"];
  const [stay, setStay] = useState("");
  const selectstay = ["Yes", "No"];

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const parsed = JSON.parse(auth);
      navigate(`/register-page2/${parsed._id}`); // Use real ID
    }
  }, [navigate]);
  

  const handleNext = async () => {
    if (!name || !whatsappNumber || !dob || !city || !tShirtSize || !shortSize || !food || !stay) {
      setErrorMessage("Please fill all the fields.");
      return;
    }
  
    const isEligible = (dobStr) => {
      const dob = new Date(dobStr);
  
      // Dynamically calculate the cutoff date as December 9th of the current year
      const currentYear = new Date().getFullYear();
      const cutoff = new Date(currentYear, 11, 9); // December 9th of the current year
  
      // Calculate the running age
      let runningAge = cutoff.getFullYear() - dob.getFullYear();
  
      // Check if birthday has passed by December 9th
      const hasBirthdayPassed =
        cutoff.getMonth() > dob.getMonth() ||
        (cutoff.getMonth() === dob.getMonth() && cutoff.getDate() >= dob.getDate());
  
      if (!hasBirthdayPassed) {
        runningAge--;
      }
  
      return runningAge >= 30;
    };
  
    if (!isEligible(dob)) {
      setErrorMessage("You must be 30 years or older as of 9th December " + new Date().getFullYear());
      return;
    }
  
    // Convert dob to just date (no time)
    const dobDateOnly = dob;
  
    const playerData = {
      name,
      whatsappNumber,
      dob: dobDateOnly,  // Sending only the date part
      city,
      tShirtSize,
      shortSize,
      food,
      stay,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/v1/player/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });
  
      const data = await response.json();
  
      if (data.existPlayer) {
        setErrorMessage("Player already exists with this WhatsApp number.");
        localStorage.setItem("playerId", data.player._id);  // if reusing
        return;
      }
  
      if (response.ok) {
        // localStorage.setItem('token', data.token);
        // localStorage.setItem("user", JSON.stringify(data.player));
        console.log('Player registered successfully:', data);
        navigate(`/register-page2/${data.player._id}`);
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };
  
  
  
  return (
    <div className="registration-page">
      <div className="registration-form">
        <h1>General Details Capture</h1>
        
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
          <h2 htmlFor="tournament-stay">Do you want the Tournament Management to arrange for your stay?</h2>
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button className="rt-btn" onClick={handleNext}>Next</button>
      </div>
      <img src={tennisCourt} alt="Tennis Court" className="registration-image" />
    </div>
  );
};

export default RegistrationPage1;