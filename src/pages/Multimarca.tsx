import { useRef, useState, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FACETS, BRANDS } from "../data/multimarcaData";
import type { Facet } from "../data/multimarcaData";

gsap.registerPlugin(ScrollTrigger);

type HoveredSide = "fme" | "multimarca" | null;

function DividerNode({ hovered }: { hovered: HoveredSide }) {
    return (
        <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-12 h-12 rounded-full border bg-black flex items-center justify-center z-20
            transition-all duration-500 ease-out
            ${hovered ? "border-fme-gold/40 scale-110 shadow-[0_0_20px_rgba(201,168,76,0.15)]" : "border-white/10"}
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

function SplitSide({ facet, hovered, isLeft, onHover }: {
    facet: Facet; hovered: HoveredSide; isLeft: boolean; onHover: (id: HoveredSide) => void
}) {
    const isHovered = hovered === facet.id;
    const isOpposite = hovered !== null && hovered !== facet.id;

    const flexStyle = useMemo(() => ({
        flex: isHovered ? 1.6 : isOpposite ? 0.4 : 1
    }), [isHovered, isOpposite]);

    return (
        <div
            onMouseEnter={() => onHover(facet.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => facet.external ? window.open(facet.href, "_blank") : window.location.href = facet.href}
            style={flexStyle}
            className={`
                relative overflow-hidden flex flex-col justify-end
                p-8 md:p-14 min-h-[50dvh] md:min-h-0 md:h-full
                transition-[flex] duration-700 cubic-bezier(0.7,0,0.3,1)
                ${facet.id === 'fme' ? "bg-black" : "bg-[#141412]"}
            `}
        >
            {/* Background Glow */}
            <div className={`
                absolute inset-0 pointer-events-none transition-opacity duration-700
                ${isHovered ? "opacity-100" : "opacity-0 md:opacity-0"}
                ${facet.id === 'fme' ? "bg-[radial-gradient(circle_at_center,rgba(232,224,208,0.08)_0%,transparent_70%)]" : "bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)]"}
            `} />

            {/* Letra Gigante */}
            <span className={`
                absolute -bottom-10 fme-font-display text-[40vw] md:text-[35vw] leading-none select-none pointer-events-none opacity-[0.03] text-fme-cream transition-transform duration-1000
                ${isLeft ? "-right-10" : "-left-10"}
                ${isHovered ? "scale-110 translate-y-[-2%]" : "scale-100"}
            `}>
                {facet.id === 'fme' ? "F" : "M"}
            </span>

            {/* Contenido */}
            <div className={`relative z-10 transition-all duration-500 ${isOpposite ? "opacity-20 scale-[0.98] grayscale" : "opacity-100"}`}>
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <span className={`h-px w-6 bg-current ${facet.id === 'fme' ? "text-fme-cream/30" : "text-fme-gold"}`} />
                    <span className="text-[9px] tracking-[0.4em] uppercase text-fme-cream/50">{facet.tag}</span>
                </div>

                <h2 className="fme-font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-fme-cream leading-[0.85] mb-6 md:mb-8">
                    {facet.title.map((line, i) => (
                        <span key={i} className={`block ${(!isLeft && facet.titleAccent === i) ? "text-fme-gold" : ""}`}>
                            {line}
                        </span>
                    ))}
                </h2>

                <div className={`
                    overflow-hidden transition-all duration-500
                    ${isHovered ? "max-h-60 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4 md:max-h-60 md:opacity-0 max-md:max-h-60 max-md:opacity-100 max-md:translate-y-0"}
                `}>
                    <p className="text-fme-cream-dim text-xs leading-relaxed max-w-[260px] md:max-w-[300px] mb-6 md:mb-8">
                        {facet.desc}
                    </p>
                    <button className={`
                        px-8 py-3 fme-font-display text-[10px] tracking-widest uppercase transition-transform active:scale-95
                        ${facet.id === 'fme' ? "bg-fme-cream text-black" : "bg-fme-gold text-black"}
                    `}>
                        {facet.cta}
                    </button>
                </div>
            </div>
        </div>
    );
}

function BrandsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(".brand-card-vault", {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power4.out"
        });

        // Parallax suave para el texto de fondo de la sección
        gsap.to(".bg-archive-text", {
            xPercent: -20,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        return () => clearTimeout(timeout);
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative bg-[#080807] py-32 md:py-52 overflow-hidden">

            {/* Texto de fondo de la sección (Marca de agua ultra-sutil) */}
            <div className="bg-archive-text absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
                <span className="fme-font-display text-[30vw] leading-none text-white/[0.01] fme-text-outline uppercase tracking-tighter">
                    Selected Archive — Global Goods — FME Selection —
                </span>
            </div>

            {/* Grid Técnico de Fondo (Detalle de valor) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}
            />

            <div className="relative z-10 px-6 max-w-[1400px] mx-auto">
                <header className="mb-24">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-2 h-2 rounded-full bg-fme-gold animate-pulse" />
                        <span className="text-fme-gold text-[10px] tracking-[0.5em] uppercase font-medium">Verified Partners</span>
                    </div>
                    <h2 className="fme-font-display text-6xl md:text-9xl text-fme-cream leading-[0.8] mb-8">
                        LAS <span className="text-fme-gold">MARCAS</span><br />
                        <span className="opacity-20">QUE HABITAN </span><span className="text-fme-gold">FME.</span>
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
                                rel="noopener"
                                className="brand-card-vault group relative h-[450px] bg-[#0c0c0b] border border-white/5 rounded-sm p-8 flex flex-col justify-between transition-all duration-500 hover:border-fme-gold/30 hover:bg-[#11110f]"
                            >
                                {/* Overlay de Escaneo (Detalle industrial) */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-fme-gold/20 opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[1500ms] ease-in-out pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Cabecera de Card: Estilo Etiqueta */}
                                    <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-8">
                                        <span className="fme-font-display text-[9px] text-fme-cream/30 tracking-widest group-hover:text-fme-gold transition-colors">
                                            REF_{String(brand.id).padStart(3, '0')}
                                        </span>
                                        <span className="text-[8px] text-fme-gold/50 font-mono tracking-tighter">
                                            {brand.external ? "EXT_SOURCE" : "FME_VERIFIED"}
                                        </span>
                                    </div>

                                    {/* --- COMBINACIÓN OPCIÓN 1 Y 3 --- */}
                                    <div className="relative flex flex-col items-center justify-center flex-grow py-8 overflow-hidden">

                                        {/* 1. SELLO DE AGUA (Opción 3 - Iniciales de fondo) */}
                                        <span className="absolute fme-font-display text-[9rem] leading-none text-white/[0.02] select-none pointer-events-none tracking-tighter group-hover:text-fme-gold/[0.05] transition-colors">
                                            {brand.name.substring(0, 2)}
                                        </span>

                                        {/* 2. LOGO GRANDE (Opción 1 - Protagonista visual) */}
                                        {hasLogo ? (
                                            <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full bg-black/60 border border-white/10 p-4 flex items-center justify-center transition-all duration-700 cubic-bezier(0.25,0.46,0.45,0.94) group-hover:scale-110 group-hover:border-fme-gold/30 group-hover:shadow-[0_0_50px_-5px_rgba(201,168,76,0.15)] shadow-2xl">
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
                                    {/* --------------------------------- */}

                                    {/* Título Pequeño de Marca */}
                                    <h3 className="fme-font-display text-sm text-center text-fme-cream tracking-tight uppercase group-hover:text-fme-gold transition-colors mb-6">
                                        {brand.name}
                                    </h3>

                                    {/* Descripción */}
                                    <p className="text-fme-cream-dim text-[11px] leading-relaxed mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                                        {brand.desc}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-fme-gold text-[9px] tracking-widest uppercase font-bold">
                                            Ver Catálogo
                                        </span>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-fme-gold -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Esquinas decorativas técnicas */}
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

export default function Multimarca() {
    const [hovered, setHovered] = useState<HoveredSide>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="bg-black min-h-screen">
            <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center mix-blend-difference">
                <span className="fme-font-display text-fme-cream text-[10px] tracking-[0.4em] uppercase">
                    FME <span className="text-fme-gold">Multi</span>brand
                </span>
            </nav>

            <div className="relative flex flex-col md:flex-row h-[100dvh] md:h-screen w-full overflow-hidden">
                {FACETS.map((facet, i) => (
                    <SplitSide key={facet.id} facet={facet} hovered={hovered} isLeft={i === 0} onHover={setHovered} />
                ))}

                <div className="hidden md:block">
                    <DividerNode hovered={hovered} />
                </div>
            </div>

            <BrandsSection />
        </div>
    );
}