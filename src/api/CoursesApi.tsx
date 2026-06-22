import {apiClient} from "./ApiClient.tsx";
import type {CourseDto, CreateCourseDto} from "../types/Course.tsx";
import type {PageResponse} from "../types/PageResponse.tsx";


export type SortDir = "ASC" | "DESC";
export type GetCoursesQuery = {
    page?: number; size?: number; search?: string;
    majorId?: number; year?: number; semester?: string;
    sortBy?: string; dir?: SortDir;
};

export async function getCourses(params: GetCoursesQuery = {}): Promise<PageResponse<CourseDto>> {
    const { data } = await apiClient.get<PageResponse<CourseDto>>("/admin/courses", {
        params: {
            page: params.page ?? 0,
            size: params.size ?? 10,
            search: params.search || undefined,
            majorId: params.majorId ?? undefined,
            year: params.year ?? undefined,
            semester: params.semester || undefined,
            sortBy: params.sortBy || undefined,
            dir: params.dir || undefined,
        },
    });
    return data;
}


export async function updateCourse(courseId: number, updates: Partial<CourseDto>) {
    const { data } = await apiClient.patch(`/admin/courses/${courseId}`, updates);
    return data;
}
export async function createCourse(req: CreateCourseDto): Promise<CreateCourseDto> {
    const { data } = await apiClient.post<CreateCourseDto>("/admin/courses/add", req);
    return data;
}

