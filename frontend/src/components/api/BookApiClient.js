import { apiClient } from "./ApiClient";

export const getAllBooks = () =>
  apiClient.get('/books');

export const createBookApi = (book) =>
  apiClient.post('/books', book);