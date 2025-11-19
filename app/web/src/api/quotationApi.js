const BASE = "http://localhost:5000/api/v1/quotation";

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    console.error("API ERROR", res.status, await res.text());
    throw new Error("API request failed");
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}

export const quotationApi = {
  getAll: () => request(BASE),

  create: (data) =>
    request(BASE, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`${BASE}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`${BASE}/${id}`, {
      method: "DELETE",
    }),
};

export default quotationApi;
