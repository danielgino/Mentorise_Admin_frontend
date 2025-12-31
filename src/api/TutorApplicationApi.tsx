import {apiClient} from "./ApiClient.tsx";
import type {PageResponse} from "../types/PageResponse.tsx";
import type {TutorApplicationDto} from "../types/TutorApplication.tsx";

export type TutorApplicationsQuery = {
    page?: number;
    size?: number;
    status?: "PENDING" | "APPROVED" | "REJECTED";
    nationalId?: string;
    sort?: string;
};

export type TutorApplicationScopeDto = {
    scopeType: "MAJOR" | "YEAR" | "COURSE";
    courseId?: number | null;
    courseName?: string | null;
    year?: number | null;
};

export type TutorApplicationDetailDto = {
    id: number;
    userId: number;
    fullName: string;
    nationalId: string;
    majorId?: number | null;
    majorName?: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED";
    requestText?: string | null;
    transcriptUrl?: string;
    createdAt: string;
    adminComment?: string | null;
    reviewedByName?: string | null;
    reviewedAt?: string | null;
    scopes: TutorApplicationScopeDto[];
};


export type ApplicationActionResponse = {
    applicationId: number;
    status: "PENDING" | "APPROVED" | "REJECTED";
    reviewerId?: number | null;
    reviewedAt?: string | null;
    promotedToTutor?: boolean;
};

export function getTutorApplications(params: TutorApplicationsQuery) {
    return apiClient.get<PageResponse<TutorApplicationDto>>(
        "/admin/tutor-applications",
        { params }
    );
    }

export function getTutorApplicationDetails(id: number) {
    return apiClient.get<TutorApplicationDetailDto>(`/admin/tutor-applications/${id}`);
}
export function approveTutorApplication(id: number, adminComment?: string) {
    return apiClient.post<ApplicationActionResponse | void>(
        `/admin/tutor-applications/${id}/approve`,
        null,
        { params: adminComment ? { adminComment } : {} }
    );
}
export function denyTutorApplication(id: number, reason: string) {
    return apiClient.post<ApplicationActionResponse | void>(
        `/admin/tutor-applications/${id}/deny`,
        null,
        { params: { reason } }
    );
}