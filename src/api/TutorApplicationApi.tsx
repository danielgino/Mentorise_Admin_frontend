import {apiClient} from "./ApiClient.tsx";
import type {PageResponse} from "../types/PageResponse.tsx";
import type {
    ApplicationActionResponse,
    TutorApplicationDetailDto,
    TutorApplicationDto,
    TutorApplicationsQuery
} from "../types/TutorApplication.tsx";


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