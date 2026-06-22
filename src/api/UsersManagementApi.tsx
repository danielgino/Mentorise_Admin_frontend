import {apiClient} from "./ApiClient.tsx";
import type {CreateAdminRequest} from "../types/CreateAdminRequest.tsx";
import type {ApiUserDto} from "../types/User.tsx";
import type {PageResponse} from "../types/PageResponse.tsx";

export type GetAllUsersParams = {
    page: number;
    size: number;
    search?: string;
    role?: string;
    alumni?: boolean;
    joinDateFilter?: string;
};

export async function getAllUsers(params: GetAllUsersParams): Promise<PageResponse<ApiUserDto>> {
    const { data } = await apiClient.get<PageResponse<ApiUserDto>>("/admin/users", {
        params
    });
    return data;
}

export async function getUserById(id: number): Promise<ApiUserDto> {
    const { data } = await apiClient.get<ApiUserDto>(`/admin/users/${id}`);
    return data;
}

export async function updateUser(userId: number, updates: Partial<ApiUserDto>) {
    const { data } = await apiClient.patch(`/admin/users/${userId}`, updates);
    return data;
}

export async function deleteUser(userId: number): Promise<void> {
    await apiClient.delete(`/admin/users/${userId}`);
}

export async function createAdmin(req: CreateAdminRequest): Promise<ApiUserDto> {
    const { data } = await apiClient.post<ApiUserDto>("/admin/users/admin", req);
    return data;
}

export async function revokeTutorPermissions(userId: number): Promise<ApiUserDto> {
    const { data } = await apiClient.post<ApiUserDto>(`/admin/users/${userId}/revoke-tutor`);
    return data;
}

