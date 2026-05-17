import { getToken } from "./token";
import { apiClient } from "./apiClient";

export async function initAuth() {
  const token = await getToken(); 

  if (token) {
    apiClient.setToken(token);
  }
}
