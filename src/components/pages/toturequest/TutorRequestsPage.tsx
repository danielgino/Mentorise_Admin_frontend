import { useEffect, useMemo, useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { toast, Toaster } from "sonner";

import { ApplicationDrawer } from "./components/ApplicationDrawer.tsx";
import { ApplicationTable } from "./components/ApplicationTable.tsx";

import type { PageResponse } from "../../../types/PageResponse.tsx";
import type {TutorApplicationDto, TutorApplicationDetailDto} from "../../../types/TutorApplication.tsx";
import {
    approveTutorApplication,
    denyTutorApplication,
    getTutorApplicationDetails,
    getTutorApplications,
} from "../../../api/TutorApplicationApi.tsx";
import {STATUS_OPTIONS} from "./components/UtilsApplicationTable.tsx";
import {FilterDropdown} from "../../../assets/filters/FilterDropdown.tsx";
import {TYPING_DELAY} from "../../../utils/Constants.tsx";

type StatusFilterUI = "all" | "PENDING" | "APPROVED" | "REJECTED";

export default function TutorApplicationsPage() {
    const [applications, setApplications] = useState<TutorApplicationDto[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [AppDetails, setAppDetails] = useState<TutorApplicationDetailDto | null>(null);
    const [appDetailsLoading, setAppDetailsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilterUI>("all");
    const [page, setPage] = useState(0); // 0-based for server
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedNationalId, setDebouncedNationalId] = useState<string | undefined>(undefined);

    const normalizedNationalId = useMemo(() => {
        const digits = searchQuery.replace(/\D/g, "").trim();
        return digits.length ? digits : undefined;
    }, [searchQuery]);


    function loadApplications() {
        setIsLoading(true);
        getTutorApplications({
            page,
            size: rowsPerPage,
            sort: "createdAt,desc",
            status: statusFilter === "all" ? undefined : statusFilter,
            nationalId: debouncedNationalId,
        })
            .then((res) => {
                const data: PageResponse<TutorApplicationDto> = res.data;
                setApplications(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(() => toast.error("שגיאה בטעינת הבקשות"))
            .finally(() => setIsLoading(false));
    }


    useEffect(() => {
        loadApplications();
    }, [page, rowsPerPage, statusFilter,debouncedNationalId]);

    useEffect(() => {
        setPage(0);
    }, [debouncedNationalId]);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedNationalId(normalizedNationalId), TYPING_DELAY);
        return () => clearTimeout(t);
    }, [normalizedNationalId]);

    const handleViewDetails = (application: TutorApplicationDto) => {
        setIsDrawerOpen(true);
        setAppDetails(null);
        setAppDetailsLoading(true);

        getTutorApplicationDetails(application.id)
            .then((res) => setAppDetails(res.data))
            .catch(() => toast.error("שגיאה בטעינת פרטי הבקשה"))
            .finally(() => setAppDetailsLoading(false));
    };
    async function handleApprove(id: number, note: string): Promise<void> {
        try {
            await approveTutorApplication(id, note);
            setApplications(prev =>
                prev.map(a => (a.id === id ? { ...a, status: "APPROVED" } : a))
            );
            setAppDetails(prev =>
                prev && prev.id === id ? { ...prev, status: "APPROVED", adminComment: note } : prev
            );
            toast.success("הבקשה אושרה");
        } catch {
            toast.error("נכשל אישור הבקשה");
        }
    }

    async function handleReject(id: number, note: string): Promise<void> {
        if (!note || !note.trim()) {
            toast.error("יש להזין סיבת דחייה");
            return;
        }
        try {
            await denyTutorApplication(id, note);
            setApplications(prev =>
                prev.map(a => (a.id === id ? { ...a, status: "REJECTED" } : a))
            );
            setAppDetails(prev =>
                prev && prev.id === id ? { ...prev, status: "REJECTED", adminComment: note } : prev
            );
            toast.success("הבקשה נדחתה");
        } catch {
            toast.error("נכשל דחיית הבקשה");
        }
    }

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setTimeout(() => {
            setAppDetails(null);
        }, 250);
    };
    const handleRefresh = () => {
        loadApplications();
        toast.info("הרשימה עודכנה");
    };

    const handleSearchSubmit = () => {
        setPage(0);
    };


    return (
        <div className="min-h-screen  font-['Heebo',sans-serif]" dir="rtl">
            <Toaster position="top-center" />

            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-6xl font-bold mb-4 bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
                        בקשות מתרגלים
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                                size={10}
                            />
                            <input
                                type="text"
                                placeholder="חפש לפי תעודת זהות"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSearchSubmit();
                                }}
                                className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-xl text-right text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                dir="rtl"
                            />
                        </div>

                        <div className="relative">
                            <FilterDropdown
                                label="סטטוס"
                                options={STATUS_OPTIONS}
                                value={statusFilter}
                                onChange={(v) => {
                                    setStatusFilter(v as StatusFilterUI);
                                    setPage(0);
                                }}
                            />
                        </div>

                        <button
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
                            title="רענון"
                        >
                            <RefreshCw size={10} className="text-gray-500" />
                        </button>
                    </div>

                    {isLoading && (
                        <div className="mt-3 text-sm text-gray-500">טוען נתונים...</div>
                    )}
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                    <ApplicationTable
                        applications={applications}
                        onViewDetails={handleViewDetails}
                        currentPage={page + 1}
                        totalPages={totalPages}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(uiPage) => setPage(uiPage - 1)}
                        onRowsPerPageChange={(rows) => { setRowsPerPage(rows); setPage(0); }}
                    />

                </div>
            </div>

            <ApplicationDrawer
                appDetails={AppDetails}
                appDetailsLoading={appDetailsLoading}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
}
