import { useEffect, useState } from "react";
import { TabsSection } from "./components/TabsSection.tsx";
import { MajorsGrid } from "./components/MajorsGrid.tsx";
import { CoursesTable } from "./components/CoursesTable.tsx";
import {type CourseFormData, EditCourseDrawer} from "./components/EditCourseDrawer.tsx";
import {createMajor, getMajors, updateMajor} from "../../../api/MajorsApi.tsx";
import {createCourse, getCourses, updateCourse} from "../../../api/CoursesApi.tsx";
import type { MajorDto } from "../../../types/Major.tsx";
import type { CourseDto } from "../../../types/Course.tsx";
import { TYPING_DELAY } from "../../../utils/Constants.tsx";
import {SEM_ALL, SEMESTER_PARAM_MAP, YEAR_ALL, YEAR_PARAM_MAP} from "./components/UtilsCourseTable.tsx";
import PageHeader from "./components/PageHeader.tsx";
import AddMajorPopup from "../../popups/AddMajorPopup.tsx";


function MajorsCoursesPage() {
    const [activeTab, setActiveTab] = useState<"tracks" | "courses">("tracks");
    const [majors, setMajors] = useState<MajorDto[]>([]);
    const [loadingMajors, setLoadingMajors] = useState(false);
    const [majorsError, setMajorsError] = useState<string | null>(null);
    const [courses, setCourses] = useState<CourseDto[]>([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [coursesError, setCoursesError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [majorFilter, setMajorFilter] = useState<string>("ALL");
    const [yearFilter, setYearFilter] = useState<string>(YEAR_ALL);
    const [semesterFilter, setSemesterFilter] = useState<string>(SEM_ALL);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState<"add" | "edit">("edit");
    const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);
    const [isAddMajorOpen, setIsAddMajorOpen] = useState(false);
    const [editingMajor, setEditingMajor] = useState<MajorDto | null>(null);

    const MAJOR_OPTIONS = [
        { label: "מסלול: הכל", value: "ALL" },
        ...majors.map(m => ({ label: m.name, value: String(m.id) })),
    ];
    const handleAddCourse = () => {
        setSelectedCourse(null);
        setDrawerMode("add");
        setIsDrawerOpen(true);
    };

    const handleEditCourse = (c: CourseDto) => {
        setSelectedCourse(c);
        setDrawerMode("edit");
        setIsDrawerOpen(true);
    };
    useEffect(() => {
        (async () => {
            setLoadingMajors(true);
            try {
                const data = await getMajors();
                setMajors(data);
            } catch {
                setMajorsError("שגיאה בטעינת מסלולים");
            } finally {
                setLoadingMajors(false);
            }
        })();
    }, []);
    useEffect(() => {
        const t = window.setTimeout(() => setSearchQuery(searchInput.trim()), TYPING_DELAY);
        return () => window.clearTimeout(t);
    }, [searchInput]);


    const fetchCourses = async () => {
        setLoadingCourses(true);
        setCoursesError(null);
        try {
            const page = await getCourses({
                page: currentPage - 1,
                size: rowsPerPage,
                search: searchQuery || undefined,
                majorId: majorFilter === "ALL" ? undefined : Number(majorFilter),
                year: YEAR_PARAM_MAP[yearFilter],
                semester: SEMESTER_PARAM_MAP[semesterFilter],
            });

            setCourses(page.content);
            setTotalPages(page.totalPages);
        } catch {
            setCoursesError("שגיאה בטעינת קורסים");
        } finally {
            setLoadingCourses(false);
        }
    };

    const handleSubmitCourse = async (data: CourseFormData ) => {
        if (drawerMode === "edit" && selectedCourse) {
            await updateCourse(selectedCourse.id, {
                courseCode: data.courseCode,
                name: data.name,
                year: data.year === "" ? undefined : data.year,
                semester: data.semester === "" ? undefined : data.semester,
                majorId: data.majorId || undefined,
            });
        } else {
            await createCourse({
                courseCode: data.courseCode,
                name: data.name,
                year: data.year as number,
                semester: data.semester as "A" | "B" | "SUMMER",
                majorId: data.majorId,
            });
        }

        setIsDrawerOpen(false);
        await fetchCourses();
    };



    const handleEditMajor = (major: MajorDto) => {
        setEditingMajor(major);
        setIsAddMajorOpen(true);
    };

    const handleSaveMajor = async (payload: { id?: number; name: string; mode: "add" | "edit" }) => {
        if (payload.mode === "edit" && payload.id != null) {
            await updateMajor(payload.id!, { name: payload.name });
        } else {
            await createMajor({ name: payload.name });
        }

        const data = await getMajors();
        setMajors(data);
        setIsAddMajorOpen(false);
        setEditingMajor(null);
    };


    const handleManageCourses = (majorId: number) => {
        setActiveTab("courses");
        setMajorFilter(String(majorId));
        setCurrentPage(1);
        setSearchInput("");
        setYearFilter(YEAR_ALL);
        setSemesterFilter(SEM_ALL);
    };


    useEffect(() => {
        void fetchCourses();
    }, [currentPage, rowsPerPage, searchQuery, majorFilter, yearFilter, semesterFilter]);

    return (
        <div className="min-h-screen" dir="rtl">
            <div className="max-w-[1200px] mx-auto">
                <PageHeader onAddCourse={handleAddCourse}
                            onAddMajor={() => { setEditingMajor(null); setIsAddMajorOpen(true); }}
                />
                <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="mt-8">
                    {activeTab === "tracks" ? (
                        <MajorsGrid majors={majors}
                                    majorsError={majorsError}
                                    majorsLoading={loadingMajors}
                                    onManageCourses={handleManageCourses}
                                    onEditMajor={handleEditMajor}
                        />
                    ) : (
                        <CoursesTable
                            courses={courses}
                            majors={majors}
                            isLoading={loadingCourses}
                            error={coursesError}
                            searchQuery={searchInput}
                            onSearchQueryChange={setSearchInput}
                            majorFilter={majorFilter}
                            majorOptions={MAJOR_OPTIONS}
                            onMajorFilterChange={setMajorFilter}
                            yearFilter={yearFilter}
                            onYearFilterChange={(v) => { setYearFilter(v); setCurrentPage(1); }}
                            semesterFilter={semesterFilter}
                            onSemesterFilterChange={(v) => { setSemesterFilter(v); setCurrentPage(1); }}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            rowsPerPage={rowsPerPage}
                            onPageChange={setCurrentPage}
                            onRowsPerPageChange={(n) => { setRowsPerPage(n); setCurrentPage(1); }}
                            onEditCourse={handleEditCourse}
                        />
                    )}
                </div>
            </div>

            <EditCourseDrawer
                majorOptions={MAJOR_OPTIONS}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                course={selectedCourse}
                mode={drawerMode}
                onSubmit={handleSubmitCourse}
            />
            <AddMajorPopup
                isOpen={isAddMajorOpen}
                onClose={() => { setIsAddMajorOpen(false); setEditingMajor(null); }}
                onSave={handleSaveMajor}
                mode={editingMajor ? "edit" : "add"}
                majorId={editingMajor?.id}
                initialName={editingMajor?.name ?? ""}
            />
        </div>
    );
}

export default MajorsCoursesPage;
