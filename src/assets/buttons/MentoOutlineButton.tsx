import { motion, type HTMLMotionProps } from "motion/react";
import * as React from "react";
import {MENTO_BUTTON_SIZES, type MentoButtonSize} from "../../types/MentoButton.tsx";

export type MentoButtonShape = "square" | "rounded" | "pill";

export interface MentoOutlineButtonProps
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
};

export function MentoOutlineButton({
                                       size = "md",
                                       shape = "pill",
                                       fullWidth = false,
                                       leftIcon,
                                       rightIcon,
                                       loading = false,
                                       disabled,
                                       children,
                                       className,
                                       ...rest
                                   }: MentoOutlineButtonProps) {
    const [hover, setHover] = React.useState(false);
    const s = MENTO_BUTTON_SIZES[size];

    return (
        <motion.button
            {...rest}
            disabled={disabled || loading}
            onMouseEnter={(e) => {
                rest.onMouseEnter?.(e as any);
                setHover(true);
            }}
            onMouseLeave={(e) => {
                rest.onMouseLeave?.(e as any);
                setHover(false);
            }}
            className={[
                "relative inline-flex p-[2px] transition-all duration-200 select-none",
                "bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]",
                "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                shapeMap[shape],
                fullWidth ? "w-full" : "",
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
            <span
                className={[
                    "relative flex items-center justify-center bg-white text-[#2E86DE]",
                    s.innerPx,
                    s.innerPy,
                    s.text,
                    s.gap,
                    shapeMap[shape],
                    "transition-all duration-200",
                ].join(" ")}
            >
                {leftIcon && (
                    <IconWrapper sizePx={s.icon} className="text-[#2E86DE]">
                        {leftIcon}
                    </IconWrapper>
                )}
                {children && (
                    <span
                        className="font-medium bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]
                       bg-clip-text text-transparent select-none"
                    >
            {children}
          </span>
                )}
                {rightIcon && (
                    <IconWrapper sizePx={s.icon} className="text-[#2E86DE]">
                        {rightIcon}
                    </IconWrapper>
                )}
      </span>

            {loading && (
                <span className="absolute inset-0 grid place-items-center z-[2]">
          <span className="animate-spin rounded-full border-2 border-[#2E86DE]/60 border-t-transparent w-5 h-5" />
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
            className={[
                "inline-flex items-center justify-center",
                className ?? "",
            ].join(" ")}
            style={{ width: sizePx, height: sizePx }}
        >
      {children}
    </span>
    );
}
