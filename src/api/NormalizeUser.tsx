import type {ApiUserDto, User} from "../types/User.tsx";
import {formatDate, formatDateTime} from "../utils/Constants.tsx";
export type RoleDto = "ADMIN" | "STUDENT" | "TUTOR";




export function mapRoleToLabel(role: RoleDto): string {
    switch (role) {
        case "ADMIN":   return "אדמין";
        case "STUDENT": return "סטודנט";
        case "TUTOR":   return "מתרגל";
    }
}

export function mapLabelToRole(label: string): RoleDto {
    switch (label) {
        case "אדמין": return "ADMIN";
        case "סטודנט": return "STUDENT";
        case "מתרגל": return "TUTOR";
        default: return "STUDENT";
    }
}




export function mapApiUser(api: ApiUserDto): User {
    return {
        id: api.id,
        nationalId: api.nationalId,
        fullName: `${api.firstName} ${api.lastName}`,
        firstName: api.firstName,
        lastName: api.lastName,
        email: api.email,
        role: mapRoleToLabel(api.role),
        phoneNumber: api.phoneNumber,
        isAlumni: api.isAlumni,
        major:api.major,
        createdAt: formatDate(api.createdAt),
        updatedAt: formatDateTime(api.updatedAt)
    };
}
