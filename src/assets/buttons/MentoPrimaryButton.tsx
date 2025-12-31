// src/components/controls/MentoPrimaryButton.tsx
import { motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";
import {MENTO_BUTTON_SIZES, type MentoButtonSize} from "../../types/MentoButton.tsx";

export type MentoButtonShape = "square" | "rounded" | "pill" | "circle";

export interface MentoPrimaryButtonProps
    extends Omit<HTMLMotionProps<"button">, "children"> {
    size?: MentoButtonSize;
    shape?: MentoButtonShape;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
    children?: React.ReactNode;
}

const shapeMap: Record<MentoButtonShape, string> = {
    square: "rounded-md",
    rounded: "rounded-xl",
    pill: "rounded-full",
    circle: "rounded-full aspect-square p-0",
};

export function MentoPrimaryButton({
                                       size = "md",
                                       shape = "rounded",
                                       fullWidth = false,
                                       leftIcon,
                                       rightIcon,
                                       loading = false,
                                       disabled,
                                       className,
                                       children,
                                       ...rest
                                   }: MentoPrimaryButtonProps) {
    const [hover, setHover] = React.useState(false);
    const s = MENTO_BUTTON_SIZES[size];
    const isCircle = shape === "circle";

    const circleHeights: Record<MentoButtonSize, string> = {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
    };

    return (
        <motion.button
            {...rest}
            onMouseEnter={(e) => {
                rest.onMouseEnter?.(e as any);
                setHover(true);
            }}
            onMouseLeave={(e) => {
                rest.onMouseLeave?.(e as any);
                setHover(false);
            }}
            disabled={disabled || loading}
            className={[
                "relative inline-flex items-center justify-center select-none",
                "transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] text-white",
                "shadow-lg hover:shadow-xl hover:shadow-[#2E86DE]/20",
                fullWidth ? "w-full" : "",
                shapeMap[shape],
                isCircle ? circleHeights[size] : "",
                className ?? "",
            ].join(" ")}
            style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                ...(rest.style || {}),
            }}
            animate={{ scale: hover && !disabled && !loading ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 26, mass: 0.55 }}
            whileTap={{ scale: 0.985 }}
            aria-busy={loading || undefined}
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                    backgroundSize: "200% 100%",
                    borderRadius: "inherit",
                }}
                animate={{
                    backgroundPosition: hover ? ["0% 0%", "200% 0%"] : "0% 0%",
                }}
                transition={{
                    duration: 1.5,
                    ease: "linear",
                    repeat: hover ? Infinity : 0,
                }}
            />

            <span
                className={[
                    "relative z-[1] inline-flex items-center justify-center",
                    s.gap,
                    s.text,
                    !isCircle ? s.innerPx : "",
                    !isCircle ? s.innerPy : "",
                ].join(" ")}
            >
        {isCircle ? (
            <IconWrapper sizePx={s.icon}>{leftIcon ?? rightIcon}</IconWrapper>
        ) : (
            <>
                {leftIcon && <IconWrapper sizePx={s.icon}>{leftIcon}</IconWrapper>}
                {children && <span className="font-semibold">{children}</span>}
                {rightIcon && <IconWrapper sizePx={s.icon}>{rightIcon}</IconWrapper>}
            </>
        )}
      </span>

            {loading && (
                <span className="absolute inset-0 grid place-items-center z-[2]">
          <span className="animate-spin rounded-full border-2 border-white/70 border-t-transparent w-5 h-5" />
        </span>
            )}
        </motion.button>
    );
}

function IconWrapper({
                         children,
                         sizePx,
                         className,
                     }: {
    children: React.ReactNode;
    sizePx: number;
    className?: string;
}) {
    return (
        <span
            className={["inline-flex items-center justify-center", className ?? ""].join(" ")}
            style={{ width: sizePx, height: sizePx, color: "white" }}
        >
      {children}
    </span>
    );
}
