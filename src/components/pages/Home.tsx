import { Shield, Users, CheckCircle, Settings, Info, AlertTriangle } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden" dir="rtl">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#40E0D0]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-gradient-to-tl from-[#A66CFF]/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-[#2E86DE]/10 to-transparent rounded-full blur-3xl" />

            {/* Content container */}
            <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
                {/* Hero Section */}
                <div className="text-center mb-12 lg:mb-16">
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl mb-6 bg-gradient-to-r from-gray-900 via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
                        ברוכים הבאים למערכת הניהול של Mentorise
                    </h1>

                    <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        מערכת זו נועדה לניהול משתמשים, בקשות מתרגלים, קורסים, מסלולים ותפעול שוטף של הפלטפורמה.
                    </p>
                </div>

                {/* Security Warning Card */}
                <div className="mb-12 lg:mb-16">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-300" />
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/60 shadow-xl">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                                        <AlertTriangle className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl mb-3 text-gray-900">
                                        הערת אבטחה חשובה
                                    </h3>
                                    <p className="text-base lg:text-lg text-gray-700 mb-3 leading-relaxed">
                                        אתר זה נועד לניהול המשתמשים והמערכת בלבד. אין להשאיר את המחשב ללא השגחה בזמן שהמערכת פתוחה.
                                    </p>
                                    <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                                        הגישה למערכת מיועדת למורשים בלבד, ויש להקפיד על שמירה על פרטיות ואבטחת מידע.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="mb-12 lg:mb-16">
                    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/60 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#40E0D0] to-[#2E86DE] flex items-center justify-center shadow-lg">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl text-gray-900">
                                מהי Mentorise?
                            </h2>
                        </div>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                            Mentorise היא פלטפורמה שמטרתה לחבר בין סטודנטים לבין מתרגלים מתאימים מתוך אותו מוסד לימודים. המערכת מאפשרת יצירת התאמה נוחה, אמינה ומסודרת בין מבקשי סיוע לימודי לבין סטודנטים או בוגרים שיכולים ללמד, להסביר וללוות בקורסים רלוונטיים.
                        </p>
                    </div>
                </div>

                {/* Platform Purpose Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
                    {/* Card 1 */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#40E0D0] to-[#2E86DE] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#40E0D0] to-[#2E86DE] flex items-center justify-center mb-6 shadow-lg">
                                <Users className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl mb-3 text-gray-900">
                                ניהול משתמשים
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                צפייה, עדכון וניהול של משתמשי המערכת בהתאם לתפקידים והרשאות.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#2E86DE] to-[#A66CFF] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2E86DE] to-[#A66CFF] flex items-center justify-center mb-6 shadow-lg">
                                <CheckCircle className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl mb-3 text-gray-900">
                                אישור מתרגלים
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                בדיקה ואישור של בקשות מתרגלים לפי ציונים, מסלולים, קורסים ומסמכים מצורפים.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative md:col-span-2 lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#A66CFF] to-[#40E0D0] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#A66CFF] to-[#40E0D0] flex items-center justify-center mb-6 shadow-lg">
                                <Settings className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl mb-3 text-gray-900">
                                שליטה ותפעול
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                ניהול קורסים, מסלולים, בקשות, התראות ותהליכים מרכזיים במערכת במקום אחד.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Admin Note Section */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300" />
                    <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 lg:p-10 border border-white/60 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] flex items-center justify-center shadow-lg">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl text-gray-900">
                                מטרת אתר הניהול
                            </h2>
                        </div>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                            אתר הניהול נבנה כדי לאפשר בקרה, סדר ותפעול יעיל של כל מרכיבי המערכת, תוך שמירה על אמינות, איכות ההתאמה וחוויית שימוש נוחה עבור הסטודנטים והמתרגלים.
                        </p>
                    </div>
                </div>

                {/* Footer branding */}
                <div className="text-center mt-16 pt-8 border-t border-gray-200/50">
                    <p className="text-sm text-gray-500">
                        Mentorise Admin Panel © 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
