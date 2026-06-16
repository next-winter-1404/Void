"use client"

interface UserInfo {
    id: number,
    email: string,
    role: "buyer" | "seller" | "admin",
    name: string,
    profilePicture: string | null,
    iat: number,
    exp: number,
}

interface AuthData {
    token: string,
    user_info: UserInfo,
}

interface JwtPayload {
    id?: number,
    userId?: number,
    sub?: number,
    role?: string,
    userRole?: string,
    type?: string,
    [key: string]: any,
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_info";


// ── Set ──────────────────────────────────────────────────────────

export function setAuth(data:any) {
    // if (typeof window === "undefined") return;

    localStorage.setItem(USER_KEY, JSON.stringify(data));
}


// ── Get ──────────────────────────────────────────────────────────

export function getToken(): string | null {
    if (typeof window === "undefined") return null;

    return localStorage.getItem(TOKEN_KEY);
}

export function getUserInfo() {
    if (typeof window === "undefined") return {};

    const userData = localStorage.getItem(USER_KEY) || "{}";

    try {
        return JSON.parse(userData);
    } catch {
        return {};
    }
}

function decodeToken(token: string): JwtPayload | null {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

export function getUserId(): number | null {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.id ?? decoded?.userId ?? decoded?.sub ?? null;
}

export function getUserRole(): string | null {
    const token = getToken();
    if (!token) return null;

    const decoded = decodeToken(token);
    return decoded?.role ?? decoded?.userRole ?? decoded?.type ?? null;
}

export function getAuth(): { token: string | null, user: UserInfo | {}, userId: number | null, role: string | null } {
    const token = getToken();
    const user = getUserInfo();
    const userId = getUserId();
    const role = getUserRole();

    return { token, user, userId, role };
}


// ── Remove ───────────────────────────────────────────────────────

export function removeAuth() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}