import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="user-list-container">
      <table className="user-list-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user.id)}>
              <td>
                <div className="avatar-container">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                </div>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{new Date(user.creationAt).toLocaleDateString()}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <div className="pagination-indicator">
          {[...Array(Math.ceil(users.length / usersPerPage))].map((_, idx) => (
            <span
              key={idx}
              className={`page-number ${
                currentPage === idx + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </span>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
