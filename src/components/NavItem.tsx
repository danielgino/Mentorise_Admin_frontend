import { motion, AnimatePresence } from "motion/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

interface NavItemProps {
    label: string;
    to: string;
}

export function NavItem({ label, to }: NavItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink
            to={to}
            className="relative px-4 py-2 text-[#8A3DFF]  hover:text-[#2E86DE] transition-colors duration-200 cursor-pointer group"
            style={{ fontSize: "15px", fontWeight: "600" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {({ isActive }) => (
                <>
                    <span className="relative z-10">{label}</span>
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]"
                                initial={false}
                                transition={{ type: "spring", stiffness: 380, damping: 30, duration: 0.25 }}
                            />
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isHovered && !isActive ? 1 : 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    />

                    <motion.div
                        className="absolute inset-0 rounded-lg bg-white/5 -z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    />
                </>
            )}
        </NavLink>
    );
}
