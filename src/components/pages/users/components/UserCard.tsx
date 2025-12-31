import { Pencil, Trash2 } from "lucide-react";
import { Badge } from "./Badge.tsx";
import type {User} from "../../../../types/User.tsx";

interface UserCardProps {
    user: User;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md border-l-4 border-transparent hover:border-l-[#40E0D0] hover:shadow-lg transition-all duration-200 p-4">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="text-gray-900">{user.fullName}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onEdit(user.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                        aria-label="Edit user"
                    >
                        <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={() => onDelete(user.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                        aria-label="Delete user"
                    >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{user.role}</span>
                <Badge isAlumni={user.isAlumni}  mobile={true} />
            </div>
        </div>
    );
}
