import {apiClient} from "./ApiClient.tsx";
import type {AxiosError} from "axios";
import type {CreateMajorDto, MajorDto, UpdateMajorDto} from "../types/Major.tsx";




export async function getMajors(): Promise<MajorDto[]> {
    try {
        const {data} = await apiClient.get<MajorDto[]>("/admin/majors/getAll");
        return data;
    } catch (err) {
        const e = err as AxiosError<{ message?: string }>;
        throw new Error(e.response?.data?.message ?? "Failed to fetch majors");
    }
}

export async function createMajor(req: CreateMajorDto): Promise<CreateMajorDto> {
    const { data } = await apiClient.post<CreateMajorDto>("/admin/majors/add", req);
    return data;
}

export async function updateMajor(majorId: number, updates: UpdateMajorDto): Promise<MajorDto> {
    const { data } = await apiClient.patch<MajorDto>(`/admin/majors/${majorId}`, updates);
    return data;
}


export async function deleteMajor(majorId: number): Promise<void> {
    await apiClient.delete(`/admin/majors/delete/${majorId}`);
}