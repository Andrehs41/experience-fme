import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

interface Options {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
}

export function useScrollAnimation(selector: string, options: Options = {}) {
    const container = useRef<HTMLDivElement>(null);

    const {
        y = 60,
        opacity = 0,
        duration = 0.9,
        stagger = 0.12,
        start = "top 80%",
    } = options;

    useGSAP(() => {
        gsap.from(selector, {
            y,
            opacity,
            duration,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container.current,
                start,
                toggleActions: "play none none reverse",
            },
        });
    }, { scope: container });

    return container;
}