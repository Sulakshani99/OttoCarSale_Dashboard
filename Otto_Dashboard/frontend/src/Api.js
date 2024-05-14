// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1/vehicles';

const api = axios.create({
  baseURL: BASE_URL,
});

export const addVehicle = async (data, token) => {
  try {
    const response = await api.post('/addVehicle', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding vehicle:', error);
    throw error;
  }
};

// Implement other API functions for update, delete, search, etc.
