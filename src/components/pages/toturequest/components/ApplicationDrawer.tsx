import {X, Loader2} from 'lucide-react';
import {StatusBadge} from './StatusBadge.tsx';
import type {TutorApplicationDetailDto, TutorApplicationScopeDto} from "../../../../types/TutorApplication.tsx";
import {compressConsecutiveYears, formatDateTime} from "../../../../utils/Constants.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import {ApplicationDrawerSkeleton} from "../../../../assets/skeletons/ApplicationDrawerSkeleton.tsx";
import {APPROVED, APP_TYPE_UPDATE, PENDING, REJECTED, SCOPE_COURSE, SCOPE_MAJOR, SCOPE_YEAR} from "./UtilsApplicationTable.tsx";
import {MentoPrimaryButton} from "../../../../assets/buttons/MentoPrimaryButton.tsx";
import {MentoOutlineButton} from "../../../../assets/buttons/MentoOutlineButton.tsx";
import Swal from "sweetalert2";

interface ApplicationDrawerProps {
    appDetails: TutorApplicationDetailDto | null;
    appDetailsLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
    onApprove: (id: number, note: string) => void;
    onReject: (id: number, note: string) => void;
}

function ScopeChipList({ scopes, pillClass, majorName }: { scopes: TutorApplicationScopeDto[], pillClass: string, majorName?: string | null }) {
    if (!scopes || scopes.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {scopes.map((s, i) => {
                let label = "";
                if (s.scopeType === SCOPE_COURSE) label = s.courseName ?? "";
                else if (s.scopeType === SCOPE_YEAR) label = `שנה ${s.year}`;
                else if (s.scopeType === SCOPE_MAJOR) label = `כל הקורסים במסלול${majorName ? ` ${majorName}` : ""}`;
                if (!label) return null;
                return <span key={i} className={pillClass}>{label}</span>;
            })}
        </div>
    );
}

export function ApplicationDrawer({
                                      appDetails,
                                      appDetailsLoading,
                                      isOpen,
                                      onClose,
                                      onApprove,
                                      onReject
                                  }: ApplicationDrawerProps) {
    const [adminNote, setAdminNote] = useState('');
    const [showRejectError, setShowRejectError] = useState(false);
    const isPending = appDetails?.status === PENDING;
    const isApproved = appDetails?.status === APPROVED;
    const isRejected = appDetails?.status === REJECTED;
    const isRejectNoteEmpty = isPending && adminNote.trim().length === 0;
    const isUpdate = appDetails?.applicationType === APP_TYPE_UPDATE;

    useEffect(() => {
        setAdminNote('');
    }, [appDetails]);

    useEffect(() => {
        setShowRejectError(false);
    }, [appDetails]);

    const scopes = appDetails?.scopes ?? [];
    const hasMajorScope = scopes.some(s => s.scopeType === SCOPE_MAJOR);

    const courseScopes = scopes.filter(s => s.scopeType === SCOPE_COURSE && s.courseName);

    const pickedYears = Array.from(
        new Set(
            scopes
                .filter(s => s.scopeType === SCOPE_YEAR && typeof s.year === "number")
                .map(s => s.year as number)
        )
    ).sort((a, b) => a - b);

    const yearLabels = compressConsecutiveYears(pickedYears);

    function handleNoteChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const v = e.target.value;
        setAdminNote(v);
        if (showRejectError && v.trim().length > 0) setShowRejectError(false);
    }

    if (!isOpen) return null;

    const isLoading = appDetailsLoading || !appDetails;

    return (
        <div className="fixed inset-0 z-50" dir="rtl">
            <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}/>

            <div
                className="absolute top-0 right-0 h-full bg-white shadow-2xl overflow-y-auto w-[440px] animate-in slide-in-from-right duration-300">
                <div className="sticky top-0 bg-white z-10">
                    <div className="h-1 w-full bg-gradient-to-l from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]"/>
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">פרטי בקשה</h2>
                        <div className="flex items-center gap-3">
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400"/>}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                            >
                                <X size={20} className="text-gray-500"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-6 space-y-6" aria-busy={isLoading}>
                    {isLoading ? (
                        <>
                            <ApplicationDrawerSkeleton/>
                        </>
                    ) : (
                        <>
                            {/* ─── Applicant info ─── */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-md font-bold">שם מבקש/ת:</span>
                                    <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                        {appDetails!.fullName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-md font-bold">ת״ז:</span>
                                    <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                        {appDetails!.nationalId}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-md font-bold">מסלול:</span>
                                    <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                        {appDetails!.majorName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-md font-bold">תאריך הגשה:</span>
                                    <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                        {formatDateTime(appDetails!.createdAt)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 text-md font-bold">גיליון ציונים:</span>
                                    <button
                                        onClick={() => window.open(appDetails!.transcriptUrl, '_blank')}
                                        className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200"
                                    >
                                        פתח קישור
                                    </button>
                                </div>
                            </div>

                            <div className="h-px bg-gray-200"/>

                            {/* ─── Application type badge ─── */}
                            <div className="flex items-center gap-2">
                                <span className="text-gray-900 text-md font-bold">סוג בקשה:</span>
                                {isUpdate ? (
                                    <span className="inline-block px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-sm font-semibold border border-amber-200">
                                        עדכון תחומי תרגול
                                    </span>
                                ) : (
                                    <span className="inline-block px-3 py-1 rounded-xl bg-green-50 text-green-800 text-sm font-semibold border border-green-200">
                                        בקשה ראשונית
                                    </span>
                                )}
                            </div>

                            {/* ─── Request notes ─── */}
                            <div className="space-y-3">
                                <h3 className="text-base font-semibold text-gray-900 text-right">הערות הבקשה:</h3>
                                <p className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                    {appDetails!.requestText}
                                </p>
                            </div>

                            {/* ─── Scopes section ─── */}
                            {!isUpdate ? (
                                /* INITIAL: single scopes section */
                                <div className="space-y-4">
                                    <h3 className="text-base font-semibold text-gray-900 text-right">תחומי תרגול מבוקשים:</h3>

                                    {courseScopes.length > 0 && (
                                        <ul className="flex flex-wrap gap-2 justify-right">
                                            {courseScopes.map((scope, i) => (
                                                <li key={`course-${i}`} className="inline-block w-fit px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                                    {scope.courseName}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {hasMajorScope && (
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-blue-900">תרגול כל הקורסים במסלול:</p>
                                            <span className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                                {appDetails!.majorName}
                                            </span>
                                        </div>
                                    )}

                                    {yearLabels.length > 0 && (
                                        <div className="space-y-2">
                                            <h4 className="text-base font-semibold text-gray-900 text-right">שנים לתרגול:</h4>
                                            <div className="flex flex-wrap gap-2 justify-start">
                                                {yearLabels.map((label, idx) => (
                                                    <span key={idx} className="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200">
                                                        {label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* UPDATE: three scope sections */
                                <div className="space-y-5">
                                    {/* Section 1 — Current approved scopes */}
                                    <div className="space-y-3">
                                        <h3 className="text-base font-semibold text-gray-900 text-right">תחומי תרגול נוכחיים:</h3>
                                        <p className="text-xs text-gray-500 text-right">תחומים שכרגע מאושרים למתרגל זה</p>
                                        <ScopeChipList
                                            scopes={appDetails!.currentScopes ?? []}
                                            pillClass="inline-block px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold border border-gray-300"
                                            majorName={appDetails!.majorName}
                                        />
                                        {(!appDetails!.currentScopes || appDetails!.currentScopes.length === 0) && (
                                            <p className="text-sm text-gray-400 text-right">אין תחומים נוכחיים</p>
                                        )}
                                    </div>

                                    {/* Section 2 — Requested final list */}
                                    <div className="space-y-3">
                                        <h3 className="text-base font-semibold text-gray-900 text-right">תחומי תרגול מבוקשים:</h3>
                                        <p className="text-xs text-gray-500 text-right">הרשימה הסופית המבוקשת</p>
                                        <ScopeChipList
                                            scopes={scopes}
                                            pillClass="inline-block px-3 py-1 rounded-xl bg-blue-50 text-blue-900 text-sm font-semibold border border-blue-200"
                                            majorName={appDetails!.majorName}
                                        />
                                    </div>

                                    {/* Section 3 — Diff */}
                                    <div className="space-y-3">
                                        <h3 className="text-base font-semibold text-gray-900 text-right">שינויים מבוקשים:</h3>
                                        {(appDetails!.addedScopes ?? []).length > 0 && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-green-700">נוספו:</p>
                                                <ScopeChipList
                                                    scopes={appDetails!.addedScopes!}
                                                    pillClass="inline-block px-3 py-1 rounded-xl bg-green-50 text-green-800 text-sm font-semibold border border-green-200"
                                                    majorName={appDetails!.majorName}
                                                />
                                            </div>
                                        )}
                                        {(appDetails!.removedScopes ?? []).length > 0 && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-red-700">הוסרו:</p>
                                                <ScopeChipList
                                                    scopes={appDetails!.removedScopes!}
                                                    pillClass="inline-block px-3 py-1 rounded-xl bg-red-50 text-red-800 text-sm font-semibold border border-red-200 line-through"
                                                    majorName={appDetails!.majorName}
                                                />
                                            </div>
                                        )}
                                        {(appDetails!.unchangedScopes ?? []).length > 0 && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-gray-500">ללא שינוי:</p>
                                                <ScopeChipList
                                                    scopes={appDetails!.unchangedScopes!}
                                                    pillClass="inline-block px-3 py-1 rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold border border-gray-200"
                                                    majorName={appDetails!.majorName}
                                                />
                                            </div>
                                        )}
                                        {(appDetails!.addedScopes ?? []).length === 0 &&
                                         (appDetails!.removedScopes ?? []).length === 0 &&
                                         (appDetails!.unchangedScopes ?? []).length === 0 && (
                                            <p className="text-sm text-gray-400 text-right">אין שינויים זמינים</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="h-px bg-gray-200"/>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-semibold text-gray-900">סטטוס נוכחי:</span>
                                    <StatusBadge status={appDetails!.status}/>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-base font-semibold text-gray-900 text-right">הערת אדמין:</label>
                                {isApproved || isRejected ? (
                                    <>{appDetails.adminComment || "לא נכתבה הערה"}
                                        <label className="block text-base font-semibold text-gray-900 text-right">נבדק על ידי:</label>
                                        <span className="inline-block px-3 py-1 rounded-xl bg-red-200 text-blue-900 text-sm font-semibold border border-blue-200">
                                            {appDetails.reviewedByName}  , בתאריך:    {formatDateTime(appDetails?.reviewedAt)}
                                        </span>
                                    </>
                                ) : (
                                    <div>
                                        <textarea
                                            value={adminNote}
                                            onChange={handleNoteChange}
                                            placeholder="כתוב הערה כאן למגיש הבקשה(חובה בדחייה)..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 text-right text-sm"
                                            rows={4}
                                            dir="rtl"
                                        />
                                        {showRejectError && isRejectNoteEmpty && (
                                            <div className="mt-1 text-xs text-red-600">בבקשה הזן סיבת דחייה</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* ─── UPDATE warning banner ─── */}
                            {isUpdate && isPending && (
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm text-right space-y-1">
                                    <p className="font-bold">שים לב</p>
                                    <p>אישור בקשה זו יחליף את כל תחומי התרגול הנוכחיים של המתרגל ברשימה המבוקשת. הפעולה אינה הפיכה.</p>
                                </div>
                            )}

                            <div className="h-px bg-gray-200"/>

                            <div className="flex gap-3 justify-start">
                                <MentoPrimaryButton
                                    onClick={async () => {
                                        if (isUpdate) {
                                            const result = await Swal.fire({
                                                title: "אישור עדכון תחומי תרגול",
                                                html: "פעולה זו תחליף את כל תחומי התרגול הנוכחיים של המתרגל ברשימה המבוקשת.<br/>האם להמשיך?",
                                                icon: "warning",
                                                showCancelButton: true,
                                                confirmButtonText: "כן, אשר עדכון",
                                                cancelButtonText: "ביטול",
                                                confirmButtonColor: "#2E86DE",
                                                cancelButtonColor: "#9CA3AF",
                                                reverseButtons: true,
                                            });
                                            if (!result.isConfirmed) return;
                                        }
                                        onApprove(appDetails!.id, adminNote);
                                        onClose();
                                    }}
                                    disabled={!isPending}
                                >
                                    אשר בקשה
                                </MentoPrimaryButton>

                                <MentoOutlineButton
                                    shape="rounded"
                                    className="text-red"
                                    onClick={() => {
                                        if (adminNote.trim().length === 0) {
                                            setShowRejectError(true);
                                            return;
                                        }
                                        onReject(appDetails!.id, adminNote.trim());
                                        onClose();
                                    }}
                                    disabled={!isPending}
                                >
                                    דחה
                                </MentoOutlineButton>
                            </div>

                            {isUpdate && isPending && (
                                <p className="text-xs text-gray-500 text-right mt-1">
                                    דחיית הבקשה לא תשנה את תחומי התרגול הנוכחיים של המתרגל.
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
