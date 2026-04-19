import type { ActivityEntry, FoodEntry, FormData as FoodFormData, UserData, User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:1337/api";

const getToken = () => localStorage.getItem("token");

const buildHeaders = (options: RequestInit = {}) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const request = async <T = any>(endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: buildHeaders(options),
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.error?.message || data?.message || `API request failed: ${response.status}`;
    throw new Error(message);
  }

  return data as T;
};

export const apiClient = {
  auth: {
    login: async (credentials: { identifier: string; password: string }) =>
      request<{ jwt: string; user: User }>("/auth/local", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),

    register: async (credentials: { username: string; email: string; password: string }) =>
      request<{ jwt: string; user: User }>("/auth/local/register", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
  },

  user: {
    me: async () => request<User>("/users/me"),
    update: async (id: string, updates: Partial<UserData>) =>
      request<{ data: User }>(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
  },

  foodLogs: {
    list: async () => request<{ data: FoodEntry[] }>("/food-logs?populate=*"),
    create: async (data: { data: FoodFormData }) =>
      request<{ data: FoodEntry }>("/food-logs", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: async (id: string, data: { data: Partial<FoodEntry> }) =>
      request<{ data: FoodEntry }>(`/food-logs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: async (id: string) =>
      request<{ data: { id: string } }>(`/food-logs/${id}`, {
        method: "DELETE",
      }),
  },

  activityLogs: {
    list: async () => request<{ data: ActivityEntry[] }>("/activity-logs?populate=*"),
    create: async (data: { data: { name: string; duration: number; calories: number } }) =>
      request<{ data: ActivityEntry }>("/activity-logs", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: async (id: string, data: { data: Partial<ActivityEntry> }) =>
      request<{ data: ActivityEntry }>(`/activity-logs/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: async (id: string) =>
      request<{ data: { id: string } }>(`/activity-logs/${id}`, {
        method: "DELETE",
      }),
  },

  imageAnalysis: {
    analyze: async (base64Image: string) =>
      request<{ data: { name: string; calories: number } }>("/image-analysis", {
        method: "POST",
        body: JSON.stringify({ image: base64Image }),
      }),
  },
};

export default apiClient;
