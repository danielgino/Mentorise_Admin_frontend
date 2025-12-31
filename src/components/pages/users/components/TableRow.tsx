import { Pencil, Trash2 } from "lucide-react";
import type {User} from "../../../../types/User.tsx";
import {Badge} from "./Badge.tsx";



interface TableRowProps {
    user: User;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function TableRow({ user, onEdit, onDelete }: TableRowProps) {
    return (
        <tr className="group bg-white border-l-4 border-transparent hover:border-l-[#40E0D0] hover:bg-gradient-to-r hover:from-[#40E0D0]/5 hover:to-transparent hover:shadow-md transition-all duration-200">
            <td className="px-2 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-all duration-200 hover:scale-105"
                        aria-label="Delete user"
                    >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600 transition-colors duration-200" />
                    </button>
                    <button
                        onClick={() => onEdit(user.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105"
                        aria-label="Edit user"
                    >
                        <Pencil className="w-4 h-4 text-gray-600 group-hover:text-[#2E86DE] transition-colors duration-200" />
                    </button>

                </div>
            </td>

            <td className="px-8 py-4 text-right">
                {user.updatedAt }
            </td>
            <td className="px-8 py-4 text-right">
                {user.createdAt}
            </td>

            <td className="px-8 py-4 text-right">
                {user.phoneNumber}
            </td>
            <td className="px-2 py-4 text-right">
                {user.major ?? "אין"}
            </td>

            <td className="px-8 py-4 text-right">
                {user.email}
            </td>
            <td className="px-2 py-4 text-right">
                <Badge isAlumni={user.isAlumni} />
            </td>
            <td className="px-8 py-4 text-right">
                <span className="text-gray-700">{user.role}</span>
            </td>
            <td className="px-0 py-4 text-right">
                {user.fullName}
            </td>
            <td className="px-2 py-4 text-right">
                {user.nationalId}
            </td>

        </tr>
    );
}
