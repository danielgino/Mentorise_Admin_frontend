import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import * as React from "react";

interface CTAButtonProps {
    children: React.ReactNode;
    variant: 'ghost' | 'primary';
    fullWidth?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function CTAButton({ children, variant, fullWidth = false ,onClick}: CTAButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);


    const baseClasses = `
    relative px-6 py-2.5 rounded-xl transition-all duration-200
    ${fullWidth ? 'w-full' : ''}
  `;

    const variantClasses = variant === 'ghost'
        ? 'border border-white/15 text-white/90 hover:text-white hover:bg-white/5 hover:border-white/25'
        : `bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] text-white shadow-lg hover:shadow-xl hover:shadow-[#2E86DE]/20`;

    return (
        <motion.button
            ref={buttonRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses}`}
            style={{
                fontSize: '15px',
                fontWeight: '600',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
            }}
            animate={{
                x: 0,
                y: 0,
                scale: isHovered ? 1.03 : 1,
            }}
            transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
                mass: 0.55,
            }}
            whileTap={{ scale: 0.985 }}
        >
            <span className="relative z-10">{children}</span>

            {variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        backgroundSize: '200% 100%',
                    }}
                    animate={{
                        backgroundPosition: isHovered ? ['0% 0%', '200% 0%'] : '0% 0%',
                    }}
                    transition={{
                        duration: 1.5,
                        ease: 'linear',
                        repeat: isHovered ? Infinity : 0,
                    }}
                />
            )}
        </motion.button>

    );
}
