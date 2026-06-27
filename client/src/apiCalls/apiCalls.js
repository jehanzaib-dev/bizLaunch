import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
export const generateBlueprintCall = async (prompt) => {
  const response = await API.post("/api/v1/ai/generate", { prompt });
  return response.data;
};