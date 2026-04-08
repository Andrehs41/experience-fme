import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";
import { SHOWCASE_PIECES } from "../../data/showcaseData";
import MagneticButton from "../MagneticButton";
import HeroBackground from "../HeroBackground";

/** Curva 0–1 suave para crossfades (menos “lineal” que el fade triangular puro) */
function smoothstep(t: number): number {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
}

/**
 * Showcase premium: scroll + sticky + GSAP scrub, crossfade smoothstep, HUD con micro-animación,
 * precarga de imágenes, puntos de navegación, atajos de teclado, viñeta cinematográfica.
 */
export default function ShowcaseImmersive() {
    const rootRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLElement | null)[]>([]);
    /** Capa interna: GSAP transforma el contenedor, no el <img> (evita artefactos y conflictos con object-fit). */
    const imgLayerRefs = useRef<(HTMLDivElement | null)[]>([]);
    const progressRef = useRef<HTMLDivElement>(null);
    const indexRef = useRef<HTMLSpanElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const lookCodeRef = useRef<HTMLParagraphElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const detailRef = useRef<HTMLParagraphElement>(null);
    const hudInnerRef = useRef<HTMLDivElement>(null);
    const lastIdxRef = useRef(-1);
    const [activeSlide, setActiveSlide] = useState(0);

    const n = SHOWCASE_PIECES.length;

    const scrollToSlide = useCallback(
        (slideIndex: number) => {
            const track = trackRef.current;
            if (!track) return;
            const start = track.offsetTop;
            const range = Math.max(0, track.offsetHeight - window.innerHeight);
            const clamped = Math.max(0, Math.min(slideIndex, n - 1));
            const t = n <= 1 ? 0 : clamped / n;
            window.scrollTo({ top: start + t * range, behavior: "smooth" });
        },
        [n]
    );

    useEffect(() => {
        let t: number;
        const debouncedRefresh = () => {
            window.clearTimeout(t);
            t = window.setTimeout(() => ScrollTrigger.refresh(), 100);
        };
        SHOWCASE_PIECES.forEach((p, i) => {
            if (i === 0) return;
            const im = new Image();
            im.onload = debouncedRefresh;
            im.onerror = debouncedRefresh;
            im.src = p.src;
        });
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const track = trackRef.current;
            if (!track) return;
            const r = track.getBoundingClientRect();
            const visible = r.top < window.innerHeight * 0.92 && r.bottom > window.innerHeight * 0.08;
            if (!visible) return;

            const start = track.offsetTop;
            const range = Math.max(0, track.offsetHeight - window.innerHeight);
            const cur = window.scrollY;
            const rel = range < 1 ? 0 : (cur - start) / range;
            const approxSlide = Math.round(rel * n);

            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToSlide(Math.min(n - 1, approxSlide + 1));
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToSlide(Math.max(0, approxSlide - 1));
            } else if (e.key === "Home") {
                e.preventDefault();
                scrollToSlide(0);
            } else if (e.key === "End") {
                e.preventDefault();
                scrollToSlide(n - 1);
            }
        };
        window.addEventListener("keydown", onKey, { passive: false });
        return () => window.removeEventListener("keydown", onKey);
    }, [n, scrollToSlide]);

    useGSAP(
        () => {
            const hero = rootRef.current?.querySelector(".showcase-hero-reveal");
            if (hero) {
                gsap.from(hero.children, {
                    y: 28,
                    opacity: 0,
                    duration: 0.85,
                    stagger: 0.1,
                    ease: "power3.out",
                    delay: 0.05,
                });
            }
        },
        { scope: rootRef }
    );

    useGSAP(
        () => {
            const track = trackRef.current;
            if (!track) return;

            const reduced =
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            const slides = slidesRef.current.filter(Boolean) as HTMLElement[];
            const layers = imgLayerRefs.current.filter(Boolean) as HTMLDivElement[];

            const updateHudText = (idx: number) => {
                const piece = SHOWCASE_PIECES[idx];
                if (!piece) return;
                if (lookCodeRef.current) lookCodeRef.current.textContent = piece.lookCode;
                if (titleRef.current) titleRef.current.textContent = piece.title;
                if (detailRef.current) detailRef.current.textContent = piece.detail;
            };

            const pulseHud = () => {
                const hud = hudInnerRef.current;
                if (!hud || reduced) return;
                gsap.killTweensOf(hud);
                gsap.fromTo(
                    hud,
                    { opacity: 0.5, y: 8 },
                    { opacity: 1, y: 0, duration: 0.42, ease: "power3.out" }
                );
            };

            const setSlideVisuals = (slideProgress: number) => {
                const sp = Math.max(0, Math.min(slideProgress, n));

                slides.forEach((slide, i) => {
                    const dist = Math.abs(sp - i);
                    const opacity = dist >= 1 ? 0 : 1 - smoothstep(dist);
                    const activeSlide = dist < 0.52;
                    gsap.set(slide, {
                        opacity,
                        zIndex: activeSlide ? 12 : Math.max(0, Math.round(opacity * 10)),
                    });
                    const layer = layers[i];
                    if (layer && !reduced) {
                        const local = sp - i;
                        const parallax = Math.max(-1, Math.min(1, local)) * 3.2;
                        gsap.set(layer, {
                            scale: 1.03 + (1 - opacity) * 0.06,
                            yPercent: parallax * 2.2,
                        });
                    } else if (layer) {
                        gsap.set(layer, { scale: 1, yPercent: 0 });
                    }
                });

                const idx = Math.min(n - 1, Math.max(0, Math.floor(sp + 0.06)));
                if (idx !== lastIdxRef.current) {
                    lastIdxRef.current = idx;
                    updateHudText(idx);
                    setActiveSlide(idx);
                    pulseHud();
                }

                if (indexRef.current) {
                    indexRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
                }
                if (progressRef.current) {
                    progressRef.current.style.transform = `scaleX(${sp / n})`;
                }
                if (introRef.current) {
                    const introOp = Math.max(0, 1 - sp * 2.35);
                    gsap.set(introRef.current, {
                        opacity: introOp,
                        pointerEvents: introOp > 0.06 ? "auto" : "none",
                    });
                }
            };

            const st = ScrollTrigger.create({
                trigger: track,
                start: "top top",
                end: "bottom bottom",
                scrub: reduced ? 1.1 : 0.88,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    setSlideVisuals(self.progress * n);
                },
            });
            setSlideVisuals(0);
            lastIdxRef.current = 0;

            const onResize = () => ScrollTrigger.refresh();
            window.addEventListener("resize", onResize);

            return () => {
                window.removeEventListener("resize", onResize);
                st.kill();
            };
        },
        { scope: rootRef, dependencies: [n] }
    );

    return (
        <div ref={rootRef} className="relative text-fme-white">
            <div
                className="pointer-events-none fixed inset-0 z-[5] opacity-[0.04] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                aria-hidden
            />

            <section className="showcase-hero-reveal relative border-b border-[var(--border-gold-08)] px-5 pb-12 pt-[calc(var(--nav-height)+12px)] md:px-10 md:pb-16 md:pt-[calc(var(--nav-height)+24px)] z[1]">
                <HeroBackground
                    src="/images/fme-hero.webp"
                    blur={1.5}
                    brightness={0.32}
                    saturation={1.1}
                    overlay={0.65}
                    glow="cream"
                />
                <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full blur-3xl md:right-10 md:top-20 md:h-96 md:w-96" style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.11) 0%, transparent 68%)" }} aria-hidden />
                <p className="relative text-[10px] uppercase tracking-[0.42em] text-fme-gold">Showcase FME</p>
                <h1 className="relative mt-5 max-w-[20ch] text-[clamp(2rem,6.5vw,4.25rem)] font-bold leading-[0.98] tracking-tight text-fme-cream fme-font-display">
                    Ropa en escena.
                    <br />
                    <span className="text-transparent [-webkit-text-stroke:1px_var(--gold)]">Un plano por pieza.</span>
                </h1>
                <p className="relative mt-7 max-w-[28rem] text-sm font-light leading-[1.75] text-fme-cream-dim">
                    Scroll cinematográfico: el mismo timeline atado al desplazamiento — crossfade suave, HUD editorial y
                    progreso. Pensado como demo de campaña, no como slider.
                </p>
                <p className="relative mt-4 text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim/90">
                    Flechas / Inicio · Fin · también puntos abajo
                </p>
            </section>

            <div
                ref={trackRef}
                className="relative"
                style={{ height: `${n * 100}vh` }}
                role="region"
                aria-label="Showcase de piezas FME, controlado por scroll"
            >
                <div className="fme-showcase-stage sticky top-0 flex h-[100dvh] w-full flex-col overflow-hidden [padding-bottom:env(safe-area-inset-bottom)]">
                    <div className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(ellipse_92%_72%_at_50%_115%,rgb(var(--gold-rgb)/0.14),transparent_58%)]" aria-hidden />

                    {SHOWCASE_PIECES.map((piece, i) => (
                        <article
                            key={piece.id}
                            ref={(el) => {
                                slidesRef.current[i] = el;
                            }}
                            className="absolute inset-0 will-change-[opacity]"
                            style={{ opacity: i === 0 ? 1 : 0 }}
                        >
                            <div className="relative h-full w-full overflow-hidden">
                                <div
                                    ref={(el) => {
                                        imgLayerRefs.current[i] = el;
                                    }}
                                    className="absolute inset-0 overflow-hidden will-change-transform"
                                >
                                    <img
                                        src={piece.src}
                                        alt={piece.alt}
                                        className="h-full w-full min-h-full object-cover"
                                        loading={i === 0 ? "eager" : "lazy"}
                                        decoding="async"
                                        draggable={false}
                                        sizes="100vw"
                                        {...(i === 0 ? { fetchPriority: "high" as const } : {})}
                                    />
                                </div>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fme-black via-fme-black/30 to-fme-black/20" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-fme-black/55 via-transparent to-fme-black/25" />
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fme-black/90 via-fme-black/25 to-transparent" />
                            </div>
                        </article>
                    ))}

                    <div
                        ref={introRef}
                        className="pointer-events-none absolute inset-0 z-[20] flex flex-col items-center justify-center bg-fme-black/58 px-6 text-center backdrop-blur-[3px] md:px-10"
                    >
                        <p className="text-[10px] uppercase tracking-[0.45em] text-fme-gold">Scroll</p>
                        <p className="fme-font-display mt-5 max-w-[22ch] text-[clamp(1.2rem,3.2vw,1.85rem)] leading-snug text-fme-cream">
                            Deslizá para recorrer cada look en contexto
                        </p>
                        <div className="mt-12 flex flex-col items-center gap-2">
                            <span className="inline-block h-12 w-px bg-gradient-to-b from-fme-gold/90 to-transparent" />
                            <span className="text-[9px] uppercase tracking-[0.35em] text-fme-cream-dim">o usá los puntos</span>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute left-0 right-0 top-0 z-[25] flex items-center justify-between px-5 py-5 md:px-10 md:py-7">
                        <span className="text-[9px] uppercase tracking-[0.35em] text-fme-cream/75">FME Showcase</span>
                        <span ref={indexRef} className="fme-font-display text-[11px] tracking-[0.28em] text-fme-cream/95">
                            01 / {String(n).padStart(2, "0")}
                        </span>
                    </div>

                    <div
                        ref={hudInnerRef}
                        className="pointer-events-none absolute bottom-0 left-0 right-0 z-[26] px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-28 md:px-14 md:pb-14"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <p ref={lookCodeRef} className="text-[10px] uppercase tracking-[0.42em] text-fme-gold">
                            {SHOWCASE_PIECES[0]!.lookCode}
                        </p>
                        <h2
                            ref={titleRef}
                            className="fme-font-display mt-3 max-w-[16ch] text-[clamp(1.5rem,4.2vw,2.85rem)] leading-[1.05] text-fme-cream drop-shadow-[0_2px_24px_rgb(0_0_0/0.65)]"
                        >
                            {SHOWCASE_PIECES[0]!.title}
                        </h2>
                        <p ref={detailRef} className="mt-3 max-w-md text-[11px] uppercase tracking-[0.22em] text-fme-cream-dim">
                            {SHOWCASE_PIECES[0]!.detail}
                        </p>
                    </div>

                    <div className="pointer-events-auto absolute bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] left-0 right-0 z-[27] flex justify-center px-4 md:bottom-[max(6.5rem,env(safe-area-inset-bottom))]">
                        <div className="flex items-center gap-2 rounded-full border border-[var(--border-gold-10)] bg-[rgb(var(--black-rgb)/0.45)] px-3 py-2 backdrop-blur-md">
                            {SHOWCASE_PIECES.map((piece, i) => (
                                <button
                                    key={piece.id}
                                    type="button"
                                    className="fme-focus-ring group flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[rgb(var(--gold-rgb)/0.12)]"
                                    aria-label={`Ir a la pieza ${i + 1}: ${piece.title}`}
                                    onClick={() => scrollToSlide(i)}
                                >
                                    <span
                                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${activeSlide === i
                                                ? "scale-125 bg-fme-gold shadow-[0_0_10px_rgb(var(--gold-rgb)/0.6)]"
                                                : "bg-fme-cream/35 group-hover:bg-fme-cream/60"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[25] h-[3px] bg-[var(--border-cream-08)] md:h-[2px]">
                        <div
                            ref={progressRef}
                            className="h-full origin-left scale-x-0 bg-gradient-to-r from-fme-gold via-fme-cream to-fme-gold shadow-[0_0_12px_rgb(var(--gold-rgb)/0.35)]"
                            style={{ transform: "scaleX(0)" }}
                        />
                    </div>
                </div>
            </div>

            <section className="relative border-t border-[var(--border-gold-10)] bg-gradient-to-b from-fme-black to-[rgb(var(--gold-rgb)/0.07)] px-6 py-20 md:px-14 md:py-28">
                <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden />
                <div className="relative mx-auto max-w-3xl">
                    <p className="text-[10px] uppercase tracking-[0.4em] text-fme-gold">Siguiente paso</p>
                    <p className="fme-font-display mt-6 text-[clamp(1.4rem,3.8vw,2.35rem)] leading-[1.12] text-fme-cream">
                        Lo viste en movimiento: elegí talle en la tienda o seguí el lookbook horizontal.
                    </p>
                    <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                        <MagneticButton
                            onClick={() => window.open("https://storefme.com", "_blank")}
                            className="fme-focus-ring inline-flex min-h-[48px] items-center justify-center rounded-sm border border-[var(--border-gold-12)] bg-fme-cream px-10 py-3.5 text-[10px] font-medium uppercase tracking-[0.28em] text-fme-black shadow-[0_20px_50px_-20px_rgb(0_0_0/0.55)] transition-colors hover:bg-fme-gold"
                        >
                            Ir a la tienda →
                        </MagneticButton>
                        <Link
                            to="/colecciones"
                            className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.26em] text-fme-cream-dim transition-colors hover:text-fme-gold"
                        >
                            Lookbook horizontal →
                        </Link>
                        <Link
                            to="/comunidad"
                            className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.26em] text-fme-cream-dim transition-colors hover:text-fme-gold"
                        >
                            Comunidad →
                        </Link>
                        <Link
                            to="/"
                            className="fme-focus-ring text-center text-[10px] uppercase tracking-[0.26em] text-fme-cream-dim transition-colors hover:text-fme-gold"
                        >
                            Inicio →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
