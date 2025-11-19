import { api } from "./axiosInstance";

export const quotationApi = {
  getAll: () => api.get("/quotations"),
  create: (data) => api.post("/quotations", data),
  update: (id, data) => api.put(`/quotations/${id}`, data),
  remove: (id) => api.delete(`/quotations/${id}`),
};
