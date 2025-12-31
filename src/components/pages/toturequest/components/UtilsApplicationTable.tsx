export type StatusFilterUI = 'all' | 'PENDING' | 'APPROVED' | 'REJECTED';

export const STATUS_OPTIONS: { label: string; value: string }[] = [
    { label: 'סטטוס: הכל', value: 'all' },
    { label: 'ממתין', value: 'PENDING' },
    { label: 'מאושר', value: 'APPROVED' },
    { label: 'נדחה', value: 'REJECTED' },
];


export const HEADER_ID_NUMBER = "ת״ז";
export const HEADER_FULL_NAME = "שם מלא";
export const HEADER_ROLE = "תפקיד";
export const HEADER_TRACK = "מסלול";
export const HEADER_STATUS = "סטטוס";
export const HEADER_TRANSCRIPT = "גיליון ציונים";
export const HEADER_SUBMISSION_DATE = "תאריך הגשה";


export const PENDING="PENDING"
export const APPROVED="APPROVED"
export const REJECTED="REJECTED"


export const SCOPE_MAJOR="MAJOR"
export const SCOPE_YEAR="YEAR";
export const SCOPE_COURSE="COURSE";