export type MentoButtonSize = "sm" | "md" | "lg";

export type MentoButtonSizeConfig = {
    text: string;
    innerPx: string;
    innerPy: string;
    gap: string;
    icon: number;
};

export const MENTO_BUTTON_SIZES: Record<MentoButtonSize, MentoButtonSizeConfig> = {
    sm: { text: "text-sm", innerPx: "px-3.5", innerPy: "py-1.5", gap: "gap-1.5", icon: 16 },
    md: { text: "text-base", innerPx: "px-5",   innerPy: "py-2.5", gap: "gap-2",   icon: 18 },
    lg: { text: "text-lg",  innerPx: "px-6",   innerPy: "py-3",   gap: "gap-2.5", icon: 20 },
};
