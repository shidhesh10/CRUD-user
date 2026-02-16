import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000,
});

export function getErrorMessage(err) {
  if (axios.isAxiosError?.(err)) {
    return (
      err.response?.data?.message ||
      err.response?.statusText ||
      err.message ||
      "Request failed"
    );
  }
  return err?.message || "Something went wrong";
}
