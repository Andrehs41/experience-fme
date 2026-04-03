import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

type StatItem = {
    value: string;
    numericValue?: number; // Para la animación de conteo
    suffix?: string;
    label: string;
    href: string | null;
};

const STATS: StatItem[] = [
    { value: "2018", numericValue: 2018, label: "Origen del corte FME", href: "/" },
    { value: "∞", label: "Reposición bajo demanda", href: "/colecciones" },
    { value: "MDE", label: "Operación local Medellín", href: "/barrio" },
    { value: "01", numericValue: 1, label: "Punto de venta oficial", href: "https://storefme.com" },
];

export default function HomeStatsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        const items = gsap.utils.toArray(".home-stat-item");

        mm.add("(min-width: 768px)", () => {
            gsap.from(items, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animación para los números que tienen valor numérico
            gsap.utils.toArray(".stat-number").forEach((num: any) => {
                const target = parseInt(num.innerText);
                if (isNaN(target)) return;

                gsap.from(num, {
                    innerText: 0,
                    duration: 2,
                    snap: { innerText: 1 },
                    scrollTrigger: {
                        trigger: num,
                        start: "top 90%",
                    },
                });
            });
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative border-y border-white/5 bg-fme-surface-ink py-20 sm:py-28"
        >
            {/* Ruido de fondo sutil */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="relative z-[1] mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header de la sección */}
                <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-fme-gold animate-pulse" />
                        <span className="text-[10px] uppercase tracking-[0.4em] text-fme-gold font-bold">
                            Datos Rápidos 
                        </span>
                    </div>
                    <div className="hidden sm:block text-[9px] uppercase tracking-widest text-fme-cream-dim/50">
                        FME Ledger / 2025
                    </div>
                </div>

                {/* Grid con estética de bordes finos */}
                <div className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-4 overflow-hidden border border-white/5">
                    {STATS.map((s) => {
                        const content = (
                            <div className="group relative bg-fme-surface-ink p-8 transition-all duration-500 hover:bg-neutral-900/50 sm:p-10">
                                {/* Decoración de esquina */}
                                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="h-1 w-1 bg-fme-gold/40" />
                                </div>

                                <div className="flex flex-col h-full">
                                    <span className="stat-number fme-font-display text-[clamp(2.5rem,10vw,4rem)] font-bold leading-none tracking-tighter text-fme-cream group-hover:text-fme-gold transition-colors duration-500">
                                        {s.value}
                                    </span>

                                    <h4 className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-fme-cream-dim group-hover:text-fme-cream transition-colors">
                                        {s.label}
                                    </h4>

                                    {s.href && (
                                        <div className="mt-8 flex items-center gap-2 text-[9px] uppercase tracking-widest text-fme-gold/60 group-hover:text-fme-gold transition-all">
                                            <span className="h-px w-4 bg-fme-gold/40 group-hover:w-8 transition-all" />
                                            {s.href.startsWith("http") ? "Source" : "Explorar"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );

                        if (s.href?.startsWith("http")) {
                            return (
                                <a key={s.value} href={s.href} target="_blank" rel="noopener noreferrer" className="block">
                                    {content}
                                </a>
                            );
                        }
                        if (s.href) {
                            return (
                                <Link key={s.value} to={s.href} className="block">
                                    {content}
                                </Link>
                            );
                        }
                        return <div key={s.value}>{content}</div>;
                    })}
                </div>
            </div>
        </section>
    );
}