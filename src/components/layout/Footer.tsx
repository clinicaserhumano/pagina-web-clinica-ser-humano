import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SOCIAL_LINKS, SUBMARCAS } from "@/lib/constants";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const ICON_PATHS = {
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.74 3.74 0 0 1-1.38-.9 3.74 3.74 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07Zm0 3.51a6.33 6.33 0 1 0 0 12.66 6.33 6.33 0 0 0 0-12.66Zm0 10.44a4.11 4.11 0 1 1 0-8.22 4.11 4.11 0 0 1 0 8.22Zm6.41-10.7a1.48 1.48 0 1 1-2.96 0 1.48 1.48 0 0 1 2.96 0Z",
  facebook:
    "M13.5 21v-7.7h2.6l.4-3h-3v-1.93c0-.87.24-1.46 1.5-1.46h1.6V4.2c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.04v2.2H7.7v3h2.6V21h3.2Z",
  linkedin:
    "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.45 20v-6.4c0-3.43-1.83-5.03-4.27-5.03a3.7 3.7 0 0 0-3.33 1.83h-.05V8.5H9.59c.05 1.02 0 11.5 0 11.5h3.21v-6.43c0-.34.02-.68.13-.92.28-.68.91-1.39 1.97-1.39 1.39 0 1.94 1.06 1.94 2.6V20h3.61Z",
  youtube:
    "M21.58 7.2c-.23-.86-.9-1.53-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.53.9-1.76 1.76C2 8.77 2 12 2 12s0 3.23.42 4.8c.23.86.9 1.53 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.82-.44a2.4 2.4 0 0 0 1.76-1.76C22 15.23 22 12 22 12s0-3.23-.42-4.8ZM10 15.5v-7l6 3.5-6 3.5Z",
  tiktok:
    "M16.6 5.82a4.28 4.28 0 0 1-2.6-1.06v8.84a5.32 5.32 0 1 1-4.58-5.27v2.7a2.6 2.6 0 1 0 1.83 2.48V2h2.55a4.28 4.28 0 0 0 4.05 3.78z",
};

export default function Footer() {
  return (
    <footer className="bg-[#616569] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/logos/clinica2.webp"
              alt="Clínica Ser Humano"
              width={170}
              height={63}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Acompañamos el regreso al equilibrio desde una visión humana e integral de la salud.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-white/50">
              Navegación
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/80 hover:text-brand-human">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide text-white/50">
              Síguenos
            </h3>
            <div className="mt-4 flex gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-brand-human">
                <SocialIcon path={ICON_PATHS.instagram} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-brand-human">
                <SocialIcon path={ICON_PATHS.facebook} />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/80 hover:text-brand-human">
                <SocialIcon path={ICON_PATHS.tiktok} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/80 hover:text-brand-human">
                <SocialIcon path={ICON_PATHS.linkedin} />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/80 hover:text-brand-human">
                <SocialIcon path={ICON_PATHS.youtube} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-10">
          <h3 className="text-sm font-medium uppercase tracking-wide text-white/50">
            Nuestro ecosistema
          </h3>
          <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6">
            {SUBMARCAS.map((marca) => (
              <Image
                key={marca.slug}
                src={marca.logoBlanco}
                alt={marca.nombre}
                width={140}
                height={52}
                className="h-8 w-auto opacity-90"
              />
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 flex flex-col items-center gap-2 text-center text-xs text-white/60">
          <div className="flex gap-4">
            <Link href="/politica-de-privacidad" className="hover:text-white/90 underline underline-offset-2">
              Política de Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terminos-y-condiciones" className="hover:text-white/90 underline underline-offset-2">
              Términos y Condiciones
            </Link>
          </div>
          © 2026 Fundación Ser Humano SERUNO. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
