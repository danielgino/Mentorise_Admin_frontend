import {type FormEvent, useState} from "react";
import { motion } from "motion/react";
import { GradientInput } from "../../../assets/inputs/GradientInput.tsx";
import { GradientButton } from "../../../assets/buttons/GradientButton.tsx";
import { Mail, Lock } from "lucide-react";
import {useNavigate} from "react-router-dom";
import {apiClient} from "../../../api/ApiClient.tsx";
import {useUser} from "../../../hooks/UserProvider.tsx";

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
            const res = await apiClient.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);

            // אפשר זריזות: אם ה-login מחזיר שם
            if (res.data.fullName) {
                setUser({
                    id: res.data.id,
                    fullName: res.data.fullName,
                    email: res.data.email,
                    role: res.data.role,
                });
            }

            await fetchUserDetails();

            navigate("/home");
        } catch (err: any) {
            if (err.response?.data?.error === "InvalidCredentials") setError("דוא״ל או סיסמה לא נכונים");
            else setError("שגיאה בהתחברות");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="space-y-6" dir="rtl">
            <div className="text-center space-y-2">
                <motion.h1
                    className="bg-gradient-to-r from-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    ברוך שובך
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
                    <motion.a
                        href="#"
                        className="text-[#2E86DE] hover:text-[#A66CFF] transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        שכחת את הסיסמא?
                    </motion.a>
                </div>

                <GradientButton type="submit">
                   התחבר
                </GradientButton>
            </motion.form>
            {error }

            {/* Divider */}
            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
          {/*      <div className="relative flex justify-center">*/}
          {/*<span className="px-4 bg-white text-gray-500">*/}
          {/*  or continue with*/}
          {/*</span>*/}
          {/*      </div>*/}
            </div>

            <motion.p
                className="text-center text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                {/*<motion.a*/}
                {/*    href="#"*/}
                {/*    className="text-[#2E86DE] hover:text-[#A66CFF] transition-colors duration-300"*/}
                {/*    whileHover={{ scale: 1.02 }}*/}
                {/*    whileTap={{ scale: 0.98 }}*/}
                {/*>*/}
                {/*    Sign up*/}
                {/*</motion.a>*/}
            </motion.p>
        </div>
    );
}
