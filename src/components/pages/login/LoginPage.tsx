import {LoginCard} from "./LoginCard.tsx";
import LoginBackground from "./LoginBackground.tsx";

export function LoginPage() {
    return (
        <div
            className="
        relative min-h-screen w-full overflow-hidden
        flex items-center justify-center
      "
        >
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <LoginBackground />
            </div>


            <div className="relative z-20">
                <LoginCard />
            </div>
            <footer className="absolute bottom-4 w-full text-center text-sm text-gray-400 z-30">
                © 2026 Mentorise —    מערכת לניהול אפליקציית התרגול פותח ע"י דניאל ג'ינו, פרויקט גמר מדעי המחשב
            </footer>
        </div>
    );
}
