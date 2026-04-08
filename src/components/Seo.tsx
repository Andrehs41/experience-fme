// src/components/Seo.tsx
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://storefme.com";
const DEFAULT_IMAGE = "/images/fme-hero.webp";

interface SeoProps {
    /** Título de la página. Si no incluye "FME" se agrega como sufijo. */
    title: string;
    /** Descripción para Google y redes (140-160 caracteres ideal). */
    description: string;
    /** Ruta canónica, ej: "/barrio". Si se omite no se agrega canonical. */
    canonical?: string;
    /** Imagen OG/Twitter. Ruta desde /public, ej: "/images/fme-hero.webp". */
    ogImage?: string;
    /** Tipo OG. Por defecto "website". */
    ogType?: "website" | "article";
    /** Palabras clave adicionales (opcional). */
    keywords?: string;
    /** Desindexar la página. */
    noIndex?: boolean;
}

export default function Seo({
    title,
    description,
    canonical,
    ogImage = DEFAULT_IMAGE,
    ogType = "website",
    keywords,
    noIndex = false,
}: SeoProps) {
    const fullTitle = title.includes("FME") ? title : `${title} | FME`;
    const absoluteImage = `${SITE_URL}${ogImage}`;
    const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

    return (
        <Helmet>
            {/* Título */}
            <title>{fullTitle}</title>

            {/* SEO básico */}
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" content={absoluteImage} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:locale" content="es_CO" />
            <meta property="og:site_name" content="FME" />

            {/* Twitter / X */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absoluteImage} />
        </Helmet>
    );
}
