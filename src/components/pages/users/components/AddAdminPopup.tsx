import { motion, AnimatePresence } from "motion/react";
import {X, CheckCircle, AlertCircle, User as UserIcon, IdCard, Mail, Phone,Lock} from "lucide-react";
import { useState, useEffect } from "react";
import {validateConfirmPassword, validateField} from "../../../../utils/Validators.tsx";
import {CLOSE_TIME_POPUPS} from "../../../../utils/Constants.tsx";
import type {AxiosError} from "axios";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";
import {MentoFormInput} from "../../../../assets/inputs/MentoFormInput.tsx";

export interface AddAdminPopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: AddAdminForm) => Promise<void>;
    rtl?: boolean;
}

export interface AddAdminForm {
    nationalId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

type ValidationErrors = {
    nationalId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    confirmPassword?: string;
};

type SaveState = "idle" | "saving" | "success" | "error";

const emptyForm: AddAdminForm = {
    nationalId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
};

export function AddAdminPopup({
                                  isOpen,
                                  onClose,
                                  onSave,
                                  rtl = true,
                              }: AddAdminPopupProps) {
    const [formData, setFormData] = useState<AddAdminForm>(emptyForm);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [saveState, setSaveState] = useState<SaveState>("idle");
    const [saveMessage, setSaveMessage] = useState("");
    const isSaving = saveState === "saving";
    const isSuccess = saveState === "success";
    const isError= saveState === "error"
    useEffect(() => {
        if (isOpen) {
            setFormData(emptyForm);
            setErrors({});
            setTouched(new Set());
            setSaveState("idle");
            setSaveMessage("");
        }
    }, [isOpen]);


    const validateForm = (): boolean => {
        const fields: (keyof AddAdminForm)[] = [
            "nationalId",
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "password",
        ];

        const newErrors: ValidationErrors = {};

        for (const field of fields) {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        }
        const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
        if (confirmError) newErrors.confirmPassword = confirmError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleChange = (field: keyof AddAdminForm, value: string | boolean) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);

        if (!touched.has(field as string)) return;

        if (field === "password") {
            setErrors(prev => ({
                ...prev,
                password: validateField("password", String(updated.password)),
                confirmPassword: validateConfirmPassword(updated.confirmPassword, updated.password),
            }));
            return;
        }

        if (field === "confirmPassword") {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(updated.confirmPassword, updated.password),
            }));
            return;
        }

        const error = validateField(field as string, String(value));
        setErrors(prev => ({ ...prev, [field]: error }));
    };


    const handleBlur = (field: keyof AddAdminForm) => {
        setTouched(prev => new Set(prev).add(field as string));

        if (field === "password") {
            setErrors(prev => ({
                ...prev,
                password: validateField("password", formData.password),
                confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
            }));
            return;
        }

        if (field === "confirmPassword") {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
            }));
            return;
        }

        const error = validateField(field as string, String(formData[field]));
        setErrors(prev => ({ ...prev, [field]: error }));
    };


    const handleSave = async () => {
        setTouched(
            new Set([
                "nationalId",
                "firstName",
                "lastName",
                "email",
                "phoneNumber",
                "password",
                "confirmPassword",
            ])
        );

        if (!validateForm()) {
            setSaveState("error");
            setSaveMessage("אנא תקן את השדות המסומנים לפני שמירה");
            return;
        }

        setSaveState("saving");
        setSaveMessage("");

        try {
            await onSave(formData);
            setSaveState("success");
            setSaveMessage("האדמין נוסף בהצלחה");

            setTimeout(() => {
                onClose();
            }, CLOSE_TIME_POPUPS);
        } catch (error) {
            const err = error as AxiosError<{ code?: string; message?: string; field?: "email" | "nationalId" }>;
            const data = err.response?.data;

            if (err.response?.status === 409 && data?.code === "DuplicateField") {
                const msg = data.message ?? "אחד מהפרטים (אימייל או תעודת זהות) כבר קיימים במערכת";
                const field = data.field as "email" | "nationalId" | undefined;
                setErrors(prev => {
                    const { email, nationalId, ...rest } = prev;
                    const next: ValidationErrors = { ...rest };

                    if (field === "email") next.email = msg;
                    else if (field === "nationalId") next.nationalId = msg;
                    else {
                        next.email = msg;
                        next.nationalId = msg;
                    }
                    return next;
                });
                setTouched(prev => {
                    const next = new Set(prev);
                    if (field) next.add(field);
                    else { next.add("email"); next.add("nationalId"); }
                    return next;
                });

                setSaveState("error");
                setSaveMessage(msg);
                return;
            }

            setSaveState("error");
            setSaveMessage(data?.message || "אירעה שגיאה בעת יצירת האדמין, נסה שוב.");
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    dir={rtl ? "rtl" : "ltr"}>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-[8px]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-[600px] bg-white rounded-[20px] border border-[#E5E7EB] overflow-hidden"
                        style={{
                            boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.12)",
                        }}
                    >
                        <div className="h-[2px] bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]" />

                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border-b border-[#A7F3D0]"
                                >
                                    <div className="flex items-center gap-3 px-6 py-3">
                                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                                        <span className="text-[#047857]">{saveMessage}</span>
                                    </div>
                                </motion.div>
                            )}

                            {isError && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-gradient-to-r from-[#FEF2F2] to-[#FEE2E2] border-b border-[#FECACA]"
                                >
                                    <div className="flex items-center gap-3 px-6 py-3">
                                        <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
                                        <span className="text-[#991B1B]">{saveMessage}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-gradient-to-br from-[#E0F2FE] to-[#DBEAFE] rounded-xl p-2">
                                    <UserIcon className="w-6 h-6 text-[#2E86DE]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold">הוספת אדמין חדש</h3>
                                    <p className="text-[#7A0A26] mt-1">
                                        יצירת משתמש חדש עם הרשאות ניהול מלאות
                                    </p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="flex-shrink-0 p-2 -m-2 text-[#6B7280] hover:text-[#2E86DE] transition-colors duration-200 rounded-lg hover:bg-[#F9FAFB]"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MentoFormInput
                                        name="nationalId"
                                        label="תעודת זהות"
                                        value={formData.nationalId}
                                        onChange={(v) => handleChange("nationalId", v)}
                                        onBlur={() => handleBlur("nationalId")}
                                        placeholder="הכנס ת.ז תקינה"
                                        required
                                        rtl={rtl}
                                        error={errors.nationalId}
                                        touched={touched.has("nationalId")}
                                        leftIcon={<IdCard className="w-5 h-5" />}
                                        autoComplete="off"
                                        inputMode="numeric"
                                    />

                                    <MentoFormInput
                                        name="email"
                                        label="דואר אלקטרוני"
                                        type="email"
                                        value={formData.email}
                                        onChange={(v) => handleChange("email", v)}
                                        onBlur={() => handleBlur("email")}
                                        placeholder="admin@example.com"
                                        required
                                        rtl={rtl}
                                        error={errors.email}
                                        touched={touched.has("email")}
                                        leftIcon={<Mail className="w-5 h-5" />}
                                        autoComplete="off"
                                        inputMode="email"
                                    />


                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MentoFormInput
                                        name="firstName"
                                        label="שם פרטי"
                                        value={formData.firstName}
                                        onChange={(v) => handleChange("firstName", v)}
                                        onBlur={() => handleBlur("firstName")}
                                        placeholder="הקלד שם פרטי"
                                        required
                                        rtl={rtl}
                                        error={errors.firstName}
                                        touched={touched.has("firstName")}
                                        leftIcon={<UserIcon className="w-5 h-5" />}
                                        autoComplete="off"
                                    />

                                    <MentoFormInput
                                        name="lastName"
                                        label="שם משפחה"
                                        value={formData.lastName}
                                        onChange={(v) => handleChange("lastName", v)}
                                        onBlur={() => handleBlur("lastName")}
                                        placeholder="הקלד שם משפחה"
                                        required
                                        rtl={rtl}
                                        error={errors.lastName}
                                        touched={touched.has("lastName")}
                                        leftIcon={<UserIcon className="w-5 h-5" />}
                                        autoComplete="off"
                                    />
                                </div>



                                <MentoFormInput
                                    name="phoneNumber"
                                    label="פלאפון"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(v) => handleChange("phoneNumber", v)}
                                    onBlur={() => handleBlur("phoneNumber")}
                                    placeholder="+972 50-123-4567"
                                    required
                                    rtl={rtl}
                                    error={errors.phoneNumber}
                                    touched={touched.has("phoneNumber")}
                                    leftIcon={<Phone className="w-5 h-5" />}
                                    autoComplete="off"
                                    inputMode="tel"
                                />


                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MentoFormInput
                                        name="password"
                                        label="סיסמה"
                                        type="password"
                                        value={formData.password}
                                        onChange={(v) => handleChange("password", v)}
                                        onBlur={() => handleBlur("password")}
                                        placeholder="הכנס סיסמה חזקה"
                                        required
                                        rtl={rtl}
                                        error={errors.password}
                                        touched={touched.has("password")}
                                        leftIcon={<Lock className="w-5 h-5" />}
                                        autoComplete="off"
                                    />

                                    <MentoFormInput
                                        name="confirmPassword"
                                        label="אישור סיסמה"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(v) => handleChange("confirmPassword", v)}
                                        onBlur={() => handleBlur("confirmPassword")}
                                        placeholder="חזור על הסיסמה"
                                        required
                                        rtl={rtl}
                                        error={errors.confirmPassword}
                                        touched={touched.has("confirmPassword")}
                                        leftIcon={<Lock className="w-5 h-5" />}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <div className={`flex ${rtl ? "flex-row-reverse" : "flex-row"} items-center gap-3 justify-center`}>
                                <MentoOutlineButton shape="rounded"
                                                    onClick={onClose}
                                                    disabled={isSaving}>
                                    ביטול
                                </MentoOutlineButton>
                                <MentoPrimaryButton
                                    onClick={handleSave}
                                    loading={isSaving}
                                    disabled={isSaving}>
                                    {isSaving ? "יוצר אדמין..." : "צור אדמין"}
                                </MentoPrimaryButton>

                            </div>

                            <div className="mt-4 text-xs text-[#9CA3AF] text-center">
                              אנא רשום את פרטי התחברות לפני ההוספה
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

