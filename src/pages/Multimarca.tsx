// src/pages/Multimarca.tsx
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { FACETS, BRANDS } from "../data/multimarcaData";
import type { Facet } from "../data/multimarcaData";

// Tipos
type HoveredSide = "fme" | "multimarca" | null;

// Nodo central divisor 
function DividerNode({ hovered }: { hovered: HoveredSide }) {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1px solid rgba(232,224,208,0.15)",
                background: "var(--black)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 11,
                transition: "border-color 0.4s, transform 0.4s",
                ...(hovered ? { borderColor: "rgba(232,224,208,0.3)", transform: "translate(-50%, -50%) scale(1.1)" } : {}),
            }}
        >
            <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: ".1em",
                color: hovered ? "var(--cream-dim)" : "rgba(232,224,208,0.25)",
                transition: "color 0.3s",
            }}>
                VS
            </span>
        </div>
    );
}

// Un lado del split
interface SideProps {
    facet: Facet;
    hovered: HoveredSide;
    isLeft: boolean;
    onHover: (id: HoveredSide) => void;
}

function SplitSide({ facet, hovered, isLeft, onHover }: SideProps) {
    const isFme = facet.id === "fme";
    const isHovered = hovered === facet.id;
    const isOpposite = hovered !== null && hovered !== facet.id;

    const flex = isHovered ? 1.65 : isOpposite ? 0.35 : 1;

    const handleClick = () => {
        if (facet.external) {
            window.open(facet.href, "_blank", "noopener noreferrer");
        } else {
            window.location.href = facet.href;
        }
    };

    return (
        <div
            onMouseEnter={() => onHover(facet.id)}
            onMouseLeave={() => onHover(null)}
            onClick={handleClick}
            style={{
                flex,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "60px 48px",
                cursor: "pointer",
                transition: "flex 0.7s cubic-bezier(0.77,0,0.18,1)",
                background: isFme ? "#0a0a0a" : "#0e0c08",
            }}
        >
            {/* Glow de fondo */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: isFme
                    ? "radial-gradient(ellipse 60% 40% at 50% 70%, rgba(232,224,208,0.04) 0%, transparent 70%)"
                    : "radial-gradient(ellipse 60% 40% at 50% 70%, rgba(201,168,76,0.06) 0%, transparent 70%)",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.5s",
                pointerEvents: "none",
            }} />

            {/* Número gigante de fondo */}
            <span style={{
                position: "absolute",
                bottom: "-20px",
                ...(isLeft ? { right: "-40px" } : { left: "-40px" }),
                fontFamily: "var(--font-display)",
                fontSize: "35vw",
                lineHeight: 1,
                color: "rgba(232,224,208,0.015)",
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-.02em",
                transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
                transform: isHovered ? "scale(1.04)" : "scale(1)",
            }}>
                {isFme ? "F" : "M"}
            </span>

            {/* Label superior */}
            <div style={{
                position: "absolute",
                top: "100px",
                ...(isLeft ? { left: "48px" } : { right: "48px" }),
                zIndex: 5,
                textAlign: isLeft ? "left" : "right",
                transition: "opacity 0.4s",
                opacity: isOpposite ? 0.3 : 1,
            }}>
                <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "11px",
                    letterSpacing: ".25em",
                    color: "rgba(232,224,208,0.2)",
                    textTransform: "uppercase",
                }}>
                    {facet.topLabel}
                </p>
            </div>

            {/* Contenido principal */}
            <div style={{ position: "relative", zIndex: 5 }}>

                {/* Tag */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                    fontSize: "9px",
                    letterSpacing: ".35em",
                    textTransform: "uppercase",
                    color: isFme ? "rgba(232,224,208,0.4)" : "var(--gold)",
                    transition: "opacity 0.4s",
                    opacity: isOpposite ? 0.4 : 1,
                }}>
                    <span style={{ width: "20px", height: "1px", background: "currentColor", display: "block", flexShrink: 0 }} />
                    {facet.tag}
                </div>

                {/* Título */}
                <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: isFme ? "clamp(48px,7vw,88px)" : "clamp(36px,5.5vw,68px)",
                    lineHeight: .88,
                    letterSpacing: "-.01em",
                    transition: "opacity 0.4s, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
                    opacity: isOpposite ? 0.25 : 1,
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}>
                    {facet.title.map((line, i) => (
                        <span key={i} style={{ display: "block", color: (!isFme && facet.titleAccent === i) ? "var(--gold)" : "var(--cream)" }}>
                            {line}
                        </span>
                    ))}
                </h2>

                {/* Descripción — aparece en hover */}
                <p style={{
                    fontSize: "12px",
                    lineHeight: 1.85,
                    color: "var(--cream-dim)",
                    fontWeight: 300,
                    marginTop: "16px",
                    maxWidth: "280px",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.4s 0.1s, transform 0.4s 0.1s",
                }}>
                    {facet.desc}
                </p>

                {/* CTA */}
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-display)",
                    fontSize: "11px",
                    letterSpacing: ".2em",
                    marginTop: "28px",
                    padding: "10px 24px",
                    background: isFme ? "var(--cream)" : "var(--gold)",
                    color: "var(--black)",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.3s 0.2s, transform 0.3s 0.2s",
                }}>
                    {facet.cta}
                </div>
            </div>
        </div>
    );
}

// Sección de marcas (debajo del split) 
function BrandsSection() {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".brand-item", {
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        gsap.from(".brands-title", {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: ref });

    return (
        <section
            ref={ref}
            style={{
                padding: "100px 40px",
                borderTop: "1px solid rgba(232,224,208,0.07)",
                background: "#0e0c08",
            }}
        >
            {/* Header */}
            <div className="brands-title" style={{ marginBottom: "60px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span style={{ width: "28px", height: "1px", background: "var(--gold)", display: "block" }} />
                    <span style={{ fontSize: "10px", letterSpacing: ".3em", textTransform: "uppercase", color: "var(--gold)" }}>
                        Catálogo Multimarca
                    </span>
                </div>
                <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(40px,6vw,72px)",
                    lineHeight: .9,
                    color: "var(--cream)",
                }}>
                    LAS MARCAS<br />
                    <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(232,224,208,0.3)" }}>
                        QUE CURÓ FME.
                    </span>
                </h2>
            </div>

            {/* Grid de marcas */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1px",
                background: "rgba(232,224,208,0.06)",
            }}>
                {BRANDS.map((brand) => (
                    <a
                        key={brand.id}
                        href={brand.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brand-item"
                        data-cursor={brand.name}
                        style={{
                            display: "block",
                            padding: "40px 36px",
                            background: "#0e0c08",
                            textDecoration: "none",
                            transition: "background 0.3s",
                            borderBottom: "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#141208")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "#0e0c08")}
                    >
                        {/* Número */}
                        <span style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "10px",
                            letterSpacing: ".15em",
                            color: "rgba(232,224,208,0.2)",
                            display: "block",
                            marginBottom: "24px",
                        }}>
                            {String(brand.id).padStart(2, "0")}
                        </span>

                        {/* Logo o nombre */}
                        {brand.logo ? (
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                style={{ height: "32px", objectFit: "contain", marginBottom: "20px", filter: "brightness(0) invert(0.7)" }}
                            />
                        ) : (
                            <p style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "28px",
                                letterSpacing: ".06em",
                                color: "var(--cream)",
                                marginBottom: "16px",
                                lineHeight: 1,
                            }}>
                                {brand.name.toUpperCase()}
                            </p>
                        )}

                        <p style={{
                            fontSize: "12px",
                            lineHeight: 1.7,
                            color: "var(--cream-dim)",
                            fontWeight: 300,
                        }}>
                            {brand.desc}
                        </p>

                        {/* Indicador de link */}
                        <span style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "20px",
                            fontSize: "9px",
                            letterSpacing: ".2em",
                            textTransform: "uppercase",
                            color: "var(--gold)",
                        }}>
                            Ver catálogo →
                        </span>
                    </a>
                ))}
            </div>
        </section>
    );
}

// Página principal
export default function Multimarca() {
    const [hovered, setHovered] = useState<HoveredSide>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    // Entrada de página
    useGSAP(() => {
        gsap.from(pageRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
        });
    });

    return (
        <div ref={pageRef} style={{ background: "var(--black)", minHeight: "100vh" }}>

            {/* Split screen principal */}
            <div style={{ position: "relative", height: "100vh", display: "flex" }}>

                {FACETS.map((facet, i) => (
                    <SplitSide
                        key={facet.id}
                        facet={facet}
                        hovered={hovered}
                        isLeft={i === 0}
                        onHover={setHovered}
                    />
                ))}

                {/* Línea divisoria */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background: "rgba(232,224,208,0.1)",
                    zIndex: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "none",
                }}>
                    <DividerNode hovered={hovered} />
                </div>

                {/* Hint inicial */}
                {!hovered && (
                    <p style={{
                        position: "absolute",
                        bottom: "32px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 20,
                        fontSize: "9px",
                        letterSpacing: ".25em",
                        textTransform: "uppercase",
                        color: "rgba(232,224,208,0.2)",
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                    }}>
                        Elige tu lado
                    </p>
                )}
            </div>

            {/* Sección de marcas debajo */}
            <BrandsSection />
        </div>
    );
}