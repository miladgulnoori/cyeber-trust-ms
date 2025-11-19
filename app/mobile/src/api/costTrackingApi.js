import { api } from "./axiosInstance";

export const costTrackingApi = {
  getAll: () => api.get("/cost-tracking"),
  create: (data) => api.post("/cost-tracking", data),
  update: (id, data) => api.put(`/cost-tracking/${id}`, data),
  remove: (id) => api.delete(`/cost-tracking/${id}`),
};
