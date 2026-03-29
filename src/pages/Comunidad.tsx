// src/pages/Comunidad.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import MasonryGrid from "../components/MasonryGrid";
import MagneticButton from "../components/MagneticButton";
import { COMUNIDAD_DATA } from "../data/comunidadData";

function ComunidadHeader() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".ch-label", { y: 16, opacity: 0, duration: 0.6 })
            .from(".ch-title", { y: 70, opacity: 0, duration: 1.0 }, "-=0.3")
            .from(".ch-desc", { y: 24, opacity: 0, duration: 0.7 }, "-=0.4")
            .from(".ch-counter", { y: 16, opacity: 0, duration: 0.6 }, "-=0.3")
            .from(".ch-rule", { scaleX: 0, duration: 1.0, ease: "expo.out" }, "-=0.6");
    }, { scope: ref });

    return (
        <div
            ref={ref}
            style={{
                padding: "160px 40px 80px",
                borderBottom: "1px solid rgba(232,224,208,.07)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "end",
            }}
        >
            {/* Columna izquierda */}
            <div>
                <div
                    className="ch-label"
                    style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}
                >
                    <span style={{ width: "28px", height: "1px", background: "var(--gold)", display: "block" }} />
                    <span style={{ fontSize: "10px", letterSpacing: ".35em", textTransform: "uppercase", color: "var(--gold)" }}>
                        FME Store
                    </span>
                </div>

                <h1
                    className="ch-title"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(56px, 10vw, 120px)",
                        lineHeight: .88,
                        letterSpacing: "-.01em",
                        color: "var(--cream)",
                    }}
                >
                    COMUNI<br />
                    <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(232,224,208,.3)" }}>
                        DAD
                    </span>
                </h1>
            </div>

            {/* Columna derecha */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "24px" }}>
                <p
                    className="ch-desc"
                    style={{
                        fontSize: "13px",
                        lineHeight: 1.9,
                        color: "var(--cream-dim)",
                        fontWeight: 300,
                        maxWidth: "360px",
                    }}
                >
                    Cada foto es una historia.<br />
                    Los que visten FME no son clientes —<br />
                    son parte del barrio.
                </p>

                {/* Contador */}
                <div className="ch-counter" style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "52px", color: "var(--cream)", lineHeight: 1 }}>
                        {COMUNIDAD_DATA.length}
                    </span>
                    <span style={{ fontSize: "10px", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--cream-dim)" }}>
                        miembros del barrio
                    </span>
                </div>

                {/* Línea separadora animada */}
                <div
                    className="ch-rule"
                    style={{
                        height: "1px",
                        background: "rgba(232,224,208,.1)",
                        transformOrigin: "left",
                    }}
                />
            </div>
        </div>
    );
}

//  Banda de marca (Parallax)
function MarqueeBand() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(".marquee-inner", {
            xPercent: -50,
            duration: 22,
            ease: "none",
            repeat: -1,
        });
    }, { scope: ref });

    const items = ["FME Comunidad", "·", "La Marca del Barrio", "·", "Medellín", "·"];
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div
            ref={ref}
            style={{
                overflow: "hidden",
                borderBottom: "1px solid rgba(232,224,208,.07)",
                padding: "16px 0",
            }}
        >
            <div className="marquee-inner" style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
                {repeated.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "13px",
                            letterSpacing: ".25em",
                            padding: "0 32px",
                            color: item === "·" ? "var(--gold)" : "rgba(232,224,208,.2)",
                        }}
                    >
                        {item.toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );
}

// CTA inferior
function BottomCTA() {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 88%",
                toggleActions: "play none none reverse",
            },
        });
    });

    return (
        <div
            ref={ref}
            style={{
                borderTop: "1px solid rgba(232,224,208,.07)",
                padding: "60px 40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
            }}
        >
            <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3.5vw, 44px)",
                lineHeight: 1,
                color: "var(--cream)",
            }}>
                ¿YA ERES PARTE<br />
                DEL <span style={{ color: "var(--gold)" }}>BARRIO?</span>
            </p>

            <div
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "11px",
                    letterSpacing: ".22em",
                    background: "var(--cream)",
                    color: "var(--black)",
                    padding: "14px 36px",
                    border: "none",
                    cursor: "pointer",
                    transition: "background .3s",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) =>
                    (e.currentTarget.style.background = "var(--gold)")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) =>
                    (e.currentTarget.style.background = "var(--cream)")
                }
            >
                <MagneticButton
                    onClick={() => window.open("https://storefme.com", "_blank")}
                >
                    VER LA TIENDA →
                </MagneticButton>
            </div>
        </div>
    );
}

export default function Comunidad() {
    return (
        <main style={{ background: "var(--black)", color: "var(--cream)", minHeight: "100vh" }}>
            <ComunidadHeader />
            <MarqueeBand />

            <section style={{ padding: "60px 40px 80px" }}>
                <MasonryGrid members={COMUNIDAD_DATA} />
            </section>

            <BottomCTA />
        </main>
    );
}