import { useEffect, useState } from "react";
import { motion } from 'motion/react';
import {
    Users,
    BookOpen,
    DollarSign,
    GraduationCap,
    TrendingUp,
    Star,
    Award,
    Target,
    Sparkles
} from 'lucide-react';
import { StatCard } from "./components/StatCard.tsx";
import { KPICard } from "./components/KPICard.tsx";
import { GrowthChart } from "./components/GrowthChart.tsx";
import { CoursesBarChart } from "./components/CoursesBarChart.tsx";
import { TopMajorCard } from "./components/TopMajorCard.tsx";
import { HighlightCard } from "./components/HighlightCard.tsx";
import {type AdminDashboardStatsResponse, getAdminDashboardStats} from "../../../api/AdminDashboardApi.tsx";


const EMPTY_STATS: AdminDashboardStatsResponse = {
    totalRegisteredUsers: 0,
    totalTutors: 0,
    completedLessons: 0,
    totalCollectedAmount: 0,
    topRequestedCourses: [],
    topTutorMajorName: "",
    topTutorMajorCount: 0,
    topUsersMajorName: "",
    topUsersMajorCount: 0,
    topStudentMajorName: "",
    topStudentMajorCount: 0,
    monthlyLessons: 0,
    previousMonthLessons: 0,
    monthlyLessonsGrowthPct: 0,
    usersGrowthPct: 0,
    currentMonthRevenue: 0,
    previousMonthRevenue: 0,
    revenueGrowthPct: 0,
    topTutorMajors: [],
    growthTimeline: [],
};

export default function Statistics() {
    const [stats, setStats] = useState<AdminDashboardStatsResponse>(EMPTY_STATS);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await getAdminDashboardStats();
                setStats(data);
            } catch {
                // stats load failed; page shows empty state
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    const topRequestedCourse = stats.topRequestedCourses?.[0];

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-[#F5F6F8]" dir="rtl">
            <div className="max-w-[1600px] mx-auto px-6 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 text-center relative"
                >
                    <motion.div
                        className="absolute -top-3 right-1/4 hidden md:block"
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 6, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Sparkles
                            size={22}
                            className="text-[#40E0D0]"
                            style={{ filter: "drop-shadow(0 0 6px rgba(64,224,208,0.35))" }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute -top-5 left-1/4 hidden md:block"
                        animate={{
                            y: [0, -12, 0],
                            rotate: [0, -6, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Star
                            size={18}
                            className="text-[#A66CFF]"
                            style={{ filter: "drop-shadow(0 0 6px rgba(166,108,255,0.3))" }}
                        />
                    </motion.div>

                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
                        סטטיסטיקות המערכת
                    </h1>

                    <p className="text-xl text-gray-600">
                        תמונת מצב עדכנית של פעילות Mentorise
                    </p>

                    {loading && (
                        <p className="mt-3 text-sm text-gray-500">טוען נתונים...</p>
                    )}
                </motion.div>

                {/* Main Stats Grid - 6 Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <StatCard
                        title="משתמשים רשומים"
                        value={stats.totalRegisteredUsers}
                        maxValue={Math.max(stats.totalRegisteredUsers, 1)}
                        icon={Users}
                        color="#40E0D0"
                        delay={100}
                    />
                    <StatCard
                        title="שיעורים שהתקבלו"
                        value={stats.completedLessons}
                        maxValue={Math.max(stats.completedLessons, 1)}
                        icon={BookOpen}
                        color="#2E86DE"
                        delay={200}
                    />
                    <StatCard
                        title="סכום שנאסף מהשיעורים"
                        value={Number(stats.totalCollectedAmount)}
                        maxValue={Math.max(Number(stats.totalCollectedAmount), 1)}
                        icon={DollarSign}
                        color="#A66CFF"
                        delay={300}
                        prefix="₪"
                    />
                    <StatCard
                        title="מספר מתרגלים"
                        value={stats.totalTutors}
                        maxValue={Math.max(stats.totalTutors, 1)}
                        icon={GraduationCap}
                        color="#40E0D0"
                        delay={400}
                    />
                    <StatCard
                        title="המסלול עם הכי הרבה מתרגלים"
                        topLabel={stats.topTutorMajorName || "—"}
                        value={stats.topTutorMajorCount}
                        maxValue={Math.max(stats.topTutorMajorCount, 1)}
                        icon={Award}
                        color="#2E86DE"
                        delay={500}
                    />
                    <StatCard
                        title="הקורס הכי מבוקש לתרגול"
                        topLabel={topRequestedCourse?.name || "—"}
                        value={topRequestedCourse?.count ?? 0}
                        maxValue={Math.max(topRequestedCourse?.count ?? 0, 1)}
                        icon={Target}
                        color="#A66CFF"
                        delay={600}
                    />
                </div>

                {/* KPI Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <KPICard
                        title="סה״כ הכנסות"
                        value={Number(stats.totalCollectedAmount)}
                        icon={DollarSign}
                        color="#40E0D0"
                        delay={700}
                        prefix="₪"
                        trend={{ value: stats.revenueGrowthPct, isPositive: stats.revenueGrowthPct >= 0 }}
                    />
                    <KPICard
                        title="שיעורים החודש"
                        value={stats.monthlyLessons}
                        icon={BookOpen}
                        color="#2E86DE"
                        delay={750}
                        trend={{ value: stats.monthlyLessonsGrowthPct, isPositive: stats.monthlyLessonsGrowthPct >= 0 }}
                    />
                    <KPICard
                        title="שיעור צמיחה"
                        value={stats.usersGrowthPct}
                        icon={TrendingUp}
                        color="#A66CFF"
                        delay={800}
                        suffix="%"
                        trend={{ value: stats.usersGrowthPct, isPositive: stats.usersGrowthPct >= 0 }}
                    />
                </div>

                {/* Detailed Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <GrowthChart data={stats.growthTimeline ?? []} />

                    <CoursesBarChart
                        courses={stats.topRequestedCourses}
                    />
                </div>

                {/* Top Major and Highlight Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2">
                        <TopMajorCard majors={stats.topTutorMajors} />
                    </div>
                    <HighlightCard
                        title="מסלול מוביל"
                        mainValue={stats.topUsersMajorName || "—"}
                        description={`${stats.topUsersMajorCount} משתמשים`}
                        icon={GraduationCap}
                        color="#A66CFF"
                        delay={900}
                        gradient="rgba(166, 108, 255, 0.08)"
                    />
                </div>

                {/* Bottom Highlight Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <HighlightCard
                        title="קורס מבוקש ביותר"
                        mainValue={topRequestedCourse?.name || "—"}
                        description={`${topRequestedCourse?.count ?? 0} בקשות לשיעורים`}
                        icon={Star}
                        color="#40E0D0"
                        delay={1000}
                        gradient="rgba(64, 224, 208, 0.08)"
                    />
                    <HighlightCard
                        title="הכנסות החודש"
                        mainValue={`₪${stats.currentMonthRevenue}`}
                        description={`חודש קודם: ₪${stats.previousMonthRevenue} • צמיחה של ${stats.revenueGrowthPct}%`}
                        icon={Award}
                        color="#2E86DE"
                        delay={1100}
                        gradient="rgba(46, 134, 222, 0.08)"
                    />
                </div>

                {/* Footer Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-500 text-sm">
                        נתונים מעודכנים מהמערכת
                    </p>
                </motion.div>
            </div>
        </div>
    );
}