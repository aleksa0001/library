import { apiClient } from "./ApiClient";

export const getAllBooksApi = () =>
  apiClient.get('/books');

export const createBookApi = (book) =>
  apiClient.post('/books', book);