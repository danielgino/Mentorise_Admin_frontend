import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CircularProgressProps {
    value: number;
    maxValue: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    delay?: number;
}

export function CircularProgress({
                                     value,
                                     maxValue,
                                     size = 120,
                                     strokeWidth = 8,
                                     color = '#40E0D0',
                                     delay = 0
                                 }: CircularProgressProps) {
    const [animatedValue, setAnimatedValue] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = (animatedValue / maxValue) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedValue(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            {/* Background circle */}
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(0, 0, 0, 0.08)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Animated progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: delay / 1000 }}
                    style={{
                        strokeDasharray: circumference
                    }}
                />
            </svg>
        </div>
    );
}