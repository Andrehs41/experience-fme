export interface ComunidadMember {
    id: number;
    src: string;
    name: string;
    collection: string;
    date: string;
    ratio: string;
}

export const COMUNIDAD_DATA: ComunidadMember[] = [
    {
        id: 1,
        src: "/images/barrio/tienda-5.webp",
        name: "Sebastián M.",
        collection: "Hoodie Vol.1",
        date: "Ene 2025",
        ratio: "3/4",
    },
    {
        id: 2,
        src: "/images/barrio/tienda-2.webp",
        name: "Valentina R.",
        collection: "Tee Essential",
        date: "Feb 2025",
        ratio: "1/1",
    },
    {
        id: 3,
        src: "/images/barrio/barrio-3.webp",
        name: "Camilo T.",
        collection: "Cargo Vol.2",
        date: "Feb 2025",
        ratio: "2/3",
    },
    {
        id: 4,
        src: "/images/barrio/barrio-2.webp",
        name: "Daniela P.",
        collection: "Hoodie Barrio",
        date: "Mar 2025",
        ratio: "4/3",
    },
    {
        id: 5,
        src: "/images/barrio/persona-2.webp",
        name: "Felipe A.",
        collection: "SS25 Drop",
        date: "Mar 2025",
        ratio: "3/4",
    },
    {
        id: 6,
        src: "/images/barrio/barrio-1.webp",
        name: "Laura G.",
        collection: "Pants Essential",
        date: "Abr 2025",
        ratio: "2/3",
    }
];