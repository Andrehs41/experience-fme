import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

export default function HomeEditorialSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(".editorial-reveal", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative bg-gradient-to-b from-fme-black via-fme-black to-[rgb(var(--gold-rgb)/0.05)] py-20 fme-noise-soft sm:py-24 md:py-32"
        >
            <div
                className="pointer-events-none absolute right-0 top-0 h-[min(60vh,480px)] w-[min(90vw,600px)] translate-x-1/4 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.07) 0%, transparent 65%)" }}
                aria-hidden
            />

            <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-12 px-4 sm:gap-14 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
                <div className="editorial-reveal relative aspect-[4/5] w-full overflow-hidden rounded-md ring-1 ring-[var(--border-gold-10)] ring-offset-4 ring-offset-fme-black sm:aspect-[3/4]">
                    <img
                        src="/images/barrio-2.jpeg"
                        alt="FME en el barrio"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                        loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fme-black/75 via-fme-black/10 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    <p className="absolute bottom-4 left-4 right-4 text-[10px] uppercase tracking-[0.35em] text-[rgb(var(--white-rgb)/0.72)] sm:bottom-6 sm:left-6">
                        Fotografía de archivo · FME
                    </p>
                </div>

                <div className="flex flex-col justify-center">
                    <div className="editorial-reveal mb-5 flex items-center gap-3">
                        <span className="h-px w-10 bg-fme-gold sm:w-12" />
                        <span className="text-[10px] uppercase tracking-[0.35em] text-fme-gold">
                            Desde el estudio
                        </span>
                    </div>
                    <h2 className="editorial-reveal fme-font-display text-[clamp(2rem,6vw,3.5rem)] leading-[0.95] tracking-tight text-fme-cream">
                        La ciudad no es
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_var(--gold)]">
                            decorado.
                        </span>
                    </h2>
                    <p className="editorial-reveal mt-6 max-w-md text-sm leading-relaxed text-fme-cream-dim sm:text-[15px]">
                        Documentamos lo que pasa afuera del set: gente real, luces reales, ropa que se pide otra vez. Si
                        buscás marketing vacío, no es acá.
                    </p>
                    <div className="editorial-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3">
                        <Link
                            to="/barrio"
                            className="fme-focus-ring inline-flex justify-center rounded-sm border border-[var(--border-gold-12)] bg-[rgb(var(--gold-rgb)/0.06)] px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-fme-cream transition-colors hover:border-fme-gold hover:bg-[rgb(var(--gold-rgb)/0.12)]"
                        >
                            Recorrer El Barrio
                        </Link>
                        <Link
                            to="/colecciones"
                            className="fme-focus-ring inline-flex justify-center rounded-sm bg-fme-cream px-6 py-3 text-center text-[10px] uppercase tracking-[0.22em] text-fme-black transition-colors hover:bg-fme-gold"
                        >
                            Abrir lookbook
                        </Link>
                        <Link
                            to="/comunidad"
                            className="fme-focus-ring fme-link-cta inline-flex justify-center px-4 py-3 sm:border-l sm:border-[var(--border-gold-08)]"
                        >
                            Comunidad →
                        </Link>
                    </div>
                    <div className="editorial-reveal mt-5 flex flex-wrap gap-4 border-t border-[var(--border-gold-08)] pt-5">
                        <a
                            href="https://storefme.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fme-focus-ring text-[10px] uppercase tracking-[0.22em] text-fme-gold transition-colors hover:text-fme-cream"
                        >
                            Comprar piezas →
                        </a>
                        <Link
                            to="/multimarca"
                            className="fme-focus-ring text-[10px] uppercase tracking-[0.22em] text-fme-cream-dim transition-colors hover:text-fme-gold"
                        >
                            Ver multimarca →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
