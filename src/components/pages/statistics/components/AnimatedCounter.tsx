import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { useEffect } from 'react';

interface AnimatedCounterProps {
    value: number;
    duration?: number;
    delay?: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export function AnimatedCounter({
                                    value,
                                    duration = 1.5,
                                    delay = 0,
                                    prefix = '',
                                    suffix = '',
                                    decimals = 0
                                }: AnimatedCounterProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        return prefix + latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            const controls = animate(count, value, { duration, ease: "easeOut" });
            return () => controls.stop();
        }, delay);

        return () => clearTimeout(timer);
    }, [value, duration, delay, count]);

    return <motion.span>{rounded}</motion.span>;
}
