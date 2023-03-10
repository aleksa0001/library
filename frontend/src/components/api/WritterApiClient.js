import { apiClient } from "./ApiClient";

export const createWritterApi = (writter) =>
  apiClient.post("/writters", writter);

export const getAllWrittersApi = () => apiClient.get("/writters");

