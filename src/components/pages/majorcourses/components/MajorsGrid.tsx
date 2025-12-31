import { Search, Pencil, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { MajorDto } from "../../../../types/Major.tsx";
import {MajorsGridSkeleton} from "../../../../assets/skeletons/MajorsGridSkeleton.tsx";
import Swal from "sweetalert2";
import {deleteMajor} from "../../../../api/MajorsApi.tsx";
import {Pagination} from "../../../../assets/pagination/Pagination.tsx";

type Props = {
    majors: MajorDto[];
    majorsLoading?: boolean;
    majorsError?: string | null;
    onManageCourses?: (majorId: number) => void;
    onEditMajor?: (major: MajorDto) => void;

};

export function MajorsGrid({ majors, majorsLoading, majorsError,onManageCourses,onEditMajor }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');
    const itemsPerPage = 6;

    const filtered = useMemo(() => {
        const q = query.trim();
        if (!q) return majors;
        return majors.filter(m => (m.name ?? '').includes(q));
    }, [majors, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMajors = filtered.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };



    const handleDelete = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: "?האם אתה בטוח",
                text: "המסלול וכל הקורסים שלו ימחק לצמיתות ולא יהיה ניתן לשחזרן",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#A66CFF",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן,מחק מסלול וקורסים",
                reverseButtons: true


            });

            if (!result.isConfirmed) return;

            await deleteMajor(id);

            await Swal.fire({

                title: "!המחיקה הושלמה",
                text: "המסלול נמחק מהמערכת",
                icon: "success"
            });

        } catch (error) {
            console.error("Delete failed:", error);
            await Swal.fire({
                title: "!שגיאה",
                text: "פעולת המחיקה נכשלה",
                icon: "error"
            });
        }
    };

    if (majorsLoading) return <MajorsGridSkeleton />;

    if (majorsError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4">
                {majorsError}
            </div>
        );
    }

    if (filtered.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
                לא נמצאו מסלולים תואמים.
            </div>
        );
    }

    return (
        <div>
            <div className="flex gap-4 mb-6 items-center">
                <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="חפש מסלול לפי שם"
                        className="w-full pr-11 pl-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                        value={query}
                        onChange={(e) => { setCurrentPage(1); setQuery(e.target.value); }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
                {currentMajors.map((major) => (
                    <div
                        key={major.id}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                    >
                        <div className="mb-4 ">

                            <h3 className="text-xl font-bold text-gray-700 mb-2">{major.name}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#40E0D0]/10 via-[#2E86DE]/10 to-[#A66CFF]/10 text-[#2E86DE] text-sm border border-[#2E86DE]/20">
                קמפוס אשקלון
              </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#40E0D0]/10 via-[#2E86DE]/10 to-[#A66CFF]/10 text-[#2E86DE] text-sm border border-[#2E86DE]/20">
                תואר ראשון • 3 שנים
              </span>

                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex gap-2">
                                <button  onClick={() => onEditMajor?.(major)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors group" title="עריכת מסלול">
                                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-[#2E86DE]" />
                                </button>
                                <button onClick={()=>handleDelete(major.id)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors group" title="מחיקת מסלול">
                                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                                </button>
                            </div>
                            <button onClick={() => onManageCourses?.(major.id)} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#40E0D0]/10 to-[#A66CFF]/10 text-[#2E86DE] hover:from-[#40E0D0]/20 hover:to-[#A66CFF]/20 transition-colors text-sm">
                                ניהול קורסים במסלול
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center">
                <div className="text-gray-600 min-w-[180px]">
                    עמוד {currentPage} מתוך {totalPages}
                </div>

                <div className="flex-1 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goToPage}
                        rowsPerPage={itemsPerPage}
                        onRowsPerPageChange={() => {}}
                        showRowsPerPage={false}
                    />
                </div>
                <div className="min-w-[180px]" />
            </div>

        </div>
    );
}
