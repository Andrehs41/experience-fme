export interface Barrio {
    id: number,
    src: string,
    title: string,
    size: string,
    speed: number
}

export const BARRIO_DATA: Barrio[] = [
    { id: 1, src: "/images/barrio-1.jpeg", title: "RESISTENCIA", size: "w-[30vw] aspect-[3/4]", speed: 0.1 },
    { id: 2, src: "/images/barrio-2.jpeg", title: "ESENCIA", size: "w-[45vw] aspect-video", speed: 0.25 },
    { id: 3, src: "/images/barrio-3.jpeg", title: "CALLE", size: "w-[25vw] aspect-[2/3]", speed: 0.15 },
    { id: 4, src: "/images/barrio-4.jpeg", title: "FME '25", size: "w-[40vw] aspect-[16/9]", speed: 0.2 },
    { id: 5, src: "/images/barrio-5.jpeg", title: "IDENTIDAD", size: "w-[30vw] aspect-square", speed: 0.12 },
];