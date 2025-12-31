// components/WebsiteLoader.tsx
import { motion } from "framer-motion";

type LoaderProps = {
    durationMs?: number;
    brand?: { from: string; via: string; to: string };
    title?: string;
};

export default function WebsiteLoader({
                                          durationMs = 2000,
                                          brand = { from: "#40E0D0", via: "#2E86DE", to: "#A66CFF" },
                                          title = "Mentorise",
                                      }: LoaderProps) {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-8 select-none">
                <motion.h1
                    className="text-7xl font-extrabold tracking-wider text-transparent bg-clip-text drop-shadow"
                    style={{
                        backgroundImage: `linear-gradient(45deg, ${brand.from}, ${brand.via}, ${brand.to}, ${brand.from})`,
                        backgroundSize: "200% 100%",
                        filter: "drop-shadow(0 0 20px rgba(64,224,208,0.20))",
                    }}
                    aria-label={title}
                    animate={{ backgroundPositionX: ["-200%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    {title}
                </motion.h1>

                <div className="relative w-[240px] h-2 rounded-full overflow-hidden shadow-sm bg-gray-100">
                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                            backgroundImage: `linear-gradient(90deg, ${brand.from}, ${brand.via}, ${brand.to})`,
                            boxShadow: "0 0 20px rgba(64, 224, 208, 0.30)",
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: ["0%", "100%"] }}
                        transition={{
                            duration: durationMs / 1000,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        <motion.span
                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white"
                            style={{ width: 12, height: 12, filter: "blur(2px)", opacity: 0.85 }}
                            animate={{ scale: [0.9, 1.05, 0.9] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full opacity-40 blur-md pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(90deg, ${brand.from}, ${brand.via}, ${brand.to})`,
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: ["0%", "100%"] }}
                        transition={{
                            duration: durationMs / 1000,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
