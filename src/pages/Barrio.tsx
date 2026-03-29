import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import AnimatedText from "../components/AnimatedText";
import { BARRIO_DATA } from "../data/barrioData";

export default function Barrio() {
    const sectionRef = useRef<HTMLElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Scroll Horizontal
        const scrollTween = gsap.to(horizontalRef.current, {
            x: () => -(horizontalRef.current!.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: () => `+=${horizontalRef.current!.scrollWidth}`,
                invalidateOnRefresh: true,
                fastScrollEnd: true, // Ayuda con el final del scroll
                refreshPriority: 1,
            }
        });

        // Entrada y salida de las imagenes - Cards
        const cards = gsap.utils.toArray<HTMLElement>(".item-card");

        cards.forEach((card, index) => {
            const img = card.querySelector("img");
            const isLastCard = index === cards.length - 1;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: scrollTween,
                    start: "left 98%",
                    end: isLastCard ? "right -20%" : "right 5%",
                    toggleActions: "play reverse play reverse",
                    invalidateOnRefresh: true,
                }
            });

            tl.fromTo(img,
                {
                    scale: 1.6,
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 0,
                    rotateY: -50
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

            card.addEventListener("mousemove", (e) => {
                const { left, top, width, height } = card.getBoundingClientRect();
                const x = (e.clientX - left) / width - 0.5;
                const y = (e.clientY - top) / height - 0.5;

                gsap.to(img, {
                    rotateY: x * 15,
                    rotateX: -y * 15,
                    x: x * 20,
                    y: y * 20,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(img, { rotateY: 0, rotateX: 0, x: 0, y: 0, duration: 0.6 });
            });
        });

        const finalText = sectionRef.current?.querySelector(".final-text-trigger");
        if (finalText) {
            gsap.fromTo(finalText,
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
                    }
                }
            );
        }

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-black text-white select-none overflow-hidden">

            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <AnimatedText text="Crónicas Urbanas" variant="fall" className="text-[gold] tracking-[0.8em] uppercase text-[10px] mb-4" delay={0} immediate={true} />
                <AnimatedText text="EL BARRIO"
                    highlightWords={["barrio"]}
                    variant="fall"
                    stagger={0.05} className="text-[12vw] font-bold tracking-tighter leading-none " delay={0} immediate={true} />
            </div>

            {/* Contenedor de Scroll Horizontal */}
            <div ref={triggerRef} className="relative h-screen overflow-hidden">
                <div
                    ref={horizontalRef}
                    className="flex h-full items-center gap-[10vw] px-[15vw] w-fit"
                >
                    {BARRIO_DATA.map((item) => (
                        <div
                            key={item.id}
                            data-cursor={item.title}
                            className={`item-card relative flex-shrink-0 ${item.size} group [perspective:1200px] will-change-transform`}
                        >
                            <div className="absolute -top-10 -left-10 text-[8vw] font-bold text-white/[0.03] z-0 pointer-events-none group-hover:text-[gold]/10 transition-colors duration-700">
                                {item.title}
                            </div>

                            <div className="relative w-full h-full overflow-hidden rounded-sm z-10">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="w-full h-full object-cover scale-110 will-change-transform" // Importante: will-change
                                />
                                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                            </div>

                            {/* Info de la Card */}
                            <div className="absolute -bottom-6 left-0 flex items-baseline gap-4">
                                <span className="text-[gold] text-xs font-mono">0{item.id}</span>
                                <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">{item.title}</span>
                            </div>
                        </div>
                    ))}
                    {/* Texto final */}
                    <div className="flex-shrink-0 w-[60vw] flex flex-col justify-center final-text-trigger will-change-transform">
                        <AnimatedText
                            text="Nuestra historia está en el asfalto."
                            highlightWords={["historia"]}
                            variant="fall"
                            className="text-[7vw] font-bold leading-none tracking-tighter"
                            immediate={true} 
                        />
                    </div>
                </div>
            </div>

            <div className="h-screen flex items-center justify-center">
                <p className="text-xs tracking-[0.5em] text-neutral-600 uppercase">FME — Made in Medellín — 2025</p>
            </div>
        </section>
    );
}