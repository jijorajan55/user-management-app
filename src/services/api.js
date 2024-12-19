import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1";

export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const fetchUserById = (id) => axios.get(`${API_URL}/users/${id}`);
