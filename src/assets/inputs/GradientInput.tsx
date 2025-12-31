import { motion } from "motion/react";
import { useState } from "react";

interface GradientInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode;
}

export function GradientInput({ icon, className = "", ...props }: GradientInputProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                    isFocused ? "text-[#40E0D0]" : "text-gray-400"
                }`}
            >
                {icon}
            </div>

            <input
                {...props}
                onFocus={(e) => {
                    setIsFocused(true);
                    props.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    props.onBlur?.(e);
                }}
                className={`
          w-full pl-12 pr-4 py-3.5 
          bg-gray-50 
          border-2 
          ${isFocused ? "border-[#40E0D0] shadow-[0_0_20px_rgba(64,224,208,0.3)]" : "border-gray-200"}
          rounded-2xl 
          outline-none 
          transition-all 
          duration-300
          placeholder:text-gray-400
          ${className}
        `}
                style={{
                    boxShadow: isFocused
                        ? '0 4px 12px rgba(64, 224, 208, 0.15), 0 0 0 4px rgba(64, 224, 208, 0.1)'
                        : '0 2px 4px rgba(0, 0, 0, 0.04)',
                }}
            />
        </motion.div>
    );
}
