import {motion, AnimatePresence} from 'motion/react';
import {X, CheckCircle, AlertCircle, User as UserIcon, Mail, IdCard, Phone} from 'lucide-react';
import {useState, useEffect} from 'react';
import {CLOSE_TIME_POPUPS, formatDate, formatDateTime} from "../../../../utils/Constants.tsx";
import type {ApiUserDto, User} from "../../../../types/User.tsx";
import {updateUser, getUserById} from "../../../../api/UsersManagementApi.tsx";
import {buildUserPatch} from "../../../../utils/buildUserPatch.tsx";
import { validateField} from "../../../../utils/Validators.tsx";
import type {AxiosError} from "axios";
import {MentoFormInput} from "../../../../assets/inputs/MentoFormInput.tsx";
import {FilterDropdown} from "../../../../assets/filters/FilterDropdown.tsx";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";


export interface EditUserPopupProps {
    isOpen: boolean;
    onClose: () => void;
    userData: User | null;
    rtl?: boolean;
}

type ValidationErrors = {
    firstName?: string;
    lastName?: string;
    alumni?: boolean
    email?: string;
    phoneNumber?: string;
    role?: string;
};

type SaveState = 'idle' | 'saving' | 'success' | 'error';

export function EditUserPopup({
                                  isOpen,
                                  onClose,
                                  userData,

                                  rtl = true,
                              }: EditUserPopupProps) {
    const [formData, setFormData] = useState<User | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Set<string>>(new Set());
    const [saveState, setSaveState] = useState<SaveState>('idle');
    const [saveMessage, setSaveMessage] = useState('');
    const [originalApiUser, setOriginalApiUser] = useState<ApiUserDto | null>(null);
    const isProtectedAdmin = originalApiUser?.role === "ADMIN";
    const isSaving = saveState === "saving";
    const isSuccess = saveState === "success";
    const isError= saveState === "error"
    useEffect(() => {
        if (userData) {
            setFormData({...userData});
            setErrors({});
            setTouched(new Set());
            setSaveState('idle');
            setSaveMessage('');
        }
    }, [userData]);
    useEffect(() => {
        let active = true;
        (async () => {
            if (!userData) {
                setOriginalApiUser(null);
                return;
            }
            try {
                const dto = await getUserById(userData.id);
                if (active) setOriginalApiUser(dto);
            } catch (e) {
                console.error("Failed to load original ApiUserDto", e);
                if (active) setOriginalApiUser(null);
            }
        })();
        return () => {
            active = false;
        };
    }, [userData?.id]);


    const validateForm = (): boolean => {
        if (!formData) return false;

        const newErrors: ValidationErrors = {};

        const firstNameError = validateField('firstName', formData.firstName);
        if (firstNameError) newErrors.firstName = firstNameError;

        const emailError = validateField('email', formData.email);
        if (emailError) newErrors.email = emailError;

        const phoneError = validateField('phoneNumber', formData.phoneNumber);
        if (phoneError) newErrors.phoneNumber = phoneError;


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleChange = (field: keyof User, value: string | boolean) => {
        if (!formData) return;

        const updatedData = { ...formData, [field]: value as any };
        setFormData(updatedData);

        if (touched.has(field as string)) {
            if (typeof value === "string") {
                const error = validateField(field as string, value);
                setErrors(prev => ({ ...prev, [field]: error }));
            }
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => new Set(prev).add(field));
        if (formData) {
            const value = formData[field as keyof User] as string;
            const error = validateField(field, value);
            setErrors(prev => ({
                ...prev,
                [field]: error,
            }));
        }
    };


    async function onSave(uiUser: User, originalApiUser: ApiUserDto) {
        const patch = buildUserPatch(originalApiUser, {
            firstName: uiUser.firstName,
            lastName: uiUser.lastName,
            email: uiUser.email,
            phoneNumber: uiUser.phoneNumber,
            role: uiUser.role,
            isAlumni: uiUser.isAlumni,
        });

        if (Object.keys(patch).length === 0) return;

        console.log("[EDIT USER] patch to send:", patch);
        await updateUser(originalApiUser.id, patch);
    }

    const handleSave = async () => {
        if (!formData) return;

        setTouched(new Set(['firstName', 'lastName', 'email', 'phoneNumber']));

        if (!validateForm()) {
            setSaveState('error');
            setSaveMessage('אנא תקן את השדות המסומנים לפני שמירה');
            return;
        }

        setSaveState('saving');
        setSaveMessage('');

        try {
            const dataToSave = {...formData};

            if (!originalApiUser) {
                setSaveState('error');
                setSaveMessage('לא נטען המשתמש המקורי מהשרת');
                return;
            }
            await onSave(dataToSave, originalApiUser);

            setSaveState('success');
            setSaveMessage('המשתמש עודכן בהצלחה!');
            setTimeout(() => {onClose();
            }, CLOSE_TIME_POPUPS);
        } catch (error) {
            const err = error as AxiosError<any>;
            if (err.response?.status === 409 && err.response?.data?.code === "DuplicateField") {
                const msg = err.response.data?.message ;
                setErrors(prev => ({ ...prev, email: msg }));
                setTouched(prev => new Set(prev).add("email"));
                setSaveState("error");
                setSaveMessage(msg);
                return;
            }
            setSaveState('error');
            setSaveMessage(err.response?.data?.message || 'עריכת המשתמש נכשלה נסה שוב');
        }
    };




    if (!formData) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    dir='rtl'
                >
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2, ease: 'easeOut'}}
                        className="absolute inset-0 bg-black/20 backdrop-blur-[8px]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{opacity: 0, scale: 0.96}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.96}}
                        transition={{duration: 0.2, ease: 'easeOut'}}
                        className="relative w-full max-w-[600px] bg-white rounded-[20px] border border-[#E5E7EB] overflow-hidden"
                        style={{
                            boxShadow: '0 12px 32px 0 rgba(0, 0, 0, 0.12)',
                        }}
                    >
                        <div className="h-[2px] bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]"/>
                        <AnimatePresence>
                            {isSuccess && (
                                <motion.div
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={{duration: 0.2}}
                                    className="bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border-b border-[#A7F3D0]"
                                >
                                    <div className="flex items-center gap-3 px-6 py-3">
                                        <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0"/>
                                        <span className="text-[#047857]">{saveMessage}</span>
                                    </div>
                                </motion.div>
                            )}

                            {isError&& (
                                <motion.div
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: 'auto', opacity: 1}}
                                    exit={{height: 0, opacity: 0}}
                                    transition={{duration: 0.2}}
                                    className="bg-gradient-to-r from-[#FEF2F2] to-[#FEE2E2] border-b border-[#FECACA]"
                                >
                                    <div className="flex items-center gap-3 px-6 py-3">
                                        <AlertCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0"/>
                                        <span className="text-[#991B1B]">{saveMessage}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="bg-gradient-to-br from-[#E0F2FE] to-[#DBEAFE] rounded-xl p-2">
                                    <UserIcon className="w-6 h-6 text-[#2E86DE]"/>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold">עריכת משתמש: {formData.fullName}</h3>
                                    <p className="text-[#6B7280] mt-1">עריכת פרטי משתמש ומתן הרשאות</p>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="flex-shrink-0 p-2 -m-2 text-[#6B7280] hover:text-[#2E86DE] transition-colors duration-200 rounded-lg hover:bg-[#F9FAFB]">
                                    <X className="w-5 h-5"/>
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <MentoFormInput
                                        name="nationalId"
                                        label="תעודת זהות"
                                        value={formData.nationalId || ""}
                                        onChange={() => {}}
                                        placeholder="תעודת זהות"
                                        required
                                        rtl={rtl}
                                        disabled
                                        leftIcon={<IdCard className="w-5 h-5" />}
                                    />

                                    <MentoFormInput
                                        name="email"
                                        label="דואר אלקטרוני"
                                        type="email"
                                        value={formData.email}
                                        onChange={(v) => handleChange("email", v)}
                                        onBlur={() => handleBlur("email")}
                                        placeholder="user@example.com"
                                        required
                                        rtl={rtl}
                                        error={errors.email}
                                        touched={touched.has("email")}
                                        leftIcon={<Mail className="w-5 h-5" />}
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
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        inputMode="tel"
                                    />

                                    <MentoFormInput
                                        name="major"
                                        label="מסלול לימודים"
                                        value={formData.major || ""}
                                        onChange={() => {}}
                                        placeholder="אין מסלול"
                                        rtl={rtl}
                                        disabled
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-2 text-[#111827]">
                                            תפקיד <span className="text-[#EF4444]">*</span>
                                        </label>
                                        {isProtectedAdmin ? (
                                            <input
                                                type="text"
                                                value="אדמין"
                                                disabled
                                                className="w-full px-4 py-2.5 border rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed border-[#E5E7EB]"
                                                title="לא ניתן לשנות תפקיד של אדמין"
                                            />
                                        ) : (

                                            <FilterDropdown
                                                label="בחר תפקיד"
                                                options={[
                                                    { label: "סטודנט", value: "סטודנט" },
                                                    { label: "מתרגל", value: "מתרגל" },
                                                ]}
                                                value={formData.role}
                                                onChange={(v) => handleChange("role", v)}
                                            />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-[#111827]">
                                            בוגר/ת <span className="text-[#EF4444]">*</span>
                                        </label>
                                        <FilterDropdown
                                            label="בחר סטטוס בוגר"
                                            options={[
                                                { label: "כן", value: "true" },
                                                { label: "לא", value: "false" },
                                            ]}
                                            value={String(formData.isAlumni)}
                                            onChange={(v) => handleChange("isAlumni", v === "true")}
                                        />
                                    </div>
                                </div>

                            </div>


                            <div
                                className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#6B7280] py-4 border-t border-[#E5E7EB] mb-6">
                                <div>
                                    <span className="text-[#9CA3AF]">תאריך הצטרפות:</span>{' '}
                                    <span>{formatDate(formData.createdAt)}</span>
                                </div>
                                <div>
                                    <span className="text-[#9CA3AF]">עודכן לאחרונה:</span>{' '}
                                    <span>{formatDateTime(formData.updatedAt)}</span>
                                </div>
                            </div>

                            <div
                                className={`flex ${rtl ? 'flex-row-reverse' : 'flex-row'} items-center gap-3 justify-center`}>
                                <MentoOutlineButton shape="rounded"
                                                    onClick={onClose}
                                                    disabled={isSaving}>
                                    ביטול
                                </MentoOutlineButton>
                                <MentoPrimaryButton
                                    onClick={handleSave}
                                    loading={isSaving}
                                    disabled={isSaving}>
                                    {isSaving ? "שומר שינוים..." : "עדכן משתמש"}
                                </MentoPrimaryButton>
                            </div>

                            <div className="mt-4 text-xs text-[#9CA3AF] text-center">
                          שים לב היטב בעת ביצוע השינוים, לא ניתן לשנות ת"ז או מסלול
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
