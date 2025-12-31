


//UsersTable columns name
export const ACTIONS="פעולות"
export const NATIONAL_ID="ת\"ז"
export const FULL_NAME="שם מלא"
export const ROLE="תפקיד"
export const EMAIL="מייל"
export const MAJOR="מסלול"
export const PHONE_NUMBER="פלאפון"
export const IS_ALUMNI="בוגר"
export const CREATED_AT="תאריך הצטרפות"
export const UPDATED_AT="עדכון אחרון"


export const ROLE_PARAM_MAP: Record<string, string | undefined> = {
    "כל התפקידים": undefined,
    "אדמין": "ADMIN",
    "סטודנט": "STUDENT",
    "מתרגל": "TUTOR",
};


export const DATE_PARAM_MAP: Record<string, string | undefined> = {
    "תאריך הצטרפות": undefined,
    "כל הזמנים": undefined,
    "7 הימים האחרונים": "LAST_7_DAYS",
    "30 הימים האחרונים": "LAST_30_DAYS",
    "90 הימים האחרונים": "LAST_90_DAYS",
};

export const ALUMNI_PARAM_MAP: Record<string, boolean | undefined> = {
    "בוגרים וסטודנטים": undefined,
    "בוגרים בלבד": true,
};
//FilterDropdown
export const ROLE_FILTER_OPTIONS = [
    "כל התפקידים",
    "מתרגל",
    "סטודנט",
    "אדמין",
];

export const ALUMNI_FILTER_OPTIONS = [
    "בוגרים וסטודנטים",
    "בוגרים בלבד",
];

export const DATE_FILTER_OPTIONS = [
    "כל הזמנים",
    "7 הימים האחרונים",
    "30 הימים האחרונים",
    "90 הימים האחרונים",
];

//DEFAULT FILTERS
export const ALL_ROLES="כל התפקידים"
export const ALL_ALUMNI="בוגרים וסטודנטים"
export const ALL_JOIN_DATES="תאריך הצטרפות"

