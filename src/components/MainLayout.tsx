import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { ScrollTrigger } from "../lib/gsap";
import Cursor from "./utils/Cursor";

function ScrollRefresh() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.refresh();
    }, [pathname]);

    return null;
}

export default function MainLayout() {
    return (
        <div className="relative min-h-screen bg-black">
            <Cursor />
            <ScrollRefresh />
            <Navbar />
            <main>
                <Outlet /> 
            </main>
        </div>
    );
}