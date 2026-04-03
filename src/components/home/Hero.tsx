import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "../../lib/gsap";
import AnimatedText from "../../components/AnimatedText";
import MagneticButton from "../../components/MagneticButton";

export function Hero() {
    const navigate = useNavigate();
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.2 });
        tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.6 })
            .from(".hero-tag-line", { scaleX: 0, opacity: 0, duration: 0.45, transformOrigin: "center" }, "-=0.35")
            .from(".hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.2")
            .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "+=0.3");
    }, { scope: container });

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
