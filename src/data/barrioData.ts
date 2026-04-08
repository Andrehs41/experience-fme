export interface Barrio {
    id: number,
    src: string,
    title: string,
    size: string,
    speed: number
}

export const BARRIO_DATA: Barrio[] = [
    { id: 1, src: "/images/barrio/barrio-6.webp", title: "RESISTENCIA", size: "w-full max-w-sm md:w-[30vw] aspect-[3/4]", speed: 0.1 },
    { id: 2, src: "/images/barrio/sesion-fme-04.webp", title: "ESENCIA", size: "w-full max-w-xl md:w-[45vw] aspect-video", speed: 0.25 },
    { id: 3, src: "/images/barrio/tienda-1.webp", title: "CALLE", size: "w-full max-w-xs md:w-[25vw] aspect-[2/3]", speed: 0.15 },
    { id: 4, src: "/images/barrio/sesion-fme-07.webp", title: "FME '25", size: "w-full max-w-lg md:w-[40vw] aspect-[16/9]", speed: 0.2 },
    { id: 5, src: "/images/barrio/barrio-3.webp", title: "IDENTIDAD", size: "w-full max-w-sm md:w-[30vw] aspect-square", speed: 0.12 },
    { id: 6, src: "/images/barrio/sesion-fme-01.webp", title: "BARRIO", size: "w-full max-w-md md:w-[35vw] aspect-[4/5]", speed: 0.18 },
    { id: 7, src: "/images/barrio/tienda-5.webp", title: "COMUNIDAD", size: "w-full max-w-sm md:w-[30vw] aspect-[3/4]", speed: 0.1 },
    { id: 8, src: "/images/barrio/sesion-fme-05.webp", title: "ORIGEN", size: "w-full max-w-sm md:w-[30vw] aspect-[3/4]", speed: 0.14 },
    { id: 9, src: "/images/barrio/sesion-fme-08.webp", title: "ARCHIVO", size: "w-full max-w-xl md:w-[40vw] aspect-[4/5]", speed: 0.22 },
    { id: 10, src: "/images/barrio/barrio-2.webp", title: "CULTURA", size: "w-full max-w-xs md:w-[25vw] aspect-[2/3]", speed: 0.16 },
];
