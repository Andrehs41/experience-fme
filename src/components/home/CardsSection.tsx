import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const CARDS = [
    {
        title: "Origen",
        desc: "Medellín como laboratorio: lo que ves en la web sale de aquí, no de un moodboard genérico.",
        tag: "Local Core"
    },
    {
        title: "Producción",
        desc: "Colecciones con criterio — piezas pensadas para repetirse, no para una sola foto.",
        tag: "Crafted"
    },
    {
        title: "Tienda",
        desc: "FME Store es donde cerramos el círculo: probás, llevás o pedís a domicilio.",
        tag: "Direct"
    },
] as const;

export function CardsSection() {
    // Aumentamos el desplazamiento inicial para una entrada más dramática
    const container = useScrollAnimation(".card-item", { stagger: 0.2, y: 100 });

    return (
        <section
            ref={container}
            className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32"
        >
            {/* Header sutil de sección */}
            <div className="mb-16 flex items-baseline justify-between border-b border-white/5 pb-8">
                <h2 className="fme-font-display text-[10px] uppercase tracking-[0.4em] text-fme-gold">
                    Pilares FME
                </h2>
                <span className="text-[9px] uppercase tracking-widest text-fme-cream-dim/40">
                    Est. 2025 — MDE
                </span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 md:grid-cols-3">
                {CARDS.map((c, i) => (
                    <div
                        key={c.title}
                        data-cursor={c.title}
                        className="card-item group relative bg-fme-surface-raised p-8 transition-all duration-700 hover:bg-neutral-900/80 sm:p-10"
                    >
                        {/* Indicador de Tag Superior */}
                        <div className="mb-12 flex items-center justify-between">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-fme-gold/60">
                                {c.tag}
                            </span>
                            <span className="fme-font-display text-xs text-fme-cream-dim/20">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Contenido Principal */}
                        <div className="relative z-[1]">
                            <h3 className="fme-font-display mb-4 text-2xl font-bold uppercase tracking-tight text-fme-cream group-hover:text-fme-gold transition-colors duration-500">
                                {c.title}
                            </h3>
                            <p className="max-w-[280px] text-[13px] leading-relaxed text-fme-cream-dim group-hover:text-fme-cream transition-colors duration-500">
                                {c.desc}
                            </p>
                        </div>

                        {/* Decoración Industrial de Esquina */}
                        <div className="absolute bottom-0 right-0 h-16 w-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            <div className="absolute bottom-4 right-4 h-px w-8 bg-fme-gold/30" />
                            <div className="absolute bottom-4 right-4 h-8 w-px bg-fme-gold/30" />
                        </div>

                        {/* Efecto de ruido sutil solo en hover */}
                        <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-[0.03]" />
                    </div>
                ))}
            </div>

            {/* Footer de Sección */}
            <div className="mt-16 flex flex-col items-center justify-center gap-6 text-center">
                <div className="h-px w-12 bg-white/10" />
                <a
                    href="https://storefme.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fme-focus-ring group relative text-[10px] uppercase tracking-[0.4em] text-fme-gold transition-all"
                >
                    <span className="relative z-10">Explorar la tienda</span>
                    <div className="absolute -bottom-2 left-0 h-px w-0 bg-fme-gold transition-all duration-500 group-hover:w-full" />
                </a>
            </div>
        </section>
    );
}