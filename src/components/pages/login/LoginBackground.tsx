

export default function LoginBackground() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* === BRAND BASE === */}
            {/* Stronger brand gradient so colors are clearly visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#40E0D0]/40 via-[#2E86DE]/35 to-[#A66CFF]/40" />

            {/* Neutral dark overlay – balances color, keeps it professional */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/60 to-slate-950/75" />

            {/* === BRAND STARFIELD (MAIN VISUAL LANGUAGE) === */}
            <div
                className="absolute inset-0 opacity-[0.65]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 12% 22%, rgba(64,224,208,1) 1.2px, transparent 2.4px)," +
                        "radial-gradient(circle at 28% 68%, rgba(64,224,208,0.9) 1px, transparent 2.2px)," +
                        "radial-gradient(circle at 52% 18%, rgba(46,134,222,1) 1.2px, transparent 2.4px)," +
                        "radial-gradient(circle at 74% 44%, rgba(46,134,222,0.9) 1px, transparent 2.2px)," +
                        "radial-gradient(circle at 86% 72%, rgba(166,108,255,1) 1.2px, transparent 2.4px)," +
                        "radial-gradient(circle at 42% 52%, rgba(166,108,255,0.85) 1px, transparent 2.2px)",
                    backgroundRepeat: "repeat",
                    backgroundSize: "240px 240px",
                    maskImage:
                        "radial-gradient(ellipse 85% 65% at 50% 45%, black 60%, transparent 92%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 85% 65% at 50% 45%, black 60%, transparent 92%)",
                }}
            />

            {/* === BRAND SHEEN === */}
            {/* Very soft diagonal color flow for depth */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        "linear-gradient(135deg, rgba(64,224,208,0.35) 0%, transparent 55%)," +
                        "linear-gradient(315deg, rgba(166,108,255,0.35) 0%, transparent 55%)",
                    maskImage:
                        "radial-gradient(ellipse 75% 55% at 50% 45%, black 55%, transparent 85%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 75% 55% at 50% 45%, black 55%, transparent 85%)",
                }}
            />

            {/* Center lift – ensures white form contrast */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(900px 560px at 50% 45%, rgba(255,255,255,0.12), transparent 62%)",
                }}
            />

            {/* Subtle premium noise */}
            <svg
                className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay"
                aria-hidden="true"
            >
                <filter id="noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    );
}
