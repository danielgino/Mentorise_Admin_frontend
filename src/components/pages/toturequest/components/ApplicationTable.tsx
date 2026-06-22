import { StatusBadge } from './StatusBadge.tsx';
import type {TutorApplicationDto} from "../../../../types/TutorApplication.tsx";
import {formatDateTime} from "../../../../utils/Constants.tsx";
import {mapRoleToLabel} from "../../../../api/NormalizeUser.tsx";
import {Pagination} from "../../../../assets/pagination/Pagination.tsx";
import {
    APP_TYPE_UPDATE,
    HEADER_APP_TYPE,
    HEADER_FULL_NAME,
    HEADER_ID_NUMBER,
    HEADER_ROLE,
    HEADER_STATUS, HEADER_SUBMISSION_DATE,
    HEADER_TRACK, HEADER_TRANSCRIPT
} from "./UtilsApplicationTable.tsx";


interface ApplicationsTableProps {
    applications: TutorApplicationDto[];
    onViewDetails: (application: TutorApplicationDto) => void;
    currentPage: number;       // 1-based ל-UI
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (uiPage: number) => void;
    onRowsPerPageChange: (rows: number) => void;
}

export function ApplicationTable({
                                      applications,
                                      onViewDetails,
                                        currentPage,
                                        totalPages,
                                        rowsPerPage,
                                        onPageChange,
                                        onRowsPerPageChange,

                                  }: ApplicationsTableProps) {
    if (applications.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-gray-500 text-base">
                    אין בקשות ממתינות כרגע
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto" dir="rtl">
            <table className="w-full">
                <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_ID_NUMBER}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_FULL_NAME}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_APP_TYPE}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_ROLE}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_TRACK}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_STATUS}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_TRANSCRIPT}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">{HEADER_SUBMISSION_DATE}</th>

                </tr>
                </thead>
                <tbody>
                {applications.map((request) => (
                    <tr
                        key={request.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                        onClick={() => onViewDetails(request)}
                    >


                        <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                            {request.nationalId}
                        </td>
                        <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                            {request.fullName}
                        </td>
                        <td className="px-6 py-4">
                            {request.applicationType === APP_TYPE_UPDATE ? (
                                <span className="bg-amber-50 text-amber-800 border border-amber-200 rounded-xl px-3 py-1 text-sm font-semibold">
                                    עדכון תחומי תרגול
                                </span>
                            ) : (
                                <span className="bg-green-50 text-green-800 border border-green-200 rounded-xl px-3 py-1 text-sm font-semibold">
                                    בקשה ראשונית
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                            {mapRoleToLabel(request.role)}
                        </td>
                        <td className="px-6 py-4 text-gray-900 text-sm">
                            {request.majorName}
                        </td>
                        <td className="px-6 py-4">
                            <StatusBadge status={request.status} />
                        </td>
                        <td className="px-6 py-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(request.transcriptUrl, '_blank');
                                }}
                                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors duration-150"
                            >
                                צפה
                            </button>
                        </td>

                        <td className="px-6 py-4 text-gray-900 text-sm">
                            {formatDateTime(request.createdAt)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.max(totalPages, 1)}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
                showRowsPerPage
            />
        </div>
    );
}
