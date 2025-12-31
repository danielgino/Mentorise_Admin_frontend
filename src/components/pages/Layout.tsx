import {Navbar} from "../Navbar.tsx";
import {Outlet} from "react-router-dom";


function Layout(){

    return(
        <div className="bg-[#F9FAFB]">
            {/*<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">*/}
            {/*    /!* Background decoration *!/*/}
            {/*    <div className="fixed inset-0 overflow-hidden pointer-events-none">*/}
            {/*        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#40E0D0] opacity-10 blur-[120px] rounded-full" />*/}
            {/*        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2E86DE] opacity-10 blur-[120px] rounded-full" />*/}
            {/*        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#A66CFF] opacity-10 blur-[120px] rounded-full" />*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="isolate relative min-h-dvh w-full overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">*/}
            {/*    /!* שכבת הרקע *!/*/}
            {/*    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">*/}
            {/*        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#40E0D0] opacity-10 blur-[120px] rounded-full" />*/}
            {/*        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2E86DE] opacity-10 blur-[120px] rounded-full" />*/}
            {/*        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#A66CFF] opacity-10 blur-[120px] rounded-full" />*/}
            {/*    </div>*/}
            <Navbar/>
            {/*<main className="relative z-10">*/}
            <main className=" w-full max-w-none pt-28  ">

            <Outlet />
            </main>
            </div>
        // </div>
    )
}
export default Layout;