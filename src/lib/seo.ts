export const BASE_URL = "https://www.clinicaserhumano.ec";
export const SITE_NAME = "Clínica Ser Humano";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/fotos/hero-somos-nosotros.webp`;

export function buildMeta({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}) {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_EC",
      type: "website" as const,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image],
    },
  };
}
