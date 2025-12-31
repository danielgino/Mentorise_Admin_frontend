import { Search } from "lucide-react";

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ placeholder = "", value, onChange }: SearchBarProps) {
    return (
        <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pr-12 pl-4 py-3 text-right bg-white/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-[#40E0D0]/30 transition-all duration-200"
            />
        </div>
    );
}
