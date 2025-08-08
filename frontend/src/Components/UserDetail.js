import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/UserDetail.css';

const UserDetail = () => {
  const [users, setUsers] = useState(null); // users is now either a single user or null initially
  const [loading, setLoading] = useState(true); // to track loading state
  const [error, setError] = useState(null); // to track errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/user-login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/v2/partner/partner-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Fetched data:", data); // Log the response data to check its structure

          // Check if the data is an object, and wrap it in an array if necessary
          if (Array.isArray(data)) {
            setUsers(data); // If it's an array, set it directly
          } else {
            setUsers([data]); // Wrap the single user object in an array
          }
        } else {
          const errorText = await res.text(); // Get the response as text if not JSON
          console.error("Error:", errorText); // Log the error response
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err.message);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false); // Stop loading after data is fetched or error occurs
      }
    };

    fetchUsers();
  }, [navigate]);

  if (loading) {
    return <p style={{ color: "blue", textAlign: "center" }}>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!users || users.length === 0) {
    return <p style={{ color: "red", textAlign: "center" }}>No user data found or empty response from server.</p>;
  }

  return (
    <div className="user-list">
      <div className="user">
      <div className="user-list-header">
      
      <h1 className="user-list-h1">User Detail</h1>
      <Link to={`/update-details/${users[0]._id}`} className="user-detail-link">Update</Link>
    </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>WhatsApp Number</th>
              <th>DOB</th>
              <th>City</th>
              <th>T-shirt Size</th>
              <th>Short Size</th>
              <th>Stay</th>
              <th>Food</th>
              <th>Event 1</th>
              <th>Partner 1</th>
              <th>Event 2</th>
              <th>Partner 2</th>
              <th>Ranking</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}> {/* Assuming _id is the unique identifier */}
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.whatsappNumber}</td>
                <td>{user.dob?.split("T")[0]}</td>
                <td>{user.city}</td>
                <td>{user.tShirtSize}</td>
                <td>{user.shortSize}</td>
                <td>{user.stay}</td>
                <td>{user.food}</td>
                <td>{user.event1?.eventName || "N/A"}</td>
                <td>{user.event1?.partnerName || "N/A"}</td>
                <td>{user.event2?.eventName || "N/A"}</td>
                <td>{user.event2?.partnerName || "N/A"}</td>
                <td>{user.ranking}</td>
                {/* <td>
                <Link to={`/update-details/${user._id}`} className="user-detail-link">update</Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;
