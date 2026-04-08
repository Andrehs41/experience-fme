import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../lib/gsap";
import { useGSAP } from "@gsap/react";
import { BARRIO_DATA } from "../data/barrioData";
import Seo from "../components/Seo";
import VideoSection from "../components/home/VideoSection";

// ── Tipos ─────────────────────────────────────────────────────────
interface SlideItem {
    id: number;
    src: string;
    title: string;
    sub: string;
    size: string;
    speed: number;
}

// ── Datos enriquecidos ────────────────────────────────────────────
// Extiende BARRIO_DATA con subtítulo editorial
const SUBTITLES: Record<number, string> = {
    1: "Cada pieza es una declaración.\nMedellín como origen.",
    2: "No seguimos tendencias.\nLas creamos desde abajo.",
    3: "El barrio no es un lugar.\nEs una actitud.",
    4: "Nueva temporada.\nMisma raíz.",
    5: "Hecho en Medellín.\nPara el mundo.",
    6: "Más que ropa.\nEs identidad en movimiento.",
    7: "Únete al movimiento.\nVive el barrio.",
    8: "Desde donde todo comenzó.\nRaíz pura.",
    9: "Cada pieza tiene historia.\nCada historia tiene barrio.",
    10: "La cultura no se importa.\nSe construye aquí.",
};

// ── CSS inyectado — maneja responsive sin Tailwind breakpoints ────
const BARRIO_CSS = `
  .barrio-slide-img {
    transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                clip-path 0s;
  }
  @media (prefers-reduced-motion: reduce) {
    .barrio-slide-img { transition: none !important; }
  }
`;

// ── Componente de slide individual ───────────────────────────────
function Slide({
    item, index, total, isActive, isPrev,
}: {
    item: SlideItem; index: number; total: number;
    isActive: boolean; isPrev: boolean;
}) {
    const imgRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const indexRef = useRef<HTMLSpanElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const numBgRef = useRef<HTMLSpanElement>(null);

    const sub = SUBTITLES[item.id] ?? "";

    // Animación de entrada de contenido cuando la slide se activa
    useEffect(() => {
        if (!isActive) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(indexRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.2)
            .fromTo(titleRef.current, { y: 50, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
                { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 0.3)
            .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.55)
            .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.65)
            .fromTo(numBgRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, 0.1);

        return () => { tl.kill(); };
    }, [isActive]);

    // Parallax sutil en imagen al hacer hover
    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!imgRef.current) return;
        const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = ((e.clientX - left) / width - 0.5) * 12;
        const y = ((e.clientY - top) / height - 0.5) * 8;
        gsap.to(imgRef.current, { x, y, duration: 0.8, ease: "power2.out", overwrite: "auto" });
    }, []);

    const onMouseLeave = useCallback(() => {
        if (!imgRef.current) return;
        gsap.to(imgRef.current, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    }, []);

    return (
        <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                // La slide activa está encima; la previa también visible durante transición
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
            }}
        >
            {/* Imagen / placeholder */}
            <div
                ref={imgRef}
                style={{
                    position: "absolute",
                    inset: "-5%", // margen extra para el parallax
                    willChange: "transform",
                }}
            >
                {item.src ? (
                    <img
                        src={item.src}
                        alt={item.title}
                        className="barrio-slide-img"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", }}
                    />
                ) : (
                    <div style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(135deg, hsl(${30 + index * 15}, 8%, ${9 + index}%) 0%, #080808 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <span style={{
                            fontFamily: "var(--font-display, sans-serif)",
                            fontSize: "35vw",
                            color: "rgba(232,224,208,0.025)",
                            lineHeight: 1,
                            letterSpacing: "-.04em",
                            userSelect: "none",
                        }}>
                            {item.title.charAt(0)}
                        </span>
                    </div>
                )}
            </div>

            {/* Overlay cinematográfico */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 30%, transparent 50%, rgba(10,10,10,0.7) 78%, rgba(10,10,10,0.96) 100%)",
                zIndex: 1,
            }} />

            {/* Número grande de fondo */}
            <span
                ref={numBgRef}
                style={{
                    position: "absolute",
                    bottom: "-60px",
                    right: "-20px",
                    zIndex: 1,
                    fontFamily: "var(--font-display, sans-serif)",
                    fontSize: "38vw",
                    color: "rgba(219, 42, 42, 0.02)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    letterSpacing: "-.04em",
                    userSelect: "none",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Contenido inferior */}
            <div style={{
                position: "absolute",
                bottom: "120px",
                left: "60px",
                right: 0,
                zIndex: 3,
                padding: "clamp(24px, 4vw, 60px) clamp(24px, 5vw, 72px) clamp(32px, 4vw, 56px)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "24px",
            }}>
                {/* Izquierda */}
                <div>
                    <span
                        ref={indexRef}
                        style={{
                            display: "block",
                            fontFamily: "var(--font-display, sans-serif)",
                            fontSize: "16px",
                            letterSpacing: ".3em",
                            color: "var(--gold, #c9a84c)",
                            marginBottom: "14px",
                            opacity: 0,
                        }}
                    >
                        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>

                    <div
                        ref={titleRef}
                        style={{
                            fontFamily: "var(--font-display, sans-serif)",
                            fontSize: "clamp(36px, 6.5vw, 96px)",
                            lineHeight: .86,
                            letterSpacing: ".03em",
                            color: "var(--cream, #e8e0d0)",
                            opacity: 0,
                            wordBreak: "keep-all",
                        }}
                    >
                        {item.title}
                    </div>

                    <p
                        ref={subRef}
                        style={{
                            marginTop: "14px",
                            fontSize: "clamp(10px, 1.4vw, 14px)",
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "rgba(232,224,208,0.45)",
                            lineHeight: 1.7,
                            opacity: 0,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {sub}
                    </p>
                </div>

                {/* Derecha — CTA */}
                <button
                    ref={ctaRef}
                    onClick={() => window.open("https://storefme.com", "_blank")}
                    style={{
                        fontFamily: "var(--font-display, sans-serif)",
                        fontSize: "10px",
                        letterSpacing: ".25em",
                        textTransform: "uppercase",
                        border: "1px solid rgba(232,224,208,0.2)",
                        color: "var(--cream, #e8e0d0)",
                        padding: "12px 28px",
                        background: "none",
                        cursor: "pointer",
                        flexShrink: 0,
                        opacity: 0,
                        transition: "background .3s, border-color .3s, color .3s",
                        alignSelf: "flex-end",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--cream, #e8e0d0)";
                        e.currentTarget.style.color = "var(--black, #0a0a0a)";
                        e.currentTarget.style.borderColor = "var(--cream, #e8e0d0)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = "var(--cream, #e8e0d0)";
                        e.currentTarget.style.borderColor = "rgba(232,224,208,0.2)";
                    }}
                >
                    Ver pieza
                </button>
            </div>
        </div>
    );
}

// ── Dots de navegación ────────────────────────────────────────────
function NavDots({ total, current, onGo }: {
    total: number; current: number; onGo: (i: number) => void;
}) {
    return (
        <div style={{
            position: "fixed",
            right: "32px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        }}>
            {Array.from({ length: total }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onGo(i)}
                    style={{
                        width: i === current ? "4px" : "3px",
                        height: i === current ? "24px" : "12px",
                        borderRadius: "2px",
                        background: i === current ? "var(--gold, #c9a84c)" : "rgba(232,224,208,0.25)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all .4s cubic-bezier(.25,.46,.45,.94)",
                    }}
                    aria-label={`Ir a slide ${i + 1}`}
                />
            ))}
        </div>
    );
}

// ── Barra de progreso ─────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "rgba(232,224,208,0.07)",
            zIndex: 50,
        }}>
            <div style={{
                height: "100%",
                background: "var(--gold, #c9a84c)",
                transformOrigin: "left",
                transform: `scaleX(${(current + 1) / total})`,
                transition: "transform .8s cubic-bezier(.25,.46,.45,.94)",
            }} />
        </div>
    );
}

// ── Hook de navegación ────────────────────────────────────────────
function useSlider(total: number) {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const isAnimating = useRef(false);

    const goTo = useCallback((index: number) => {
        if (isAnimating.current) return;
        if (index < 0 || index >= total) return;
        if (index === current) return;

        isAnimating.current = true;
        setPrev(current);
        setCurrent(index);

        setTimeout(() => {
            isAnimating.current = false;
            setPrev(null);
        }, 900);
    }, [current, total]);

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const back = useCallback(() => goTo(current - 1), [current, goTo]);

    // Wheel
    useEffect(() => {
        let accum = 0;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            accum += e.deltaY;
            if (Math.abs(accum) > 60) {
                accum > 0 ? next() : back();
                accum = 0;
            }
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, [next, back]);

    // Teclado
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") back();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next, back]);

    // Touch / swipe
    useEffect(() => {
        let startX = 0;
        let startY = 0;
        const onStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };
        const onEnd = (e: TouchEvent) => {
            const dx = startX - e.changedTouches[0].clientX;
            const dy = startY - e.changedTouches[0].clientY;
            // Solo si el gesto es principalmente horizontal
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
                dx > 0 ? next() : back();
            }
        };
        window.addEventListener("touchstart", onStart, { passive: true });
        window.addEventListener("touchend", onEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", onStart);
            window.removeEventListener("touchend", onEnd);
        };
    }, [next, back]);

    return { current, prev, goTo, next, back };
}

// ── Vista DESKTOP — fullscreen slider ────────────────────────────
function DesktopView({ items }: { items: SlideItem[] }) {
    const total = items.length;
    const { current, prev, goTo, next, back } = useSlider(total);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hintVisible, setHintVisible] = useState(true);

    useEffect(() => {
        if (current > 0) setHintVisible(false);
    }, [current]);

    // Transición de clip-path entre slides con GSAP
    const prevRef = useRef(current);
    useEffect(() => {
        if (prev === null) return;
        const direction = current > prevRef.current ? 1 : -1;
        prevRef.current = current;

        const incoming = containerRef.current?.children[current] as HTMLElement;
        if (!incoming) return;

        gsap.fromTo(incoming,
            { clipPath: direction > 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" }
        );
    }, [current, prev]);

    return (
        <div style={{ position: "relative", height: "100dvh", overflow: "hidden" }}>
            {/* Grain */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: 99,
                pointerEvents: "none",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                opacity: 0.35,
            }} />

            {/* Label lateral */}
            <span style={{
                position: "fixed",
                left: "-26px",
                top: "50%",
                zIndex: 50,
                fontSize: "13px",
                letterSpacing: ".35em",
                textTransform: "uppercase",
                color: "rgba(232, 224, 208, 0.59)",
                transform: "translateY(-50%) rotate(-90deg)",
                transformOrigin: "center",
                whiteSpace: "nowrap",
                pointerEvents: "none",
            }}>
                El Barrio · FME
            </span>

            {/* Counter */}
            <span style={{
                position: "fixed",
                right: "76px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 50,
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "11px",
                letterSpacing: ".2em",
                color: "rgba(232,224,208,0.2)",
                pointerEvents: "none",
            }}>
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>

            {/* Slides container */}
            <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
                {items.map((item, i) => (
                    <Slide
                        key={item.id}
                        item={item}
                        index={i}
                        total={total}
                        isActive={i === current}
                        isPrev={i === prev}
                    />
                ))}
            </div>

            {/* Navegación flechas */}
            <button
                onClick={back}
                disabled={current === 0}
                style={{
                    position: "fixed",
                    left: "20px",
                    bottom: "40px",
                    zIndex: 50,
                    background: "none",
                    border: "1px solid rgba(232,224,208,0.12)",
                    color: current === 0 ? "rgba(232,224,208,0.15)" : "var(--cream, #e8e0d0)",
                    width: "44px",
                    height: "44px",
                    cursor: current === 0 ? "default" : "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .3s",
                }}
                onMouseEnter={(e) => { if (current > 0) e.currentTarget.style.borderColor = "rgba(232,224,208,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,224,208,0.12)"; }}
                aria-label="Anterior"
            >←</button>

            <button
                onClick={next}
                disabled={current === total - 1}
                style={{
                    position: "fixed",
                    left: "72px",
                    bottom: "40px",
                    zIndex: 50,
                    background: "none",
                    border: "1px solid rgba(232,224,208,0.12)",
                    color: current === total - 1 ? "rgba(232,224,208,0.15)" : "var(--cream, #e8e0d0)",
                    width: "44px",
                    height: "44px",
                    cursor: current === total - 1 ? "default" : "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all .3s",
                }}
                onMouseEnter={(e) => { if (current < total - 1) e.currentTarget.style.borderColor = "rgba(232,224,208,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(232,224,208,0.12)"; }}
                aria-label="Siguiente"
            >→</button>

            {/* Hint */}
            {hintVisible && (
                <div style={{
                    position: "fixed",
                    bottom: "48px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "9px",
                    letterSpacing: ".3em",
                    textTransform: "uppercase",
                    color: "rgba(232,224,208,0.28)",
                    pointerEvents: "none",
                    transition: "opacity .4s",
                }}>
                    Scroll o flechas →
                </div>
            )}

            <NavDots total={total} current={current} onGo={goTo} />
            <ProgressBar current={current} total={total} />
        </div>
    );
}

// ── Vista MOBILE — cards apiladas con ScrollTrigger ───────────────
function MobileView({ items }: { items: SlideItem[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        items.forEach((_, i) => {
            const card = containerRef.current?.children[i] as HTMLElement;
            if (!card) return;

            const img = card.querySelector(".mobile-img") as HTMLElement;
            const title = card.querySelector(".mobile-title") as HTMLElement;
            const sub = card.querySelector(".mobile-sub") as HTMLElement;
            const numBg = card.querySelector(".mobile-num-bg") as HTMLElement;

            if (!img) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(img, { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 },
                { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1, ease: "expo.out" }, 0)
                .fromTo(numBg, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "expo.out" }, 0.1)
                .fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, 0.3)
                .fromTo(sub, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0.45);
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {items.map((item, i) => {
                const sub = SUBTITLES[item.id] ?? "";
                return (
                    <div
                        key={item.id}
                        style={{
                            position: "relative",
                            height: "100dvh",
                            overflow: "hidden",
                            background: "#0a0a0a",
                        }}
                    >
                        {/* Imagen */}
                        <div className="mobile-img" style={{ position: "absolute", inset: 0 }}>
                            {item.src ? (
                                <img src={item.src} alt={item.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                            ) : (
                                <div style={{
                                    width: "100%", height: "100%",
                                    background: `linear-gradient(135deg, hsl(${30 + i * 15}, 8%, ${9 + i}%) 0%, #080808 100%)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <span style={{
                                        fontFamily: "var(--font-display, sans-serif)", fontSize: "55vw",
                                        color: "rgba(232,224,208,0.03)", lineHeight: 1, letterSpacing: "-.04em",
                                    }}>
                                        {item.title.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Overlay */}
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, transparent 30%, rgba(10,10,10,0.85) 75%, rgba(10,10,10,0.97) 100%)",
                            zIndex: 1,
                        }} />

                        {/* Número grande */}
                        <span className="mobile-num-bg" style={{
                            position: "absolute", bottom: "-30px", right: "-10px", zIndex: 1,
                            fontFamily: "var(--font-display, sans-serif)", fontSize: "55vw",
                            color: "rgba(232,224,208,0.022)", lineHeight: 1, pointerEvents: "none",
                            letterSpacing: "-.04em", userSelect: "none",
                        }}>
                            {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Contenido */}
                        <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
                            padding: "0 clamp(20px, 5vw, 38px) clamp(80px, 14vw, 110px)",
                        }}>
                            <span style={{
                                display: "block", fontFamily: "var(--font-display, sans-serif)",
                                fontSize: "12px", letterSpacing: ".3em", color: "var(--gold, #c9a84c)",
                                marginBottom: "12px",
                            }}>
                                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                            </span>
                            <div className="mobile-title" style={{
                                fontFamily: "var(--font-display, sans-serif)",
                                fontSize: "clamp(22px, 7.5vw, 56px)", lineHeight: .86,
                                letterSpacing: ".03em", color: "var(--cream, #e8e0d0)", opacity: 0,
                                wordBreak: "keep-all",
                            }}>
                                {item.title}
                            </div>
                            <p className="mobile-sub" style={{
                                marginTop: "12px", fontSize: "clamp(10px, 2.5vw, 13px)", letterSpacing: ".12em",
                                textTransform: "uppercase", color: "rgba(232,224,208,0.4)",
                                lineHeight: 1.7, opacity: 0, whiteSpace: "pre-line",
                            }}>
                                {sub}
                            </p>
                        </div>
                    </div>
                );
            })}

            {/* CTA final mobile */}
            <div style={{
                padding: "60px 28px 80px", textAlign: "center",
                borderTop: "1px solid rgba(232,224,208,0.07)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
            }}>
                <p style={{ fontSize: "9px", letterSpacing: ".35em", textTransform: "uppercase", color: "rgba(232,224,208,0.3)" }}>
                    FME · Medellín · 2026
                </p>
                <a
                    href="https://storefme.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        fontFamily: "var(--font-display, sans-serif)", fontSize: "11px",
                        letterSpacing: ".25em", textTransform: "uppercase",
                        border: "1px solid rgba(232,224,208,0.2)", color: "var(--cream, #e8e0d0)",
                        padding: "14px 36px", textDecoration: "none", display: "inline-block",
                    }}
                >
                    Ver colección →
                </a>
                <Link
                    to="/comunidad"
                    style={{
                        fontSize: "9px", letterSpacing: ".25em", textTransform: "uppercase",
                        color: "rgba(232,224,208,0.35)", textDecoration: "none",
                    }}
                >
                    Comunidad en fotos →
                </Link>
            </div>
        </div>
    );
}

// ── Página principal ──────────────────────────────────────────────
export default function Barrio() {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
    const items = BARRIO_DATA as SlideItem[];

    useEffect(() => {
        const id = "barrio-styles";
        if (!document.getElementById(id)) {
            const tag = document.createElement("style");
            tag.id = id; tag.textContent = BARRIO_CSS;
            document.head.appendChild(tag);
        }
        return () => { document.getElementById("barrio-styles")?.remove(); };
    }, []);

    // Detectar breakpoint
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        setIsDesktop(mq.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    // Evitar flash de contenido incorrecto
    if (isDesktop === null) return (
        <div style={{ minHeight: "100dvh", background: "#0a0a0a" }} />
    );

    return (
        <>
            <Seo
                title="El Barrio – FME | Fotografía Editorial Medellín"
                description="Recorrí el barrio con FME. Fotografía editorial desde las calles de Medellín: cada pieza en su contexto real, sin set ni artificio."
                canonical="/barrio"
                ogImage="/images/barrio/barrio-1.webp"
                keywords="barrio FME, fotografía editorial Medellín, calle, streetwear Colombia"
            />
            {isDesktop ? <DesktopView items={items} /> : <MobileView items={items} />}
            <VideoSection
                headline={"EL\nBARRIO."}
                sub="Medellín · FME · 2025"
                poster="/images/barrio/sesion-fme-03.webp"
            />
        </>
    );
}