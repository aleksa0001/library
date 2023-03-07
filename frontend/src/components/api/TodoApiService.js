import { apiClient } from "./ApiClient";

export const registerUserApi = (user) =>
  apiClient.post("/api/v1/auth/register", user);

export const jwtAuthService = (email, password) =>
  apiClient.post("/api/v1/auth/authenticate", { email, password });


  export const getTodos = (id) =>
  apiClient.post(`/users/${id}/todos`);