export class ApiError extends Error {
  status: number;
  statusText: string;
  data: any;
  url: string;
  method: string;
  constructor(message: string, status: number, statusText: string, data: any, url: string, method: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.url = url;
    this.method = method;
  }
}

export class ApiClient {
  private baseUrl: string;
  private token?: string;

  constructor(baseUrl: string, token?: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (this.token) headers["Authorization"] = `Bearer ${this.token}`;

    const res = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    let data: any = null;
    if (res.status === 204) data = null;
    else if (contentType.includes("application/json")) data = await res.json();
    else data = await res.text();

    if (!res.ok) {
      throw new ApiError(
        typeof data === "object" && data?.message ? data.message : "Request failed",
        res.status, res.statusText, data, url, method
      );
    }
    return data;
  }

  get<T>(url: string) { return this.request<T>("GET", url); }
  post<T>(url: string, body?: unknown) { return this.request<T>("POST", url, body); }
  put<T>(url: string, body?: unknown) { return this.request<T>("PUT", url, body); }
  patch<T>(url: string, body?: unknown) { return this.request<T>("PATCH", url, body); }
  delete<T>(url: string) { return this.request<T>("DELETE", url); }
}