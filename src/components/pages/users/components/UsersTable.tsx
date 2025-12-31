import { useState } from "react";
import {Plus, UserPlus} from "lucide-react";
import { SearchBar } from "../../../../assets/inputs/SearchBar.tsx";
import { FilterDropdown } from "../../../../assets/filters/FilterDropdown.tsx";
import { TableRow } from "./TableRow.tsx";
import { Pagination } from "../../../../assets/pagination/Pagination.tsx";
import { UserCard } from "./UserCard.tsx";
import Swal from "sweetalert2";

import {
    ACTIONS,
    CREATED_AT, DATE_FILTER_OPTIONS,
    EMAIL,
    FULL_NAME, IS_ALUMNI,
    NATIONAL_ID, PHONE_NUMBER,
    ROLE, ROLE_FILTER_OPTIONS,
    MAJOR, ALUMNI_FILTER_OPTIONS,
    UPDATED_AT
} from "./UtilsUserTable.tsx";
import {COLLEGE_FULL_NAME} from "../../../../utils/Constants.tsx";
import {EditUserPopup} from "./EditUserPopup.tsx";
import type {ApiUserDto, User} from "../../../../types/User.tsx";
import { AddAdminPopup, type AddAdminForm } from "./AddAdminPopup.tsx";
import {createAdmin, deleteUser} from "../../../../api/UsersManagementApi.tsx";
import {UserTableSkeleton} from "../../../../assets/skeletons/UserTableSkeleton.tsx";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";

interface TableProps {
    users: User[];

    isLoading: boolean;

    searchQuery: string;
    onSearchQueryChange: (value: string) => void;

    roleFilter: string;
    onRoleFilterChange: (value: string) => void;

    alumniFilter: string;
    onAlumniFilterChange: (value: string) => void;

    dateFilter: string;
    onDateFilterChange: (value: string) => void;

    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (size: number) => void;
    onUserDeleted?: (id: number) => void;
}

export default function UsersTable({
                                  users,
                                  isLoading,
                                  searchQuery,
                                  onSearchQueryChange,
                                  roleFilter,
                                  onRoleFilterChange,
                                  alumniFilter,
                                  onAlumniFilterChange,
                                  dateFilter,
                                  onDateFilterChange,
                                  currentPage,
                                  totalPages,
                                  rowsPerPage,
                                  onPageChange,
                                  onRowsPerPageChange,
                                  onUserDeleted,
                              }: TableProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
    const paginatedUsers = users;



    const openEdit = (user: User) => {
        setEditingUser((user));
        setIsEditOpen(true);
    };

    const handleEdit = (id: number) => {
        const u = users.find(x => x.id === id);
        if (u) openEdit(u);
    };


    const handleDelete = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: "?האם אתה בטוח",
                text: "המשתמש ימחק לצמיתות ולא יהיה ניתן לשחזרו",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#A66CFF",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן,מחק משתמש",
                reverseButtons: true


            });

            if (!result.isConfirmed) return;

            await deleteUser(id);
            onUserDeleted?.(id);
            await Swal.fire({

                title: "!המחיקה הושלמה",
                text: "המשתמש נמחק מהמערכת",
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


    const handleAddAdminUser = () => {
        setIsAddAdminOpen(true);
    };
    const handleCreateAdmin = async (data: AddAdminForm) => {
        try {
            await createAdmin({
                nationalId: data.nationalId,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
            });
            setIsAddAdminOpen(false);


        } catch (err) {
            console.error("Failed to create admin:", err);
            throw err;
        }
    };

    return (
        <div className="min-h-screen">
            <header className="top-0 z-40 w-full flex justify-center">
                <div className="bg-white/40 backdrop-blur-md border-b border-white/10 shadow-sm
                    w-full max-w-[1450px] px-6 py-4 rounded-b-2xl">
                <div className="flex items-center gap-3">
                        <h1
                            className="text-2xl  tracking-tight"
                            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800 }}
                        >
              <span className="bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
                {COLLEGE_FULL_NAME}
              </span>{" "}
                            Admin
                        </h1>
                        <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-[#40E0D0]/20 to-[#A66CFF]/20 text-[#2E86DE] rounded-full border border-[#40E0D0]/30">
              beta
            </span>
                    </div>
                    <div className="h-0.5 mt-3 bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] rounded-full" />
                </div>
            </header>

            <main className="max-w-[1500px] mx-auto px-6 py-8">
                <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    <SearchBar
                        value={searchQuery}
                        onChange={onSearchQueryChange}
                        placeholder="חפש משתמשים לפי ת.ז"
                    />

                    <div className="flex flex-wrap gap-3 items-center" dir="rtl">
                        <MentoPrimaryButton
                            onClick={handleAddAdminUser}
                            size="md"
                            shape="rounded"
                            leftIcon={<Plus />}
                        >
                            הוסף אדמין
                        </MentoPrimaryButton>
                        <FilterDropdown
                            label="תפקיד"
                            value={roleFilter}
                            onChange={onRoleFilterChange}
                            options={ROLE_FILTER_OPTIONS}
                        />
                        <FilterDropdown
                            label="בוגרים"
                            value={alumniFilter}
                            onChange={onAlumniFilterChange}
                            options={ALUMNI_FILTER_OPTIONS}
                        />
                        <FilterDropdown
                            label="תאריך הצטרפות"
                            value={dateFilter}
                            onChange={onDateFilterChange}
                            options={DATE_FILTER_OPTIONS}
                        />

                    </div>
                </div>

                <div className="hidden lg:block w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? <UserTableSkeleton/>:
                        <table className="w-full  table-fixed">
                            <thead className="bg-[#F9FAFB] border-b-2 border-transparent">
                            <tr>
                                <th className="px-6 py-4 text-right">{ACTIONS}</th>
                                <th className="px-6 py-4 text-right">{UPDATED_AT}</th>
                                <th className="px-6 py-4 text-right">{CREATED_AT}</th>
                                <th className="px-4 py-4 text-right">{PHONE_NUMBER}</th>
                                <th className="px-6 py-4 text-right">{MAJOR}</th>
                                <th className="px-4 py-4 text-right">{EMAIL}</th>
                                <th className="px-4 py-4 text-right">{IS_ALUMNI}</th>
                                <th className="px-6 py-4 text-right">{ROLE}</th>
                                <th className="px-6 py-4 text-right">{FULL_NAME}</th>
                                <th className="px-6 py-4 text-right">{NATIONAL_ID}</th>

                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {paginatedUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    user={user}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                            </tbody>
                        </table>}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </div>

                {/* Mobile */}
                {isLoading ?  <UserTableSkeleton rows={6}/> :
                <div className="lg:hidden space-y-4">
                    {paginatedUsers.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}

                    <div className="bg-white rounded-2xl shadow-md">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={onRowsPerPageChange}
                            showRowsPerPage={true}
                        />
                    </div>
                </div>}

                {!isLoading && searchQuery.length != 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#40E0D0]/20 to-[#A66CFF]/20 flex items-center justify-center">
                                <UserPlus className="w-8 h-8 text-[#2E86DE]" />
                            </div>
                            <h3 className="text-gray-900 mb-2">לא נמצאו משתמשים</h3>
                            <p className="text-sm text-gray-600">
                                נסה לשנות את החיפוש או את הסינונים
                            </p>
                        </div>
                    </div>
                )}
                <EditUserPopup
                    isOpen={isEditOpen}
                    onClose={() => { setIsEditOpen(false); setEditingUser(null); }}
                    userData={editingUser}
                    rtl
                />
                <AddAdminPopup
                    isOpen={isAddAdminOpen}
                    onClose={() => setIsAddAdminOpen(false)}
                    onSave={handleCreateAdmin}
                    rtl
                />
            </main>
        </div>
    );
}
