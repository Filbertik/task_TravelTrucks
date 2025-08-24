import { api } from "./axiosInstance";

const featureKeys = [
  "AC",
  "TV",
  "gas",
  "water",
  "radio",
  "refrigerator",
  "microwave",
  "bathroom",
  "kitchen",
];

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

const isCanceled = (err) =>
  err?.name === "CanceledError" ||
  err?.message === "canceled" ||
  err?.code === "ERR_CANCELED";

export async function getCampers({ page, limit, filters, signal } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  if (filters?.location) params.set("location", filters.location.trim());
  if (filters?.form) params.set("form", filters.form);
  featureKeys.forEach((k) => {
    if (filters?.[k]) params.set(k, "true");
  });

  try {
    const { data } = await api.get(`/campers?${params.toString()}`, { signal });
    return toArray(data);
  } catch (err) {
    if (isCanceled(err)) throw err;
    if (err?.response?.status === 404) return [];
    throw err;
  }
}

export async function getCamperById(id, { signal } = {}) {
  try {
    const { data } = await api.get(`/campers/${id}`, { signal });
    return data;
  } catch (err) {
    if (isCanceled(err)) throw err;
    if (err?.response?.status === 404) return null;
    throw err;
  }
}
