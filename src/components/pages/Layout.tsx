import {Navbar} from "../Navbar.tsx";
import {Outlet} from "react-router-dom";


function Layout(){

    return(
        <div className="bg-[#F9FAFB]">
            <Navbar/>
            <main className=" w-full max-w-none pt-28  ">

            <Outlet />
            </main>
            </div>
    )
}
export default Layout;