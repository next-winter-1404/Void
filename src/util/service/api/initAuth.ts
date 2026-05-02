import { Token } from "./token";
import { apiClient } from "./apiClient";

export function initAuth() {
  const token = Token.get();

  if (token) {
    apiClient.setToken(token);
  }
}
