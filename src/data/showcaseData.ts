/** Piezas destacadas para la demo Showcase (scroll cinematográfico) */
export interface ShowcasePiece {
    id: number;
    src: string;
    title: string;
    lookCode: string;
    detail: string;
    /** Texto para accesibilidad / SEO */
    alt: string;
}

export const SHOWCASE_PIECES: ShowcasePiece[] = [
    {
        id: 1,
        src: "/images/barrio/barrio-3.webp",
        title: "Silueta core",
        lookCode: "FW26 · 01",
        detail: "Corte limpio · uso diario",
        alt: "Prenda FME silueta esencial sobre fondo urbano",
    },
    {
        id: 2,
        src: "/images/barrio/tienda-1.webp",
        title: "Capa calle",
        lookCode: "FW26 · 02",
        detail: "Textura · volumen controlado",
        alt: "Look FME en calle con capa y capas",
    },
    {
        id: 3,
        src: "/images/barrio/barrio-5.webp",
        title: "Noche barrio",
        lookCode: "FW26 · 03",
        detail: "Contraste · actitud",
        alt: "Ropa FME en escena nocturna",
    },
    {
        id: 4,
        src: "/images/barrio/barrio-7.webp",
        title: "Horizonte urbano",
        lookCode: "FW26 · 04",
        detail: "Editorial · contexto real",
        alt: "Editorial FME con horizonte de ciudad",
    },
    {
        id: 5,
        src: "/images/barrio/tienda-3.webp",
        title: "Archivo vivo",
        lookCode: "FW26 · 05",
        detail: "Piezas que vuelven por demanda",
        alt: "Pieza FME en archivo de campaña",
    },
];
