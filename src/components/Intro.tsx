import { useRef, useEffect } from "react";
import { gsap } from "../lib/gsap";

interface Props {
    onComplete: () => void;
}

export default function Intro({ onComplete }: Props) {
    const overlay = useRef<HTMLDivElement>(null);
    const fmeText = useRef<HTMLSpanElement>(null);
    const slogan = useRef<HTMLParagraphElement>(null);
    const curtain = useRef<HTMLDivElement>(null);
    const lineTop = useRef<HTMLDivElement>(null);
    const lineBot = useRef<HTMLDivElement>(null);
    const sideL = useRef<HTMLSpanElement>(null);
    const sideR = useRef<HTMLSpanElement>(null);
    const year = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        document.fonts.ready.then(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Estado inicial
            gsap.set([fmeText.current, slogan.current], { opacity: 0 });
            gsap.set(fmeText.current, { scale: 0.12 });
            gsap.set(curtain.current, { scaleY: 1 });
            gsap.set([lineTop.current, lineBot.current], { scaleX: 0 });
            gsap.set([sideL.current, sideR.current, year.current], {
                color: "rgba(232,224,208,0)",
            });

            tl
                // Líneas decorativas
                .to([lineTop.current, lineBot.current], {
                    scaleX: 1, duration: 0.8, ease: "power2.inOut",
                }, 0.3)

                // Textos laterales
                .to([year.current, sideL.current, sideR.current], {
                    color: "rgba(232,224,208,0.28)", duration: 0.5,
                }, 0.5)

                // FME aparece pequeño
                .to(fmeText.current, { opacity: 1, duration: 0.4 }, 0.6)

                // FME crece al tamaño real
                .to(fmeText.current, {
                    scale: 1, duration: 1.6, ease: "expo.out",
                }, 0.6)

                // Slogan entra
                .to(slogan.current, { opacity: 1, duration: 0.6 }, 1.6)

                // Pausa dramática — silencio intencional

                // FME explota llenando pantalla
                .to(fmeText.current, {
                    scale: 5.5, opacity: 0, duration: 1.1, ease: "expo.in",
                }, 2.8)

                // Detalles se van
                .to([slogan.current, year.current, sideL.current, sideR.current], {
                    opacity: 0, duration: 0.4,
                }, 2.9)
                .to([lineTop.current, lineBot.current], {
                    scaleX: 0, duration: 0.4,
                }, 2.9)

                // Cortina sube → revela el home
                .to(curtain.current, {
                    scaleY: 0, transformOrigin: "bottom",
                    duration: 1.0, ease: "expo.inOut",
                }, 3.1)

                // Para que el Home inicie su secuencia
                .call(onComplete, undefined, 4)
                .set(overlay.current, { display: "none" }, 4.1);
        });

        return () => ctx.revert();
        });
    }, [onComplete]);

    return (
        <div
            ref={overlay}
            className="fixed inset-0 z-[500] flex flex-col items-center
                 justify-center bg-[--black] overflow-hidden"
        >
            {/* Líneas horizontales */}
            <div
                ref={lineTop}
                className="absolute top-[15%] left-0 right-0 h-px bg-white"
                style={{ transformOrigin: "center" }}
            />
            <div
                ref={lineBot}
                className="absolute bottom-[15%] left-0 right-0 h-px bg-white"
                style={{ transformOrigin: "center" }}
            />

            {/* Texto año */}
            <span ref={year}
                className="absolute top-[15%] right-10 text-[11px] tracking-[.2em]
                   uppercase translate-y-[-24px]">
                SS 2025
            </span>

            {/* Textos laterales */}
            <span ref={sideL}
                className="absolute left-10 bottom-[35%] text-[16px] tracking-[.25em]
                   uppercase"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
                La marca del barrio
            </span>
            <span ref={sideR}
                className="absolute right-10 bottom-[20%] text-[16px] tracking-[.25em] uppercase">
                Col — 2025
            </span>

            {/* FME central */}
            <span
                ref={fmeText}
                className="text-[--cream] leading-none select-none"
                style={{ letterSpacing: "-.01em", willChange: "transform"}}
            >
                FME
            </span>

            {/* Slogan */}
            <p
                ref={slogan}
                className="flex items-center gap-4 text-[11px] tracking-[.45em]
                   uppercase text-[--gold] mt-4"
            >
                <span className="w-10 h-px bg-[--gold]" />
                Store
                <span className="w-10 h-px bg-[--gold]" />
            </p>

            {/* Cortina de salida */}
            <div
                ref={curtain}
                className="absolute inset-0 bg-[--black]"
                style={{ transformOrigin: "bottom" }}
            />
        </div>
    );
}