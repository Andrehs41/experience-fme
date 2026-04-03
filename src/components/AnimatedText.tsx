import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "../lib/gsap";

// Tipos

type AnimationVariant =
    | "fall"          // letras caen con rotación 3D
    | "rise"          // letras suben desde abajo limpiamente
    | "scramble"      // letras se "decodifican" una a una
    | "wave"          // ola suave letra por letra
    | "split"         // palabras entran desde lados opuestos
    | "glitch"        // efecto glitch antes de estabilizarse
    | "reveal";       // clip-path reveal por líneas (cinematográfico)

type SplitLevel = "chars" | "words" | "lines";

interface Props {
    text: string;
    highlightWords?: string[];
    className?: string;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
    delay?: number;
    duration?: number;
    stagger?: number;
    variant?: AnimationVariant;
    splitBy?: SplitLevel;
    immediate?: boolean;
    triggerStart?: string;
}

// Variantes

function getAnimation(
    variant: AnimationVariant,
    targets: Element[],
    delay: number,
    duration: number,
    stagger: number,
    trigger: Element | null,
    triggerStart: string,
    immediate: boolean
) {
    const scrollConfig = immediate
        ? {}
        : {
            scrollTrigger: {
                trigger,
                start: triggerStart,
                toggleActions: "play none none reverse",
            },
        };

    switch (variant) {
        case "fall":
            return gsap.from(targets, {
                y: 70,
                opacity: 0,
                rotateX: -85,
                stagger,
                duration,
                delay,
                ease: "expo.out",
                transformOrigin: "50% 0% -40px",
                ...scrollConfig,
            });

        case "rise":
            return gsap.from(targets, {
                y: 60,
                opacity: 0,
                stagger,
                duration,
                delay,
                ease: "power4.out",
                ...scrollConfig,
            });

        case "wave": {
            const tl = gsap.timeline({ delay, ...scrollConfig });
            tl.from(targets, {
                y: 40,
                opacity: 0,
                scale: 0.85,
                stagger: { each: stagger, ease: "power2.inOut" },
                duration,
                ease: "back.out(2)",
            });
            return tl;
        }

        case "scramble": {
            const tl = gsap.timeline({ delay, ...scrollConfig });
            tl.from(targets, {
                opacity: 0,
                duration: duration * 0.3,
                stagger,
            }).from(
                targets,
                {
                    y: 30,
                    stagger,
                    duration: duration * 0.7,
                    ease: "power3.out",
                },
                "<"
            );
            return tl;
        }

        case "split": {
            const tl = gsap.timeline({ delay, ...scrollConfig });
            targets.forEach((el, i) => {
                tl.from(
                    el,
                    {
                        x: i % 2 === 0 ? -60 : 60,
                        opacity: 0,
                        duration,
                        ease: "expo.out",
                    },
                    i * stagger
                );
            });
            return tl;
        }

        case "glitch": {
            const tl = gsap.timeline({ delay, ...scrollConfig });
            tl.from(targets, {
                opacity: 0,
                duration: 0.05,
                stagger: stagger * 0.5,
            })
                .to(targets, {
                    x: () => (Math.random() - 0.5) * 12,
                    y: () => (Math.random() - 0.5) * 8,
                    duration: 0.08,
                    stagger: stagger * 0.3,
                    ease: "none",
                })
                .to(targets, {
                    x: 0,
                    y: 0,
                    duration: duration,
                    stagger,
                    ease: "elastic.out(1, 0.5)",
                });
            return tl;
        }

        case "reveal":
            return gsap.from(targets, {
                clipPath: "inset(110% 0% -10% 0%)",
                y: 30,
                stagger,
                duration,
                delay,
                ease: "expo.out",
                ...scrollConfig,
            });

        default:
            return gsap.from(targets, {
                y: 60, opacity: 0, stagger, duration, delay, ease: "power4.out",
                ...scrollConfig,
            });
    }
}

export default function AnimatedText({
    text,
    highlightWords = [], // Default inicial
    className = "",
    as: Tag = "h1",
    delay = 0,
    duration = 0.9,
    stagger = 0.03,
    variant = "fall",
    splitBy = "chars",
    immediate = false,
    triggerStart = "top 85%",
}: Props) {
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!ref.current) return;

        const splitType = variant === "reveal" ? "lines" : splitBy;
        document.fonts.ready.then(() => {
            const split = new SplitText(ref.current, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });

            if (highlightWords.length > 0) {
                split.words.forEach((wordElement) => {
                    const cleanWord = (wordElement as HTMLElement).innerText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
                    const isMatch = highlightWords.some(h => h.toLowerCase() === cleanWord);

                    if (isMatch) {
                        wordElement.classList.add("text-fme-gold", "italic");
                    }
                });
            }

            const targets: Element[] =
                splitType === "chars" ? split.chars :
                    splitType === "words" ? split.words :
                        split.lines;

            getAnimation(
                variant,
                targets,
                delay,
                duration,
                stagger,
                ref.current,
                triggerStart,
                immediate,
            );

            return () => split.revert();
        });
    }, { scope: ref, dependencies: [text, highlightWords] });

    /* "reveal" usa clip-path en líneas; el resto (p. ej. fall con rotateX) necesita overflow visible para no cortar la animación */
    const overflowStyle = variant === "reveal" ? "hidden" : "visible";

    return (
        <Tag
            ref={ref as React.RefObject<any>}
            className={className}
            style={{ overflow: overflowStyle as "hidden" | "visible" }}
        >
            {text}
        </Tag>
    );
}