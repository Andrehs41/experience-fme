// src/components/BentoCards.tsx
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";

// ── CSS responsive inyectado una vez ─────────────────────────────
const BENTO_CSS = `
  .bento-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 3px;
    background: rgba(232,224,208,0.06);
  }
  .cell-hero     { grid-row: 1 / 3; min-height: 460px; }
  .cell-wide     { grid-column: 2 / 4; }
  .cell-text,
  .cell-image-sm { min-height: 220px; }

  @media (max-width: 768px) {
    .bento-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
    }
    .cell-hero  { grid-row: unset; grid-column: 1 / 3; min-height: 300px; }
    .cell-wide  { grid-column: 1 / 3; }
    .cell-text,
    .cell-image-sm { min-height: 180px; }
  }

  @media (max-width: 480px) {
    .bento-grid { grid-template-columns: 1fr; }
    .cell-hero  { grid-column: unset; min-height: 260px; }
    .cell-wide  { grid-column: unset; }
  }
`;

// ── Datos ─────────────────────────────────────────────────────────
interface BentoItem {
    num: string;
    title: string;
    desc: string;
    ghost?: string;
    tag?: string;
    badge?: string;
    src?: string;
    variant: "hero" | "text" | "image-sm" | "wide";
    cursor?: string;
}

const ITEMS: BentoItem[] = [
    {
        num: "01", title: "IDENTIDAD", ghost: "ID", variant: "hero",
        tag: "La marca del barrio", badge: "SS25",
        src: "/images/barrio/tienda-2.jpeg",
        desc: "No seguimos tendencias. Creamos desde adentro, desde lo que somos, desde el barrio.",
    },
    {
        num: "02", title: "BARRIO", ghost: "B", variant: "text",
        desc: "El barrio no es un lugar. Es un estado de mente, una forma de pararse ante el mundo.",
    },
    {
        num: "—", title: "DROP 01", variant: "image-sm", cursor: "DROP",
        src: "/images/barrio/persona-1.jpg", desc: "", ghost: "",
    },
    {
        num: "03", title: "ACTITUD", ghost: "ACT", variant: "wide",
        desc: "La actitud es lo único que nadie te puede quitar. FME la lleva puesta desde el día uno.",
    },
];

const S = {
    num: {
        fontFamily: "var(--font-display)", fontSize: "10px",
        letterSpacing: ".2em", color: "rgba(232,224,208,0.2)",
        display: "block", marginBottom: "12px",
    } as React.CSSProperties,
    title: (size: string): React.CSSProperties => ({
        fontFamily: "var(--font-display)", fontSize: size,
        lineHeight: .88, letterSpacing: "-.01em", color: "var(--cream)",
    }),
    desc: {
        fontSize: "12px", lineHeight: 1.85,
        color: "var(--cream-dim)", fontWeight: 300,
    } as React.CSSProperties,
    ghost: (size: string, bottom: string, side: "left" | "right", offset: string): React.CSSProperties => ({
        position: "absolute", [side]: offset, bottom,
        fontFamily: "var(--font-display)", fontSize: size,
        color: "rgba(232,224,208,0.025)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none",
        letterSpacing: "-.02em", zIndex: 1,
    }),
    arrow: {
        position: "absolute", bottom: "24px", right: "24px",
        fontFamily: "var(--font-display)", fontSize: "18px",
        color: "rgba(232,224,208,0.12)", zIndex: 3,
    } as React.CSSProperties,
    goldLine: {
        position: "absolute", top: 0, left: 0, right: 0,
        height: "1px", background: "var(--gold)", display: "block",
        transformOrigin: "left", transform: "scaleX(0)", zIndex: 4,
    } as React.CSSProperties,
} as const;

function Cell({ item }: { item: BentoItem }) {
    const cellRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLSpanElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);
    const ghostRef = useRef<HTMLSpanElement>(null);
    const arrowRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const isHero = item.variant === "hero";
    const isWide = item.variant === "wide";
    const hasImg = item.variant === "hero" || item.variant === "image-sm";

    const onEnter = () => {
        gsap.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: "expo.out" });
        gsap.to(numRef.current, { color: "var(--gold)", duration: 0.3 });
        gsap.to(cellRef.current, { backgroundColor: "#111", duration: 0.4 });
        if (ghostRef.current) gsap.to(ghostRef.current, {
            scale: 1.08, y: -6, color: "rgba(201,168,76,0.04)", duration: 0.6, ease: "expo.out",
        });
        if (arrowRef.current) gsap.to(arrowRef.current, {
            x: 5, y: -5, color: "var(--gold)", rotation: 0, duration: 0.4, ease: "back.out(2)",
        });
        if (imgRef.current) gsap.to(imgRef.current, {
            scale: 1.06, duration: 0.8, ease: "power2.out",
        });
    };

    const onLeave = () => {
        gsap.to(lineRef.current, { scaleX: 0, duration: 0.45, ease: "expo.out" });
        gsap.to(numRef.current, { color: "rgba(232,224,208,0.2)", duration: 0.3 });
        gsap.to(cellRef.current, { backgroundColor: isWide ? "#0a0a08" : "#0d0d0d", duration: 0.4 });
        if (ghostRef.current) gsap.to(ghostRef.current, {
            scale: 1, y: 0, color: "rgba(232,224,208,0.025)", duration: 0.5,
        });
        if (arrowRef.current) gsap.to(arrowRef.current, {
            x: 0, y: 0, color: "rgba(232,224,208,0.12)", duration: 0.4,
        });
        if (imgRef.current) gsap.to(imgRef.current, {
            scale: 1, duration: 0.8, ease: "power2.out",
        });
    };

    return (
        <div
            ref={cellRef}
            className={`bento-cell cell-${item.variant}`}
            data-cursor={item.cursor ?? item.title}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            style={{
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                background: isWide ? "#0a0a08" : "#0d0d0d",
                padding: hasImg ? 0 : isWide ? "28px 32px" : "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: isWide ? "flex-end" : hasImg ? undefined : "space-between",
            }}
        >
            {/* Línea dorada */}
            <span ref={lineRef} style={S.goldLine} />

            {/* Badge */}
            {item.badge && (
                <span style={{
                    position: "absolute", top: "16px", right: "16px", zIndex: 5,
                    fontFamily: "var(--font-display)", fontSize: "9px",
                    letterSpacing: ".2em", background: "var(--gold)",
                    color: "var(--black)", padding: "4px 10px",
                }}>
                    {item.badge}
                </span>
            )}

            {/* Imagen */}
            {hasImg && (
                <div ref={imgRef} style={{ position: "absolute", inset: 0 }}>
                    {item.src ? (
                        <img
                            src={item.src} alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                        />
                    ) : (
                        <div style={{
                            width: "100%", height: "100%",
                            background: "linear-gradient(160deg,#1a1a1a 0%,#0d0d0d 100%)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span style={{
                                fontFamily: "var(--font-display)",
                                fontSize: isHero ? "140px" : "80px",
                                color: "rgba(232,224,208,0.04)", lineHeight: 1,
                            }}>F M E</span>
                        </div>
                    )}
                </div>
            )}

            {/* Ghost texto de fondo */}
            {item.ghost && (
                <span
                    ref={ghostRef}
                    style={isWide
                        ? S.ghost("160px", "-40px", "left", "-20px")
                        : S.ghost("100px", "-20px", "right", "-10px")
                    }
                >
                    {item.ghost}
                </span>
            )}

            {/* Contenido */}
            <div style={{
                position: "relative",
                zIndex: 3,
                padding: hasImg ? "24px 28px" : undefined,
                marginTop: hasImg ? "auto" : undefined,
                background: hasImg
                    ? "linear-gradient(transparent, rgba(10,10,10,0.92) 60%)"
                    : undefined,
                display: isWide ? "flex" : undefined,
                alignItems: isWide ? "flex-end" : undefined,
                justifyContent: isWide ? "space-between" : undefined,
                width: isWide ? "100%" : undefined,
                gap: isWide ? "24px" : undefined,
            }}>
                <div>
                    {/* Tag */}
                    {item.tag && (
                        <div style={{
                            display: "flex", alignItems: "center", gap: "8px",
                            fontSize: "9px", letterSpacing: ".3em",
                            textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px",
                        }}>
                            <span style={{ width: "16px", height: "1px", background: "var(--gold)", display: "block" }} />
                            {item.tag}
                        </div>
                    )}

                    {/* Número */}
                    <span ref={numRef} style={S.num}>{item.num}</span>

                    {/* Título */}
                    <h3 style={S.title(isHero ? "clamp(40px,5vw,64px)" : isWide ? "clamp(42px,6vw,72px)" : "clamp(26px,3.5vw,44px)")}>
                        {item.title}
                    </h3>

                    {/* Descripción */}
                    {item.desc && (
                        <p style={{ ...S.desc, marginTop: "12px", maxWidth: isWide ? "380px" : "200px" }}>
                            {item.desc}
                        </p>
                    )}
                </div>

                {/* Flecha */}
                {!isHero && (
                    <span ref={arrowRef} style={
                        isWide
                            ? { ...S.arrow, position: "relative", bottom: "auto", right: "auto", alignSelf: "flex-start", flexShrink: 0 }
                            : S.arrow
                    }>↗</span>
                )}
            </div>
        </div>
    );
}

export default function BentoCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const id = "bento-styles";
        if (document.getElementById(id)) return;
        const tag = document.createElement("style");
        tag.id = id;
        tag.textContent = BENTO_CSS;
        document.head.appendChild(tag);
        return () => { document.getElementById(id)?.remove(); };
    }, []);
    
    useGSAP(() => {
        const cells = sectionRef.current?.querySelectorAll<HTMLElement>(".bento-cell");
        if (!cells) return;

        gsap.from(cells, {
            y: 60,
            opacity: 0,
            scale: 0.97,
            duration: 0.9,
            stagger: {
                each: 0.08,
                from: "start",
            },
            ease: "power3.out",
            clearProps: "scale",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            style={{ padding: "0 40px 100px", maxWidth: "1200px", margin: "0 auto" }}
        >
            <div className="bento-grid">
                {ITEMS.map((item) => <Cell key={item.title} item={item} />)}
            </div>
        </section>
    );
}