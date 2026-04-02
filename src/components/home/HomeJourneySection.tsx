import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

const STEPS = [
    {
        step: "01",
        title: "Brief",
        body: "Lo que sale a la calle empieza con escucha: qué falta, qué cansa, qué se repite.",
    },
    {
        step: "02",
        title: "Patronaje",
        body: "Siluetas probadas en movimiento — no en render. Que el cuerpo mande.",
    },
    {
        step: "03",
        title: "Producción",
        body: "Lotes acotados y controlados. Menos volumen, más criterio por metro de tela.",
    },
    {
        step: "04",
        title: "Canal",
        body: "Tienda online y comunidad que devuelven foto, feedback y próximo ajuste.",
    },
] as const;

export default function HomeJourneySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".journey-card", {
            y: 40,
            opacity: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
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
            className="relative border-t border-[var(--border-gold-08)] bg-fme-surface-raised py-20 fme-noise-soft sm:py-24 md:py-28"
        >
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-gold-12)] to-transparent opacity-70"
                aria-hidden
            />

            <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 max-w-xl sm:mb-16 md:mb-20">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-10 bg-fme-gold" />
                        <span className="text-[10px] uppercase tracking-[0.35em] text-fme-gold">
                            Cómo laburamos
                        </span>
                    </div>
                    <h2 className="fme-font-display text-[clamp(1.75rem,5vw,3rem)] leading-tight text-fme-cream">
                        Del boceto al envío
                    </h2>
                    <p className="mt-4 text-sm text-fme-cream-dim sm:text-[15px]">
                        Cuatro etapas reales — nada de “filosofía de marca” sin producción detrás.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                    {STEPS.map((item) => (
                        <article
                            key={item.step}
                            className="journey-card group relative overflow-hidden rounded-sm border border-[var(--border-cream-08)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.06)_0%,transparent_50%)] p-6 shadow-[inset_0_1px_0_0_var(--border-gold-05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-gold-12)] hover:shadow-[0_20px_40px_-24px_rgb(0_0_0/0.5)] sm:p-7"
                        >
                            <span className="fme-font-display text-[10px] tracking-[0.2em] text-fme-gold">{item.step}</span>
                            <h3 className="mt-4 fme-font-display text-lg tracking-wide text-fme-cream sm:text-xl">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-fme-cream-dim sm:text-[13px]">{item.body}</p>
                            <div className="mt-5 h-px w-8 bg-gradient-to-r from-fme-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </article>
                    ))}
                </div>

                <div className="mt-12 sm:mt-14">
                    <div className="rounded-sm fme-cta-panel px-6 py-8 sm:px-8 sm:py-9">
                        <p className="mb-5 text-[9px] uppercase tracking-[0.32em] text-fme-cream-dim">
                            Conectá el recorrido
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6">
                            <div className="flex flex-wrap gap-4 sm:gap-6">
                                <Link to="/comunidad" className="fme-focus-ring fme-link-cta">
                                    Comunidad →
                                </Link>
                                <Link to="/colecciones" className="fme-focus-ring fme-link-cta">
                                    Lookbook →
                                </Link>
                                <Link to="/barrio" className="fme-focus-ring fme-link-cta">
                                    El Barrio →
                                </Link>
                                <Link to="/multimarca" className="fme-focus-ring fme-link-cta">
                                    Multimarca →
                                </Link>
                            </div>
                            <a
                                href="https://storefme.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="fme-focus-ring inline-flex justify-center rounded-sm bg-fme-cream px-5 py-2.5 text-[10px] uppercase tracking-[0.22em] text-fme-black transition-colors hover:bg-fme-gold sm:shrink-0"
                            >
                                Ir a la tienda →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
