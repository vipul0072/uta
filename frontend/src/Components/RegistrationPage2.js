import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/RegistrationPage.css";
import tennisCourt from "../assets/reg.jpg";
import { useParams } from "react-router-dom";

const RegistrationPage2 = () => {
  const [event1, setEvent1] = useState("");
  const [partner1, setPartner1] = useState("");
  const [event2, setEvent2] = useState("");
  const [partner2, setPartner2] = useState("");
  const [players, setPlayers] = useState([]);
  // const [emptyPartnerCount, setEmptyPartnerCount] = useState(0); // Track the number of users who selected empty partner
  const { playerId } = useParams();
  const navigate = useNavigate();

  const events = ["75+", "90+", "105+", "120+"];


  // Fetch players once component mounts
  useEffect(() => {
    console.log("playerId from useParams:", playerId);
    if (!playerId) return;

    const getPlayers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/player/detail?playerId=${playerId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch players");
        }

        console.log("Fetched players:", data.data); // Log to check players
        setPlayers(data.data || []);
      } catch (error) {
        console.error("Error fetching players:", error.message);
      }
    };

    getPlayers();
  }, [playerId]);

  // Inside RegistrationPage2 component:
const handleSubmit = async () => {
  const token = localStorage.getItem("token");

  // Validate events
  if (!event1 || !event2) {
    alert("Please select both events.");
    return;
  }

  // Prevent choosing same partner twice
  if (partner1 && partner2 && partner1 === partner2) {
    alert("You cannot choose the same partner for both events.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/v2/partner/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId,
        event1Name: event1.trim() === "" ? null : event1,
        event1Partner: !partner1 || partner1.trim() === "" ? null : partner1,
        event2Name: event2.trim() === "" ? null : event2,
        event2Partner: !partner2 || partner2.trim() === "" ? null : partner2,
      }),
      
      
      
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration Successful");
      navigate("/success");
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Something went wrong!");
  }
};

// Remove all references to emptyPartnerCount state and its logic.

  return (
    <div className="registration-page">
      <div className="registration-form">
        <h1>Event & Partner Selection</h1>

        {/* Event 1 */}
        <div className="input-form-option">
          <h2>Select Your First Event:</h2>
          <select value={event1} onChange={(e) => setEvent1(e.target.value)}>
          <option value="">-- Select Event --</option>

            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>

        {/* Partner 1 */}
        <div className="input-form-option">
          <h2>Select Partner for Event 1:</h2>
          <select
            name="partner1"
            value={partner1}
            onChange={(e) => setPartner1(e.target.value)}
          >
            <option value="">Partner not selected yet</option>
            {players
              .filter(
                (p) =>
                  String(p._id) !== String(playerId) && // Exclude the current player from the partner list
                  String(p._id) !== String(partner2)    // Exclude the selected partner for event 2
              )
              .map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>

        {/* Event 2 */}
        <div className="input-form-option">
          <h2>Select Your Second Event:</h2>
          <select
            value={event2}
            onChange={(e) => setEvent2(e.target.value)}
          >
            <option value="">-- Select Event --</option>

            {events
              .filter((event) => event !== event1) // Filter out selected event1
              .map((event) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
          </select>
        </div>

        {/* Partner 2 */}
        <div className="input-form-option">
          <h2>Select Partner for Event 2:</h2>
          <select
            name="partner2"
            value={partner2}
            onChange={(e) => setPartner2(e.target.value)}
          >
            <option value="">Partner not selected yet</option>

            {players
              .filter(
                (p) =>
                  String(p._id) !== String(playerId) && // Exclude the current player from the partner list
                  String(p._id) !== String(partner1)    // Exclude the selected partner for event 1
              )
              .map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
          </select>
        </div>

        <button className="rt-btn" onClick={handleSubmit}>
          Register
        </button>
      </div>
      <img src={tennisCourt} alt="Tennis Court" className="registration-image" />
    </div>
  );
};

export default RegistrationPage2;
