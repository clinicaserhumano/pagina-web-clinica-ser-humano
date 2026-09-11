import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { buildMeta } from "@/lib/seo";
import { SUBMARCAS, getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

export const metadata = buildMeta({
  title: "Servicios | Clínica Ser Humano",
  description:
    "Conoce los programas especializados de Clínica Ser Humano: Neuroni, NeuroLab, Psicoterapia con Nadia Donadonibus y Programa SER. Atención integral en Guayaquil.",
  path: "/servicios",
});

const DETALLE = [
  {
    slug: "neuroni",
    tagline: "Neuromodulación no invasiva",
    imagen: "/fotos/hero-neuroni4.webp",
    objPos: "center 20%",
    wa: WHATSAPP_MESSAGES.neuroni,
  },
  {
    slug: "neurolab",
    tagline: "Estimulación cognitiva sensorial",
    imagen: "/neurolab/hero.jpg",
    objPos: "center center",
    wa: WHATSAPP_MESSAGES.neurolab,
  },
  {
    slug: "nadia-donadonibus",
    tagline: "Psicoterapia individual, familiar y de pareja",
    imagen: "/fotos/hero-nadia.webp",
    objPos: "center 15%",
    wa: WHATSAPP_MESSAGES.nadia,
  },
  {
    slug: "programa-ser",
    tagline: "Acompañamiento en conductas adictivas",
    imagen: "/programaser/hero.png",
    objPos: "center center",
    wa: WHATSAPP_MESSAGES.programaser,
  },
];

const servicios = SUBMARCAS.map((s) => ({
  ...s,
  ...DETALLE.find((d) => d.slug === s.slug)!,
}));

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-brand-base">
      {/* ── HERO ── */}
      <div className="bg-brand-gray-dark">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <Reveal mode="load">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">
              Lo que hacemos
            </p>
          </Reveal>
          <Reveal mode="load" delay={0.15}>
            <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Nuestros servicios
            </h1>
          </Reveal>
          <Reveal mode="load" delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
              Cuatro programas especializados que trabajan juntos para acompañar
              tu proceso de recuperación y bienestar desde una visión integral.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── CARDS ── */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {servicios.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 0.1}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Imagen */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.imagen}
                  alt={s.nombre}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: s.objPos }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Logo sobre la imagen */}
                <div className="absolute bottom-4 left-5">
                  <Image
                    src={s.logoBlanco}
                    alt={s.nombre}
                    width={140}
                    height={50}
                    className="h-9 w-auto drop-shadow-md"
                  />
                </div>
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                    {s.tagline}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark/70">
                    {s.descripcion}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e25c08]"
                  >
                    Conocer más
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href={getWhatsappUrl(s.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-gray-dark/20 px-5 py-2.5 text-sm font-medium text-brand-gray-dark/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    Consultar
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA inferior */}
        <Reveal className="mt-16 rounded-3xl bg-brand-orange px-8 py-12 text-center">
          <h2 className="text-2xl font-black text-white md:text-3xl">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">
            Escríbenos y te orientamos hacia el programa que mejor se adapta a lo que necesitas.
          </p>
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-brand-orange transition-colors hover:bg-white/90"
          >
            Hablar con nosotros
            <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </div>
  );
}
