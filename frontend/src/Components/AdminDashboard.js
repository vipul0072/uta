import React, { useEffect, useState } from "react";
import "../style/AdminDashboard.css";
import tennisTrophy from "../assets/trop.jpg";
// import { Link } from 'react-router-dom' ;

const AdminDashboard = () => {
  const [teams, setTeams] = useState([]);
  const [ranking, setRanking] = useState("");

  useEffect(() => {
    getTeams();
  }, []);

  const getTeams = async () => {
    let result = await fetch(
      "http://localhost:5000/api/v3/admin/admin-dashboard"
    );
    result = await result.json();
    setTeams(result);
  };
  const handleRankingChange = (id, value) => {
    const updatedTeams = teams.map((team) =>
      team._id === id ? { ...team, ranking: value } : team
    );
    setTeams(updatedTeams);
  };
  const handleSubmit = async () => {
    try {
      const rankings = teams.map((team) => ({
        id: team._id,
        ranking: team.ranking,
      }));
      const response = await fetch(
        "http://localhost:5000/api/v3/admin/admin-dashboard/update-rankings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rankings }),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Rankings Submitted Successfully!");
      } else {
        alert("Failed to submit rankings.");
      }
    } catch (error) {
      console.error("Error submitting rankings:", error);
      alert("Error submitting rankings.");
    }
  };
  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-left">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Player 1</th>
                <th>Player 2</th>
                <th>Ranking</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, i) => (
                <tr key={team._id}>
                  <td>{i + 1}</td>
                  <td>{team.partner1Name}</td>
                  <td>{team.partner2Name}</td>

                  <td>
                    <input
                      type="number"
                      className="ranking-input"
                      value={ranking }
                      onChange={(e) =>
                        handleRankingChange(team._id, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="dashboard-button" onClick={handleSubmit}>
            {" "}
            Submit Rankings{" "}
          </button>
        </div>
        <div className="dashboard-right">
          <img
            src={tennisTrophy}
            alt="Tennis Trophy"
            className="dashboard-image"
          />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;