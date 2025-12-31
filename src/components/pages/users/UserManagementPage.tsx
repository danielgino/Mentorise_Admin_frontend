import { useEffect, useState } from "react";
import {apiClient} from "../../../api/ApiClient.tsx";
import UsersTable from "./components/UsersTable.tsx";
import {
    ALL_JOIN_DATES,
    ALL_ROLES,
    ALL_ALUMNI,
    ALUMNI_PARAM_MAP,
    ROLE_PARAM_MAP,
    DATE_PARAM_MAP
} from "./components/UtilsUserTable.tsx";
import {mapApiUser} from "../../../api/NormalizeUser.tsx";
import type {ApiUserDto, User} from "../../../types/User.tsx";
import {TYPING_DELAY} from "../../../utils/Constants.tsx";
import type {PageResponse} from "../../../types/PageResponse.tsx";





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





    function handleUserDeleted(id: number) {
        setUsers(prev => prev.filter(u => u.id !== id));
    }
    console.log("%cUserManagementPage RENDER", "color: #2E86DE; font-weight: bold");


    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setSearchQuery(searchInput.trim());
        }, TYPING_DELAY);

        return () => window.clearTimeout(timeoutId);
    }, [searchInput]);
    useEffect(() => {
        const fetchUsers = async () => {
            console.log(
                "%c[fetchUsers] page=" + (currentPage - 1) + " size=" + rowsPerPage,
                "color: #A66CFF"
            );
            try {
                setIsLoading(true);

                const res = await apiClient.get<PageResponse<ApiUserDto>>("/users", {
                    params: {
                        page: currentPage - 1,
                        size: rowsPerPage,
                        search: searchQuery || undefined,
                        role: ROLE_PARAM_MAP[roleFilter],
                        alumni: ALUMNI_PARAM_MAP[alumniFilter],
                        joinDateFilter: DATE_PARAM_MAP[dateFilter],
                    },
                });
                const page = res.data;

                const mappedUsers = page.content.map(mapApiUser);

                setUsers(mappedUsers);
                setTotalPages(page.totalPages);
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchUsers();
    }, [currentPage, rowsPerPage, roleFilter, alumniFilter, dateFilter, searchQuery]);


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
            onUserDeleted={handleUserDeleted}
    />

    );
}
