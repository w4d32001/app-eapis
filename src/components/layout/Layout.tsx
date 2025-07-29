import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../shared/Logo";
import Footer from "./Footer";

function Layout() {
    return (
        <div className="bg-brand min-h-screen flex flex-col">
            <header className="w-full flex justify-between items-center p-8 fixed top-0 left-0 bg-brand z-50 shadow-md">
                <Logo />
                <Navbar />
            </header>
            <main className="mt-50">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Layout;
