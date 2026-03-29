import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
const MANIFESTO_LINES = [
    { text: "NACIMOS", outline: false },
    { text: "SIN", outline: true },
    { text: "PERMISO.", outline: false },
];

export default function ManifestoSection() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Cada línea entra desde abajo con clip
        const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line", container.current!);
        lines.forEach((line, i) => {
            gsap.fromTo(
                line,
                { y: 90, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 1.1,
                    ease: "power4.out",
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: line,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // Párrafo de cierre
        gsap.fromTo(".manifesto-body", { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
            scrollTrigger: {
                trigger: ".manifesto-body",
                start: "top 88%",
                toggleActions: "play none none reverse",
            },
        });

        // Línea decorativa que se expande
        gsap.fromTo(".manifesto-rule", { scaleX: 0 }, {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
        });
    }, { scope: container });

    return (
        <section
            ref={container}
            style={{ padding: "10rem 2.5rem", maxWidth: "1200px", margin: "0 auto" }}
        >
            {/* Label superior */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "60px" }}>
                <span
                    className="manifesto-rule"
                    style={{ display: "block", height: "1px", width: "60px", background: "var(--gold)" }}
                />
                <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>
                    Manifiesto
                </span>
            </div>

            {/* Líneas de texto grandes */}
            <div style={{ overflow: "hidden" }}>
                {MANIFESTO_LINES.map(({ text, outline }) => (
                    <div key={text} className="manifesto-line" style={{ overflow: "hidden" }}>
                        <p
                            style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(64px, 13vw, 160px)",
                                lineHeight: 0.88,
                                letterSpacing: "-0.01em",
                                color: outline ? "transparent" : "var(--cream)",
                                WebkitTextStroke: outline ? "1px rgba(232,224,208,0.3)" : "none",
                            }}
                        >
                            {text}
                        </p>
                    </div>
                ))}
            </div>

            {/* Cuerpo del manifiesto */}
            <p
                className="manifesto-body"
                style={{
                    marginTop: "56px",
                    fontSize: "15px",
                    lineHeight: 1.9,
                    color: "var(--cream-dim)",
                    fontWeight: 300,
                    maxWidth: "520px",
                    marginLeft: "auto",
                }}
            >
                FME no es una tendencia. Es una declaración.<br />
                Cada pieza es un acto de resistencia silenciosa —<br />
                hecha para los que construyen desde cero,<br />
                para los que el barrio les enseñó todo.
            </p>
        </section>
    );
}
