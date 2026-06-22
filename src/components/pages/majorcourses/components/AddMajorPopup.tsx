import React, { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";

type Mode = "add" | "edit";

interface AddMajorPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (payload: { id?: number; name: string; mode: Mode }) => Promise<void> | void;
    mode?: Mode;
    majorId?: number;
    initialName?: string;
}

function AddMajorPopup({
                           isOpen,
                           onClose,
                           onSave,
                           mode = "add",
                           majorId,
                           initialName = "",
                       }: AddMajorPopupProps) {
    const [majorName, setMajorName] = useState(initialName);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMajorName(initialName);
            setError(null);
            setSaving(false);
        }
    }, [isOpen, initialName]);

    if (!isOpen) return null;

    const handleSave = async () => {
        const name = majorName.trim();
        if (!name) return;
        setError(null);
        setSaving(true);
        try {
            await onSave({ id: majorId, name, mode });
            onClose();
        } catch (e) {
            if (isAxiosError(e) && e.response?.status === 409) {
                setError("שם מסלול כבר קיים");
            } else {
                setError("אירעה שגיאה בשמירת המסלול");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setMajorName("");
        setError(null);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !saving) handleCancel();
    };

    const canSave =
        !!majorName.trim() &&
        !saving &&
        !(mode === "edit" && majorName.trim() === initialName.trim());

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={handleOverlayClick}
            dir="rtl"
        >
            <div
                className="w-full max-w-[440px] mx-4 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-lg border border-white/20"
                style={{ fontFamily: "'Heebo', sans-serif" }}
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {mode === "add" ? "הוספת מסלול חדש" : "עריכת מסלול"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {mode === "add" ? "הזן את שם המסלול ולחץ שמירה" : "עדכן את שם המסלול ולחץ שמירה"}
                    </p>
                </div>

                <div className="px-8 pb-2">
                    <label htmlFor="track-name" className="block text-sm font-medium text-gray-700 mb-2">
                        שם המסלול
                    </label>
                    <div className="relative">
                        <input
                            id="track-name"
                            type="text"
                            value={majorName}
                            onChange={(e) => setMajorName(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={(e) => e.key === "Enter" && canSave && handleSave()}
                            placeholder="לדוגמה: מדעי המחשב – תכנית רגילה"
                            disabled={saving}
                            className="w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all duration-200"
                            style={{
                                border: isFocused ? "2px solid transparent" : "1px solid #e5e7eb",
                                backgroundImage: isFocused
                                    ? "linear-gradient(white, white), linear-gradient(90deg, #40E0D0 0%, #2E86DE 50%, #A66CFF 100%)"
                                    : "none",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                            }}
                            aria-invalid={!!error}
                            aria-describedby={error ? "major-error" : undefined}
                        />
                    </div>
                    {error && (
                        <p id="major-error" className="mt-2 text-sm text-red-600" aria-live="assertive">
                            {error}
                        </p>
                    )}
                </div>

                <div className="px-8 pb-8 flex items-center justify-start gap-3">
                  <MentoPrimaryButton className="py-0.5 " size="md" onClick={handleSave}
                                      disabled={!canSave}>
                      {saving ? "שומר..." : mode === "add" ? "שמירה" : "עדכון"}
                  </MentoPrimaryButton>

                    <MentoOutlineButton size="md" shape="rounded" onClick={handleCancel}
                                         disabled={saving}>
                        ביטול
                    </MentoOutlineButton>
                </div>
            </div>
        </div>
    );
}

export default AddMajorPopup;
