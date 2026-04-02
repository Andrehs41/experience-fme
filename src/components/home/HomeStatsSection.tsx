import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

type StatItem = {
    value: string;
    label: string;
    href: string | null;
};

const STATS: StatItem[] = [
    { value: "2018", label: "Primer corte con nombre FME", href: null },
    { value: "∞", label: "Reposición cuando la gente pide más", href: "/colecciones" },
    { value: "MDE", label: "Marca con base en la ciudad", href: "/barrio" },
    { value: "1", label: "Tienda oficial: storefme.com", href: "https://storefme.com" },
];

export default function HomeStatsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".home-stat-item", {
            y: 36,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative border-y border-[var(--border-gold-08)] bg-fme-surface-ink py-16 shadow-[inset_0_1px_0_0_var(--border-gold-05)] fme-noise-soft sm:py-20 md:py-24"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                aria-hidden
            />
            <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-2 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-fme-gold" />
                        <span className="text-[10px] uppercase tracking-[0.32em] text-fme-gold">
                            Datos rápidos
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.22em]">
                        <Link to="/colecciones" className="fme-focus-ring fme-link-cta">
                            Colecciones →
                        </Link>
                        <a
                            href="https://storefme.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fme-focus-ring text-fme-gold transition-colors hover:text-fme-cream"
                        >
                            Tienda →
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 md:gap-4">
                    {STATS.map((s) => {
                        const inner = (
                            <>
                                <p className="fme-font-display text-[clamp(2rem,8vw,3.25rem)] leading-none tracking-tight text-fme-cream">
                                    {s.value}
                                </p>
                                <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim sm:text-[11px]">
                                    {s.label}
                                </p>
                                {s.href && (
                                    <span className="mt-4 inline-block text-[9px] uppercase tracking-[0.2em] text-fme-gold opacity-80 transition-opacity group-hover:opacity-100">
                                        {s.href.startsWith("http") ? "Abrir →" : "Ver →"}
                                    </span>
                                )}
                            </>
                        );

                        const cardClass =
                            "home-stat-item group relative overflow-hidden rounded-sm border border-[var(--border-cream-08)] bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.05)_0%,transparent_45%)] p-5 text-center transition-colors duration-300 hover:border-[var(--border-gold-12)] hover:bg-[rgb(var(--gold-rgb)/0.04)] sm:p-6 md:text-left";

                        if (s.href?.startsWith("http")) {
                            return (
                                <a
                                    key={s.value}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${cardClass} fme-focus-ring block`}
                                >
                                    {inner}
                                </a>
                            );
                        }
                        if (s.href) {
                            return (
                                <Link key={s.value} to={s.href} className={`${cardClass} fme-focus-ring block`}>
                                    {inner}
                                </Link>
                            );
                        }
                        return (
                            <div key={s.value} className={cardClass}>
                                {inner}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
