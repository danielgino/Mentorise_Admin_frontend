
export function MajorsGridSkeleton() {
    return (
        <div>
            <div className="flex gap-4 mb-6 items-center">
                <div className="flex-1">
                    <div className="h-10 rounded-xl bg-gray-200/70 animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="h-6 w-2/3 bg-gray-200/70 rounded mb-4 animate-pulse" />
                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="h-7 w-32 bg-gray-200/70 rounded-full animate-pulse" />
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            <div className="h-7 w-40 bg-gray-200/70 rounded-full animate-pulse" />
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="h-9 w-9 rounded-lg bg-gray-200/70 animate-pulse" />
                                <div className="h-9 w-9 rounded-lg bg-gray-200/70 animate-pulse" />
                                <div className="h-9 w-9 rounded-lg bg-gray-200/70 animate-pulse" />
                            </div>
                            <div className="h-9 w-40 rounded-lg bg-gray-200/70 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <div className="h-6 w-40 bg-gray-200/70 rounded animate-pulse" />
                <div className="flex items-center gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-10 w-10 bg-gray-200/70 rounded-xl animate-pulse" />
                    ))}
                </div>
                <div className="w-[120px]" />
            </div>
        </div>
    );
}
