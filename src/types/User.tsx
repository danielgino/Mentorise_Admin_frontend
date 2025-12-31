import type {RoleDto} from "../api/NormalizeUser.tsx";

export interface User {
    id: number;
    nationalId: string;
    fullName: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    isAlumni: boolean;
    major?: string | null;
}


export interface ApiUserDto {
    id: number;
    nationalId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: RoleDto;
    major: string | null;
    createdAt: string;
    updatedAt: string;
    isAlumni: boolean;
}
