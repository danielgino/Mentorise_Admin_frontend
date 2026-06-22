import {type FormEvent, useState} from "react";
import { motion } from "motion/react";
import { GradientInput } from "../../../assets/inputs/GradientInput.tsx";
import {Mail, Lock, HeartHandshake} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../../api/AuthApi.tsx";
import {useUser} from "../../../hooks/useUser.ts";
import {MentoPrimaryButton} from "../../../assets/buttons/MentoPrimaryButton.tsx";

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { fetchUserDetails, setUser } = useUser();



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await loginUser(email, password);
            localStorage.setItem("token", res.token);

            if (res.fullName) {
                setUser({
                    id: res.id,
                    fullName: res.fullName,
                    email: res.email,
                    role: res.role,
                });
            }

            await fetchUserDetails();

            navigate("/home");
        } catch {
            setError("פרטי ההתחברות שגויים");
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
    bg-gradient-to-r from-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent
    text-2xl font-bold
  "                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    ברוך שובך
                    <HeartHandshake
                        className="w-8 h-8"
                        style={{
                            stroke: "url(#grad)",
                        }}
                    />
                    <svg width="0" height="0">
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2E86DE" />
                            <stop offset="100%" stopColor="#A66CFF" />
                        </linearGradient>
                    </svg>

                </motion.h1>
                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    אנא הזדהה לכניסה למערכת
                </motion.p>
            </div>

            {/* LoginForm Form */}
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                {/* Email Input */}
                <GradientInput
                    type="email"
                    placeholder="דואר אלקטרוני"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-5 h-5" />}
                    required
                />

                <GradientInput
                    type="password"
                    placeholder="סיסמא"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-5 h-5" />}
                    required
                />

                <div className="flex justify-right">
                    <motion.button
                        type="button"
                        onClick={() => navigate("/admin/forgot-password")}
                        className="text-[#2E86DE] hover:text-[#A66CFF] transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        שכחת את הסיסמא?
                    </motion.button>
                </div>


                <MentoPrimaryButton className="py-1.5" type="submit" fullWidth={true}>
                    {isLoading ? "מתחבר..." : "התחבר"}
                </MentoPrimaryButton>

            </motion.form>
            {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-center text-sm text-red-700">
                    {error}
                </div>
            )}

            <motion.p
                className="text-center text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
            </motion.p>
        </div>
    );
}
