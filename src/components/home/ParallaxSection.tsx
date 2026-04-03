import { gsap } from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

export function ParallaxSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(".parallax-text", {
            xPercent: -40,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });
    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative overflow-hidden border-y border-[var(--border-gold-08)] bg-[linear-gradient(180deg,rgb(var(--black-rgb)/0.4)_0%,transparent_45%,rgb(var(--gold-rgb)/0.03)_100%)] py-16 sm:py-20 md:py-24"
        >
            <p className="parallax-text whitespace-nowrap bg-gradient-to-r from-fme-gold/35 via-fme-cream/25 to-fme-gold/35 bg-clip-text text-[clamp(2.5rem,11vw,8vw)] font-bold tracking-tight text-transparent md:text-[8vw]">
                MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
                MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
            </p>
        </section>
    );
}

