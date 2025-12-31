





export const COURSE_CODE="קוד קורס"
export const COURSE_NAME="שם קורס"
export const COURSE_MAJOR="מסלול לימודים"
export const COURSE_SEMESTER="סמסטר"
export const COURSE_YEAR="שנה"
export const COURSE_ACTIONS="פעולות"




export const YEAR_ALL = "שנה: הכל";
export const SEM_ALL  = "סמסטר: הכל";


export const YEAR_PARAM_MAP: Record<string, number | undefined> = {
    "שנה:הכל": undefined,
    "שנה ראשונה": 1,
    "שנה שנייה":2,
    "שנה שלישית": 3,
    "שנה רביעית": 4,

};


export const SEMESTER_PARAM_MAP: Record<string, string | undefined> = {
    "סמסטר:הכל": undefined,
    "א'": "A",
    "ב'": "B",
    "קיץ": "SUMMER",
};

export const YEAR_REVERSE_MAP: Record<number, string> = {
    1: "שנה ראשונה",
    2: "שנה שנייה",
    3: "שנה שלישית",
    4: "שנה רביעית",
};

export const SEMESTER_REVERSE_MAP: Record<"A" | "B" | "SUMMER", string> = {
    A: "א'",
    B: "ב'",
    SUMMER: "קיץ",
};

export const YEAR_FILTER_OPTIONS = [
    YEAR_ALL,
    "שנה ראשונה",
    "שנה שנייה",
    "שנה שלישית",
    "שנה רביעית",
];

export const SEMESTER_FILTER_OPTIONS = [
    SEM_ALL,
    "א'",
    "ב'",
    "קיץ",

];

export const numberToHebrewYear: Record<number, string> = {
    1: "שנה ראשונה", 2: "שנה שנייה", 3: "שנה שלישית", 4: "שנה רביעית"
};
export function formatYear(y?: number) {
    return y ? (numberToHebrewYear[y] ?? String(y)) : "";
}

export type SemesterCode = "A" | "B" | "SUMMER";
export const enumToHebrewSemester: Record<SemesterCode, string> = {
    A: "א", B: "ב", SUMMER: "קיץ"
};
export function formatSemester(s?: SemesterCode | string) {
    if (!s) return "";
    if (s === "A" || s === "B" || s === "SUMMER") return enumToHebrewSemester[s];
    return String(s);
}



export type SelectOption = string | { label: string; value: string };
