
const TOKEN_KEY = "auth_token";

export const Token = {
  set(token: string) {
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Strict; Secure`;
  },

  get(): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${TOKEN_KEY}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }
};