import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (rows: number) => void;
    showRowsPerPage?: boolean;

}

export function Pagination({
                               currentPage,
                               totalPages,
                               onPageChange,
                               rowsPerPage,
                               onRowsPerPageChange,
                               showRowsPerPage
                           }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div dir="rtl" className="flex items-center justify-start px-6 py-4 bg-white border-t border-gray-100">

            <div className="flex items-center gap-2">


                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-sm">הקודם</span>
                </button>

                <div className="flex items-center gap-1  ">
                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-9 h-9  flex items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                                currentPage === page
                                    ? "bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <span className="text-sm  ">הבא</span>
                    <ChevronLeft className="w-4 h-4 " />
                </button>

            </div>
            <div className="flex-1" />

            {showRowsPerPage !== false && (
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">שורות לעמוד:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#40E0D0]/30"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            )}
        </div>
    );
}
