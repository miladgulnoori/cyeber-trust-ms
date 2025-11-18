const BASE = "http://localhost:5000/api/projects";
export const projectApi = {
  getAll: async () => (await fetch(BASE)).json(),
  create: async (data) =>
    (
      await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json(),
  update: async (id, data) =>
    (
      await fetch(`${BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    ).json(),
  delete: async (id) =>
    (await fetch(`${BASE}/${id}`, { method: "DELETE" })).json(),
};
export default projectApi;
