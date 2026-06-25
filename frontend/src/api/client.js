import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 60000,
});

export const uploadFile = (formData, onProgress) =>
  API.post("/upload/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: onProgress,
  });

export const getChartTypes = () => API.get("/chart-types/");
export const generateChart = (body) => API.post("/generate-chart/", body);
export const getSessionCharts = (id) => API.get(`/session/${id}/charts/`);
