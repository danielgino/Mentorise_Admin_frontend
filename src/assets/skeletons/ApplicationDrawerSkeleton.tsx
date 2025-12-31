
function SkeletonLine({ className = "" }: { className?: string }) {
    return <div className={`animate-pulse bg-gray-100 rounded-md ${className}`} />;
}

export function ApplicationDrawerSkeleton() {
    return (
        <div className="px-6 py-6 space-y-6">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <SkeletonLine className="h-4 w-16" />
                    <SkeletonLine className="h-6 w-40 rounded-lg" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonLine className="h-4 w-16" />
                    <SkeletonLine className="h-6 w-48 rounded-lg" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonLine className="h-4 w-24" />
                    <SkeletonLine className="h-6 w-36 rounded-lg" />
                </div>
                <div className="flex items-center gap-2">
                    <SkeletonLine className="h-4 w-24" />
                    <SkeletonLine className="h-8 w-24 rounded-lg" />
                </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="space-y-3">
                <SkeletonLine className="h-4 w-24" />
                <SkeletonLine className="h-6 w-64 rounded-lg" />
                <SkeletonLine className="h-6 w-52 rounded-lg" />
            </div>

            <div className="h-px bg-gray-200" />

            <div className="space-y-3">
                <SkeletonLine className="h-4 w-28" />
                <div className="flex flex-wrap gap-2">
                    <SkeletonLine className="h-6 w-28 rounded-lg" />
                    <SkeletonLine className="h-6 w-24 rounded-lg" />
                    <SkeletonLine className="h-6 w-20 rounded-lg" />
                </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex gap-3 justify-start">
                <button className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
                    אשר
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
                    דחה
                </button>
            </div>
        </div>
    );
}
