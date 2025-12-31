import {apiClient} from "./ApiClient.tsx";
import type {CreateAdminRequest} from "../types/CreateAdminRequest.tsx";
import type {ApiUserDto} from "../types/User.tsx";




export async function getUserById(id: number): Promise<ApiUserDto> {
    const { data } = await apiClient.get<ApiUserDto>(`/users/${id}`);
    return data;
}

export async function updateUser(userId: number, updates: Partial<ApiUserDto>) {
    const { data } = await apiClient.patch(`/users/${userId}`, updates);
    return data;
}

export async function deleteUser(userId: number): Promise<void> {
    await apiClient.delete(`/users/${userId}`);
}

export async function createAdmin(req: CreateAdminRequest): Promise<ApiUserDto> {
    const { data } = await apiClient.post<ApiUserDto>("/users/admin", req);
    return data;
}

