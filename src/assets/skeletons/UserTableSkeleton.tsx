
type TableSkeletonProps = {
    rows?: number;
};

function ShimmerBar() {
    return (
        <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#40E0D0]/10 via-[#2E86DE]/10 to-[#A66CFF]/10">
            <div className="animate-[shimmer_1.8s_infinite] absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}

function Cell({ className = "" }: { className?: string }) {
    return (
        <div className={`h-4 rounded-md bg-gray-200/70 ${className}`}>
            <ShimmerBar />
        </div>
    );
}

export function UserTableSkeleton({ rows = 10 }: TableSkeletonProps) {
    // אותו סדר עמודות שקיים אצלך
    const columns = [
        { key: "פעולות",   w: "w-20"  },
        { key: "תאריך עדכון",   w: "w-28"  },
        { key: "תאריך הצטרפות",   w: "w-28"  },
        { key: "פלאפון",     w: "w-32"  },
        { key: "מסלול",     w: "w-40"  },
        { key: "מייל",     w: "w-60"  },
        { key: "בוגר",    w: "w-24"  },
        { key: "תפקיד",      w: "w-28"  },
        { key: "שם מלא",  w: "w-48"  },
        { key: "ת\'ז",  w: "w-40"  },
    ];

    return (
        <div className="hidden lg:block w-full bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="bg-[#F9FAFB] border-b-2 border-transparent">
                    <tr>
                        {columns.map((c) => (
                            <th key={c.key} className="px-6 py-4 text-right">
                                <div className="h-4 w-20 bg-gray-200/70 rounded-md">
                                    <ShimmerBar />
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i} className="h-[64px]">
                            {columns.map((c, j) => (
                                <td key={c.key} className={`px-6 py-4 ${j === 5 ? "truncate" : ""}`}>
                                    <Cell className={`${c.w} max-w-full`} />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between px-4 py-3 border-t bg-white">
                <div className="flex items-center gap-3">
                    <div className="w-24 h-8 bg-gray-200/70 rounded-lg"><ShimmerBar /></div>
                    <div className="w-28 h-8 bg-gray-200/70 rounded-lg"><ShimmerBar /></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                </div>
            </div>
        </div>
    );
}

export function UserCardsSkeleton({ rows = 6 }: TableSkeletonProps) {
    return (
        <div className="lg:hidden space-y-4 animate-pulse">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-4">
                    <div className="flex items-center justify-between">
                        <Cell className="w-40" />
                        <div className="flex gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gray-200/70"><ShimmerBar /></div>
                            <div className="w-9 h-9 rounded-xl bg-gray-200/70"><ShimmerBar /></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <Cell className="w-32" />
                        <Cell className="w-28" />
                        <Cell className="w-40" />
                        <Cell className="w-24" />
                    </div>

                    <div className="mt-4">
                        <Cell className="w-full" />
                    </div>
                </div>
            ))}

            <div className="bg-white rounded-2xl shadow-md p-3 flex items-center justify-between">
                <Cell className="w-24" />
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                    <div className="w-8 h-8 rounded-lg bg-gray-200/70"><ShimmerBar /></div>
                </div>
            </div>
        </div>
    );
}
