import Image from "next/image";
import { CheckCircle } from "lucide-react";
import ContactSection from "@/components/sections/ContactSection";
import JsonLd from "@/components/seo/JsonLd";
import { servicePageSchema } from "@/lib/schemas";
import { buildMeta, BASE_URL } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Nosotros | Clínica Ser Humano",
  description: "Somos una institución con más de 30 años de experiencia en salud integral. Conoce nuestro equipo y enfoque humanista.",
  path: "/nosotros",
  image: `${BASE_URL}/fotos/hero-somos-nosotros.webp`,
});

const EQUIPO = [
  {
    nombre: "Dra. Sara Ochoa",
    cargo: "Directora Médico",
    especialidad: "Experta en neuromodulación.",
    foto: "/team/sara.jpg",
    objPos: "center 10%",
    zoom: 1,
  },
  {
    nombre: "Dra. Nadia Donadonibus",
    cargo: "Psicoterapeuta",
    especialidad: "Especialista en conductas adictivas y terapia de parejas.",
    foto: "/team/nadia.jpeg",
    objPos: "center 10%",
    zoom: 2,
  },
  {
    nombre: "Nat. Fabián Ochoa Palau",
    cargo: "Director General",

    especialidad: "Especialista en medicina integrativa.",
    foto: "/team/fabian.jpg",
    objPos: "center 10%",
    zoom: 1.3,
  },
];

const PILARES = [
  "Profesionales y equipo multidisciplinario capacitado para darte un abordaje completo.",
  "Avanzando constantemente en nuestros enfoques terapéuticos con los últimos avances científicos.",
  "Tratando desequilibrios físicos, psíquicos y espirituales a través de programas de salud integrativa y personalizada.",
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd data={servicePageSchema({
        name: "Nosotros · Clínica Ser Humano",
        description: "Institución con más de 30 años de experiencia en salud integral. Equipo multidisciplinario en Guayaquil, Ecuador.",
        url: "https://www.clinicaserhumano.ec/nosotros",
        image: "https://www.clinicaserhumano.ec/fotos/nosotros-hero.png",
      })} />
      {/* ── HERO ── */}
      {/* Mobile: imagen con overlay */}
      <section className="relative min-h-[520px] overflow-hidden lg:hidden">
        <Image
          src="/fotos/hero-somos-nosotros.webp"
          alt="Equipo Clínica Ser Humano"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex min-h-[520px] items-center px-6 py-24">
          <div className="max-w-lg">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
              Quiénes somos
            </span>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white">
              Logramos tu bienestar<br />de forma integral.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Donde la atención compasiva de la salud física y mental
              se encuentra con la ciencia.
            </p>
          </div>
        </div>
      </section>

      {/* Desktop: split naranja | imagen */}
      <section className="hidden lg:grid lg:grid-cols-2 lg:min-h-[600px]">
        <div className="flex items-center justify-end bg-gradient-to-br from-[#ff8c3a] via-[#ff6b12] to-[#e85d00] px-14 py-24">
          <div className="max-w-xs">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
              Quiénes somos
            </span>
            <h1 className="mt-4 text-5xl font-black leading-tight text-white">
              Logramos tu<br />bienestar de<br />forma integral.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Donde la atención compasiva de la salud física y mental
              se encuentra con la ciencia.
            </p>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/fotos/hero-somos-nosotros.webp"
            alt="Equipo Clínica Ser Humano"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* ── QUIÉNES SOMOS ── */}
      <section className="bg-[#ebece8] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>
              <span className="inline-block rounded-full bg-[#ff6b12]/15 px-4 py-1.5 text-sm font-bold text-[#ff6b12]">
                Clínica Ser Humano
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#616569] md:text-4xl">
                Más de 30 años<br />acompañando vidas.
              </h2>
              <p className="mt-5 leading-relaxed text-[#616569]/80">
                Somos una institución con más de 30 años de experiencia donde la{" "}
                <strong className="text-[#ff6b12]">atención compasiva</strong> de
                la salud física y mental se encuentra con la ciencia.
              </p>
              <p className="mt-4 leading-relaxed text-[#616569]/80">
                Nuestro objetivo es ayudarte a encontrar la mejor versión de ti
                a través de un tratamiento personalizado de salud.
              </p>

              <ul className="mt-8 space-y-4">
                {PILARES.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle size={20} className="mt-0.5 shrink-0 text-[#ff6b12]" strokeWidth={2} />
                    <span className="text-sm leading-relaxed text-[#616569]/75">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/fotos/nosotros-salaestar.png"
                alt="Sala de estar Clínica Ser Humano"
                width={900}
                height={600}
                className="h-[420px] w-full object-cover"
                style={{ objectPosition: "center center" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#ff6b12]/80 to-transparent px-6 py-6">
                <p className="text-sm font-bold text-white">Enfoque humanista</p>
                <p className="text-xs text-white/80">Medicina funcional · Neurotecnología · Acompañamiento continuo</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ENFOQUE ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-lg leading-relaxed text-[#616569]/80">
            Nuestro enfoque es humanista, basado en la{" "}
            <strong className="text-[#616569]">medicina funcional e integral</strong>,
            junto con el apoyo de la neurotecnología.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-[#616569]/80">
            Buscamos ayudar al <strong className="text-[#ff6b12]">SER HUMANO</strong>{" "}
            descubriendo la causa de base de sus problemas. Logramos la recuperación
            armónica y duradera del cuerpo y mente: nuestro enfoque holístico abarca
            todo lo que necesitas para sanar.
          </p>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="bg-[#ebece8] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#ff6b12]/15 px-4 py-1.5 text-sm font-bold text-[#ff6b12]">
              Nuestro equipo
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#616569]">
              El equipo
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {EQUIPO.map((m) => (
              <div
                key={m.nombre}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={m.foto}
                    alt={m.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: m.objPos, transform: `scale(${m.zoom ?? 1})`, transformOrigin: "center top" }}
                  />
                </div>
                <div className="border-t-2 border-[#ff6b12] p-5">
                  <p className="font-black text-[#616569]">{m.nombre}</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#ff6b12]">{m.cargo}</p>
                  <p className="mt-1 text-xs text-[#616569]/60">{m.especialidad}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-[#616569]/60">
            y otros profesionales médicos, Naturópatas, Psicólogos y Terapeutas.
          </p>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <ContactSection />
    </>
  );
}
