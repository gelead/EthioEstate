import axios from "axios";
import { toast } from "react-toastify";


export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  timeout: 10 * 1000,
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/getAllResidency");
    return response.data;
  } catch (err) {
    toast.error("Something went wrong while fetching properties");
    throw err;
  }
};
export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`);
    return response.data;
  } catch (err) {
    toast.error("Something went wrong while fetching properties");
    throw err;
  }
};
