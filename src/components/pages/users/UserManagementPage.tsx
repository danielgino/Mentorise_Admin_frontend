import {useCallback, useEffect, useState} from "react";
import {getAllUsers} from "../../../api/UsersManagementApi.tsx";
import UsersTable from "./components/UsersTable.tsx";
import {
    ALL_ALUMNI,
    ALL_JOIN_DATES,
    ALL_ROLES,
    ALUMNI_PARAM_MAP,
    DATE_PARAM_MAP,
    ROLE_PARAM_MAP
} from "./components/UtilsUserTable.tsx";
import {mapApiUser} from "../../../api/NormalizeUser.tsx";
import type {ApiUserDto, User} from "../../../types/User.tsx";
import {TYPING_DELAY} from "../../../utils/Constants.tsx";
import Swal from "sweetalert2";
import {createAdmin, deleteUser, revokeTutorPermissions, updateUser} from "../../../api/UsersManagementApi.tsx";
import type {AddAdminForm} from "./components/AddAdminPopup.tsx";
import {buildUserPatch} from "../../../utils/buildUserPatch.tsx";


export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState(ALL_ROLES);
    const [alumniFilter, setAlumniFilter] = useState(ALL_ALUMNI);
    const [dateFilter, setDateFilter] = useState(ALL_JOIN_DATES);
    const [currentPage, setCurrentPage] = useState(1); // UI – 1-based
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);






    const handleCreateAdmin = async (data: AddAdminForm) => {
        await createAdmin({
            nationalId: data.nationalId,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
        });
        await fetchUsers();
    };
    const handleUpdateUser = async ({
                                        uiUser,
                                        original,
                                    }: {
        uiUser: User;
        original: ApiUserDto;
    }) => {
        const patch = buildUserPatch(original, {
            firstName: uiUser.firstName,
            lastName:  uiUser.lastName,
            email:     uiUser.email,
            phoneNumber: uiUser.phoneNumber,
            role:      uiUser.role,
            isAlumni:  uiUser.isAlumni,
        });

        if (Object.keys(patch).length === 0) return;

        await updateUser(original.id, patch);
        await fetchUsers();

    };

    const handleRevokeTutor = async (userId: number) => {
        await revokeTutorPermissions(userId);
        await fetchUsers();
    };

    const handleDeleteUser = async (id: number) => {
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
            setUsers(prev => prev.filter(u => u.id !== id));
            await Swal.fire({

                title: "!המחיקה הושלמה",
                text: "המשתמש נמחק מהמערכת",
                icon: "success"
            });

        } catch {
            await Swal.fire({
                title: "!שגיאה",
                text: "פעולת המחיקה נכשלה",
                icon: "error"
            });
        }
    };




    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSearchQuery(searchInput.trim());
        }, TYPING_DELAY);

        return () => window.clearTimeout(timeoutId);
    }, [searchInput]);

    const fetchUsers = useCallback(async () => {
        try {
            setIsLoading(true);
            const page = await getAllUsers({
                page: currentPage - 1,
                size: rowsPerPage,
                search: searchQuery || undefined,
                role: ROLE_PARAM_MAP[roleFilter],
                alumni: ALUMNI_PARAM_MAP[alumniFilter],
                joinDateFilter: DATE_PARAM_MAP[dateFilter],
            });
            setUsers(page.content.map(mapApiUser));
            setTotalPages(page.totalPages);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, rowsPerPage, searchQuery, roleFilter, alumniFilter, dateFilter]);

    useEffect(() => {
        void fetchUsers();
        }, [fetchUsers]);



    return (
    <UsersTable
            users={users}
            isLoading={isLoading}
            searchQuery={searchInput}
            onSearchQueryChange={setSearchInput}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            alumniFilter={alumniFilter}
            onAlumniFilterChange={setAlumniFilter}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            onUserDelete={handleDeleteUser}
            onCreateAdmin={handleCreateAdmin}
            onUpdateUser={handleUpdateUser}
            onRevokeTutor={handleRevokeTutor}
    />

    );
}
