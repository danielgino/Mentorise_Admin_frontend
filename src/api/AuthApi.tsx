import { apiClient } from "./ApiClient.tsx";

export interface LoginResponse {
    id: number;
    fullName: string;
    email: string;
    role: string;
    token: string;
}
export interface ApiMessageResponse {
    message: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>("/admin/auth/login", {
        email,
        password
    });
    return data;
}
export async function forgotAdminPassword(email: string): Promise<ApiMessageResponse> {
    const { data } = await apiClient.post<ApiMessageResponse>("/admin/auth/forgot-password", {
        email
    });
    return data;
}

export async function resetAdminPassword(
    token: string,
    newPassword: string
): Promise<ApiMessageResponse> {
    const { data } = await apiClient.post<ApiMessageResponse>("/admin/auth/reset-password", {
        token,
        newPassword
    });
    return data;
}
export async function logoutUser(): Promise<void> {
    try {
        await apiClient.post("/admin/auth/logout");
    } catch {
        // Logout endpoint might not exist, but we still want to clear client state
    }
}

