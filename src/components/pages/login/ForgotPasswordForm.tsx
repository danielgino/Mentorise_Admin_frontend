import { type FormEvent, useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GradientInput } from "../../../assets/inputs/GradientInput.tsx";
import { MentoPrimaryButton } from "../../../assets/buttons/MentoPrimaryButton.tsx";
import { forgotAdminPassword } from "../../../api/AuthApi.tsx";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setIsLoading(true);

        try {
            await forgotAdminPassword(email);

            setMessage("אם המייל קיים במערכת, נשלח אליו קישור לאיפוס סיסמה.");
        } catch {
            setError("אירעה שגיאה בשליחת בקשת האיפוס. נסה שוב.");
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
                    איפוס סיסמת אדמין
                    <HeartHandshake
                        className="w-8 h-8"
                        style={{ stroke: "url(#forgotPasswordGrad)" }}
                    />

                    <svg width="0" height="0">
                        <linearGradient id="forgotPasswordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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
                    הכנס את כתובת המייל של חשבון האדמין
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
                    type="email"
                    placeholder="דואר אלקטרוני"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-5 h-5" />}
                    required
                />

                <MentoPrimaryButton className="py-1.5" type="submit" fullWidth={true}>
                    {isLoading ? "שולח..." : "שלח קישור לאיפוס סיסמה"}
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