import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import AnimatedText from "../components/AnimatedText";
import MagneticButton from "../components/MagneticButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Intro from "../components/Intro";
import ManifestoSection from "../components/home/ManifestoSection";
import StoreCTA from "../components/home/StoreCTA";
import HomeStatsSection from "../components/home/HomeStatsSection";
import HomeEditorialSection from "../components/home/HomeEditorialSection";
import HomeJourneySection from "../components/home/HomeJourneySection";
import HomeNewsletterSection from "../components/home/HomeNewsletterSection";
import HomePinnedStrip from "../components/home/HomePinnedStrip";

// Hero 
interface HeroProps { startAnimation: boolean; }

function Hero({ startAnimation }: HeroProps) {
    const navigate = useNavigate();
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!startAnimation) return;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.6 })
            .from(".hero-tag-line", { scaleX: 0, opacity: 0, duration: 0.45, transformOrigin: "center" }, "-=0.35")
            .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
            .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "+=0.3");
    }, { scope: container, dependencies: [startAnimation] });

    return (
        <section
            ref={container}
            className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pb-16 pt-8 text-center sm:px-6 sm:pb-12 sm:pt-4"
        >
            <div className="pointer-events-none absolute inset-0 fme-noise-soft" aria-hidden />
            <div
                className="pointer-events-none absolute inset-0 opacity-90"
                aria-hidden
                style={{
                    background:
                        "radial-gradient(ellipse 90% 55% at 50% -8%, rgb(var(--gold-rgb) / 0.14) 0%, transparent 52%), radial-gradient(ellipse 70% 45% at 100% 100%, rgb(var(--cream-rgb) / 0.05) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 0% 80%, rgb(var(--gold-rgb) / 0.06) 0%, transparent 50%)",
                }}
            />
            <div
                className="pointer-events-none absolute left-1/2 top-[18%] h-[min(56vw,420px)] w-[min(120vw,900px)] -translate-x-1/2 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, transparent 68%)" }}
                aria-hidden
            />
            <span className="hero-tag relative z-[1] mb-3 text-[11px] tracking-[0.35em] text-fme-gold sm:mb-4 sm:text-sm sm:tracking-widest">
                FME · Medellín
            </span>
            <div className="hero-tag-line relative z-[1] mb-5 h-px w-14 bg-gradient-to-r from-transparent via-fme-gold/80 to-transparent sm:mb-6 sm:w-20" aria-hidden />
            <AnimatedText
                text="Marca de ropa en Medellín. Pensada para la calle."
                highlightWords={["Medellín", "calle"]}
                variant="split"
                immediate
                className="relative z-[1] max-w-[min(100%,42rem)] text-[clamp(2rem,9vw,6rem)] font-bold leading-[1.05] md:max-w-4xl md:leading-tight"
            />
            <p className="hero-cta relative z-[1] mt-6 max-w-xl text-sm leading-relaxed text-fme-cream-dim sm:mt-8 sm:text-base md:text-lg">
                Ropa que sale del barrio con nombre propio: cortes, telas y siluetas que
                aguantan el ritmo real — no el de campaña.
            </p>
            <div className="hero-cta relative z-[1] mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <MagneticButton
                    onClick={() => navigate("/colecciones")}
                    className="rounded-full border border-[var(--border-gold-12)] bg-[rgb(var(--gold-rgb)_/_0.06)] px-7 py-3.5 text-[11px] tracking-wide text-fme-cream shadow-[0_0_0_1px_rgb(var(--cream-rgb)_/_0.04)] backdrop-blur-sm transition-colors duration-300 hover:border-transparent hover:bg-fme-gold hover:text-fme-black sm:px-8 sm:py-4 sm:text-sm"
                >
                    Ver colección
                </MagneticButton>
                <a
                    href="https://storefme.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.28em] text-fme-cream-dim underline-offset-4 transition-colors hover:text-fme-gold"
                >
                    Comprar en FME Store →
                </a>
            </div>
            <span className="hero-scroll absolute bottom-6 z-[1] flex items-center gap-3 text-[10px] tracking-[0.35em] text-fme-cream-dim opacity-80 sm:bottom-8 sm:text-xs sm:tracking-widest">
                <span className="inline-block h-8 w-px bg-gradient-to-b from-fme-gold/60 to-transparent" aria-hidden />
                Sigue bajando
            </span>
        </section>
    );
}

// Cards
function CardsSection() {
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

// Parallax
function ParallaxSection() {
    const container = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        gsap.to(".parallax-text", {
            xPercent: -40,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });
    }, { scope: container });

    return (
        <section ref={container} className="relative overflow-hidden border-y border-[var(--border-gold-08)] bg-[linear-gradient(180deg,rgb(var(--black-rgb)/0.4)_0%,transparent_45%,rgb(var(--gold-rgb)/0.03)_100%)] py-16 sm:py-20 md:py-24">
            <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden />
            <p className="parallax-text whitespace-nowrap bg-gradient-to-r from-fme-gold/35 via-fme-cream/25 to-fme-gold/35 bg-clip-text text-[clamp(2.5rem,11vw,8vw)] font-bold tracking-tight text-transparent md:text-[8vw]">
                MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
                MDE — FME — CALLE — MARCA — TIENDA —&nbsp;
            </p>
        </section>
    );
}

// Home
export default function Home() {
    const [introDone, setIntroDone] = useState(false);
    const handleIntroComplete = useCallback(() => { setIntroDone(true); }, []);

    return (
        <div className="fme-page-vignette text-fme-white">
            <Intro onComplete={handleIntroComplete} />
            <div className={introDone ? "opacity-100" : "opacity-0"}>
                <Hero startAnimation={introDone} />
                <HomeStatsSection />
                <CardsSection />
                <ParallaxSection />
                <HomePinnedStrip />
                <HomeEditorialSection />
                <ManifestoSection />
                <HomeJourneySection />
                <HomeNewsletterSection />
                <StoreCTA />
            </div>
        </div>
    );
}