import {apiClient} from "./ApiClient.tsx";

export type NotificationTarget = 'ALL' | 'STUDENTS' | 'TUTORS';

export type SendAdminNotificationRequest = {
    title: string;
    message: string;
    target: NotificationTarget;
};

export const sendAdminNotification = async (
    payload: SendAdminNotificationRequest
) => {
    const response = await apiClient.post('/admin/notifications', payload);
    return response.data;
};