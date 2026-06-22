import { type FormEvent, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Lock, HeartHandshake, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { AxiosError } from "axios";
import { GradientInput } from "../../../assets/inputs/GradientInput.tsx";
import { MentoPrimaryButton } from "../../../assets/buttons/MentoPrimaryButton.tsx";
import { resetAdminPassword } from "../../../api/AuthApi.tsx";

export function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (!token) {
            setError("קישור האיפוס לא תקין או חסר טוקן.");
            return;
        }

        if (newPassword.length < 8) {
            setError("הסיסמה חייבת להכיל לפחות 8 תווים.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("הסיסמאות אינן תואמות.");
            return;
        }

        setIsLoading(true);

        try {
            await resetAdminPassword(token, newPassword);

            setMessage("הסיסמה אופסה בהצלחה. ניתן להתחבר עם הסיסמה החדשה.");

            setTimeout(() => {
                navigate("/login");
            }, 1800);
        } catch (err) {
            const axiosErr = err as AxiosError<{ message?: string }>;
            const serverMessage = axiosErr.response?.data?.message;

            if (serverMessage?.includes("expired")) {
                setError("קישור האיפוס פג תוקף. בקש קישור חדש.");
            } else if (serverMessage?.includes("already been used")) {
                setError("קישור האיפוס כבר נוצל. בקש קישור חדש.");
            } else {
                setError("קישור האיפוס לא תקין או שפג תוקפו.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6" dir="rtl">
            <div className="text-center space-y-2">
                <motion.h1
                    className="
                        flex items-center justify-center gap-2
                        bg-gradient-to-r from-[#2E86DE] to-[#A66CFF]
                        bg-clip-text text-transparent
                        text-2xl font-bold
                    "
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    הגדרת סיסמה חדשה
                    <HeartHandshake
                        className="w-8 h-8"
                        style={{ stroke: "url(#resetPasswordGrad)" }}
                    />

                    <svg width="0" height="0">
                        <linearGradient id="resetPasswordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2E86DE" />
                            <stop offset="100%" stopColor="#A66CFF" />
                        </linearGradient>
                    </svg>
                </motion.h1>

                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    בחר סיסמה חדשה לחשבון האדמין
                </motion.p>
            </div>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <GradientInput
                    type="password"
                    placeholder="סיסמה חדשה"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                />

                <GradientInput
                    type="password"
                    placeholder="אימות סיסמה חדשה"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                />

                <MentoPrimaryButton className="py-1.5" type="submit" fullWidth={true}>
                    {isLoading ? "מעדכן..." : "אפס סיסמה"}
                </MentoPrimaryButton>


                <motion.button
                    type="button"
                    onClick={() => navigate("/")}
                    className="
                        flex items-center justify-center gap-2
                        w-full text-sm text-gray-500
                        hover:text-[#2E86DE]
                        transition-colors
                    "
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <ArrowRight className="w-4 h-4" />
                    חזרה להתחברות
                </motion.button>
            </motion.form>

            {message && (
                <motion.p
                    className="text-center text-sm text-green-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {message}
                </motion.p>
            )}

            {error && (
                <motion.p
                    className="text-center text-sm text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}