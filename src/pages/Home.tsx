import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";
import AnimatedText from "../components/AnimatedText";
import MagneticButton from "../components/MagneticButton";
import Intro from "../components/Intro";
import ManifestoSection from "../components/home/ManifestoSection";
import StoreCTA from "../components/home/StoreCTA";
import BentoCards from "../components/home/BentoCards";

// Hero 
interface HeroProps { startAnimation: boolean; }

function Hero({ startAnimation }: HeroProps) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!startAnimation) return;
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.6 })
            .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
            .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "+=0.3");
    }, { scope: container, dependencies: [startAnimation] });

    return (
        <section
            ref={container}
            className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative"
        >
            <span className="hero-tag text-sm tracking-widest uppercase text-neutral-400 mb-6">
                La Marca del Barrio
            </span>
            <AnimatedText
                text="Es identidad, es barrio, es actitud."
                highlightWords={["barrio", "actitud"]}
                variant="split"
                immediate
                className="text-5xl md:text-8xl font-bold leading-tight max-w-4xl"
            />
            <p className="hero-cta mt-8 text-lg text-neutral-400 max-w-xl">
                No es solo ropa.<br />
                Cada pieza lleva el peso de lo que somos.
            </p>
            <MagneticButton className="hero-cta mt-10 px-8 py-4 border border-white/20 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-colors duration-300">
                Ver el trabajo
            </MagneticButton>
            <span className="hero-scroll absolute bottom-8 text-xs text-neutral-500 tracking-widest uppercase">
                Scroll
            </span>
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
        <section ref={container} className="py-24 overflow-hidden">
            <p className="parallax-text whitespace-nowrap text-[8vw] font-bold text-white/50 tracking-tight">
                EL BARRIO — FME — ESENCIA — FME —&nbsp;
                EL BARRIO — FME — ESENCIA — FME —&nbsp;
            </p>
        </section>
    );
}

// Home
export default function Home() {
    const [introDone, setIntroDone] = useState(false);
    const handleIntroComplete = useCallback(() => { setIntroDone(true); }, []);

    return (
        <main className="bg-black text-white">
            <Intro onComplete={handleIntroComplete} />
            <div className={introDone ? "opacity-100" : "opacity-0"}>
                <Hero startAnimation={introDone} />
                <BentoCards />
                <ParallaxSection />
                <ManifestoSection />
                <StoreCTA />
            </div>
        </main>
    );
}