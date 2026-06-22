import { motion } from 'motion/react';
import { Trophy, TrendingUp } from 'lucide-react';

interface MajorStat {
    name: string;
    tutorCount: number;
    percentageOfTotalUsers: number;
}

interface TopMajorCardProps {
    majors?: MajorStat[];
}

export function TopMajorCard({ majors = [] }: TopMajorCardProps) {
    const majorsData = majors.slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm"
        >
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">מסלולים לפי מתרגלים</h3>
                <p className="text-gray-600 text-sm">5 המסלולים המובילים לפי כמות מתרגלים</p>
            </div>

            <div className="space-y-4">
                {majorsData.length === 0 ? (
                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-500 text-center">
                        אין נתונים להצגה
                    </div>
                ) : (
                    majorsData.map((major, index) => (
                        <motion.div
                            key={major.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                            className={`relative overflow-hidden rounded-xl p-4 ${
                                index === 0
                                    ? 'bg-gradient-to-r from-[#A66CFF]/10 to-[#40E0D0]/10 border-2 border-[#A66CFF]/20'
                                    : 'bg-gray-50 border border-gray-100'
                            }`}
                        >
                            {index === 0 && (
                                <div className="absolute top-2 right-2">
                                    <Trophy size={20} className="text-[#FFD700]" />
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl font-bold text-gray-300">#{index + 1}</span>
                                    <div>
                                        <h4 className="text-gray-900 font-semibold">{major.name}</h4>
                                        <p className="text-gray-600 text-sm">{major.tutorCount} מתרגלים</p>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <div className="text-lg font-bold text-[#40E0D0]">
                                        {major.percentageOfTotalUsers}%
                                    </div>
                                    {index === 0 && (
                                        <div className="flex items-center gap-1 text-emerald-600 text-xs">
                                            <TrendingUp size={12} />
                                            <span>מוביל</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(major.percentageOfTotalUsers, 100)}%` }}
                                    transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: "easeOut" }}
                                    className="h-full rounded-full"
                                    style={{
                                        background: index === 0
                                            ? 'linear-gradient(90deg, #A66CFF, #40E0D0)'
                                            : 'linear-gradient(90deg, #2E86DE, #40E0D0)'
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
}