import { MetadataRoute } from "next";
import { query } from "@/lib/db";

const BASE = "https://www.clinicaserhumano.ec";

// Se regenera cada hora para incluir los artículos nuevos del blog
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                    priority: 1.0, changeFrequency: "weekly"  },
    { url: `${BASE}/nosotros`,                      priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/novedades`,                     priority: 0.8, changeFrequency: "weekly"  },
    { url: `${BASE}/servicios`,                     priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/servicios/neuromodulacion`,     priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/servicios/neurolab`,            priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/servicios/nadia-donadonibus`,   priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/servicios/programa-ser`,        priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/responsabilidad-social`,                        priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/responsabilidad-social/proyecto-renacer`,      priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/politica-de-privacidad`,        priority: 0.3, changeFrequency: "yearly"  },
    { url: `${BASE}/terminos-y-condiciones`,        priority: 0.3, changeFrequency: "yearly"  },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const data = await query<{ slug: string; creado_en: string }>(
      "SELECT slug, creado_en FROM entradas_blog WHERE publicado = 1"
    );

    if (data) {
      blogRoutes = data.map((post) => ({
        url: `${BASE}/novedades/${post.slug}`,
        lastModified: new Date(post.creado_en),
        priority: 0.7,
        changeFrequency: "monthly",
      }));
    }
  } catch {
    // Si la base de datos falla, el sitemap se genera sin artículos
  }

  return [...staticRoutes, ...blogRoutes];
}