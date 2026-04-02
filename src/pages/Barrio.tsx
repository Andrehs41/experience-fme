import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../lib/gsap";
import AnimatedText from "../components/AnimatedText";
import { BARRIO_DATA } from "../data/barrioData";

export default function Barrio() {
    const sectionRef = useRef<HTMLElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const root = sectionRef.current;
        const horizontal = horizontalRef.current;
        const trigger = triggerRef.current;
        if (!root || !horizontal || !trigger) return;

        const cards = gsap.utils.toArray<HTMLElement>(".item-card");
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const getScrollDistance = () =>
                Math.max(0, horizontal.scrollWidth - window.innerWidth);

            const scrollTween = gsap.to(horizontal, {
                x: () => -getScrollDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    /* 1:1 con el recorrido horizontal real; scrollWidth solo alargaba el pin y “cortaba” el scrub */
                    end: () => `+=${getScrollDistance()}`,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    fastScrollEnd: true,
                    refreshPriority: 1,
                },
            });

            const detachCardListeners: Array<() => void> = [];

            cards.forEach((card: HTMLElement, index: number) => {
                const img = card.querySelector("img");
                if (!img) return;

                const isLastCard = index === cards.length - 1;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: scrollTween,
                        start: "left 98%",
                        end: isLastCard ? "right -20%" : "right 5%",
                        toggleActions: "play reverse play reverse",
                        invalidateOnRefresh: true,
                    },
                });

                tl.fromTo(
                    img,
                    {
                        scale: 1.6,
                        clipPath: "inset(100% 0% 0% 0%)",
                        opacity: 0,
                        rotateY: -50,
                    },
                    {
                        scale: 1,
                        clipPath: "inset(0% 0% 0% 0%)",
                        opacity: 1,
                        rotateY: 0,
                        duration: 1.2,
                        ease: "expo.out",
                    }
                );

                const tiltEase = { duration: 0.55, ease: "power2.out" as const };
                const rotateYTo = gsap.quickTo(img, "rotateY", tiltEase);
                const rotateXTo = gsap.quickTo(img, "rotateX", tiltEase);
                const xTo = gsap.quickTo(img, "x", tiltEase);
                const yTo = gsap.quickTo(img, "y", tiltEase);

                const onMove = (e: MouseEvent) => {
                    const { left, top, width, height } = card.getBoundingClientRect();
                    const x = (e.clientX - left) / width - 0.5;
                    const y = (e.clientY - top) / height - 0.5;
                    rotateYTo(x * 15);
                    rotateXTo(-y * 15);
                    xTo(x * 20);
                    yTo(y * 20);
                };

                const onLeave = () => {
                    rotateYTo(0);
                    rotateXTo(0);
                    xTo(0);
                    yTo(0);
                };

                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseleave", onLeave);
                detachCardListeners.push(() => {
                    card.removeEventListener("mousemove", onMove);
                    card.removeEventListener("mouseleave", onLeave);
                });
            });

            const finalText = root.querySelector(".final-text-trigger");
            if (finalText) {
                gsap.fromTo(
                    finalText,
                    { y: 100, opacity: 0, rotateX: -30 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: finalText,
                            containerAnimation: scrollTween,
                            start: "left 95%",
                            end: "left 60%",
                            scrub: true,
                        },
                    }
                );
            }

            return () => {
                detachCardListeners.forEach((off) => off());
                scrollTween.kill();
            };
        });

        mm.add("(max-width: 767px)", () => {
            cards.forEach((card: HTMLElement) => {
                const img = card.querySelector("img");
                if (!img) return;
                gsap.fromTo(
                    img,
                    { opacity: 0, y: 48, scale: 1.04 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            const finalText = root.querySelector(".final-text-trigger");
            if (finalText) {
                gsap.fromTo(
                    finalText,
                    { opacity: 0, y: 36 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: finalText,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);
        window.addEventListener("load", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("load", onResize);
            mm.revert();
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="fme-page-vignette relative overflow-x-hidden text-fme-white select-none fme-noise-soft">

            <div className="relative flex min-h-[46vh] flex-col items-center justify-center overflow-x-hidden border-b border-[var(--border-gold-08)] px-4 py-20 text-center sm:px-6 sm:py-24 md:min-h-[58vh] md:py-24">
                <div
                    className="pointer-events-none absolute inset-0 opacity-95"
                    style={{
                        background:
                            "radial-gradient(ellipse 85% 70% at 50% 0%, rgb(var(--gold-rgb) / 0.11) 0%, transparent 55%), linear-gradient(180deg, rgb(var(--surface-deep)) 0%, transparent 45%)",
                    }}
                    aria-hidden
                />
                <div className="pointer-events-none absolute left-6 top-1/4 hidden h-32 w-px bg-gradient-to-b from-fme-gold/40 to-transparent md:block" aria-hidden />
                <div className="pointer-events-none absolute right-8 top-1/3 hidden h-px w-24 bg-gradient-to-l from-fme-gold/25 to-transparent lg:block" aria-hidden />
                <AnimatedText text="Desde la calle, no desde un moodboard" variant="fall" className="relative z-[1] mb-3 text-fme-gold text-[9px] tracking-[0.6em] uppercase sm:mb-4 sm:text-[10px] sm:tracking-[0.8em]" delay={0} immediate={true} />
                <AnimatedText text="EL BARRIO"
                    highlightWords={["barrio"]}
                    variant="fall"
                    stagger={0.05} className="relative z-[1] text-[13vw] font-bold leading-none tracking-tighter drop-shadow-[0_0_80px_rgb(var(--gold-rgb)/0.12)] sm:text-[12vw] md:text-[12vw]" delay={0} immediate={true} />
            </div>

            <div ref={triggerRef} className="relative md:h-screen md:overflow-hidden">
                <div
                    ref={horizontalRef}
                    className="flex w-full flex-col items-center gap-14 px-4 py-10 md:h-full md:w-fit md:flex-row md:items-center md:gap-[10vw] md:px-[15vw] md:py-0"
                >
                    {BARRIO_DATA.map((item) => (
                        <div
                            key={item.id}
                            data-cursor={item.title}
                            className={`item-card group relative flex-shrink-0 [perspective:1200px] will-change-transform ${item.size}`}
                        >
                            <div className="pointer-events-none absolute -left-4 -top-6 z-0 text-[12vw] font-bold text-[rgb(var(--white-rgb)_/_0.03)] transition-colors duration-700 group-hover:text-fme-gold/10 sm:-left-6 sm:-top-8 sm:text-[8vw] md:-left-10 md:-top-10">
                                {item.title}
                            </div>

                            <div className="relative z-10 w-full overflow-hidden rounded-md ring-1 ring-[var(--border-gold-10)] ring-offset-2 ring-offset-[var(--black)] transition-shadow duration-500 group-hover:ring-[var(--border-gold-18)]">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="h-full w-full scale-110 object-cover will-change-transform"
                                    decoding="async"
                                    onLoad={() => ScrollTrigger.refresh()}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fme-black/50 via-transparent to-fme-black/10" />
                                <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.18] mix-blend-overlay" />
                            </div>

                            <div className="absolute -bottom-5 left-0 flex items-baseline gap-3 sm:-bottom-6 sm:gap-4">
                                <span className="font-mono text-xs text-fme-gold">0{item.id}</span>
                                <span className="text-[9px] uppercase tracking-[0.25em] opacity-50 sm:text-[10px] sm:tracking-[0.3em]">{item.title}</span>
                            </div>
                        </div>
                    ))}
                    <div className="final-text-trigger flex w-full max-w-[min(100%,28rem)] flex-shrink-0 flex-col justify-center px-1 pb-12 will-change-transform sm:max-w-[min(100%,34rem)] md:max-w-[min(100%,40rem)] md:px-4 md:pb-0">
                        <AnimatedText
                            text="Esto no es lifestyle de catálogo: es lo que filmamos cuando la ciudad sigue encendida."
                            highlightWords={["catálogo"]}
                            variant="fall"
                            className="text-[clamp(1.125rem,2.6vw,1.875rem)] font-bold leading-[1.2] tracking-tight sm:text-[clamp(1.2rem,2.4vw,2rem)] md:text-[clamp(1.25rem,2.1vw,2.125rem)]"
                            immediate={true}
                        />
                    </div>
                </div>
            </div>

            <div className="relative flex min-h-[42vh] flex-col items-center justify-center gap-10 border-t border-[var(--border-gold-08)] px-4 py-16 md:min-h-[38vh] md:py-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgb(var(--gold-rgb)/0.08),transparent_55%)]" aria-hidden />
                <p className="relative text-center text-[9px] uppercase tracking-[0.35em] text-fme-cream-dim sm:text-xs sm:tracking-[0.5em]">
                    FME · Marca de ropa · Medellín · 2026
                </p>
                <div className="relative flex max-w-2xl flex-col items-stretch gap-3 rounded-sm fme-cta-panel px-6 py-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 sm:px-10 sm:py-9">
                    <a
                        href="https://storefme.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fme-focus-ring rounded-sm border border-[var(--border-gold-12)] bg-[rgb(var(--gold-rgb)/0.08)] px-5 py-2.5 text-center text-[10px] uppercase tracking-[0.28em] text-fme-gold transition-colors hover:border-fme-gold hover:bg-[rgb(var(--gold-rgb)/0.14)] hover:text-fme-cream sm:min-w-[11rem]"
                    >
                        Comprar piezas →
                    </a>
                    <Link
                        to="/colecciones"
                        className="fme-focus-ring rounded-sm border border-transparent px-5 py-2.5 text-center text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:border-[var(--border-gold-10)] hover:text-fme-gold sm:min-w-[11rem]"
                    >
                        Ver lookbook FME →
                    </Link>
                    <Link
                        to="/comunidad"
                        className="fme-focus-ring rounded-sm border border-transparent px-5 py-2.5 text-center text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim transition-colors hover:border-[var(--border-gold-10)] hover:text-fme-gold sm:min-w-[11rem]"
                    >
                        Comunidad en fotos →
                    </Link>
                </div>
            </div>
        </section>
    );
}
