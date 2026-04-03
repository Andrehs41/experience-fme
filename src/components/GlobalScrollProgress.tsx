import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";

/**
 * Barra superior de progreso de lectura (scrub suave), no intrusiva.
 */
export default function GlobalScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const bar = barRef.current;
        if (!bar) return;

        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: reduced ? true : 0.35,
            onUpdate: (self) => {
                bar.style.transform = `scaleX(${self.progress})`;
            },
        });

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad);

        return () => {
            window.removeEventListener("load", onLoad);
            st.kill();
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-x-0 top-0 z-[390] h-[2px] origin-left bg-[var(--border-cream-08)] md:h-px"
            aria-hidden
        >
            <div
                ref={barRef}
                className="h-full origin-left scale-x-0 bg-gradient-to-r from-fme-gold/90 via-fme-cream/80 to-fme-gold/90"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
}
