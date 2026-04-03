import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

const MANIFESTO_LINES = [
    { text: "LO", outline: false },
    { text: "HACEMOS", outline: true },
    { text: "AQUÍ.", outline: false },
] as const;

export default function ManifestoSection() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".manifesto-line", container.current!);
        lines.forEach((line, i) => {
            gsap.fromTo(
                line,
                { y: 90, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.1,
                    ease: "power4.out",
                    delay: i * 0.08,
                    scrollTrigger: {
                        trigger: line,
                        start: "top 90%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        gsap.fromTo(
            ".manifesto-body",
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".manifesto-body",
                    start: "top 88%",
                    toggleActions: "play none none reverse",
                },
            }
        );
        gsap.fromTo(
            ".manifesto-ctas",
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".manifesto-ctas",
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        gsap.fromTo(
            ".manifesto-rule",
            { scaleX: 0 },
            {
                scaleX: 1,
                transformOrigin: "left",
                duration: 1.4,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                },
            }
        );
    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative mx-auto max-w-[1200px] border-t border-[var(--border-gold-08)] px-4 py-20 fme-noise-soft sm:px-6 sm:py-24 md:px-10 md:py-32 lg:py-40"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -left-1/4 top-1/4 h-[min(50vh,400px)] w-[min(80vw,520px)] rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.08) 0%, transparent 65%)" }}
                aria-hidden
            />

            <div className="relative z-[1] mb-10 flex items-center gap-4 sm:mb-12 sm:gap-5 md:mb-14">
                <span className="manifesto-rule block h-px w-10 bg-fme-gold sm:w-14 md:w-[60px]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-fme-gold">
                    Manifiesto
                </span>
            </div>

            <div className="relative z-[1] overflow-hidden">
                {MANIFESTO_LINES.map(({ text, outline }) => (
                    <div key={text} className="manifesto-line overflow-hidden">
                        <p
                            className={`fme-font-display leading-[0.88] tracking-tight ${
                                outline
                                    ? "font-bold text-transparent [-webkit-text-stroke:1px_var(--gold)]"
                                    : "text-fme-cream"
                            }`}
                            style={{ fontSize: "clamp(2.5rem, 12vw, 160px)" }}
                        >
                            {text}
                        </p>
                    </div>
                ))}
            </div>

            <p className="manifesto-body relative z-[1] mt-10 max-w-[520px] text-sm font-light leading-[1.9] text-fme-cream-dim sm:mt-12 sm:text-[15px] md:mt-14 md:ml-auto">
                FME no compite con eslóganes de pasarela.
                <br />
                Hacemos ropa con criterio de calle: cortes que se usan todos los días,
                <br />
                no solo el día del lanzamiento.
                <br />
                <span className="text-fme-cream/90">
                    Si te late el barrio, ya sabés dónde encontrarnos — y en la tienda, el cierre.
                </span>
            </p>

            <div className="manifesto-ctas relative z-[1] mt-10 md:ml-auto md:max-w-[640px]">
                <div className="rounded-sm fme-cta-panel px-5 py-8 sm:px-8 sm:py-10">
                    <p className="mb-6 text-[9px] uppercase tracking-[0.35em] text-fme-cream-dim">
                        Siguiente paso
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                        <Link
                            to="/colecciones"
                            className="fme-focus-ring inline-flex justify-center rounded-sm border border-[var(--border-gold-12)] bg-[rgb(var(--gold-rgb)/0.08)] px-5 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-fme-cream transition-colors hover:border-fme-gold hover:bg-[rgb(var(--gold-rgb)/0.14)] sm:min-w-[10rem]"
                        >
                            Ver lookbook
                        </Link>
                        <a
                            href="https://storefme.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fme-focus-ring inline-flex justify-center bg-fme-cream px-5 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-fme-black transition-colors hover:bg-fme-gold sm:min-w-[10rem]"
                        >
                            Comprar en tienda
                        </a>
                        <Link
                            to="/comunidad"
                            className="fme-focus-ring fme-link-cta inline-flex justify-center px-3 py-2 sm:border-l sm:border-[var(--border-gold-08)]"
                        >
                            Comunidad →
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[var(--border-gold-08)] pt-6 sm:justify-end">
                        <Link to="/barrio" className="fme-focus-ring fme-link-cta">
                            El Barrio →
                        </Link>
                        <Link to="/multimarca" className="fme-focus-ring fme-link-cta">
                            FME + multimarca →
                        </Link>
                        <a
                            href="https://storefme.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fme-focus-ring fme-link-cta text-fme-gold hover:text-fme-cream"
                        >
                            storefme.com →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
