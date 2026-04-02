import { useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap";

const STRIP_IMAGES = [
    { src: "/images/barrio-1.jpeg", alt: "FME look 1" },
    { src: "/images/barrio-2.jpeg", alt: "FME look 2" },
    { src: "/images/barrio-3.jpeg", alt: "FME look 3" },
    { src: "/images/barrio-4.jpeg", alt: "FME look 4" },
    { src: "/images/barrio-5.jpeg", alt: "FME look 5" },
];

/**
 * Tramo pinned: franja horizontal de imágenes se desplaza con el scroll (scrub) + titular fijo.
 */
export default function HomePinnedStrip() {
    const rootRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const imgRefreshTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const onStripImgLoad = useCallback(() => {
        if (imgRefreshTimer.current) window.clearTimeout(imgRefreshTimer.current);
        imgRefreshTimer.current = window.setTimeout(() => ScrollTrigger.refresh(), 60);
    }, []);

    useEffect(
        () => () => {
            if (imgRefreshTimer.current) window.clearTimeout(imgRefreshTimer.current);
        },
        []
    );

    useGSAP(() => {
        const root = rootRef.current;
        const track = trackRef.current;
        const label = labelRef.current;
        if (!root || !track) return;

        const reduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const getShift = () => {
            const extra = Math.max(0, track.scrollWidth - window.innerWidth + 48);
            return -extra;
        };

        let resizeRefreshT: ReturnType<typeof setTimeout> | undefined;
        const debouncedRefresh = () => {
            if (resizeRefreshT) window.clearTimeout(resizeRefreshT);
            resizeRefreshT = window.setTimeout(() => ScrollTrigger.refresh(), 80);
        };

        const ro =
            typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(() => debouncedRefresh())
                : null;
        ro?.observe(track);

        const tween = gsap.to(track, {
            x: getShift,
            ease: "none",
            scrollTrigger: {
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                scrub: reduced ? 1.2 : 0.85,
                invalidateOnRefresh: true,
            },
        });

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        let labelTween: gsap.core.Tween | null = null;
        if (label && !reduced) {
            labelTween = gsap.fromTo(
                label,
                { opacity: 0.35, letterSpacing: "0.35em" },
                {
                    opacity: 1,
                    letterSpacing: "0.42em",
                    ease: "none",
                    scrollTrigger: {
                        trigger: root,
                        start: "top 60%",
                        end: "top 20%",
                        scrub: true,
                    },
                }
            );
        }

        return () => {
            if (resizeRefreshT) window.clearTimeout(resizeRefreshT);
            ro?.disconnect();
            tween.scrollTrigger?.kill();
            tween.kill();
            if (labelTween) {
                labelTween.scrollTrigger?.kill();
                labelTween.kill();
            }
        };
    }, { scope: rootRef });

    return (
        <section ref={rootRef} className="relative h-[220vh] border-y border-[var(--border-gold-08)] bg-fme-black">
            <div className="sticky top-0 flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden pt-[env(safe-area-inset-top)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_50%,rgb(var(--gold-rgb)/0.06),transparent_55%)]" aria-hidden />

                <div className="relative z-[1] mb-8 px-5 md:mb-10 md:px-10">
                    <p
                        ref={labelRef}
                        className="text-[10px] uppercase tracking-[0.42em] text-fme-gold"
                    >
                        Archivo en movimiento
                    </p>
                    <h2 className="fme-font-display mt-3 max-w-[20ch] text-[clamp(1.75rem,4.5vw,3rem)] font-bold leading-[1.05] text-fme-cream">
                        Misma marca,
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:1px_var(--gold)]">otro ritmo.</span>
                    </h2>
                    <p className="mt-4 max-w-md text-sm text-fme-cream-dim">
                        Scroll horizontal atado al vertical: como un contact sheet que avanza solo.
                    </p>
                    <Link
                        to="/showcase"
                        className="fme-focus-ring mt-6 inline-block text-[10px] uppercase tracking-[0.26em] text-fme-gold transition-colors hover:text-fme-cream"
                    >
                        Ver showcase vertical →
                    </Link>
                </div>

                <div className="relative z-[1] w-full overflow-hidden pb-6 md:pb-10">
                    <div
                        ref={trackRef}
                        className="flex w-max gap-3 px-5 will-change-transform md:gap-4 md:px-10"
                    >
                        {STRIP_IMAGES.map((im, idx) => (
                            <div
                                key={im.src}
                                className="relative h-[min(42vh,320px)] w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-sm ring-1 ring-[var(--border-gold-10)] md:h-[min(48vh,380px)] md:w-[min(38vw,340px)]"
                            >
                                <img
                                    src={im.src}
                                    alt={im.alt}
                                    className="h-full w-full object-cover"
                                    loading={idx < 2 ? "eager" : "lazy"}
                                    decoding="async"
                                    draggable={false}
                                    onLoad={onStripImgLoad}
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-fme-black/40 to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
