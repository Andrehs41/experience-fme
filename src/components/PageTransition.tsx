import { useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/**
 * Entrada suave al cambiar de ruta (sin bloquear el scroll).
 */
export default function PageTransition() {
    const { pathname } = useLocation();
    const wrapRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = wrapRef.current;
        if (!el) return;

        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduced) {
            gsap.set(el, { y: 0 });
            return;
        }

        // Solo desplazamiento: opacity 0 rompe lazy-load / decodificación de imágenes al montar.
        gsap.fromTo(
            el,
            { y: 16 },
            {
                y: 0,
                duration: 0.48,
                ease: "power3.out",
                onComplete: () => ScrollTrigger.refresh(),
            }
        );
    }, { dependencies: [pathname], scope: wrapRef });

    return (
        <div ref={wrapRef} key={pathname} className="min-h-[100dvh]">
            <Outlet />
        </div>
    );
}
