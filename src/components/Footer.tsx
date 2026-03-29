import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
    variant: "home" | "barrio" | "minimal" | "colecciones" | "comunidad" | "multimarca";
}

export default function Footer({ variant }: FooterProps) {
    const footerRef = useRef<HTMLElement>(null);

    const configs = {
        home: {
            bg: "bg-black",
            text: "text-white",
            border: "border-white/10",
            accent: "text-[gold]",
            msg: "EL EPICENTRO DEL ESTILO URBANO.",
            tag: "FME EXPERIENCE"
        },
        barrio: {
            bg: "bg-[gold]",
            text: "text-black",
            border: "border-black/20",
            accent: "text-black",
            msg: "ESTA ESENCIA NO SE COMPRA, SE VIVE.",
            tag: "DESDE LAS CALLES"
        },
        minimal: {
            bg: "bg-neutral-100",
            text: "text-neutral-900",
            border: "border-neutral-300",
            accent: "text-neutral-500",
            msg: "LESS IS MORE.",
            tag: "PURE AESTHETICS"
        },
        colecciones: {
            bg: "bg-[#050505]",
            text: "text-white",
            border: "border-white/5",
            accent: "text-[gold]",
            msg: "ARCHIVOS SELECCIONADOS 2026.",
            tag: "LIMITED DROP"
        },
        comunidad: {
            bg: "bg-white",
            text: "text-black",
            border: "border-black/10",
            accent: "text-neutral-400",
            msg: "EL CLAN DE LA CALLE.",
            tag: "JOIN THE MOVEMENT"
        },
        multimarca: {
            bg: "bg-zinc-900",
            text: "text-zinc-400",
            border: "border-zinc-800",
            accent: "text-white",
            msg: "CURACIÓN GLOBAL / IMPACTO LOCAL.",
            tag: "ALLIANCE"
        }
    };

    const current = configs[variant];

    useGSAP(() => {
        // Animación de entrada
        gsap.from(".footer-content", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%",
            }
        });
    }, { scope: footerRef });

    return (
        <footer
            ref={footerRef}
            className={`py-24 px-8 border-t transition-colors duration-700 ${current.bg} ${current.text} ${current.border}`}
        >
            <div className="max-w-[1400px] mx-auto footer-content">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                    {/* Branding */}
                    <div className="space-y-4">
                        <h2 className={`text-8xl font-black tracking-tighter leading-none italic ${current.accent}`}>
                            FME
                        </h2>
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold uppercase tracking-[0.5em]">{current.tag}</p>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 italic">La marca del barrio</p>
                        </div>
                    </div>

                    {/* Navigation / Links (Minimal) */}
                    <div className="grid grid-cols-2 gap-16 text-[10px] uppercase tracking-[0.3em] font-medium">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:opacity-50 transition-opacity">Instagram</a>
                            <a href="#" className="hover:opacity-50 transition-opacity">Spotify</a>
                            <a href="#" className="hover:opacity-50 transition-opacity">TikTok</a>
                        </div>
                        <div className="flex flex-col gap-3 text-right md:text-left">
                            <a href="#" className="hover:opacity-50 transition-opacity">Privacy</a>
                            <a href="#" className="hover:opacity-50 transition-opacity">Contact</a>
                            <a href="#" className="hover:opacity-50 transition-opacity">Legal</a>
                        </div>
                    </div>

                    {/* Message & Copyright */}
                    <div className="flex flex-col items-start md:items-end text-left md:text-right max-w-xs gap-6">
                        <p className="text-sm font-bold leading-tight tracking-tight">
                            {current.msg}
                        </p>
                        <div className="space-y-1">
                            <p className="text-[10px] opacity-40 font-mono tracking-tighter">
                                [ 06.0441° N, 75.5643° W ]
                            </p>
                            <p className="text-[9px] font-bold tracking-[0.2em] opacity-80 uppercase">
                                © 2026 MEDELLÍN, COLOMBIA
                            </p>
                        </div>
                    </div>
                </div>

                {/* Línea decorativa final */}
                <div className={`mt-20 h-px w-full ${current.border} opacity-50`}></div>
            </div>
        </footer>
    );
}