import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ServiciosPorArea from "@/components/sections/ServiciosPorArea";
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
    imagen: "/neurolab/hero.webp",
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
    imagen: "/programaser/hero.webp",
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
      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-orange to-brand-human">
        {/* Formas decorativas */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/10" />
        <div aria-hidden className="pointer-events-none absolute right-[18%] top-[60%] h-24 w-24 rounded-full border-2 border-white/20" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <Reveal mode="load">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Lo que hacemos
            </span>
          </Reveal>
          <Reveal mode="load" delay={0.15}>
            <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">
              Nuestros servicios
            </h1>
          </Reveal>
          <Reveal mode="load" delay={0.3}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              Programas especializados que trabajan juntos para acompañar tu proceso
              de recuperación y bienestar desde una visión integral.
            </p>
          </Reveal>
          <Reveal mode="load" delay={0.45}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#programas"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-base"
              >
                Ver programas
              </a>
              <a
                href="#todos-los-servicios"
                className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
              >
                Todos los servicios
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. TARJETAS DE SERVICIOS (programas) ── */}
      <section id="programas" className="scroll-mt-24 bg-brand-base">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Nuestros programas
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-gray-dark md:text-4xl">
              Cuatro especialidades, un mismo enfoque
            </h2>
          </Reveal>

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
                <div className="flex flex-1 flex-col gap-4 p-7">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">
                      {s.tagline}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark/70">
                      {s.descripcion}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 pt-2">
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
        </div>
      </section>

      {/* ── 3. TODOS LOS SERVICIOS (por área) ── */}
      <section id="todos-los-servicios" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Catálogo completo
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-gray-dark md:text-4xl">
              Todos nuestros servicios
            </h2>
            <p className="mt-3 text-sm text-brand-gray-dark/70">
              Organizados por área de acompañamiento, para que encuentres lo que necesitas.
            </p>
          </Reveal>
          <ServiciosPorArea />
        </div>
      </section>

      {/* ── 4. LLAMADA A LA ACCIÓN ── */}
      <section className="bg-brand-gray-dark">
        <Reveal className="mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
          <h2 className="text-3xl font-black text-white md:text-4xl">
            ¿No sabes por dónde empezar?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/75">
            Escríbenos y te orientamos hacia el programa que mejor se adapta a lo que necesitas.
          </p>
          <a
            href={getWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-white transition-colors hover:bg-[#e25c08]"
          >
            Hablar con nosotros
            <ArrowRight size={18} />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
