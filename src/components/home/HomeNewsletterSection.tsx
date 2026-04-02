import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../../lib/gsap";

export default function HomeNewsletterSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [sent, setSent] = useState(false);

    useGSAP(() => {
        gsap.from(".newsletter-reveal", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: sectionRef });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section
            ref={sectionRef}
            className="relative border-t border-[var(--border-gold-08)] bg-gradient-to-b from-[rgb(var(--gold-rgb)/0.06)] via-fme-surface-ink to-fme-black py-16 fme-noise-soft sm:py-20 md:py-24"
        >
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgb(var(--gold-rgb)/0.06),transparent_55%)]"
                aria-hidden
            />

            <div className="relative z-[1] mx-auto max-w-2xl px-4 text-center sm:px-6">
                <div className="rounded-sm fme-cta-panel px-5 py-10 sm:px-10 sm:py-12">
                    <p className="newsletter-reveal text-[10px] uppercase tracking-[0.35em] text-fme-gold">Lista interna FME</p>
                    <h2 className="newsletter-reveal mt-4 fme-font-display text-[clamp(1.5rem,4.5vw,2.25rem)] text-fme-cream">
                        Avisos de restock y lanzamientos
                    </h2>
                    <p className="newsletter-reveal mx-auto mt-3 max-w-md text-sm text-fme-cream-dim">
                        Dejanos tu mail y entérate antes cuando entre material nuevo o vuelva una pieza que se fue volando.
                        Un correo cuando hay noticia, no cada semana.
                    </p>
                    <form
                        onSubmit={onSubmit}
                        className="newsletter-reveal mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-2"
                    >
                        <label htmlFor="home-email" className="sr-only">
                            Correo electrónico
                        </label>
                        <input
                            id="home-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="tu@email.com"
                            className="min-h-[48px] flex-1 rounded-sm border border-[var(--border-cream-15)] bg-[var(--overlay-white-05)] px-4 text-sm text-fme-cream placeholder:text-[rgb(var(--white-rgb)/0.3)] outline-none transition-colors focus:border-fme-gold"
                        />
                        <button
                            type="submit"
                            className="min-h-[48px] shrink-0 rounded-sm bg-fme-cream px-6 text-[10px] font-medium uppercase tracking-[0.2em] text-fme-black transition-colors hover:bg-fme-gold"
                        >
                            {sent ? "Recibido" : "Suscribirme"}
                        </button>
                    </form>
                    {sent && (
                        <p className="mt-4 text-xs text-fme-gold">Listo — revisá tu bandeja (y spam, por las dudas).</p>
                    )}

                    <div className="newsletter-reveal mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[var(--border-gold-08)] pt-8">
                        <Link to="/colecciones" className="fme-focus-ring fme-link-cta">
                            Ver colecciones →
                        </Link>
                        <a
                            href="https://storefme.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="fme-focus-ring text-[10px] uppercase tracking-[0.22em] text-fme-gold transition-colors hover:text-fme-cream"
                        >
                            Tienda oficial →
                        </a>
                        <Link to="/comunidad" className="fme-focus-ring fme-link-cta">
                            Comunidad →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
