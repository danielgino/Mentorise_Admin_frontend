import { motion } from 'motion/react';
import type {LucideIcon} from 'lucide-react';

interface HighlightCardProps {
    title: string;
    mainValue: string;
    description: string;
    icon: LucideIcon;
    color: string;
    delay: number;
    gradient: string;
}

export function HighlightCard({
                                  title,
                                  mainValue,
                                  description,
                                  icon: Icon,
                                  color,
                                  delay,
                                  gradient
                              }: HighlightCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: delay / 1000 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            style={{
                background: `linear-gradient(to bottom, ${gradient}, white)`
            }}
        >
            <div className="relative">
                <div className="flex items-start justify-between mb-6">
                    <div
                        className="p-4 rounded-xl bg-white/80 border border-gray-100"
                    >
                        <Icon size={32} style={{ color }} />
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
                    <div className="text-5xl font-bold text-gray-900 mb-2">
                        {mainValue}
                    </div>
                    <p className="text-gray-600 text-base">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}
