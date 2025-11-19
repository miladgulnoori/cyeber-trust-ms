import { api } from "./axiosInstance";

export const employeeApi = {
  getAll: () => api.get("/employees"),
  create: (data) => api.post("/employees", data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  remove: (id) => api.delete(`/employees/${id}`),
};
