import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    type SelectOption, SEMESTER_FILTER_OPTIONS,
    SEMESTER_PARAM_MAP, SEMESTER_REVERSE_MAP,
    YEAR_FILTER_OPTIONS,
    YEAR_PARAM_MAP,
    YEAR_REVERSE_MAP
} from "./UtilsCourseTable.tsx";
import {FilterDropdown} from "../../../../assets/filters/FilterDropdown.tsx";
import axios from "axios";

interface EditCourseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    course: any;
    mode: "add" | "edit";
    onSubmit: (data: CourseFormData ) => Promise<void> | void; // חדש
    majorOptions: SelectOption[];


}
export type CourseFormData  = {
    courseCode: string;
    name: string;
    majorId: number;
    year: number | "";
    semester: "A" | "B" | "SUMMER" | "";
};

type FormErrors = Partial<Record<keyof CourseFormData, string>> & { general?: string };


export function EditCourseDrawer({ isOpen, onClose, course,mode,onSubmit,majorOptions }: EditCourseDrawerProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState<CourseFormData >({

        courseCode: "",
        name: "",
        majorId: 0,
        year: "",
        semester: "",
    });


    useEffect(() => {
        if (!isOpen) return;
        setErrors({});
        if (mode === "edit" && course) {
            setFormData({
                courseCode: course.courseCode || "",
                name: course.name || "",
                majorId: course.majorId || 0,
                year: course.year ?? "",
                semester: course.semester ?? "",
            });
        }

        if (mode === "add") {
            setFormData({
                courseCode: "",
                name: "",
                majorId: 0,
                year: "",
                semester: "",
            });
        }
    }, [isOpen, mode, course]);

    const validate = (data: CourseFormData): FormErrors => {
        const e: FormErrors = {};
        if (!data.courseCode.trim()) e.courseCode = "יש להזין קוד קורס";
        if (!data.name.trim()) e.name = "יש להזין שם קורס";
        if (!data.majorId || data.majorId === 0) e.majorId = "יש לבחור מסלול";
        if (data.year === "") e.year = "יש לבחור שנה";
        if (data.semester === "") e.semester = "יש לבחור סמסטר";
        return e;
    };
    const handleChange = <K extends keyof CourseFormData>(field: K, value: CourseFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmitClick = async () => {
        const v = validate(formData);
        console.log("VALIDATION ERRORS:", v);

        if (Object.keys(v).length > 0) {
            setErrors(v);
            return;
        }

        setSubmitting(true);
        setErrors({});
        try {
            await onSubmit(formData);
            onClose();
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                if (status === 409) {
                    setErrors(prev => ({ ...prev, courseCode: "קוד קורס כבר בשימוש" }));
                    setSubmitting(false);
                    return;
                }
                setErrors(prev => ({ ...prev, general: "אירעה שגיאה, נסה שוב." }));
            } else {
                setErrors(prev => ({ ...prev, general: "אירעה שגיאה, נסה שוב." }));
            }
        } finally {
            setSubmitting(false);
        }
    };
    const inputBase =
        "w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30";
    const errBorder = "border-red-300";
    const okBorder = "border-gray-200";
    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            />

            <div className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 overflow-y-auto" dir="rtl">
                <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="text-right">
                            {mode=="edit" ? (<>
                                <h2 className="text-3xl mb-2">עריכת קורס</h2>
                                <p className="text-gray-500">עדכון פרטי קורס ושיוך למסלולים</p>
                                </>   )

                            :(<>
                                <h2 className="text-3xl mb-2">הוספת קורס</h2>
                                <p className="text-gray-500">הוספת קורס חדש למערכת</p>
                                </>)

                            }
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-6 mt-8">
                        <div>
                            <label className="block text-gray-700 mb-2 text-right">
                                קוד קורס
                            </label>
                            <input
                                type="text"
                                value={formData.courseCode}
                                onChange={(e) => handleChange("courseCode", e.target.value)}
                                className={`${inputBase} ${errors.courseCode ? errBorder : okBorder}`}
                                placeholder="לדוגמה: 9910000"
                            />
                            {errors.courseCode && <p className="text-red-600 text-sm">{errors.courseCode}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 text-right">
                                שם קורס
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className={`${inputBase} ${errors.name ? errBorder : okBorder}`}
                                placeholder="לדוגמה: מבוא למדעי המחשב"
                            />
                            {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 text-right">
                                מסלול לימודים
                            </label>


                            <div className={errors.majorId ? "rounded-xl border border-red-300 p-1" : ""}>
                                <FilterDropdown
                                    label="בחר מסלול"
                                    options={majorOptions}
                                    value={formData.majorId ? String(formData.majorId) : "ALL"}
                                    onChange={(v) => handleChange("majorId", v === "ALL" ? 0 : Number(v))}
                                />
                            </div>

                            {errors.majorId && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.majorId}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 text-right">
                                שנה
                            </label>

                            <div className={errors.year ? "rounded-xl border border-red-300 p-1" : ""}>
                                <FilterDropdown
                                    label="שנה"
                                    value={formData.year === "" ? "שנה:הכל" : YEAR_REVERSE_MAP[formData.year]}
                                    options={YEAR_FILTER_OPTIONS}
                                    onChange={(label) => handleChange("year", YEAR_PARAM_MAP[label] ?? "")}
                                />
                            </div>

                            {errors.year && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.year}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 text-right">
                                סמסטר
                            </label>
                            <div className={errors.semester ? "rounded-xl border border-red-300 p-1" : ""}>
                                <FilterDropdown
                                    label="סמסטר"
                                    value={formData.semester === "" ? "סמסטר:הכל" : SEMESTER_REVERSE_MAP[formData.semester]}
                                    options={SEMESTER_FILTER_OPTIONS}
                                    onChange={(label) =>
                                        handleChange("semester", (SEMESTER_PARAM_MAP[label] ?? "") as any)
                                    }
                                />
                            </div>
                            {errors.semester && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.semester}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            ביטול
                        </button>
                        <button
                            onClick={handleSubmitClick}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] text-white hover:opacity-90 transition-opacity shadow-lg disabled:opacity-60"
                            disabled={submitting}
                        >
                            {submitting ? "שומר…" : (mode === "edit" ? "שמירה" : "הוספה")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
