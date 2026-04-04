export interface Barrio {
    id: number,
    src: string,
    title: string,
    size: string,
    speed: number
}

export const BARRIO_DATA: Barrio[] = [
    { id: 1, src: "/images/barrio/barrio-6.jpeg", title: "RESISTENCIA", size: "w-full max-w-sm md:w-[30vw] aspect-[3/4]", speed: 0.1 },
    { id: 2, src: "/images/barrio/barrio-7.jpeg", title: "ESENCIA", size: "w-full max-w-xl md:w-[45vw] aspect-video", speed: 0.25 },
    { id: 3, src: "/images/barrio/tienda-1.jpeg", title: "CALLE", size: "w-full max-w-xs md:w-[25vw] aspect-[2/3]", speed: 0.15 },
    { id: 4, src: "/images/barrio/tienda-2.jpeg", title: "FME '25", size: "w-full max-w-lg md:w-[40vw] aspect-[16/9]", speed: 0.2 },
    { id: 5, src: "/images/barrio/tienda-3.jpeg", title: "IDENTIDAD", size: "w-full max-w-sm md:w-[30vw] aspect-square", speed: 0.12 },
    { id: 6, src: "/images/barrio/tienda-4.jpeg", title: "BARRIO", size: "w-full max-w-md md:w-[35vw] aspect-[4/5]", speed: 0.18 },
    { id: 7, src: "/images/barrio/tienda-5.jpeg", title: "COMUNIDAD", size: "w-full max-w-sm md:w-[30vw] aspect-[3/4]", speed: 0.1 },
];