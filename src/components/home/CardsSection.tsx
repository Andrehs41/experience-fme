import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export function CardsSection() {
    const container = useScrollAnimation(".card-item", { stagger: 0.15, y: 80 });
    const cards = [
        { title: "Origen", desc: "Medellín como laboratorio: lo que ves en la web sale de aquí, no de un moodboard genérico." },
        { title: "Producción", desc: "Colecciones con criterio — piezas pensadas para repetirse, no para una sola foto." },
        { title: "Tienda", desc: "FME Store es donde cerramos el círculo: probás, llevás o pedís a domicilio." },
    ];

    return (
        <section ref={container} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 md:py-32">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                {cards.map((c, i) => (
                    <div
                        key={c.title}
                        data-cursor={c.title}
                        className="card-item group relative overflow-hidden rounded-2xl p-6 pl-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8 sm:pl-8 fme-card-accent"
                    >
                        <span
                            className="fme-font-display absolute right-5 top-1/2 -translate-y-1/2 text-[clamp(4rem,12vw,7rem)] font-black leading-none text-[rgb(var(--cream-rgb)_/_0.04)] transition-colors duration-500 group-hover:text-[rgb(var(--gold-rgb)_/_0.09)]"
                            aria-hidden
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-fme-gold via-fme-gold/40 to-transparent opacity-80" aria-hidden />
                        <h3 className="relative z-[1] mb-3 text-xl font-semibold text-fme-cream">{c.title}</h3>
                        <p className="relative z-[1] text-sm leading-relaxed text-fme-cream-dim">{c.desc}</p>
                    </div>
                ))}
            </div>
            <div className="mx-auto mt-12 max-w-6xl px-4 text-center sm:px-6">
                <a
                    href="https://storefme.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.3em] text-fme-gold transition-colors hover:text-fme-cream"
                >
                    Ir a la tienda →
                </a>
            </div>
        </section>
    );
}
