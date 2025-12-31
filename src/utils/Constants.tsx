export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export function formatDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString("he-IL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export const hebrewYear = (n: number) => {
    const map = ['שנה ראשונה', 'שנה שנייה', 'שנה שלישית', 'שנה רביעית', 'שנה חמישית', 'שנה שישית'];
    return map[n - 1] ?? String(n);
};

export const compressConsecutiveYears = (years: number[]): string[] => {
    if (!years.length) return [];
    const sorted = [...new Set(years)].sort((a, b) => a - b);

    // כל שנה בקובייה משלה
    return sorted.map(y => hebrewYear(y));
};
export const WEBSITE_NAME="Mentorise"
export const COLLEGE_SHORT_NAME="AAC"
export const COLLEGE_FULL_NAME="Ashkelon Academic College"


export const TYPING_DELAY=300

export const CLOSE_TIME_POPUPS=1500
