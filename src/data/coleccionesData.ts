export interface Coleccion {
    id: number,
    type: "person" | "product" | "scene",
    src: string,
    title: string,
    size: string,
    top: string,
    left: string,
    z: number
}

export const ITEMS: Coleccion[] = [
    { id: 1, type: "person", src: "/images/barrio/barrio-1.jpeg", title: "Esencia", size: "w-[400px]", top: "10%", left: "5%", z: 50 },
    { id: 2, type: "scene", src: "/images/barrio/barrio-2.jpeg", title: "Eseencia", size: "w-[600px]", top: "5%", left: "40%", z: 10 },
    { id: 3, type: "product", src: "/images/barrio/barrio-3.jpeg", title: "Producto", size: "w-[250px]", top: "30%", left: "25%", z: 80 },
    { id: 4, type: "scene", src: "/images/barrio/barrio-4.jpeg", title: "Escena", size: "w-[500px]", top: "50%", left: "5%", z: 20 },
    { id: 5, type: "person", src: "/images/barrio/barrio-5.jpeg", title: "Persona", size: "w-[350px]", top: "45%", left: "60%", z: 60 },
    { id: 6, type: "product", src: "/images/barrio/barrio-6.jpeg", title: "Producto", size: "w-[200px]", top: "15%", left: "80%", z: 90 },
    { id: 7, type: "scene", src: "/images/barrio/barrio-7.jpeg", title: "Escena", size: "w-[800px]", top: "70%", left: "30%", z: 5 },
    { id: 8, type: "person", src: "/images/barrio/barrio-1.jpeg", title: "Persona", size: "w-[450px]", top: "10%", left: "20%", z: 55 },
    { id: 9, type: "product", src: "/images/barrio/barrio-2.jpeg", title: "Producto", size: "w-[300px]", top: "80%", left: "70%", z: 85 },
    { id: 10, type: "scene", src: "/images/barrio/barrio-3.jpeg", title: "Escena", size: "w-[400px]", top: "40%", left: "85%", z: 15 },
    { id: 11, type: "person", src: "/images/barrio/barrio-4.jpeg", title: "Persona", size: "w-[380px]", top: "85%", left: "10%", z: 70 },
    { id: 12, type: "product", src: "/images/barrio/barrio-5.jpeg", title: "Producto", size: "w-[220px]", top: "65%", left: "90%", z: 95 },
    { id: 13, type: "scene", src: "/images/barrio/barrio-6.jpeg", title: "Escena", size: "w-[700px]", top: "-10%", left: "70%", z: 8 },
    { id: 14, type: "person", src: "/images/barrio/barrio-7.jpeg", title: "Persona", size: "w-[420px]", top: "105%", left: "40%", z: 65 },
    { id: 15, type: "product", src: "/images/barrio/barrio-6.jpeg", title: "Producto", size: "w-[280px]", top: "25%", left: "0%", z: 75 },
];