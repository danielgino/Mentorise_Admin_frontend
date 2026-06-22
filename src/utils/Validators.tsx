export const hasAtLeastTwoHebrewLetters = (value: string): boolean => {
    const matches = value.match(/[א-ת]/g);
    return !!matches && matches.length >= 2;
};

export const isValidFirstName = (value: string): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    const regex = /^[א-ת0-9\s]+$/;
    return regex.test(trimmed) && hasAtLeastTwoHebrewLetters(trimmed);
};

export const isValidLastName = (value: string): boolean => {
    if (!value) return false;
    const trimmed = value.trim();
    const regex = /^[א-ת0-9\s']+$/;
    return regex.test(trimmed) && hasAtLeastTwoHebrewLetters(trimmed);
};

export const isValidEmail = (email: string): boolean => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
};

export const isValidIsraeliPhone = (phone: string): boolean => {
    if (!phone) return false;

    const cleaned = phone.replace(/[^\d+]/g, "");

    const local = /^05\d{8}$/;
    const international = /^\+9725\d{8}$/;

    return local.test(cleaned) || international.test(cleaned);
};
export const isValidPassword = (password: string): boolean => {
    if (!password) return false;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'",.<>/?\\|`~]).{8,}$/;
    return regex.test(password);
};
export const validateConfirmPassword = (confirm: string, password: string): string | undefined => {
    if (!confirm.trim()) return "אישור סיסמה הוא שדה חובה";
    if (confirm !== password) return "הסיסמאות אינן תואמות";
    return undefined;
};

export const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
        case 'firstName':
            if (!value.trim()) return 'שם פרטי הוא שדה חובה';
            if (!isValidFirstName(value)) return 'שם פרטי חייב להיות בעברית, לפחות 2 אותיות וללא תווים מיוחדים';
            return undefined;

        case 'lastName':
            if (!value.trim()) return 'שם משפחה הוא שדה חובה';
            if (!isValidLastName(value)) return "שם משפחה חייב להיות בעברית, לפחות 2 אותיות. מותר גרש ומספרים בלבד";
            return undefined;

        case 'email':
            if (!value.trim()) return 'דוא״ל הוא שדה חובה';
            if (!isValidEmail(value)) return 'דוא״ל לא תקין';
            return undefined;

        case 'phoneNumber':
            if (!value.trim()) return 'מספר פלאפון הוא שדה חובה';
            if (!isValidIsraeliPhone(value)) return 'מספר פלאפון חייב להיות ישראלי (05XXXXXXXX או +9725XXXXXXXX)';
            return undefined;

        case 'password':
            if (!value.trim()) return 'סיסמה היא שדה חובה';
            if (!isValidPassword(value))
                return 'סיסמה חייבת להכיל לפחות 8 תווים, אות גדולה אחת, מספר אחד ותו מיוחד אחד';
            return undefined;

        default:
            return undefined;
    }
};

