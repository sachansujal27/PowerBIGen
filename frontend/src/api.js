import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===============================
// Records
// ===============================

// List Records
export const listRecords = () => api.get("/records/");

// Bulk Create
export const bulkCreateRecords = (payload) =>
  api.post("/records/bulk_create/", payload);

// Export Excel
export const exportExcelUrl = () => `${API_BASE}/records/export_excel/`;

// Import Excel
export const importExcel = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/records/import_excel/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Update Record
export const updateRecord = (id, data) =>
  api.put(`/records/${id}/`, {
    data,
  });

export default api;
// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://127.0.0.1:8000/api/",
// // });

// // export default API;

// import axios from "axios";

// // Backend API Base URL
// const API_BASE = "http://127.0.0.1:8000/api";

// // Axios Instance
// export const api = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ===============================
// // Records APIs
// // ===============================

// // Get all records with pagination
// export const listRecords = (page = 1, pageSize = 100) => {
//   return api.get("/records/", {
//     params: {
//       page,
//       page_size: pageSize,
//     },
//   });
// };

// // Bulk Create Records
// export const bulkCreateRecords = (records) => {
//   return api.post("/records/bulk_create/", {
//     records,
//   });
// };

// // Update Record
// export const updateRecord = (id, data) => {
//   return api.patch(`/records/${id}/`, data);
// };

// // Delete Record
// export const deleteRecord = (id) => {
//   return api.delete(`/records/${id}/`);
// };

// // Dashboard Statistics
// export const getStats = () => {
//   return api.get("/records/stats/");
// };

// // Excel Export URL
// export const exportExcelUrl = () => {
//   return `${API_BASE}/records/export_excel/`;
// };

// // Excel Import
// export const importExcel = (file) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   return api.post("/records/import_excel/", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// export default api;
