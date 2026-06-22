import { type FormEvent, useState } from "react";
import { Send, RotateCcw, Megaphone } from "lucide-react";
import { toast, Toaster } from "sonner";
import { MentoPrimaryButton } from "../../assets/buttons/MentoPrimaryButton.tsx";
import { MentoOutlineButton } from "../../assets/buttons/MentoOutlineButton.tsx";
import { sendAdminNotification } from "../../api/NotificationsApi.tsx";

type TargetAudience = "all" | "students" | "tutors";

export default function NotificationsPage() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [target, setTarget] = useState<TargetAudience>("all");

    const MAX_TITLE_LENGTH = 50;
    const MIN_TITLE_LENGTH = 3;
    const MAX_MESSAGE_LENGTH = 500;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const trimmedTitle = title.trim();
        const trimmedMessage = message.trim();

        if (!trimmedTitle) {
            toast.error("⚠️ נא להזין כותרת להתראה");
            return;
        }

        if (trimmedTitle.length < MIN_TITLE_LENGTH) {
            toast.error(`⚠️ כותרת ההתראה חייבת להכיל לפחות ${MIN_TITLE_LENGTH} תווים`);
            return;
        }

        if (!trimmedMessage) {
            toast.error("⚠️ נא להזין תוכן להתראה");
            return;
        }

        if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
            toast.error(`⚠️ תוכן ההתראה יכול להכיל עד ${MAX_MESSAGE_LENGTH} תווים`);
            return;
        }

        try {
            await sendAdminNotification({
                title: trimmedTitle,
                message: trimmedMessage,
                target: target.toUpperCase() as "ALL" | "STUDENTS" | "TUTORS",
            });

            const targetText = {
                all: "כל המשתמשים",
                students: "הסטודנטים",
                tutors: "המתרגלים",
            }[target];

            toast.success(`✅ ההתראה "${trimmedTitle}" נשלחה בהצלחה ל${targetText}!`, {
                duration: 3000,
            });

            setTitle("");
            setMessage("");
            setTarget("all");
        } catch {
            toast.error("❌ שליחת ההתראה נכשלה");
        }
    };

    const handleReset = () => {
        setTitle("");
        setMessage("");
        setTarget("all");
    };

    const targetOptions = [
        { value: "all" as const, label: "לכל המשתמשים" },
        { value: "students" as const, label: "לסטודנטים בלבד" },
        { value: "tutors" as const, label: "למתרגלים בלבד" },
    ];

    return (
        <div
            dir="rtl"
            className="min-h-screen flex items-start justify-center pt-20 p-4 sm:p-6 lg:p-8 bg-[#F9FAFB]"
        >
            <Toaster position="top-center" richColors dir="rtl" />

            <div className="w-full max-w-3xl">
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]" />

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#40E0D0] to-[#A66CFF] mb-4 shadow-lg shadow-[#40E0D0]/20">
                            <span className="text-white">
                                <Megaphone size={30} />
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
שליחת התראה חדשה                         </h1>
                        <p className="text-gray-500 text-sm">
                            מערכת Mentorise - שליחת הודעות למשתמשי האפליקציה
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-gray-700 font-semibold">
                                    כותרת ההתראה
                                </label>
                                <span className="text-sm text-gray-400">
                                    {title.length}/{MAX_TITLE_LENGTH}
                                </span>
                            </div>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="הקלד כאן את כותרת ההתראה..."
                                maxLength={MAX_TITLE_LENGTH}
                                className="w-full px-4 py-3 rounded-2xl outline-none transition-all duration-200 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#40E0D0] focus:bg-white focus:ring-4 focus:ring-[#40E0D0]/10"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-gray-700 font-semibold">
                                    תוכן ההתראה
                                </label>
                                <span
                                    className={`text-sm ${
                                        message.length >= MAX_MESSAGE_LENGTH
                                            ? "text-red-500"
                                            : "text-gray-400"
                                    }`}
                                >
                                    {message.length}/{MAX_MESSAGE_LENGTH}
                                </span>
                            </div>

                            <div className="relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={MAX_MESSAGE_LENGTH}
                                    placeholder="הקלד כאן את תוכן ההתראה שתרצה לשלוח למשתמשים..."
                                    rows={6}
                                    className="w-full px-4 py-3 rounded-2xl resize-none outline-none transition-all duration-200 bg-gray-50 border-2 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#40E0D0] focus:bg-white focus:ring-4 focus:ring-[#40E0D0]/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-3 font-semibold">
                                בחירת יעד ההתראה
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {targetOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setTarget(option.value)}
                                        className={`px-5 py-2.5 rounded-full transition-all duration-200 font-semibold border-2 ${
                                            target === option.value
                                                ? "bg-gradient-to-r from-[#40E0D0] to-[#A66CFF] text-white border-transparent bg-clip-padding overflow-hidden scale-105 shadow-lg shadow-[#40E0D0]/30"
                                                : "bg-white text-gray-700 border-gray-200 hover:border-[#40E0D0] hover:bg-gradient-to-r hover:from-[#40E0D0]/10 hover:to-[#A66CFF]/10"
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
                            <MentoPrimaryButton
                                type="submit"
                                className="sm:self-center py-0.5 flex-grow sm:flex-grow"
                                rightIcon={<Send />}
                            >
                                שלח התראה
                            </MentoPrimaryButton>

                            <MentoOutlineButton
                                type="button"
                                shape="rounded"
                                rightIcon={<RotateCcw />}
                                onClick={handleReset}
                            >
                                אפס טופס
                            </MentoOutlineButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}