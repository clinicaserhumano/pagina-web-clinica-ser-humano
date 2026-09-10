import Image from "next/image";
import { CheckCircle, Eye, Heart, Shield, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactSection from "@/components/sections/ContactSection";
import { getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { servicePageSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { buildMeta, BASE_URL } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Programa SER Libre | Conductas Adictivas · Clínica Ser Humano",
  description: "Day Hospital y Afterwork para superar conductas adictivas sin encierro, sin psicofármacos. Único programa de Full Immersion en Ecuador.",
  path: "/servicios/programa-ser",
  image: `${BASE_URL}/programaser/hero.png`,
});

const ETAPAS = [
  {
    label: "Evaluación y Diagnóstico",
    color: "bg-brand-orange",
    items: [
      "Historia clínica médica (obligatorio)",
      "Valoración Psicológica",
      "BioScan + Informe",
    ],
  },
  {
    label: "Plan de Terapias",
    color: "bg-brand-salmon",
    items: [
      "Detox físico / mental",
      "Desensibilización a la crisis",
      "Gimnasia Psicofísica",
      "Entrenamiento de autocontrol mental",
      "Plan Nutricional",
      "Reequilibrio del sistema nervioso",
      "Medicamentos biológicos y ortomoleculares",
    ],
  },
  {
    label: "Seguimiento",
    color: "bg-[#c94a32]",
    items: [
      "Prevención de recaídas",
      "Integración de la personalidad",
      "Neuromodulación del sistema nervioso",
    ],
  },
  {
    label: "Mantenimiento",
    color: "bg-ser-gray",
    items: ["Desarrollo de la inteligencia emocional y el sentido de la vida"],
  },
];

const PILARES = [
  {
    icon: Shield,
    titulo: "Ambulatorio",
    subtitulo: "Sin hospitalización",
  },
  {
    icon: Heart,
    titulo: "Sin psicofármacos",
    subtitulo: "Tratamiento natural y tecnológico",
  },
  {
    icon: Eye,
    titulo: "Reservado",
    subtitulo: "Privacidad garantizada para ejecutivos",
  },
  {
    icon: Users,
    titulo: "Humanista Integral",
    subtitulo: "Persona, mente y cuerpo",
  },
];

const BENEFICIOS = [
  "Sin encierro",
  "Sin psicofármacos",
  "Horarios after office: lunes a jueves de 17h00 a 21h30",
];

export default function ProgramaSERPage() {
  const waUrl = getWhatsappUrl(WHATSAPP_MESSAGES.programaser);

  return (
    <>
      <JsonLd data={servicePageSchema({
        name: "Programa SER Libre · Conductas Adictivas",
        description: "Day Hospital y Afterwork para superar conductas adictivas sin encierro ni psicofármacos. Único programa de Full Immersion en Ecuador.",
        url: "https://www.clinicaserhumano.ec/servicios/programa-ser",
        image: "https://www.clinicaserhumano.ec/programaser/hero.png",
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio",    url: "https://www.clinicaserhumano.ec" },
        { name: "Servicios", url: "https://www.clinicaserhumano.ec/servicios" },
        { name: "Programa SER Libre", url: "https://www.clinicaserhumano.ec/servicios/programa-ser" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "¿Qué es el Programa SER Libre?", a: "Es el único programa de Full Immersion en Ecuador para superar conductas adictivas sin encierro. Combina modalidad Day Hospital (horario diurno) y Afterwork (horario after office), permitiendo al paciente mantener su vida laboral durante el tratamiento." },
        { q: "¿Qué conductas adictivas trata el Programa SER?", a: "El programa aborda adicciones a sustancias (alcohol, drogas), conductas compulsivas y otras dependencias comportamentales, con un enfoque integral que incluye detox, terapia psicoeducacional y neuromodulación." },
        { q: "¿Se puede seguir trabajando durante el tratamiento?", a: "Sí. La modalidad Afterwork está diseñada específicamente para personas que necesitan mantener sus actividades laborales. Las sesiones se realizan en horario compatible con la jornada de trabajo." },
        { q: "¿El programa usa psicofármacos?", a: "No. El Programa SER Libre trabaja sin psicofármacos convencionales, utilizando medicamentos biológicos y ortomoleculares junto con neuromodulación y terapia psicoeducacional para la recuperación." },
      ])} />
      {/* ── HERO ── */}
      <section className="relative min-h-[580px] overflow-hidden lg:min-h-[660px]">
        <Image
          src="/programaser/hero.png"
          alt="Programa SER - Recuperación integral"
          fill
          priority
          className="object-cover object-[center_20%] lg:object-center"
        />
        {/* Móvil: degradado de abajo hacia arriba */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#c94a32]/95 via-[#e96854]/70 to-[#ff6b12]/20 lg:hidden" />
        {/* Desktop: degradado izquierda → transparente */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#c94a32]/92 from-[0%] via-[#e96854]/60 via-[45%] to-transparent to-[72%] lg:block" />

        <div className="relative z-10 mx-auto flex min-h-[580px] max-w-6xl items-center px-6 py-24 lg:min-h-[660px]">
          <div className="max-w-lg">
            <Image
              src="/logos/programaser3.png"
              alt="Programa SER"
              width={3385}
              height={1243}
              priority
              className="mb-6 h-auto w-48"
            />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/80">
              Day Hospital · Afterwork · Full Immersion
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
              Cómo superar<br />las dependencias.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              El único programa de inmersión ambulatoria integral en Ecuador.
              Sin internación, sin psicofármacos, con resultados sostenibles.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-white !text-brand-orange hover:!bg-white/90"
              >
                Separa tu cita
              </Button>
              <span className="flex items-center rounded-full border-2 border-white/60 px-5 py-2 text-sm font-medium text-white">
                🇪🇨 Único en Ecuador
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROPUESTA DE VALOR ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-wide text-ser-gray">
            Nuestra propuesta de valor
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.titulo} className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                    <Icon size={30} className="text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="font-bold uppercase tracking-wide text-ser-gray">{p.titulo}</p>
                  <p className="text-sm text-ser-gray/70">{p.subtitulo}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ETAPAS ── */}
      <section className="relative overflow-hidden bg-brand-base pb-0 pt-16 lg:min-h-[820px]">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-ser-gray">
            Etapas
          </h2>
          <div className="lg:pr-[460px]">
            <div className="flex flex-col gap-5 pb-10">
              {ETAPAS.map((etapa) => (
                <div key={etapa.label} className="flex gap-4">
                  {/* Flecha etiqueta */}
                  <div
                    className={`${etapa.color} flex min-w-[170px] max-w-[170px] items-center justify-center px-3 py-3 text-center text-sm font-bold uppercase leading-tight text-white`}
                    style={{
                      clipPath: "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)",
                    }}
                  >
                    {etapa.label}
                  </div>
                  {/* Contenido */}
                  <div className="flex-1 rounded-xl bg-white px-5 py-4 shadow-sm">
                    <ul className="flex flex-col gap-1">
                      {etapa.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-ser-gray">
                          <span className="mt-0.5 text-brand-orange">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Faro — tamaño controlado por altura, no por ancho */}
        <div className="pointer-events-none absolute bottom-16 right-6 z-10 hidden lg:block xl:right-12">
          <Image
            src="/varios/faro.png"
            alt="Faro - guía hacia la recuperación"
            width={456}
            height={683}
            className="w-auto drop-shadow-2xl"
            style={{
              height: 620,
              maskImage: "linear-gradient(to right, transparent 0%, black 36%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 36%)",
            }}
          />
        </div>

        {/* Loma decorativa */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-36 w-full md:h-44"
          viewBox="0 0 1200 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lomaGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b12" />
              <stop offset="100%" stopColor="#ffc66b" />
            </linearGradient>
          </defs>
          <path
            d="M0,220 L0,190 C200,165 380,180 560,140 C760,96 920,120 1200,40 L1200,220 Z"
            fill="url(#lomaGrad)"
          />
        </svg>
      </section>

      {/* ── DAY HOSPITAL ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Image
                src="/logos/programaser.png"
                alt="Programa SER"
                width={1514}
                height={558}
                className="mb-4 h-auto w-48"
              />
              <h2 className="text-3xl font-bold text-ser-gray">Day Hospital</h2>
              <div className="mt-1 h-1 w-16 rounded bg-brand-orange" />
              <p className="mt-5 text-ser-gray/80">
                Recupera el control sin detener tu rutina. El Programa SER Day Hospital está diseñado
                para quienes desean superar ansiedad, dependencias o desgaste emocional sin dejar su
                vida laboral. Un enfoque integral, ambulatorio y confidencial que trabaja desde la raíz
                para lograr cambios reales y sostenibles.
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {BENEFICIOS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ser-gray">
                    <CheckCircle size={16} className="shrink-0 text-brand-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-ser-gray/70">
                No es solo dejar un hábito… es volver a tener control sobre tu vida.
              </p>
              <div className="mt-6">
                <Button href={waUrl} target="_blank" rel="noopener noreferrer" size="md">
                  Separa tu cita
                </Button>
              </div>
            </div>

            {/* Video Vimeo Day Hospital */}
            <div className="flex justify-center">
              <div className="w-full max-w-[300px] overflow-hidden rounded-2xl shadow-lg"
                   style={{ aspectRatio: "9/16" }}>
                <iframe
                  src="https://player.vimeo.com/video/1185198901?title=0&byline=0&portrait=0&badge=0&autopause=0"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Programa SER Day Hospital"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFTERWORK ── */}
      <section className="bg-brand-base py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-[300px] overflow-hidden rounded-2xl shadow-lg"
                   style={{ aspectRatio: "9/16" }}>
                <iframe
                  src="https://player.vimeo.com/video/1184968532?title=0&byline=0&portrait=0&badge=0&autopause=0"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Programa SER Afterwork"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Image
                src="/logos/programaser.png"
                alt="Programa SER"
                width={1514}
                height={558}
                className="mb-4 h-auto w-48"
              />
              <h2 className="text-3xl font-bold text-ser-gray">Afterwork</h2>
              <div className="mt-1 h-1 w-16 rounded bg-brand-orange" />
              <p className="mt-5 text-ser-gray/80">
                Recupera el control sin detener tu rutina. El Programa SER Afterwork está diseñado
                para profesionales que desean superar ansiedad, dependencias o desgaste emocional sin
                dejar su vida laboral. Un enfoque integral, ambulatorio y confidencial que trabaja
                desde la raíz para lograr cambios reales y sostenibles.
              </p>
              <ul className="mt-5 flex flex-col gap-2">
                {BENEFICIOS.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ser-gray">
                    <CheckCircle size={16} className="shrink-0 text-brand-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm italic text-ser-gray/70">
                No es solo dejar un hábito… es volver a tener control sobre tu vida.
              </p>
              <div className="mt-6">
                <Button href={waUrl} target="_blank" rel="noopener noreferrer" size="md">
                  Separa tu cita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NUESTRA TECNOLOGÍA ── */}
      <section className="bg-gradient-to-b from-brand-orange to-[#e96854] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-white/80">
            Nuestra tecnología
          </h2>
          <h3 className="mt-2 text-center text-3xl font-bold text-white md:text-4xl">
            Estimulación Magnética Transcraneal
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-center text-white/90">
            Tecnología que ayuda al cerebro a deshabituarse.
          </p>

          <div className="mt-10 grid items-end justify-center gap-6 sm:grid-cols-2 lg:max-w-2xl lg:mx-auto">
            <Image
              src="/varios/estimulacionmagnetica1.png"
              alt="Estimulación magnética transcraneal - paciente femenina"
              width={508}
              height={421}
              className="h-auto w-full drop-shadow-xl"
            />
            <Image
              src="/varios/estimulacionmagnetica2.png"
              alt="Estimulación magnética transcraneal - paciente masculino"
              width={478}
              height={464}
              className="h-auto w-full drop-shadow-xl"
            />
          </div>

          <p className="mx-auto mt-8 max-w-lg text-center text-white/90">
            Reduce el deseo de consumo y recupera el control sobre tus comportamientos.
          </p>
          <p className="mt-2 text-center text-sm font-semibold text-white">
            🇪🇺 Metodología Europea
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            <div className="rounded-xl bg-white/95 px-6 py-3">
              <Image
                src="/logos/metodogalimberti.png"
                alt="Metodo Gallimberti"
                width={243}
                height={52}
                style={{ height: 40, width: "auto" }}
                className="object-contain"
              />
            </div>
            <div className="rounded-xl bg-white/95 px-6 py-3">
              <Image
                src="/logos/metododonado.png"
                alt="Metodología Donado"
                width={170}
                height={56}
                style={{ height: 40, width: "auto" }}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ESPECIALISTAS ── */}
      <section className="bg-[#ebece8] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-brand-orange/15 px-4 py-1.5 text-sm font-bold text-brand-orange">
              Nuestro equipo
            </span>
            <h2 className="mt-4 text-3xl font-black text-ser-gray">
              Especialistas que te acompañan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ser-gray/65">
              Un equipo multidisciplinario que integra mente, cuerpo y sistema nervioso
              para lograr una recuperación profunda y sostenible.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                nombre: "Dra. Sara Ochoa",
                cargo: "Directora Médica",
                especialidad: "Neuromodulación y regulación del sistema nervioso para el tratamiento de conductas adictivas.",
                foto: "/fotos/especialista-sara.webp",
                objPos: "center 10%",
                zoom: 1,
              },
              {
                nombre: "Dra. Nadia Donadonibus",
                cargo: "Psicoterapeuta · Psicoanalista",
                especialidad: "Intervención psicoterapéutica profunda en procesos de dependencia, trauma y recuperación emocional.",
                foto: "/fotos/especialista-nadia.webp",
                objPos: "center 10%",
                zoom: 1,
              },
              {
                nombre: "Nat. Fabián Ochoa Palau",
                cargo: "Director General",
                especialidad: "Medicina funcional y ortomolecular aplicada al detox físico y la restauración integral del organismo.",
                foto: "/fotos/especialista-fabian.webp",
                objPos: "center 10%",
                zoom: 1,
              },
            ].map((m) => (
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
                    style={{
                      objectPosition: m.objPos,
                      transform: `scale(${m.zoom})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <div className="border-t-2 border-brand-orange p-5">
                  <p className="font-black text-ser-gray">{m.nombre}</p>
                  <p className="mt-0.5 text-sm font-semibold text-brand-orange">{m.cargo}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ser-gray/60">{m.especialidad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <ContactSection />
    </>
  );
}
