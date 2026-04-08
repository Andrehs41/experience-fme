import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

export function ParallaxSection() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Usa vw en vez de xPercent: xPercent es % del ancho propio del elemento
        // (que es enorme por ser whitespace-nowrap), lo cual desplazaba demasiado
        gsap.fromTo(
            ".parallax-text",
            { x: "8vw" },
            {
                x: "-25vw",
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            }
        );
    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative border-y border-[var(--border-gold-08)] bg-[linear-gradient(180deg,rgb(var(--black-rgb)/0.4)_0%,transparent_45%,rgb(var(--gold-rgb)/0.03)_100%)]"
            // Sin overflow-hidden en la section para evitar cortar letras;
            // el clip se maneja con el wrapper interior
            style={{ overflow: "hidden" }}
        >
            {/* Wrapper con padding vertical generoso para que las letras no se corten */}
            <div style={{ padding: "clamp(2.5rem,5vw,5rem) 0", overflow: "hidden" }}>
                <p
                    className="parallax-text whitespace-nowrap bg-gradient-to-r from-fme-gold/35 via-fme-cream/25 to-fme-gold/35 bg-clip-text text-transparent"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.5rem, 8vw, 7rem)",
                        fontWeight: 700,
                        letterSpacing: "-.01em",
                        lineHeight: 1.15,
                        // Padding extra vertical para que descenders/ascenders no se corten
                        paddingTop: "0.15em",
                        paddingBottom: "0.2em",
                        display: "block",
                        willChange: "transform",
                    }}
                >
                    MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
                    MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
                    MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
                </p>
            </div>
        </section>
    );
}
