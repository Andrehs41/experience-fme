export interface Coleccion {
    id: number;
    type: "person" | "product" | "scene";
    src: string;
    title: string;
    size: string;
    top: string;
    left: string;
    z: number;
    /** Código editorial lookbook */
    lookCode?: string;
}

export const ITEMS: Coleccion[] = [
    { id: 1,  type: "person",  src: "/images/barrio/sesion-fme-04.webp", title: "Esencia",    size: "w-[400px]", top: "10%",   left: "5%",  z: 50 },
    { id: 2,  type: "scene",   src: "/images/barrio/barrio-2.webp",       title: "Calles",     size: "w-[600px]", top: "5%",    left: "40%", z: 10 },
    { id: 3,  type: "product", src: "/images/barrio/sesion-fme-07.webp",  title: "Pieza core", size: "w-[250px]", top: "30%",   left: "25%", z: 80 },
    { id: 4,  type: "scene",   src: "/images/barrio/barrio-4.webp",       title: "Noche",      size: "w-[500px]", top: "50%",   left: "5%",  z: 20 },
    { id: 5,  type: "person",  src: "/images/barrio/sesion-fme-01.webp",  title: "Actitud",    size: "w-[350px]", top: "45%",   left: "60%", z: 60 },
    { id: 6,  type: "product", src: "/images/barrio/sesion-fme-05.webp",  title: "Drop 01",    size: "w-[200px]", top: "15%",   left: "80%", z: 90 },
    { id: 7,  type: "scene",   src: "/images/barrio/barrio-1.webp",       title: "Horizonte",  size: "w-[800px]", top: "70%",   left: "30%", z: 5  },
    { id: 8,  type: "person",  src: "/images/barrio/sesion-fme-08.webp",  title: "Identidad",  size: "w-[450px]", top: "10%",   left: "20%", z: 55 },
    { id: 9,  type: "product", src: "/images/barrio/sesion-fme-02.webp",  title: "Limited",    size: "w-[300px]", top: "80%",   left: "70%", z: 85 },
    { id: 10, type: "scene",   src: "/images/barrio/barrio-2.webp",       title: "Contraste",  size: "w-[400px]", top: "40%",   left: "85%", z: 15 },
    { id: 11, type: "person",  src: "/images/barrio/sesion-fme-03.webp",  title: "Barrio",     size: "w-[380px]", top: "85%",   left: "10%", z: 70 },
    { id: 12, type: "product", src: "/images/barrio/sesion-fme-06.webp",  title: "Archivo",    size: "w-[220px]", top: "65%",   left: "90%", z: 95 },
    { id: 13, type: "scene",   src: "/images/barrio/barrio-5.webp",       title: "Amanecer",   size: "w-[700px]", top: "-10%",  left: "70%", z: 8  },
    { id: 14, type: "person",  src: "/images/barrio/barrio-2.webp",       title: "Crudo",      size: "w-[420px]", top: "105%",  left: "40%", z: 65 },
    { id: 15, type: "product", src: "/images/barrio/sesion-fme-04.webp",  title: "Essential",  size: "w-[280px]", top: "25%",   left: "0%",  z: 75 },
];

/** Looks del lookbook horizontal (ritmo editorial) */
export const LOOKBOOK_ITEMS: Coleccion[] = ITEMS.slice(0, 10).map((item, i) => ({
    ...item,
    lookCode: `FW26 · ${String(i + 1).padStart(2, "0")}`,
}));
