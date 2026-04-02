import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { LOOKBOOK_ITEMS } from "../../data/coleccionesData";

/**
 * Experiencia editorial: intro cinematográfica + lookbook horizontal pinneado (ScrollTrigger scrub)
 * con parallax por panel (containerAnimation). Móvil: scroll vertical nativo + entrada del texto.
 */
export default function ColeccionesImmersive() {
    const rootRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLElement>(null);
    const wrapRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const reduced =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            if (!reduced) {
                gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 })
                    .from(".cc-intro-line", {
                        scaleX: 0,
                        transformOrigin: "left center",
                        duration: 1.15,
                        ease: "expo.out",
                    })
                    .from(".cc-intro-eyebrow", { y: 22, opacity: 0, duration: 0.65 }, "-=0.55")
                    .from(
                        ".cc-intro-title-inner",
                        { yPercent: 100, duration: 1, ease: "power4.out" },
                        "-=0.55"
                    )
                    .from(".cc-intro-sub", { opacity: 0, y: 18, duration: 0.55 }, "-=0.45")
                    .from(".cc-intro-scroll", { opacity: 0, y: 8, duration: 0.45 }, "-=0.25");
            }

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const track = trackRef.current;
                const wrap = wrapRef.current;
                if (!track || !wrap) return () => {};

                const getScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);

                const scrollTween = gsap.to(track, {
                    x: () => -getScroll(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrap,
                        start: "top top",
                        end: () => "+=" + getScroll(),
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`;
                            }
                            if (indexRef.current) {
                                const idx = Math.min(
                                    LOOKBOOK_ITEMS.length - 1,
                                    Math.floor(self.progress * LOOKBOOK_ITEMS.length)
                                );
                                indexRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(LOOKBOOK_ITEMS.length).padStart(2, "0")}`;
                            }
                        },
                    },
                });

                if (!reduced) {
                    // Parallax en el contenedor, no en <img>: evita glitches con object-fit + pin.
                    gsap.utils.toArray<HTMLElement>(".cc-panel-img-layer").forEach((layer) => {
                        const panel = layer.closest(".cc-panel");
                        if (!panel) return;
                        gsap.fromTo(
                            layer,
                            { scale: 1.12 },
                            {
                                scale: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left right",
                                    end: "right left",
                                    scrub: true,
                                },
                            }
                        );
                    });

                    gsap.utils.toArray<HTMLElement>(".cc-panel-meta").forEach((meta) => {
                        const panel = meta.closest(".cc-panel");
                        if (!panel) return;
                        gsap.fromTo(
                            meta,
                            { y: 40, opacity: 0 },
                            {
                                y: 0,
                                opacity: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    containerAnimation: scrollTween,
                                    start: "left 78%",
                                    end: "left 42%",
                                    scrub: 1,
                                },
                            }
                        );
                    });
                }

                return () => {};
            });

            mm.add("(max-width: 767px)", () => {
                if (reduced) return () => {};

                const panels = gsap.utils.toArray<HTMLElement>(".cc-mobile-panel");
                panels.forEach((panel) => {
                    const cap = panel.querySelector(".cc-mobile-cap");
                    if (cap) {
                        gsap.from(cap, {
                            y: 28,
                            opacity: 0,
                            duration: 0.75,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: panel,
                                start: "top 82%",
                                toggleActions: "play none none reverse",
                            },
                        });
                    }
                });

                return () => {};
            });

            const onWinLoad = () => ScrollTrigger.refresh();
            window.addEventListener("load", onWinLoad);

            return () => {
                window.removeEventListener("load", onWinLoad);
                mm.revert();
            };
        },
        { scope: rootRef }
    );

    return (
        <div ref={rootRef} className="relative text-fme-white">
            <div
                className="pointer-events-none fixed inset-0 z-[5] hidden opacity-[0.035] mix-blend-overlay md:block"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
                aria-hidden
            />

            <section
                ref={introRef}
                className="relative flex min-h-[100dvh] flex-col justify-center px-6 pb-16 pt-[calc(var(--nav-height)+32px)] md:px-14 md:pb-24"
            >
                <div className="cc-intro-line mb-10 h-px w-20 bg-fme-gold md:mb-12 md:w-28" />
                <p className="cc-intro-eyebrow text-[10px] uppercase tracking-[0.45em] text-fme-gold">Lookbook · temporada actual</p>
                <h1 className="mt-6 max-w-[22ch]">
                    <span className="block overflow-hidden">
                        <span className="cc-intro-title-inner fme-font-display inline-block text-[clamp(2.5rem,11vw,7rem)] font-bold leading-[0.95] tracking-tight">
                            COLECCIONES
                        </span>
                    </span>
                </h1>
                <p className="cc-intro-sub mt-8 max-w-md text-sm font-light leading-relaxed text-fme-cream-dim md:text-base">
                    Siluetas y escenas de la misma marca que ves en tienda. Acá ves la pieza en contexto; el talle y el precio están en storefme.com.
                </p>
                <div className="cc-intro-scroll mt-14 flex items-center gap-4 text-[9px] uppercase tracking-[0.35em] text-[var(--text-cream-muted)] md:mt-20">
                    <span className="inline-block h-8 w-px bg-gradient-to-b from-fme-gold to-transparent" />
                    Recorrer archivo
                </div>
            </section>

            <section ref={wrapRef} className="relative hidden h-screen w-full overflow-hidden md:block">
                <div ref={trackRef} className="flex h-[100dvh] w-max will-change-transform">
                    {LOOKBOOK_ITEMS.map((item, panelIdx) => (
                        <article
                            key={item.id}
                            className="cc-panel relative h-full w-screen shrink-0 overflow-hidden"
                            data-cursor={item.title}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_70%_at_50%_120%,rgb(var(--gold-rgb)/0.12),transparent_55%)]"
                                aria-hidden
                            />
                            <div className="cc-panel-img-layer absolute inset-0 overflow-hidden will-change-transform">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                    loading={panelIdx < 3 ? "eager" : "lazy"}
                                    decoding="async"
                                    draggable={false}
                                    sizes="100vw"
                                    {...(panelIdx === 0 ? { fetchPriority: "high" as const } : {})}
                                    onLoad={() => ScrollTrigger.refresh()}
                                />
                            </div>
                            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-fme-black via-fme-black/25 to-transparent" />
                            <div className="cc-panel-meta absolute bottom-0 left-0 right-0 z-[3] px-8 pb-20 pt-32 md:px-16 md:pb-28">
                                <p className="text-[10px] uppercase tracking-[0.42em] text-fme-gold">{item.lookCode}</p>
                                <h2 className="fme-font-display mt-3 text-[clamp(2rem,6vw,4.5rem)] leading-[0.98] tracking-tight text-fme-cream">
                                    {item.title}
                                </h2>
                                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-fme-cream-dim">
                                    {item.type === "person"
                                        ? "Retrato"
                                        : item.type === "product"
                                          ? "Pieza"
                                          : "Escena"}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div
                    className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-8 mix-blend-difference md:flex lg:right-10"
                    aria-hidden
                >
                    {["FW26", "SS26", "CORE"].map((cat) => (
                        <span
                            key={cat}
                            className="origin-center rotate-90 text-[9px] uppercase tracking-[0.9em] text-fme-cream/90"
                        >
                            {cat}
                        </span>
                    ))}
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-6 pb-6 md:px-10 md:pb-8">
                    <div className="h-px flex-1 bg-[var(--border-cream-08)]" />
                    <span
                        ref={indexRef}
                        className="fme-font-display px-4 text-[11px] tracking-[0.25em] text-fme-cream/80"
                    >
                        01 / {String(LOOKBOOK_ITEMS.length).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-[var(--border-cream-08)]" />
                </div>
            </section>

            <div
                className="pointer-events-none fixed bottom-0 left-0 right-0 z-30 hidden h-[2px] bg-[var(--border-cream-08)] md:block"
                aria-hidden
            >
                <div
                    ref={progressRef}
                    className="h-full origin-left scale-x-0 bg-gradient-to-r from-fme-gold via-fme-cream to-fme-gold"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>

            <section className="border-t border-[var(--border-gold-08)] bg-fme-black md:hidden">
                <div className="px-4 py-12">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-fme-gold">Misma colección</p>
                    <h2 className="fme-font-display mt-3 text-3xl text-fme-cream">Vertical: para ver detalle sin girar el celular como loco</h2>
                </div>
                {LOOKBOOK_ITEMS.map((item, idx) => (
                    <article key={`m-${item.id}`} className="cc-mobile-panel border-t border-[var(--border-cream-08)]">
                        <div className="aspect-[3/4] overflow-hidden">
                            <div className="cc-mobile-img-layer h-full w-full overflow-hidden">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                    loading={idx < 2 ? "eager" : "lazy"}
                                    decoding="async"
                                    onLoad={() => ScrollTrigger.refresh()}
                                />
                            </div>
                        </div>
                        <div className="cc-mobile-cap space-y-2 px-4 py-8">
                            <p className="text-[10px] uppercase tracking-[0.38em] text-fme-gold">{item.lookCode}</p>
                            <h3 className="fme-font-display text-2xl text-fme-cream">{item.title}</h3>
                        </div>
                    </article>
                ))}
            </section>

            <section className="border-t border-[var(--border-gold-10)] bg-gradient-to-b from-fme-black to-[rgb(var(--gold-rgb)/0.06)] px-6 py-20 md:px-14 md:py-28">
                <p className="text-[10px] uppercase tracking-[0.4em] text-fme-gold">Stock y novedades</p>
                <p className="fme-font-display mt-6 max-w-lg text-[clamp(1.5rem,4vw,2.5rem)] leading-tight text-fme-cream">
                    Si algo agotó en web, pregunta por talla: a veces queda en tienda antes de que actualicemos el sitio.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                        href="https://storefme.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fme-focus-ring inline-flex items-center justify-center rounded-sm border border-[var(--border-gold-12)] bg-fme-cream px-8 py-3.5 text-[10px] font-medium uppercase tracking-[0.28em] text-fme-black transition-colors hover:bg-fme-gold"
                    >
                        Abrir tienda oficial →
                    </a>
                    <Link
                        to="/comunidad"
                        className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:text-fme-gold sm:px-4"
                    >
                        Ver cómo la lleva la gente →
                    </Link>
                    <Link
                        to="/showcase"
                        className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:text-fme-gold sm:px-4"
                    >
                        Showcase scroll (demo) →
                    </Link>
                    <Link
                        to="/"
                        className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:text-fme-gold sm:px-4"
                    >
                        Volver al inicio →
                    </Link>
                </div>
            </section>
        </div>
    );
}
