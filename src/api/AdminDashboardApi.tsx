// src/api/adminDashboardApi.ts

import {apiClient} from "./ApiClient.tsx";

export type TopRequestedCourseDto = {
    name: string;
    count: number;
};
export type MajorStatsDto = {
    name: string;
    tutorCount: number;
    percentageOfTotalUsers: number;
};

export type GrowthTimelinePoint = {
    month: string;
    users: number;
    sessions: number;
};
export type AdminDashboardStatsResponse = {
    totalRegisteredUsers: number;
    totalTutors: number;
    completedLessons: number;
    totalCollectedAmount: number;
    topRequestedCourses: TopRequestedCourseDto[];
    topTutorMajorName: string;
    topTutorMajorCount: number;
    topUsersMajorName: string;
    topUsersMajorCount: number;
    topStudentMajorName: string;
    topStudentMajorCount: number;
    monthlyLessons: number;
    previousMonthLessons: number;
    monthlyLessonsGrowthPct: number;
    usersGrowthPct: number;
    currentMonthRevenue: number;
    previousMonthRevenue: number;
    revenueGrowthPct: number;
    topTutorMajors: MajorStatsDto[];
    growthTimeline: GrowthTimelinePoint[];
};

export async function getAdminDashboardStats() {
    const { data } = await apiClient.get<AdminDashboardStatsResponse>("/admin/dashboard/stats");
    return data;
}