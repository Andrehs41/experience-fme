// src/pages/Multimarca.tsx
import { useRef, useState, useMemo, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { FACETS, BRANDS } from "../data/multimarcaData";
import type { Facet } from "../data/multimarcaData";

type HoveredSide = "fme" | "multimarca" | null;

// ── Nodo VS central ───────────────────────────────────────────────
function DividerNode({ hovered }: { hovered: HoveredSide }) {
    return (
        <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-12 h-12 rounded-full border bg-black
            flex items-center justify-center z-20
            transition-all duration-500
            ${hovered
                ? "border-fme-gold/40 scale-110 shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                : "border-white/10"}
        `}>
            <span className={`
                fme-font-display text-[10px] tracking-widest transition-colors duration-300
                ${hovered ? "text-fme-gold" : "text-fme-cream/40"}
            `}>
                VS
            </span>
        </div>
    );
}

// ── Lado del split ────────────────────────────────────────────────
function SplitSide({ facet, hovered, isLeft, onHover }: {
    facet: Facet;
    hovered: HoveredSide;
    isLeft: boolean;
    onHover: (id: HoveredSide) => void;
}) {
    const isHovered = hovered === facet.id;
    const isOpposite = hovered !== null && hovered !== facet.id;
    const isFme = facet.id === "fme";

    const flexStyle = useMemo(() => ({
        flex: isHovered ? 1.6 : isOpposite ? 0.4 : 1,
    }), [isHovered, isOpposite]);

    return (
        <div
            onMouseEnter={() => onHover(facet.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() =>
                facet.external
                    ? window.open(facet.href, "_blank")
                    : (window.location.href = facet.href)
            }
            style={flexStyle}
            className={`
                relative overflow-hidden flex flex-col justify-end
                p-8 md:p-14 min-h-[50dvh] md:min-h-0 md:h-full
                transition-[flex] duration-700 cursor-pointer
                ${isFme ? "bg-black" : "bg-[#141412]"}
            `}
        >
            {/* ── Imagen de fondo del lado ── */}
            {facet.image && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 0 }}
                >
                    <img
                        src={facet.image}
                        alt=""
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            transform: isHovered ? "scale(1.06)" : "scale(1.02)",
                            transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                            filter: isOpposite
                                ? "brightness(0.12) saturate(1.2)"
                                : isHovered
                                    ? `brightness(0.32) saturate(${isFme ? "1.1" : "0.9"})`
                                    : `brightness(0.2) saturate(${isFme ? "1.2" : "1.1"})`,
                            willChange: "transform, filter",
                        }}
                    />
                    {/* Gradiente sobre la imagen para asegurar legibilidad del texto */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: isFme
                                ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 100%)"
                                : "linear-gradient(to top, rgba(20,20,18,0.95) 0%, rgba(20,20,18,0.55) 45%, rgba(20,20,18,0.25) 100%)",
                        }}
                    />
                </div>
            )}

            {/* Glow de acento (encima de la imagen) */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                    zIndex: 1,
                    opacity: isHovered ? 1 : 0,
                    background: isFme
                        ? "radial-gradient(circle at 50% 80%, rgba(232,224,208,0.06) 0%, transparent 70%)"
                        : "radial-gradient(circle at 50% 80%, rgba(201,168,76,0.08) 0%, transparent 70%)",
                }}
            />

            {/* Letra gigante de fondo */}
            <span
                className={`
                    absolute -bottom-10 fme-font-display leading-none
                    select-none pointer-events-none text-fme-cream
                    transition-transform duration-1000
                    ${isLeft ? "-right-10" : "-left-10"}
                    ${isHovered ? "scale-110 -translate-y-[2%]" : "scale-100"}
                `}
                style={{
                    zIndex: 1,
                    fontSize: "clamp(200px, 35vw, 35vw)",
                    // Con imagen de fondo la letra va más sutil
                    opacity: facet.image ? 0.06 : 0.03,
                }}
            >
                {isFme ? "F" : "M"}
            </span>

            {/* Contenido */}
            <div
                className={`
                    relative transition-all duration-500
                    ${isOpposite ? "opacity-20 scale-[0.98] grayscale" : "opacity-100"}
                `}
                style={{ zIndex: 2 }}
            >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className={`h-px w-6 ${isFme ? "bg-white/30" : "bg-fme-gold"}`} />
                    <span className="text-[9px] tracking-[0.4em] uppercase text-fme-cream/50">
                        {facet.tag}
                    </span>
                </div>

                <h2 className="fme-font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-fme-cream leading-[0.85] mb-6 md:mb-8">
                    {facet.title.map((line, i) => (
                        <span
                            key={i}
                            className={`block ${!isLeft && facet.titleAccent === i ? "text-fme-gold" : ""}`}
                        >
                            {line}
                        </span>
                    ))}
                </h2>

                <div className={`
                    overflow-hidden transition-all duration-500
                    ${isHovered
                        ? "max-h-60 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 translate-y-4 md:max-h-0 max-md:max-h-60 max-md:opacity-100 max-md:translate-y-0"}
                `}>
                    <p className="text-fme-cream-dim text-xs leading-relaxed max-w-[280px] mb-6 md:mb-8">
                        {facet.desc}
                    </p>
                    <button className={`
                        px-8 py-3 fme-font-display text-[10px] tracking-widest uppercase
                        transition-all duration-300 active:scale-95
                        ${isFme
                            ? "bg-fme-cream text-black hover:bg-fme-gold"
                            : "bg-fme-gold text-black hover:bg-fme-cream"}
                    `}>
                        {facet.cta}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Sección de marcas ─────────────────────────────────────────────
function BrandsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
        const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useGSAP(() => {
        const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".brand-card-vault");
        if (!cards || cards.length === 0) return;

        cards.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    delay: i * 0.08,
                    ease: "power3.out",
                    clearProps: "transform,opacity",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 92%",
                        toggleActions: "play none none none",
                        once: true,
                    },
                }
            );
        });

        gsap.to(".bg-archive-text", {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#080807] py-32 md:py-52 overflow-hidden"
        >
            {/* Marca de agua de fondo */}
            <div className="bg-archive-text absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
                <span className="fme-font-display text-[30vw] leading-none text-white/[0.01] uppercase tracking-tighter">
                    Selected Archive — Global Goods — FME Selection —
                </span>
            </div>

            {/* Grid técnico */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10 px-6 max-w-[1400px] mx-auto">
                <header className="mb-24">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-2 h-2 rounded-full bg-fme-gold animate-pulse" />
                        <span className="text-fme-gold text-[10px] tracking-[0.5em] uppercase font-medium">
                            Verified Partners
                        </span>
                    </div>
                    <h2 className="fme-font-display text-6xl md:text-9xl text-fme-cream leading-[0.8] mb-8">
                        LAS <span className="text-fme-gold">MARCAS</span><br />
                        <span className="opacity-20">QUE HABITAN </span>
                        <span className="text-fme-gold">FME.</span>
                    </h2>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BRANDS.map((brand) => {
                        const hasLogo = !!brand.logo;
                        return (
                            <a
                                key={brand.id}
                                href={brand.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="brand-card-vault group relative h-[450px] bg-[#0c0c0b] border border-white/5 rounded-sm p-8 flex flex-col justify-between transition-all duration-500 hover:border-fme-gold/30 hover:bg-[#11110f]"
                                style={{ opacity: 1 }}
                            >
                                {/* Línea de escaneo */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-fme-gold/20 opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[1500ms] ease-in-out pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Header etiqueta */}
                                    <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-8">
                                        <span className="fme-font-display text-[9px] text-fme-cream/30 tracking-widest group-hover:text-fme-gold transition-colors">
                                            REF_{String(brand.id).padStart(3, "0")}
                                        </span>
                                        <span className="text-[8px] text-fme-gold/50 font-mono tracking-tighter">
                                            {brand.external ? "EXT_SOURCE" : "FME_VERIFIED"}
                                        </span>
                                    </div>

                                    {/* Logo o nombre */}
                                    <div className="relative flex flex-col items-center justify-center flex-grow py-8 overflow-hidden">
                                        <span className="absolute fme-font-display text-[9rem] leading-none text-white/[0.02] select-none pointer-events-none tracking-tighter group-hover:text-fme-gold/[0.05] transition-colors">
                                            {brand.name.substring(0, 2)}
                                        </span>

                                        {hasLogo ? (
                                            <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-black/60 border border-white/10 p-4 flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:border-fme-gold/30 group-hover:shadow-[0_0_50px_-5px_rgba(201,168,76,0.15)] shadow-2xl">
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                                />
                                            </div>
                                        ) : (
                                            <h3 className="relative z-10 fme-font-display text-5xl text-center text-fme-cream leading-none tracking-tighter group-hover:text-fme-gold transition-colors">
                                                {brand.name}
                                            </h3>
                                        )}
                                    </div>

                                    <h3 className="fme-font-display text-sm text-center text-fme-cream tracking-tight uppercase group-hover:text-fme-gold transition-colors mb-6">
                                        {brand.name}
                                    </h3>

                                    <p className="text-fme-cream-dim text-[11px] leading-relaxed mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                                        {brand.desc}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-fme-gold text-[9px] tracking-widest uppercase font-bold">
                                            Ver Catálogo
                                        </span>
                                        <svg
                                            width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            className="text-fme-gold -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                        >
                                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Esquinas decorativas */}
                                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-fme-gold/40 transition-colors" />
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-fme-gold/40 transition-colors" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// ── Página ────────────────────────────────────────────────────────
export default function Multimarca() {
    const [hovered, setHovered] = useState<HoveredSide>(null);

    return (
        <div className="bg-black min-h-screen">
            <div className="relative flex flex-col md:flex-row h-[100dvh] w-full overflow-hidden">
                {FACETS.map((facet, i) => (
                    <SplitSide
                        key={facet.id}
                        facet={facet}
                        hovered={hovered}
                        isLeft={i === 0}
                        onHover={setHovered}
                    />
                ))}
                <div className="hidden md:block">
                    <DividerNode hovered={hovered} />
                </div>
            </div>
            <BrandsSection />
        </div>
    );
}