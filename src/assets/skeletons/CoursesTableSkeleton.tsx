import {
    COURSE_ACTIONS,
    COURSE_CODE,
    COURSE_MAJOR,
    COURSE_NAME,
    COURSE_SEMESTER,
    COURSE_YEAR
} from "../../components/pages/majorcourses/components/UtilsCourseTable.tsx";

export function CoursesTableSkeleton() {
    const rows = Array.from({ length: 6 });

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#F9FAFB] border-b-2 border-transparent">
                    <tr>
                        {[COURSE_CODE, COURSE_NAME, COURSE_MAJOR, COURSE_SEMESTER, COURSE_YEAR, COURSE_ACTIONS].map(
                            (header, idx) => (
                                <th key={idx} className="px-6 py-4 text-right text-gray-700 text-sm">
                                    {header}
                                </th>
                            )
                        )}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {rows.map((_, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4">
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-10 bg-gray-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 w-10 bg-gray-200 rounded" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-3">
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                    <div className="h-4 w-4 bg-gray-200 rounded" />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
