import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Users, Star, Phone, Mail } from "lucide-react";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Proyecto Renacer | Responsabilidad Social | Clínica Ser Humano",
  description:
    "Fundación Ser Humano — programa de prevención y recuperación para personas en situación de desequilibrio existencial, con tratamiento psicoeducacional y neurológico en Guayaquil.",
  path: "/responsabilidad-social/proyecto-renacer",
});

// Colores del logo Proyecto Renacer
// Teal: #1A9B8A  |  Índigo/morado oscuro: #2E2A72  |  Morado claro: #7B5EA7

const VALORES = ["Honestidad", "Integridad", "Coherencia", "Humildad", "Amor"];

const ESTADISTICAS = [
  { valor: "50%", etiqueta: "reducción del deseo de consumo en 6 días" },
  { valor: "80%", etiqueta: "disminución de recaídas" },
  { valor: "400+", etiqueta: "personas atendidas anualmente" },
  { valor: "2007", etiqueta: "año de fundación" },
];

const FOTOS = [
  "/social/20191222_113326.webp",
  "/social/20191222_121102.webp",
  "/social/20191026_100428.webp",
  "/social/20191026_100511.webp",
  "/social/20191013_112805.jpg",
  "/social/20190920_153501.webp",
  "/social/20190920_153457.webp",
  "/social/20191222_110757.webp",
  "/social/IMG-20191222-WA0003-01.webp",
  "/social/IMG-20191222-WA0012-01.webp",
];

const PROGRAMAS = [
  {
    icono: <Heart size={24} />,
    titulo: "Tratamiento psicoeducacional",
    descripcion:
      "Abordaje integral que combina educación emocional, terapia grupal e individual para la recuperación de conductas adictivas.",
  },
  {
    icono: <Star size={24} />,
    titulo: "Estimulación neurológica",
    descripcion:
      "Tratamiento mediante estimulación eléctrica transcraneal para reparar el daño al sistema nervioso central causado por el consumo.",
  },
  {
    icono: <Users size={24} />,
    titulo: "Empoderamiento familiar",
    descripcion:
      "Acompañamiento y formación a las familias para fortalecer la red de apoyo en el proceso de recuperación.",
  },
  {
    icono: <ArrowRight size={24} />,
    titulo: "Reinserción social",
    descripcion:
      "Programas de capacitación y seguimiento para facilitar el retorno del individuo a su familia y entorno laboral.",
  },
  {
    icono: <Star size={24} />,
    titulo: "Formación comunitaria",
    descripcion:
      "Talleres, charlas y diplomados para comunidades, instituciones y organizaciones que trabajan con poblaciones vulnerables.",
  },
  {
    icono: <Heart size={24} />,
    titulo: "Modelo de apadrinamiento",
    descripcion:
      "Sistema de donaciones y patrocinio que permite atender a personas de escasos recursos sin costo para ellas.",
  },
];

export default function ProyectoRenacerPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f0" }}>

      {/* ── HERO ── */}
      <section className="relative flex min-h-[520px] items-end overflow-hidden" style={{ backgroundColor: "#2E2A72" }}>
        <div className="absolute inset-0">
          <Image
            src="/social/20191222_113326.webp"
            alt="Proyecto Renacer"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #2E2A72 40%, #2E2A72aa 70%, transparent)" }} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-16">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logos/proyecto-renacer.webp"
              alt="Proyecto Renacer"
              width={220}
              height={70}
              className="h-14 w-auto brightness-0 invert"
            />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: "#1A9B8A" }}>
            <Heart size={12} />
            Responsabilidad Social · Fundación Ser Humano
          </span>
          <h1 className="mt-4 text-5xl font-black text-white md:text-6xl">
            Rescatando vidas<br />
            <span style={{ color: "#1A9B8A" }}>desde 2007</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
            Programa de prevención y recuperación con tratamiento psicoeducacional
            y neurológico para comunidades vulnerables de Guayaquil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://proyectorenacerec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A9B8A" }}
            >
              Visitar sitio web
              <ArrowRight size={15} />
            </a>
            <Link
              href="/responsabilidad-social"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
            >
              ← Volver
            </Link>
          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ── */}
      <section style={{ backgroundColor: "#1A9B8A" }}>
        <div className="mx-auto grid max-w-4xl grid-cols-2 md:grid-cols-4">
          {ESTADISTICAS.map((e) => (
            <div key={e.etiqueta} className="px-6 py-8 text-center">
              <p className="text-4xl font-black text-white">{e.valor}</p>
              <p className="mt-1 text-xs leading-snug text-white/80">{e.etiqueta}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1A9B8A" }}>
                Quiénes somos
              </p>
              <h2 className="mt-3 text-3xl font-black md:text-4xl" style={{ color: "#2E2A72" }}>
                Fundación Ser Humano
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-gray-dark/70">
                Somos una organización de interés humanista existencial fundada
                mediante Acuerdo Ministerial del Ministerio de Salud del Ecuador
                N.° 493, el 28 de agosto del 2007.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-gray-dark/70">
                Trabajamos con un enfoque innovador que combina terapia
                psicoeducacional y estimulación neurológica por estimulación
                eléctrica transcraneal, abordando el daño que las sustancias
                causan en el sistema nervioso central.
              </p>
              <p className="mt-4 text-base leading-relaxed text-brand-gray-dark/70">
                Ecuador ocupa el primer lugar mundial en consumo de heroína
                entre jóvenes según la OMS. Frente a esa realidad, Proyecto
                Renacer ofrece una alternativa real y accesible para las
                comunidades más vulnerables de Guayaquil.
              </p>
            </div>
            <div className="relative h-80 overflow-hidden rounded-3xl md:h-96">
              <Image
                src="/social/20191026_100428.webp"
                alt="Equipo Proyecto Renacer"
                fill
                className="object-cover object-center"
              />
              {/* Logo overlay */}
              <div className="absolute bottom-4 left-4 rounded-xl bg-white/90 p-3 backdrop-blur-sm">
                <Image
                  src="/logos/proyecto-renacer.webp"
                  alt="Proyecto Renacer"
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISIÓN ── */}
      <section className="py-20" style={{ backgroundColor: "#2E2A72" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white" style={{ backgroundColor: "#1A9B8A" }}>
            <Star size={14} />
            Nuestra misión
          </span>
          <blockquote className="mt-8 text-xl font-bold leading-relaxed text-white md:text-2xl">
            &ldquo;Contribuir a la prevención y atención de los seres humanos en
            situación de desequilibrio existencial a través de programas de
            salud integral — cuerpo, psique y espíritu — que les permitan
            reinsertarse en la familia y la sociedad.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1A9B8A" }}>
            Lo que nos guía
          </p>
          <h2 className="mt-3 text-3xl font-black" style={{ color: "#2E2A72" }}>
            Nuestros valores
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {VALORES.map((v) => (
              <span
                key={v}
                className="rounded-full px-6 py-3 text-base font-semibold text-white"
                style={{ backgroundColor: "#2E2A72" }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMAS ── */}
      <section className="py-20" style={{ backgroundColor: "#f0f2f0" }}>
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1A9B8A" }}>
            Lo que hacemos
          </p>
          <h2 className="mt-3 text-3xl font-black" style={{ color: "#2E2A72" }}>
            Programas y servicios
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMAS.map((prog) => (
              <div key={prog.titulo} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: "#1A9B8A" }}>
                  {prog.icono}
                </div>
                <h3 className="text-base font-bold" style={{ color: "#2E2A72" }}>
                  {prog.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark/70">
                  {prog.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#1A9B8A" }}>
            Nuestra labor
          </p>
          <h2 className="mt-3 text-3xl font-black" style={{ color: "#2E2A72" }}>
            Galería
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {FOTOS.map((foto, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <Image
                  src={foto}
                  alt={`Proyecto Renacer - actividad ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ backgroundColor: "#2E2A72" }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Image
            src="/logos/proyecto-renacer.webp"
            alt="Proyecto Renacer"
            width={180}
            height={58}
            className="mx-auto mb-8 h-12 w-auto brightness-0 invert"
          />
          <h2 className="text-3xl font-black text-white md:text-4xl">
            Apoya Proyecto Renacer
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
            Tu apoyo transforma vidas. Puedes contribuir como apadrinador,
            voluntario o aliado institucional.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://proyectorenacerec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1A9B8A" }}
            >
              Visitar sitio oficial
              <ArrowRight size={15} />
            </a>
            <a
              href="mailto:info@proyectorenacerec.org"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              <Mail size={15} />
              info@proyectorenacerec.org
            </a>
            <a
              href="tel:+5930997217831"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              <Phone size={15} />
              +593 099 721 7831
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}