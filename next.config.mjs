// BUILD_TARGET=cpanel activa el modo standalone (servidor Node propio,
// sin la optimizacion de imagenes de Vercel). En Vercel esta variable
// nunca se define, asi que el build de produccion ahi no cambia.
const isCpanelBuild = process.env.BUILD_TARGET === "cpanel";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  ...(isCpanelBuild ? { output: "standalone" } : {}),
  images: {
    unoptimized: isCpanelBuild,
  },
  async headers() {
    return [
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
