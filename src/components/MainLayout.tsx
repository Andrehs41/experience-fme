import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import GlobalScrollProgress from "./GlobalScrollProgress";
import PageTransition from "./PageTransition";
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
        <div className="relative min-h-screen bg-fme-black text-fme-white">
            <GlobalScrollProgress />
            <Cursor />
            <ScrollRefresh />
            <Navbar />
            <main className="min-h-[100dvh] pt-[calc(var(--nav-height)+env(safe-area-inset-top,0px))]">
                <PageTransition />
            </main>
        </div>
    );
}