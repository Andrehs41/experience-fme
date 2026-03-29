import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import MagneticButton from "../MagneticButton";
// ─── CTA al ecommerce ─────────────────────────────────────────────
export default function StoreCTA() {
    const container = useRef<HTMLElement>(null);
    const bgText = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Texto de fondo con parallax suave
        gsap.to(bgText.current, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        // Contenido entra al hacer scroll
        gsap.fromTo(".cta-content", { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
            },
        });

        // Línea lateral que crece
        gsap.fromTo(".cta-line", { scaleY: 0 }, {
            scaleY: 1,
            transformOrigin: "top",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 72%",
            },
        });
    }, { scope: container });

    return (
        <section
            ref={container}
            data-cursor="TIENDA"
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                borderTop: "1px solid rgba(232,224,208,0.06)",
                padding: "80px 40px",
            }}
        >
            {/* Texto fantasma de fondo */}
            <span
                ref={bgText}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "var(--font-display)",
                    fontSize: "35vw",
                    color: "rgba(232,224,208,0.018)",
                    pointerEvents: "none",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                }}
            >
                FME
            </span>

            {/* Línea lateral izquierda */}
            <div
                className="cta-line"
                style={{
                    position: "absolute",
                    left: "40px",
                    top: "15%",
                    bottom: "15%",
                    width: "1px",
                    background: "rgba(232,224,208,0.08)",
                }}
            />

            {/* Contenido central */}
            <div
                className="cta-content"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                    gap: "48px",
                }}
            >
                {/* Label */}
                <span style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--gold)" }}>
                    La tienda
                </span>

                {/* Titular */}
                <h2
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(48px, 9vw, 110px)",
                        lineHeight: 0.9,
                        letterSpacing: "-0.01em",
                        color: "var(--cream)",
                    }}
                >
                    LA ROPA ESTÁ<br />
                    <span style={{ color: "transparent", WebkitTextStroke: "1px var(--gold)" }}>
                        ESPERÁNDOTE.
                    </span>
                </h2>

                {/* Descripción */}
                <p style={{ fontSize: "13px", color: "var(--cream-dim)", fontWeight: 300, letterSpacing: "0.05em", maxWidth: "340px", lineHeight: 1.8 }}>
                    Visita el ecommerce oficial de FME Store.<br />
                    Nuevos drops, colecciones limitadas y piezas<br />
                    que no encontrarás en ningún otro lugar.
                </p>

                {/* CTA */}
                <div
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "13px",
                        letterSpacing: "0.25em",
                        background: "var(--cream)",
                        color: "var(--black)",
                        padding: "18px 52px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
                        ((e.currentTarget as HTMLDivElement).style.background = "var(--gold)")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                        ((e.currentTarget as HTMLDivElement).style.background = "var(--cream)")
                    }
                >
                    <MagneticButton
                        onClick={() => window.open("https://storefme.com", "_blank")}
                    >
                        IR A LA TIENDA →
                    </MagneticButton>
                </div>

                {/* URL discreta */}
                <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(232,224,208,0.2)", textTransform: "lowercase" }}>
                    storefme.com
                </span>
            </div>
        </section>
    );
}
