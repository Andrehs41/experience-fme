import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";
import MagneticButton from "../MagneticButton";

export default function StoreCTA() {
    const container = useRef<HTMLElement>(null);
    const bgText = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
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

        gsap.fromTo(
            ".cta-content",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            ".cta-line",
            { scaleY: 0 },
            {
                scaleY: 1,
                transformOrigin: "top",
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 72%",
                },
            }
        );
    }, { scope: container });

    return (
        <section
            ref={container}
            data-cursor="TIENDA"
            className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden border-t border-[var(--border-gold-10)] bg-gradient-to-b from-fme-black to-[rgb(var(--gold-rgb)/0.05)] px-4 py-16 fme-noise-soft sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12"
        >
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgb(var(--gold-rgb)/0.09),transparent_55%)]"
                aria-hidden
            />
            <span
                ref={bgText}
                className="fme-font-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap leading-none tracking-tight text-[42vw] text-[var(--text-cream-atmosphere)] sm:text-[35vw]"
            >
                FME
            </span>

            <div className="cta-line absolute bottom-[15%] left-6 top-[15%] hidden w-px bg-gradient-to-b from-fme-gold/30 via-[var(--border-cream-08)] to-transparent sm:left-8 md:block lg:left-10" />

            <div className="cta-content relative z-[1] flex w-full max-w-3xl flex-col items-center gap-8 text-center sm:gap-10 md:gap-12">
                <span className="text-[10px] uppercase tracking-[0.4em] text-fme-gold">
                    FME Store · canal oficial
                </span>

                <h2 className="fme-font-display text-[clamp(2.25rem,8vw,110px)] leading-[0.9] tracking-tight text-fme-cream">
                    STOCK REAL.
                    <br />
                    <span className="text-transparent [-webkit-text-stroke:1px_var(--gold)]">
                        ENVÍO A TODO EL PAÍS.
                    </span>
                </h2>

                <p className="max-w-[360px] text-xs font-light leading-[1.85] tracking-wide text-fme-cream-dim sm:text-[13px]">
                    Acá cerramos lo que ves en la web: mismo criterio, mismas piezas, sin revendedores raros.
                    Novedades, reposiciones y ofertas en un solo lugar.
                </p>

                <div className="flex w-full max-w-lg flex-col items-stretch gap-4 sm:items-center">
                    <MagneticButton
                        onClick={() => window.open("https://storefme.com", "_blank")}
                        className="fme-font-display w-full rounded-sm bg-fme-cream px-8 py-4 text-[11px] tracking-[0.25em] text-fme-black shadow-[0_24px_48px_-20px_rgb(0_0_0/0.55)] transition-colors hover:bg-fme-gold sm:w-auto sm:px-12 sm:py-[18px] sm:text-[13px]"
                    >
                        ABRIR LA TIENDA →
                    </MagneticButton>
                    <a
                        href="https://storefme.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] uppercase tracking-[0.26em] text-fme-gold underline-offset-4 transition-colors hover:text-fme-cream"
                    >
                        Envío, cambios y garantías
                    </a>
                </div>

                <div className="w-full max-w-xl rounded-sm border border-[var(--border-gold-10)] bg-[rgb(var(--gold-rgb)/0.04)] px-5 py-6 backdrop-blur-[2px] sm:px-8 sm:py-7">
                    <p className="mb-4 text-[9px] uppercase tracking-[0.32em] text-fme-cream-dim">
                        También en la experiencia
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
                        <Link to="/colecciones" className="fme-focus-ring fme-link-cta">
                            Lookbook →
                        </Link>
                        <Link to="/comunidad" className="fme-focus-ring fme-link-cta">
                            Comunidad →
                        </Link>
                        <Link to="/multimarca" className="fme-focus-ring fme-link-cta">
                            Multimarca →
                        </Link>
                        <Link to="/barrio" className="fme-focus-ring fme-link-cta">
                            El Barrio →
                        </Link>
                    </div>
                </div>

                <span className="text-[10px] lowercase tracking-[0.2em] text-[var(--text-cream-muted)]">
                    storefme.com
                </span>
            </div>
        </section>
    );
}
