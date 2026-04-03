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
                border: "1px solid var(--border-cream-15)",
                background: "var(--black)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 11,
                transition: "border-color 0.4s, transform 0.4s",
                ...(hovered ? { borderColor: "var(--border-cream-30)", transform: "translate(-50%, -50%) scale(1.1)" } : {}),
            }}
        >
            <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: ".1em",
                color: hovered ? "var(--cream-dim)" : "var(--text-cream-soft)",
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
            className="min-h-[100dvh] flex-1 md:min-h-0"
            style={{
                flex,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "clamp(28px,6vw,60px) clamp(20px,4vw,48px)",
                cursor: "pointer",
                transition: "flex 0.7s cubic-bezier(0.77,0,0.18,1)",
                background: isFme ? "var(--black)" : "var(--surface-warm)",
            }}
        >
            {/* Glow de fondo */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: isFme
                    ? "var(--gradient-glow-fme)"
                    : "var(--gradient-glow-gold)",
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
                color: "var(--text-cream-whisper)",
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
                top: "clamp(72px,12vw,100px)",
                ...(isLeft ? { left: "clamp(20px,4vw,48px)" } : { right: "clamp(20px,4vw,48px)" }),
                zIndex: 5,
                textAlign: isLeft ? "left" : "right",
                transition: "opacity 0.4s",
                opacity: isOpposite ? 0.3 : 1,
            }}>
                <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "11px",
                    letterSpacing: ".25em",
                    color: "var(--text-cream-muted)",
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
                    color: isFme ? "var(--text-cream-ghost)" : "var(--gold)",
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
                <p
                    className="max-md:!translate-y-0 max-md:!opacity-100"
                    style={{
                    fontSize: "12px",
                    lineHeight: 1.85,
                    color: "var(--cream-dim)",
                    fontWeight: 300,
                    marginTop: "16px",
                    maxWidth: "280px",
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(12px)",
                    transition: "opacity 0.4s 0.1s, transform 0.4s 0.1s",
                }}
                >
                    {facet.desc}
                </p>

                <div
                    className="max-md:!translate-y-0 max-md:!opacity-100"
                    style={{
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
                }}
                >
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
            className="relative border-t border-[var(--border-gold-10)] bg-fme-surface-warm px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute left-1/2 top-0 h-[min(40vh,320px)] w-[min(100%,720px)] -translate-x-1/2 blur-3xl"
                style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.07) 0%, transparent 65%)" }}
                aria-hidden
            />

            {/* Header */}
            <div className="brands-title relative z-[1] mb-14 max-w-4xl md:mb-20">
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-fme-gold md:w-10" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-fme-gold">
                        Catálogo multimarca
                    </span>
                </div>
                <h2 className="fme-font-display text-[clamp(38px,6vw,72px)] font-bold leading-[0.92] text-fme-cream">
                    LAS MARCAS
                    <br />
                    <span className="text-transparent [-webkit-text-stroke:1px_var(--text-cream-stroke)]">
                        QUE CURÓ FME.
                    </span>
                </h2>
            </div>

            {/* Grid de marcas */}
            <div
                className="relative z-[1] grid gap-px bg-[var(--border-cream-06)] shadow-[0_40px_100px_-48px_rgb(0_0_0/0.85)]"
                style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px),1fr))",
                }}
            >
                {BRANDS.map((brand) => (
                    <a
                        key={brand.id}
                        href={brand.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brand-item group block bg-fme-surface-warm p-9 transition-all duration-300 [text-decoration:none] hover:z-[2] hover:bg-fme-surface-warm-hover hover:shadow-[inset_0_0_0_1px_var(--border-gold-08)] sm:p-10 md:px-11"
                        data-cursor={brand.name}
                    >
                        {/* Número */}
                        <span style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "10px",
                            letterSpacing: ".15em",
                            color: "var(--text-cream-muted)",
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
        <div ref={pageRef} className="relative min-h-dvh fme-page-vignette fme-noise-soft">
            <header className="relative z-[25] border-b border-[var(--border-gold-08)] bg-gradient-to-b from-[rgb(var(--gold-rgb)/0.06)] to-transparent px-4 py-3.5 text-center md:py-4">
                <p className="text-[9px] uppercase tracking-[0.42em] text-fme-cream-dim">
                    FME Store · <span className="text-fme-gold">dos entradas</span>, un checkout
                </p>
            </header>

            {/* Split: apilado en móvil, lado a lado en desktop */}
            <div className="relative flex min-h-[200dvh] flex-col md:h-screen md:min-h-0 md:flex-row">

                {FACETS.map((facet, i) => (
                    <SplitSide
                        key={facet.id}
                        facet={facet}
                        hovered={hovered}
                        isLeft={i === 0}
                        onHover={setHovered}
                    />
                ))}

                <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 hidden w-px -translate-x-1/2 bg-[var(--border-cream-10)] md:block">
                    <DividerNode hovered={hovered} />
                </div>

                {!hovered && (
                    <p
                        className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2 rounded-full border border-[var(--border-gold-08)] bg-[rgb(var(--black-rgb)/0.55)] px-4 py-1.5 text-[8px] uppercase tracking-[0.28em] text-[var(--text-cream-muted)] backdrop-blur-sm sm:text-[9px]"
                        style={{ bottom: "max(24px, env(safe-area-inset-bottom, 8px))" }}
                    >
                        Elegí un lado
                    </p>
                )}
            </div>

            {/* Sección de marcas debajo */}
            <BrandsSection />
        </div>
    );
}