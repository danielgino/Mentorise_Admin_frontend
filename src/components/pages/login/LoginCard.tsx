import { motion } from "motion/react";
import { LoginForm } from "./LoginForm.tsx";
import {WEBSITE_NAME} from "../../../utils/Constants.tsx";

export function LoginCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            {/*<div className="flex justify-center mb-8">*/}
            {/*     <span className="bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent" style={{ fontSize: '120px', fontWeight: '800' }}>*/}
            {/*        {WEBSITE_NAME}*/}
            {/*      </span>*/}
            {/*</div>*/}

            <div className="relative flex justify-center mb-8">
                <div className="absolute -inset-0 rounded-full bg-white/10 blur-2xl"></div>
                <h1 className="relative text-6xl font-extrabold bg-gradient-to-r from-[#40E0D0] via-[#2E86DE] to-[#A66CFF] bg-clip-text text-transparent">
                    {WEBSITE_NAME}
                </h1>
            </div>

            <motion.div
                className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
                style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 2px transparent',
                    background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #2E86DE, #A66CFF) border-box',
                    border: '2px solid transparent',
                }}
                whileHover={{
                    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.2)',
                }}
                transition={{ duration: 0.3 }}
            >
                <LoginForm/>
            </motion.div>
        </motion.div>
    );
}
