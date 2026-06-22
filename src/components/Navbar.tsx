import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NavItem } from "./NavItem";
import { Link, useNavigate } from "react-router-dom";
import { COLLEGE_SHORT_NAME, WEBSITE_NAME } from "../utils/Constants.tsx";
import { useUser } from "../hooks/useUser.ts";

const navLinks = [
    { label: "סטטיסטיקות", to: "/statistics" },
    { label: "שליחת התראות", to: "/notifications" },
    { label: "ניהול בקשות", to: "/requests" },
    { label: "קורסים", to: "/courses" },
    { label: "ניהול משתמשים", to: "/users" },
    { label: "דף בית", to: "/home" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const MotionLink = motion(Link);
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        navigate("/");
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-4"
        >
            <div className="container mx-auto max-w-7xl">
                <div
                    className={`
                        relative rounded-2xl backdrop-blur-[20px]
                        border transition-all duration-300
                        ${
                        scrolled
                            ? "bg-white/10 border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
                            : "bg-white/5 border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
                    }
                    `}
                >
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left: Logo */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] flex items-center justify-center shadow-lg">
                                    <span className="text-white text-[16px] font-extrabold">
                                        {COLLEGE_SHORT_NAME}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span
                                        className="bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent"
                                        style={{ fontSize: "22px", fontWeight: "800" }}
                                    >
                                        {WEBSITE_NAME}
                                    </span>

                                </div>
                            </div>

                            {/* Desktop Nav */}
                            <div className="hidden md:flex items-center gap-2 relative">
                                {navLinks.map((link) => (
                                    <NavItem key={link.label} label={link.label} to={link.to} />
                                ))}
                            </div>

                            {/* Desktop User Area */}
                            <div className="hidden md:flex items-center gap-2">
                                {isAuthenticated && user ? (
                                    <>
                                        <span
                                            className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200"
                                            dir="rtl"
                                        >
                                            ברוך שובך, {user.fullName.split(" ")[0]}
                                        </span>

                                        <button
                                            onClick={handleLogout}
                                            type="button"
                                            dir="rtl"
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-red-50 text-red-700 text-sm font-semibold border border-red-200 hover:bg-red-100 transition-all duration-200"
                                        >
                                            <LogOut size={14} />
                                            <span>התנתקות</span>
                                        </button>
                                    </>
                                ) : null}
                            </div>

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 rounded-lg text-white/90 hover:bg-white/10 transition-colors"
                                aria-label="Toggle menu"
                                type="button"
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0, y: -6 }}
                                    animate={{ height: "auto", opacity: 1, y: 0 }}
                                    exit={{ height: 0, opacity: 0, y: -6 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="md:hidden overflow-hidden"
                                >
                                    <div className="pt-6 pb-4 space-y-2 border-t border-white/10 mt-4">
                                        {navLinks.map((link) => (
                                            <MotionLink
                                                key={link.label}
                                                to={link.to}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5"
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {link.label}
                                            </MotionLink>
                                        ))}

                                        {isAuthenticated && user ? (
                                            <div className="pt-3 flex flex-col items-start gap-3">
                                                <span
                                                    className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200"
                                                    dir="rtl"
                                                >
                                                    שלום, {user.fullName.split(" ")[0]}
                                                </span>

                                                <button
                                                    onClick={handleLogout}
                                                    type="button"
                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-red-50 text-red-700 text-sm font-semibold border border-red-200 hover:bg-red-100 transition-all duration-200 w-fit"
                                                >
                                                    <LogOut size={14} />
                                                    <span>התנתקות</span>
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}