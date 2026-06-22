import { X } from 'lucide-react';
import type {CourseDto} from "../../../../types/Course.tsx";
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
import {MentoFormInput} from "../../../../assets/inputs/MentoFormInput.tsx";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";

interface EditCourseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    course: CourseDto | null;
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
                semester: (course.semester ?? "") as CourseFormData["semester"],
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

        if (Object.keys(v).length > 0) {
            setErrors(v);
            return;
        }

        setSubmitting(true);
        setErrors({});
        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
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

                        <MentoFormInput
                            name="courseCode"
                            label="קוד קורס"
                            value={formData.courseCode}
                            onChange={(v) => handleChange("courseCode", v)}
                            placeholder="לדוגמה: 9910000"
                            required
                            rtl
                            error={errors.courseCode}
                            touched={true}
                        />

                        <MentoFormInput
                            name="name"
                            label="שם קורס"
                            value={formData.name}
                            onChange={(v) => handleChange("name", v)}
                            placeholder="לדוגמה: מבוא למדעי המחשב"
                            required
                            rtl
                            error={errors.name}
                            touched={true}
                        />


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
                                        handleChange("semester", (SEMESTER_PARAM_MAP[label] ?? "") as CourseFormData["semester"])
                                    }
                                />
                            </div>
                            {errors.semester && (
                                <p className="mt-1 text-sm text-red-600 text-right">{errors.semester}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                        <MentoPrimaryButton fullWidth={true} onClick={handleSubmitClick} disabled={submitting} >
                            {submitting ? "שומר…" : (mode === "edit" ? "שמירה" : "הוספה")}
                        </MentoPrimaryButton>
                        <MentoOutlineButton shape="rounded" onClick={onClose}>
                            ביטול
                        </MentoOutlineButton>
                    </div>
                </div>
            </div>
        </>
    );
}
