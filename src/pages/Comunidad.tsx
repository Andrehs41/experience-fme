import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import MasonryGrid from "../components/MasonryGrid";
import MagneticButton from "../components/MagneticButton";
import { COMUNIDAD_DATA } from "../data/comunidadData";
import HeroBackground from "../components/HeroBackground";
import Seo from "../components/Seo";

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
            className="relative border-b border-[var(--border-gold-08)] px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 md:px-10 md:pb-24 md:pt-40"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                aria-hidden
            />
            <HeroBackground
                src="/images/fme-hero.webp"
                blur={1.5}
                brightness={0.38}
                saturation={1.2}
                overlay={0.55}
                glow="gold"
            />

            {/* Título — izquierda */}
            <div className="relative z-[1] mb-10 md:mb-12">
                <div className="ch-label mb-5 flex items-center gap-3 sm:mb-6">
                    <span className="h-px w-8 bg-fme-gold sm:w-10" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.38em] text-fme-gold">
                        Comunidad FME
                    </span>
                </div>

                <h1 className="ch-title fme-font-display leading-[0.88] tracking-tight text-fme-cream text-[clamp(36px,7vw,110px)]">
                    COMUNI
                    <span className="text-transparent [text-shadow:none] [-webkit-text-stroke:1px_var(--gold)]">
                        DAD
                    </span>
                </h1>
            </div>

            {/* Info — también izquierda, debajo del título */}
            <div className="relative z-[1] flex flex-col gap-6 md:gap-7 md:max-w-lg">
                <p className="ch-desc text-[13px] font-light leading-[1.9] text-fme-cream-dim">
                    Sin modelos de agencia: acá hay gente que ya compró, ya salió y ya mandó la foto.
                    <br />
                    <span className="text-fme-cream/90">
                        Si tu pieza aparece, es porque el equipo la destacó — no porque pagaste pauta.
                    </span>
                </p>

                <div className="ch-counter inline-flex w-fit items-baseline gap-3 rounded-sm border border-[var(--border-gold-10)] bg-[rgb(var(--gold-rgb)/0.04)] px-5 py-3 backdrop-blur-sm">
                    <span className="fme-font-display text-[44px] leading-none text-fme-cream sm:text-[52px] md:text-[56px]">
                        {COMUNIDAD_DATA.length}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-fme-cream-dim">
                        fotos en archivo
                    </span>
                </div>

                <div className="ch-rule h-px max-w-sm origin-left bg-gradient-to-r from-[var(--border-cream-15)] via-[var(--border-cream-08)] to-transparent" />
            </div>
        </div>
    );
}

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

    const items = ["FME", "·", "Medellín", "·", "Gente real", "·", "storefme.com", "·"];
    const repeated = [...items, ...items, ...items, ...items];

    return (
        <div
            ref={ref}
            className="relative overflow-hidden border-b border-[var(--border-gold-08)] bg-[linear-gradient(90deg,rgb(var(--black-rgb)/0.5)_0%,rgb(var(--gold-rgb)/0.04)_50%,rgb(var(--black-rgb)/0.5)_100%)] py-4"
        >
            <div className="pointer-events-none absolute inset-y-3 left-0 w-20 bg-gradient-to-r from-fme-black to-transparent" aria-hidden />
            <div className="pointer-events-none absolute inset-y-3 right-0 w-20 bg-gradient-to-l from-fme-black to-transparent" aria-hidden />
            <div className="fme-marquee-mask">
                <div className="marquee-inner flex w-max whitespace-nowrap">
                    {repeated.map((item, i) => (
                        <span
                            key={i}
                            className={`fme-font-display px-8 text-[12px] tracking-[0.28em] sm:text-[13px] ${item === "·" ? "text-fme-gold" : "text-[var(--text-cream-muted)]"
                                }`}
                        >
                            {item.toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

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
            className="relative border-t border-[var(--border-gold-10)] px-4 py-12 sm:px-6 sm:py-14 md:px-10"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_100%,rgb(var(--gold-rgb)/0.07),transparent_55%)]" aria-hidden />
            <div className="relative mx-auto flex max-w-[1200px] flex-col gap-8 rounded-sm fme-cta-panel px-6 py-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-10 sm:py-12">
                <p className="fme-font-display text-[clamp(26px,3.8vw,46px)] leading-[1.05] text-fme-cream">
                    ¿TU FOTO
                    <br />
                    <span className="text-fme-gold">ACÁ?</span>
                </p>

                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:gap-5">
                    <MagneticButton
                        onClick={() => window.open("https://storefme.com", "_blank")}
                        className="fme-font-display w-full rounded-sm bg-fme-cream px-8 py-3.5 text-[10px] tracking-[0.22em] text-fme-black shadow-[0_20px_40px_-16px_rgb(0_0_0/0.6)] transition-colors hover:bg-fme-gold sm:w-auto sm:px-10 sm:py-3.5 sm:text-[11px]"
                    >
                        COMPRAR EN TIENDA →
                    </MagneticButton>
                    <Link
                        to="/colecciones"
                        className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.22em] text-fme-cream-dim transition-colors hover:text-fme-gold sm:border-l sm:border-[var(--border-gold-08)] sm:pl-6"
                    >
                        Ver colecciones →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function Comunidad() {
    return (
        <main className="fme-page-vignette relative min-h-screen text-fme-cream fme-noise-soft">
            <Seo
                title="Comunidad – FME | Gente Real, Ropa Real"
                description="La comunidad FME en fotos. Gente real con nuestras piezas, sin modelos de agencia. Si tu foto aparece es porque el equipo la eligió, no porque pagaste pauta."
                canonical="/comunidad"
                ogImage="/images/barrio/persona-1.webp"
                keywords="comunidad FME, gente real, fotos comunidad, streetwear Medellín"
            />
            <ComunidadHeader />
            <MarqueeBand />

            <section className="relative px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px max-w-4xl bg-gradient-to-r from-transparent via-[var(--border-gold-12)] to-transparent opacity-60"
                    aria-hidden
                />
                <MasonryGrid members={COMUNIDAD_DATA} />
            </section>

            <BottomCTA />
        </main>
    );
}
