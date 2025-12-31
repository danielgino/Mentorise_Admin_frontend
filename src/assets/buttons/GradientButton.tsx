import { motion, type HTMLMotionProps } from "motion/react";
import type React from "react";

interface GradientButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
}

export function GradientButton({
                                   children,
                                   className = "",
                                   ...props
                               }: GradientButtonProps) {
    return (
        <motion.button
            {...props}
            className={`
                relative w-full py-3.5 px-6 
                text-white 
                rounded-2xl 
                overflow-hidden
                transition-all 
                duration-300
                ${className}
            `}
            style={{
                background: "linear-gradient(135deg, #2E86DE 0%, #A66CFF 100%)",
            }}
            whileHover={{
                scale: 1.02,
                boxShadow:
                    "0 10px 30px rgba(46, 134, 222, 0.4), 0 0 0 4px rgba(166, 108, 255, 0.1)",
            }}
            whileTap={{
                scale: 0.98,
            }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 0.2 }}
                transition={{ duration: 0.6 }}
            />

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
