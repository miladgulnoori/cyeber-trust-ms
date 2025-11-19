import { api } from "./axiosInstance";

export const departmentApi = {
  getAll: () => api.get("/departments"),
  create: (data) => api.post("/departments", data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  remove: (id) => api.delete(`/departments/${id}`),
};
