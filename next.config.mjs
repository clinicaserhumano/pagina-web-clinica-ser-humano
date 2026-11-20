// BUILD_TARGET=cpanel activa el modo standalone (servidor Node propio,
// sin la optimizacion de imagenes de Vercel). En Vercel esta variable
// nunca se define, asi que el build de produccion ahi no cambia.
const isCpanelBuild = process.env.BUILD_TARGET === "cpanel";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Permite compilar en otra carpeta sin pisar la del servidor de desarrollo
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  ...(isCpanelBuild ? { output: "standalone" } : {}),
  images: {
    unoptimized: isCpanelBuild,
  },
  // clinicaserhumano.ec (sin www) → https://www.clinicaserhumano.ec (301, un solo dominio para Google)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "clinicaserhumano.ec" }],
        destination: "https://www.clinicaserhumano.ec/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Caché de 7 días para imágenes y videos de /public (antes no tenían Cache-Control).
    // Si se reemplaza un archivo, usar un nombre nuevo para que se vea al instante.
    const cacheMedia = { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" };
    return [
      ...["fotos", "logos", "og", "videos", "nadia", "neurolab", "programaser", "social", "team", "testimonios", "varios", "blog"].map(
        (dir) => ({ source: `/${dir}/:path*`, headers: [cacheMedia] }),
      ),
      {
        source: "/(.*)",
        headers: [
          // Evita que el sitio sea embebido en iframes de otros dominios
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          // Bloquea sniffing de tipo MIME
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controla la información de referencia enviada al navegar
          { key: "Referrer-Policy",        value: "strict-origin-when-cross-origin" },
          // Desactiva sensores que el sitio no necesita
          { key: "Permissions-Policy",     value: "camera=(), microphone=(), geolocation=()" },
          // Fuerza HTTPS en subsecuentes visitas (2 años)
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
