import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

const STEPS = [
    { step: "01", title: "Brief", body: "Lo que sale a la calle empieza con escucha: qué falta, qué cansa, qué se repite." },
    { step: "02", title: "Patronaje", body: "Siluetas probadas en movimiento — no en render. Que el cuerpo mande." },
    { step: "03", title: "Producción", body: "Lotes acotados y controlados. Menos volumen, más criterio por metro de tela." },
    { step: "04", title: "Canal", body: "Tienda online y comunidad que devuelven foto, feedback y próximo ajuste." },
] as const;

export default function HomeJourneySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".journey-card");

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            cards.forEach((card, index) => {
                const yOffset = index * 52; 

                gsap.fromTo(card,
                    { y: yOffset + 60, opacity: 0 },
                    {
                        y: yOffset,
                        opacity: 1,
                        duration: 1,
                        delay: index * 0.1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                            invalidateOnRefresh: true,
                        },
                    }
                );
            });
        });

        mm.add("(max-width: 1023px)", () => {
            gsap.fromTo(cards,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative border-t border-[var(--border-gold-08)] bg-fme-surface-raised py-20 fme-noise-soft sm:py-24 md:py-32"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border-gold-12)] to-transparent opacity-70" />

            <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 max-w-xl sm:mb-20">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-10 bg-fme-gold" />
                        <span className="text-[10px] uppercase tracking-[0.35em] text-fme-gold">
                            Cómo laburamos
                        </span>
                    </div>
                    <h2 className="fme-font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] text-fme-cream uppercase">
                        Del boceto <br className="hidden sm:block" /> al envío
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:pb-52">
                    {STEPS.map((item) => (
                        <article
                            key={item.step}
                            className="journey-card group relative overflow-hidden rounded-sm border border-white/10 bg-neutral-900/40 p-6 transition-all duration-500 hover:z-10 hover:border-fme-gold/70 hover:bg-neutral-800/90 sm:p-8"
                        >
                            <span className="fme-font-display text-[10px] tracking-[0.2em] text-fme-gold/80 font-bold">{item.step}</span>
                            <h3 className="mt-4 fme-font-display text-lg tracking-wide text-white group-hover:text-fme-gold transition-colors uppercase font-bold sm:text-xl">
                                {item.title}
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-100 transition-colors sm:text-[13px]">
                                {item.body}
                            </p>

                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fme-gold/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                            <div className="absolute bottom-0 left-1/2 h-10 w-32 -translate-x-1/2 translate-y-full rounded-full bg-fme-gold/10 opacity-0 blur-xl transition-all duration-700 group-hover:translate-y-1/2 group-hover:opacity-100" />
                        </article>
                    ))}
                </div>

                <div className="mt-16 sm:mt-24 lg:mt-32">
                    <div className="rounded-sm border border-[var(--border-gold-08)] bg-black/20 backdrop-blur-sm px-6 py-10 sm:px-10 sm:py-12 shadow-2xl">
                        <p className="mb-6 text-[10px] uppercase tracking-[0.4em] text-fme-gold font-medium">Conectá el recorrido</p>
                        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                {["Comunidad", "Lookbook", "El Barrio", "Multimarca"].map((txt) => (
                                    <Link
                                        key={txt}
                                        to={`/${txt.toLowerCase().replace(" ", "")}`}
                                        className="fme-link-cta text-[11px] font-medium tracking-widest uppercase hover:text-fme-gold transition-colors"
                                    >
                                        {txt} →
                                    </Link>
                                ))}
                            </div>
                            <a
                                href="https://storefme.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-sm bg-fme-cream px-8 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-fme-black hover:bg-fme-gold transition-all hover:scale-105 active:scale-95"
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