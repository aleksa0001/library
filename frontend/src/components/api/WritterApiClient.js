import { apiClient } from "./ApiClient";

export const createWritterApi = (writter) =>
  apiClient.post('/writters', writter);