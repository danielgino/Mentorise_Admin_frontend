import {apiClient} from "./ApiClient.tsx";

export type MeDto = {
    id: number;
    fullName: string;
    email: string;
    role: string;
};

export async function meApi(): Promise<MeDto> {
    const { data } = await apiClient.get("/users/me");
    return data;
}