import {LoginCard} from "./LoginCard.tsx";

export function LoginPage() {
    return (
        <div
            // className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#40E0D0] via-[#2E86DE] to-[#A66CFF]"
            // className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1429]"
//             className="
// flex items-center justify-center min-h-screen
// bg-[radial-gradient(circle_at_50%_25%,rgba(46,134,222,0.25),transparent_45%),linear-gradient(180deg,#0b1026,#070a1c)]
// "

            className="
flex items-center justify-center min-h-screen
bg-gradient-to-br from-[#141a3a] via-[#1c2452] to-[#151b3d]
"
        >
            <div className="absolute inset-0 backdrop-blur-[60px] opacity-70"></div>

            {/* כרטיס ההתחברות */}
            <div className="relative z-10">
                <LoginCard />
            </div>
        </div>
    );
}
