import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

type Option = string | { label: string; value: string };

interface FilterDropdownProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const normalized = useMemo(
        () =>
            options.map((o) =>
                typeof o === "string" ? { label: o, value: o } : o
            ),
        [options]
    );

    const selected = normalized.find((o) => o.value === value);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                className="relative flex w-full items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:border-[#40E0D0]/30 transition-all min-w-[160px]"
            >
        <span className="text-sm text-gray-700 text-right w-full">
          {selected?.label || label}
        </span>

                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                    <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-lg z-20 max-h-[240px] overflow-y-auto   scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {normalized.map((opt) => (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-right text-sm transition-all
                  ${opt.value === value ? "bg-gradient-to-r from-[#40E0D0]/15 to-transparent font-medium" : "hover:bg-gray-50"}
                `}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
