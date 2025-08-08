import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Logo from "../shared/Logo";
import Footer from "./Footer";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
    const location = useLocation();
    return (
        <div className="bg-brand min-h-screen flex flex-col">
            <header className="w-full flex justify-between items-center p-2 fixed top-0 left-0 bg-brand z-50 shadow-md">
                <Logo />
                <Navbar />
            </header>
            <main className="mt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Layout;
