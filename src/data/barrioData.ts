export interface Barrio {
    id: number,
    src: string,
    title: string,
    size: string,
    speed: number
}

export const BARRIO_DATA: Barrio[] = [
    { id: 1, src: "/images/barrio/MINCHO4.jpg", title: "RESISTENCIA", size: "w-[30vw] aspect-[3/4]", speed: 0.1 },
    { id: 2, src: "/images/barrio/MINCHO507.jpg", title: "ESENCIA", size: "w-[45vw] aspect-video", speed: 0.25 },
    { id: 3, src: "/images/barrio/MINCHO711.jpg", title: "CALLE", size: "w-[25vw] aspect-[2/3]", speed: 0.15 },
    { id: 4, src: "/images/barrio/MINCHO751.jpg", title: "FME '25", size: "w-[40vw] aspect-[16/9]", speed: 0.2 },
    { id: 5, src: "/images/barrio/MINCHO614.jpg", title: "IDENTIDAD", size: "w-[30vw] aspect-square", speed: 0.12 },
    { id: 6, src: "/images/barrio/MINCHO663.jpg", title: "BARRIO", size: "w-[25vw] aspect-[2/3]", speed: 0.25 },
    { id: 7, src: "/images/barrio/MINCHO303.jpg", title: "MARCA", size: "w-[10vw] aspect-[16/9]", speed: 0.15 },
];