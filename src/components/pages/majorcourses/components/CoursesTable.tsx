import {Pencil, Search, Trash2} from "lucide-react";
import { FilterDropdown } from "../../../../assets/filters/FilterDropdown.tsx";
import type { CourseDto } from "../../../../types/Course.tsx";
import {Pagination} from "../../../../assets/pagination/Pagination.tsx";
import type {MajorDto} from "../../../../types/Major.tsx";
import {
    COURSE_ACTIONS,
    COURSE_CODE,
    COURSE_MAJOR,
    COURSE_NAME,
    COURSE_SEMESTER,
    COURSE_YEAR, formatSemester, formatYear, type SelectOption, SEMESTER_FILTER_OPTIONS, YEAR_FILTER_OPTIONS
} from "./UtilsCourseTable.tsx";
import {CoursesTableSkeleton} from "../../../../assets/skeletons/CoursesTableSkeleton.tsx";

interface CoursesTableProps {
    courses: CourseDto[];
    isLoading: boolean;
    error: string | null;
    searchQuery: string;
    onSearchQueryChange: (v: string) => void;
    majors: MajorDto[];
    majorFilter: string;
    onMajorFilterChange: (v: string) => void;
    majorOptions: SelectOption[];
    yearFilter: string;
    onYearFilterChange: (v: string) => void;
    semesterFilter: string;
    onSemesterFilterChange: (v: string) => void;
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (p: number) => void;
    onRowsPerPageChange: (n: number) => void;
    onEditCourse: (c: CourseDto) => void;
}

export function CoursesTable(props: CoursesTableProps) {
    const {
        courses, isLoading, error,
        searchQuery, onSearchQueryChange,
        majorFilter, onMajorFilterChange,
        yearFilter, onYearFilterChange,
        semesterFilter, onSemesterFilterChange,
        currentPage, totalPages, rowsPerPage, onPageChange, onRowsPerPageChange,
        onEditCourse,majorOptions
    } = props;


    return (
        <div >
            <div className="mb-6 space-y-4" >
                <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        placeholder="חפש לפי שם קורס או קוד קורס"
                        className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    />
                </div>

                <div className="flex flex-wrap gap-3 items-center">

                    <FilterDropdown
                        label="מסלול"
                        options={majorOptions}
                        value={majorFilter}
                        onChange={(v) => { onMajorFilterChange(v); onPageChange(1); }}
                    />

                    <FilterDropdown
                        label="שנה"
                        value={yearFilter}
                        onChange={(v) => { onYearFilterChange(v); onPageChange(1); }}
                        options={YEAR_FILTER_OPTIONS}
                    />
                    <FilterDropdown
                        label="סמסטר"
                        value={semesterFilter}
                        onChange={(v) => { onSemesterFilterChange(v); onPageChange(1); }}
                        options={SEMESTER_FILTER_OPTIONS}
                    />
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {isLoading ? (
                    <CoursesTableSkeleton />
                ) : error ? (
                    <div className="p-6 text-red-600">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F9FAFB] border-b-2 border-transparent">
                            <tr>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_CODE}</th>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_NAME}</th>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_MAJOR}</th>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_SEMESTER}</th>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_YEAR}</th>
                                <th className="px-6 py-4 text-right text-gray-700">{COURSE_ACTIONS}</th>

                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {courses.map((course) => (
                                <tr key={course.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900">{course.courseCode}</td>
                                    <td className="px-6 py-4 text-gray-900">{course.name}</td>
                                    <td className="px-6 py-4 text-gray-900">{course.majorName}</td>
                                    <td className="px-6 py-4 text-gray-900">{formatSemester(course.semester)}</td>
                                    <td className="px-6 py-4 text-gray-900">{formatYear(course.year)}</td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => onEditCourse(course)}
                                                className="p-1.5 rounded-lg hover:bg-white transition-colors group"
                                                title="עריכה"
                                            >
                                                <Pencil className="w-4 h-4 text-gray-400 group-hover:text-[#2E86DE]" />
                                            </button>
                                            <button className="p-1.5 rounded-lg hover:bg-white transition-colors group" title="מחיקה">
                                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {courses.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        לא נמצאו קורסים נסה סינון אחר
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="mt-6 " dir="ltr">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={onRowsPerPageChange}
                    showRowsPerPage={true}
                />
            </div>
        </div>
    );
}
