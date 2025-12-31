import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export interface MentoFormInputProps {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required?: boolean;
    error?: string;
    touched?: boolean;
    rtl?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    autoComplete?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    disabled?: boolean;
}

export function MentoFormInput({
                                   name,
                                   label,
                                   value,
                                   onChange,
                                   onBlur,
                                   placeholder,
                                   type = "text",
                                   required = false,
                                   error,
                                   touched,
                                   rtl = true,
                                   leftIcon,
                                   rightIcon,
                                   autoComplete,
                                   inputMode,
                                   disabled,
                               }: MentoFormInputProps) {
    const [show, setShow] = React.useState(false);
    const isPassword = type === "password";
    const isError = Boolean(error && touched);

    const dir = rtl ? "rtl" : "ltr";

    return (
        <div dir={dir} className="w-full">
            <label htmlFor={name} className="block mb-2 text-[#111827]">
                {label} {required && <span className="text-[#EF4444]">*</span>}
            </label>

            <div
                className={[
                    "relative flex items-center rounded-xl border transition-all duration-200",
                    isError ? "border-[#EF4444] bg-[#FEF2F2]" : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]",
                ].join(" ")}
            >
                {leftIcon && (
                    <span className="px-3 text-[#6B7280] flex items-center justify-center shrink-0">
            {leftIcon}
          </span>
                )}

                <input
                    id={name}
                    name={name}
                    dir={dir}
                    type={isPassword ? (show ? "text" : "password") : type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    disabled={disabled}
                    className={[
                        "w-full px-4 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/40 rounded-xl",
                        leftIcon ? (rtl ? "pl-4" : "pr-4") : "",
                        rightIcon || isPassword ? (rtl ? "pr-10" : "pl-10") : "",
                    ].join(" ")}
                />

                <span className="absolute inset-y-0 flex items-center" style={{ [rtl ? "left" : "right"]: "0.5rem" }}>
          {isPassword ? (
              <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="p-1.5 rounded-md text-[#6B7280] hover:bg-[#F3F4F6] transition-colors"
                  aria-label={show ? "הסתר סיסמה" : "הצג סיסמה"}
                  tabIndex={-1}
              >
                  {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
          ) : (
              rightIcon && <span className="p-2 text-[#6B7280]">{rightIcon}</span>
          )}
        </span>
            </div>

            {isError && <p className="mt-1.5 text-sm text-[#EF4444]">{error}</p>}
        </div>
    );
}
