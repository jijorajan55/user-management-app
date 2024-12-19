import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserById } from "../services/api";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserById(id)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-details-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <div className="user-details-card">
        <div className="user-avatar">
          <img src={user.avatar} alt={user.name} />
        </div>
        <h1>{user.name}</h1>
        <p className="user-email">{user.email}</p>
        <div className="user-info">
          <div className="info-item">
            <label>Name</label>
            <span>{user.name}</span>
          </div>
          <div className="info-item">
            <label>Role</label>
            <span>{user.role}</span>
          </div>
          <div className="info-item">
            <label>Created At</label>
            <span>{new Date(user.creationAt).toLocaleString()}</span>
          </div>
          <div className="info-item">
            <label>Last Updated At</label>
            <span>{new Date(user.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
