import Image from "next/image";
import AnimatedStats, { type Stat } from "@/components/ui/AnimatedStats";
import { Brain, Check, CheckCircle, Shield, Users, Zap, Wind, Clock, BookOpen, Network, Heart, Target, Flame } from "lucide-react";
import Button from "@/components/ui/Button";
import ContactSection from "@/components/sections/ContactSection";
import { getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { servicePageSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { buildMeta, BASE_URL } from "@/lib/seo";

export const metadata = buildMeta({
  title: "NeuroLab · Estimulación Cognitiva Sensorial | Clínica Ser Humano",
  description: "Programa único de estimulación neurocognitiva sensorial en Ecuador. Entrena tu mente, fortalece tu memoria. Modalidades presencial y remoto.",
  path: "/servicios/neurolab",
  image: `${BASE_URL}/neurolab/hero.jpg`,
});

const CONDICIONES = [
  { label: "Memoria",                    icon: Brain     },
  { label: "Estrés",                     icon: Wind      },
  { label: "Demencia Senil",             icon: Clock     },
  { label: "Refuerzo Pedagógico",        icon: BookOpen  },
  { label: "Espectro Autista",           icon: Network   },
  { label: "Desregularización Emocional", icon: Heart   },
  { label: "Conducta Impulsiva",         icon: Flame     },
  { label: "TDAH",                       icon: Target    },
];

const BENEFICIOS = [
  {
    titulo: "Autonomía y capacidad de decisión",
    descripcion:
      "Fortalece la memoria, atención y toma de decisiones, mejorando la independencia y la calidad de vida.",
  },
  {
    titulo: "Motivación y bienestar emocional",
    descripcion:
      "Reduce la ansiedad y frustración, aumentando la motivación a través de ejercicios interactivos.",
  },
  {
    titulo: "Entrenamiento cognitivo y apoyo profesional",
    descripcion:
      "Ofrece un programa cognitivo personalizado y seguro, con acompañamiento clínico remoto adaptado a cada persona.",
  },
];

const ESTIMULACIONES = [
  {
    titulo: "Estimulación Cognitiva para Personas con Enfermedad Mental",
    descripcion:
      "Las dificultades cognitivas pueden afectar la autonomía y el bienestar. La estimulación cognitiva mejora el funcionamiento diario y la calidad de vida.",
    foto: "/neurolab/sala1.jpeg",
    pos: "object-top",
  },
  {
    titulo: "Estimulación Cognitiva para Afectaciones Cognitivas",
    descripcion:
      "Las alteraciones cognitivas pueden deberse a daño cerebral, envejecimiento o trastornos neurológicos, afectando la memoria, atención y planificación.",
    foto: "/neurolab/neurolab1.png",
    pos: "object-center",
  },
  {
    titulo: "Estimulación Cognitiva en Personas con Autopercepción de Dificultades de Memoria",
    descripcion:
      "Las pérdidas subjetivas de memoria son dificultades percibidas que no siempre reflejan un deterioro real, pero pueden ser un primer signo de riesgo.",
    foto: "/neurolab/neurolab3.png",
    pos: "object-top",
  },
];

const PLANES_REMOTO = [
  {
    label: "Plan",
    numero: "4",
    unidad: "Meses",
    precio: "$240,00",
    mensual: "($60,00 Mensual)",
    accentColor: "#ff6b12",
    tipo: "Sesiones de Estimulación Neurocognitiva",
    items: ["5 Horas Semanales", "20 Horas Mensuales", "Evaluación de Desempeño Inicial y Final"],
  },
  {
    label: "Plan",
    numero: "6",
    unidad: "Meses",
    precio: "$342,00",
    accentColor: "#2e9b3e",
    tipo: "Sesiones de Estimulación Neurocognitiva",
    items: ["1 Hora Diaria", "5 Horas Semanales", "20 Horas Mensuales", "Evaluación de Desempeño Inicial y Final"],
  },
  {
    label: "Plan",
    numero: "1",
    unidad: "Año",
    precio: "$663,00",
    accentColor: "#1a2c72",
    tipo: "Sesiones de Estimulación Neurocognitiva",
    items: ["1 Sesión por Día", "5 Horas Semanales", "20 Horas Mensuales", "Evaluación de Desempeño Inicial y Final"],
  },
];

const PLANES_PRESENCIAL = [
  {
    label: "Primera",
    numero: "Consulta",
    unidad: "",
    precio: "$50,00",
    accentColor: "#1a9cda",
    tipo: "Sesión de Evaluación Neurocognitiva",
    items: ["1 Sesión", "Cuestionarios", "Evaluación de Desempeño Inicial", "Tiempo: 45 min."],
  },
  {
    label: "Plan",
    numero: "1",
    unidad: "Mes",
    precio: "$230,00",
    nota: "(Se recomienda mín. 3 meses)",
    accentColor: "#1a9cda",
    tipo: "Sesiones de Estimulación Neurocognitiva y Neursensorial",
    items: ["3 Veces a la Semana", "12 Sesiones al Mes", "Evaluación de Desempeño Inicial y Final"],
  },
  {
    label: "Plan",
    numero: "3",
    unidad: "Meses",
    precio: "$555,00",
    mensual: "($185,00 Mensual)",
    accentColor: "#1a2c72",
    tipo: "Sesiones de Estimulación Neurocognitiva y Neursensorial",
    items: ["3 Veces a la Semana", "12 Sesiones al Mes", "Evaluación de Desempeño Inicial y Final"],
  },
];

const ESPECIALISTAS = [
  {
    nombre: "Dra. Sara Ochoa",
    titulo: "Especialista en neuromodulación",
    foto: "/fotos/especialista-sara.webp",
    objPos: "center 37%",
    zoom: 1.8,
    zoomX: 50,
    descripcion:
      "Especializada en Medicina Funcional y Neuromodulación. Enfocada en el abordaje del deterioro psicocognitivo, así como en el tratamiento del dolor crónico, la fatiga y los trastornos psicosomáticos, promoviendo la regulación del sistema nervioso.",
  },
  {
    nombre: "Dra. Nadia Donadonibus M.sc",
    titulo: "Máster en Salud Mental",
    foto: "/fotos/especialista-nadia.webp",
    objPos: "50% 23%",
    zoom: 2.5,
    zoomX: 55,
    descripcion:
      "Psicoterapeuta especializada en intervención familiar, con formación en rehabilitación neuropsicológica y estimulación cognitiva. Capacitada en la aplicación de nuevas tecnologías para el abordaje del deterioro cognitivo.",
  },
  {
    nombre: "Psic. Danny Matute",
    titulo: "Psicólogo Clínico",
    foto: "/neurolab/dannymatute.png",
    objPos: "center top",
    zoom: 1,
    zoomX: 50,
    descripcion:
      "Especialista en Psicología Clínica con formación en Terapia Cognitivo-Conductual. Enfocado en la evaluación e intervención psicopedagógica y neurosensorial, orientada al abordaje integral del deterioro cognitivo y conductual.",
  },
];

const INTRAS_STATS: Stat[] = [
  { target: 843,  prefix: "",  suffix: "",  label: "Profesionales en plantilla" },
  { target: 29,   prefix: "",  suffix: "",  label: "Centros y servicios de salud mental" },
  { target: 2628, prefix: "",  suffix: "",  label: "Usuarios atendidos en 2024" },
  { target: 49,   prefix: "",  suffix: "",  label: "Nuevos proyectos en 2024" },
];

const AVALADO_LOGOS = [
  { src: "/logos/alzaimer.png", alt: "Alzheimer Europe", displayH: 56 },
  { src: "/logos/ayuntamientodeburgos.png", alt: "Ayuntamiento de Burgos", displayH: 64 },
  { src: "/logos/juntacastillaleon.png", alt: "Junta de Castilla y León", displayH: 64 },
  { src: "/logos/sacyl.png", alt: "Sacyl", displayH: 52 },
  { src: "/logos/unioneuropea.png", alt: "Unión Europea", displayH: 64 },
];

export default function NeuroLabPage() {
  const waUrl = getWhatsappUrl(WHATSAPP_MESSAGES.neurolab);

  return (
    <>
      <JsonLd data={servicePageSchema({
        name: "NeuroLab · Estimulación Cognitiva Sensorial",
        description: "Programa único de estimulación neurocognitiva sensorial en Ecuador. Fortalece tu memoria, atención y bienestar cognitivo.",
        url: "https://www.clinicaserhumano.ec/servicios/neurolab",
        image: "https://www.clinicaserhumano.ec/neurolab/hero.jpg",
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio",    url: "https://www.clinicaserhumano.ec" },
        { name: "Servicios", url: "https://www.clinicaserhumano.ec/servicios" },
        { name: "NeuroLab", url: "https://www.clinicaserhumano.ec/servicios/neurolab" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "¿Qué es la estimulación cognitiva sensorial?", a: "Es un programa que combina estimulación multisensorial y ejercicios neurocognitivos para fortalecer la memoria, la atención y el bienestar mental, disponible en modalidad presencial y remota." },
        { q: "¿Para quién está indicado NeuroLab?", a: "Está indicado para personas con deterioro cognitivo leve, adultos mayores que desean mantener su agilidad mental, y cualquier persona que quiera optimizar su rendimiento cognitivo y bienestar cerebral." },
        { q: "¿NeuroLab tiene modalidad online?", a: "Sí, el programa NeuroLab ofrece tanto modalidad presencial en Guayaquil como modalidad remota, lo que permite acceder al programa desde cualquier lugar." },
        { q: "¿Cuánto dura el programa NeuroLab?", a: "La duración varía según los objetivos y el perfil de cada persona. Tras una evaluación inicial se diseña un plan personalizado con la frecuencia e intensidad adecuadas." },
      ])} />
      {/* ── HERO ── */}
      <section className="relative flex min-h-[620px] items-center">
        <Image
          src="/neurolab/hero.jpg"
          alt="NeuroLab - Estimulación Cognitiva Sensorial"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <Image
              src="/logos/neurolab2.png"
              alt="NeuroLab"
              width={600}
              height={200}
              className="mb-5 h-auto w-52"
            />
            <p className="text-lg font-light italic text-brand-orange">
              Entrena tu mente, fortalece tu memoria.
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
              Estimulación<br />Cognitiva Sensorial
            </h1>
            <div className="mt-6 flex flex-col gap-3">
              {[
                "Programa único en Ecuador",
                "Avalado por más de 500 centros en Europa",
                "El mejor regalo para tus seres queridos",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={18} className="shrink-0 text-brand-orange" strokeWidth={3} />
                  <span className="rounded-md bg-brand-orange px-3 py-1 text-sm font-bold text-white">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={waUrl} target="_blank" rel="noopener noreferrer" size="lg">
                Regístrate
              </Button>
              <Button href="#planes" variant="secondary" size="lg">
                Leer más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRATAMIENTO EFECTIVO PARA ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-brand-orange">
            Tratamiento Efectivo Para:
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {CONDICIONES.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex flex-col items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-brand-gray-dark/20 bg-brand-gray-dark/10">
                    <Icon size={32} className="text-brand-gray-dark" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase text-white">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ESTADÍSTICAS ── */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-6xl border-t border-brand-gray-light/40 px-6 pt-12">
          <p className="text-center text-lg font-bold uppercase tracking-widest text-brand-gray-dark">
            Entrenamiento para el desarrollo de habilidades cerebrales
          </p>
          <div className="mt-8 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-20">
            <div className="text-center">
              <p className="text-5xl font-black italic text-brand-orange md:text-6xl">Regenera</p>
              <p className="text-4xl font-black italic text-brand-orange md:text-5xl">Recupera</p>
              <p className="text-3xl font-black italic text-brand-orange md:text-4xl">Reprograma</p>
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div>
                <p className="text-4xl font-black italic text-brand-gray-dark">+ de 11000 Usuarios</p>
              </div>
              <div>
                <p className="text-4xl font-black italic text-brand-gray-dark">+ de 13000 Ejercicios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ USAR NEUROLAB ── */}
      <section className="bg-gradient-to-br from-[#606265] via-[#404244] to-[#2a2b2d] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Columna izquierda: texto + cards */}
            <div>
              <span className="inline-block rounded-full bg-brand-orange/15 px-4 py-1.5 text-sm font-bold text-brand-orange">
                ¿Por qué NeuroLab?
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
                Entrenamiento cerebral<br />basado en ciencia
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                Aprovecha la neuroplasticidad cerebral para fortalecer la memoria, la atención
                y otras funciones mentales mediante un programa cognitivo personalizado y avalado
                en más de 500 centros de Europa.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: Brain,  label: "Neuroplasticidad",  desc: "Activa y fortalece nuevas conexiones cerebrales" },
                  { icon: Shield, label: "Sin medicamentos",   desc: "Estimulación natural y segura para todas las edades" },
                  { icon: Users,  label: "Personalizado",      desc: "Plan cognitivo adaptado a cada persona" },
                  { icon: Zap,    label: "Resultados medibles",desc: "Evaluación inicial y final del desempeño" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <Icon size={22} className="text-brand-orange" strokeWidth={1.5} />
                    <p className="mt-2 text-sm font-bold text-white">{label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-8 border-t border-white/10 pt-8">
                {[
                  { num: "+11.000", label: "Usuarios activos" },
                  { num: "+13.000", label: "Ejercicios cognitivos" },
                  { num: "1°",      label: "Programa en Ecuador" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-brand-orange">{s.num}</p>
                    <p className="mt-0.5 text-xs text-white/50">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha: foto con card flotante */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/neurolab/hero.jpg"
                  alt="Sala NeuroLab"
                  width={800}
                  height={600}
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-xl bg-brand-orange px-5 py-3 shadow-2xl">
                <p className="text-xs font-semibold text-white/80">Programa único</p>
                <p className="text-lg font-black text-white">en Ecuador 🇪🇨</p>
              </div>
              <div className="absolute -top-5 -right-5 rounded-xl bg-white px-5 py-3 shadow-2xl">
                <p className="text-xs font-semibold text-brand-gray-dark/60">Avalado por</p>
                <p className="text-sm font-black text-brand-gray-dark">+500 centros en Europa</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ESTIMULACIONES COGNITIVAS ── */}
      <section className="bg-brand-orange pb-14 pt-10">
        <div className="mx-auto max-w-5xl px-6">

          {/* Desktop: collage bento */}
          <div className="hidden gap-4 lg:flex" style={{ height: 520 }}>

            {/* Columna izquierda: retrato alto del doctor */}
            <div className="relative w-60 flex-shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/neurolab/sala1.jpeg"
                fill
                alt="Estimulación cognitiva - especialista"
                className="object-cover"
                style={{ objectPosition: "center 8%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <span className="inline-block rounded-full bg-brand-orange px-3 py-0.5 text-[10px] font-bold text-white">
                  Enfermedad Mental
                </span>
                <p className="mt-1.5 text-xs leading-snug text-white/90">
                  La estimulación cognitiva mejora el funcionamiento diario y la calidad de vida.
                </p>
              </div>
            </div>

            {/* Columna central: imagen arriba + tarjeta texto abajo */}
            <div className="flex flex-1 flex-col gap-4">
              <div className="relative flex-1 overflow-hidden rounded-2xl">
                <Image
                  src="/neurolab/neurolab1.png"
                  fill
                  alt="Sala NeuroLab con pacientes"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <span className="inline-block rounded-full bg-brand-orange px-3 py-0.5 text-[10px] font-bold text-white">
                    Afectaciones Cognitivas
                  </span>
                  <p className="mt-1.5 text-xs leading-snug text-white/90">
                    Alteraciones por daño cerebral, envejecimiento o trastornos neurológicos.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 rounded-2xl bg-white/15 p-5 backdrop-blur-sm">
                <span className="inline-block rounded-full border border-white/40 px-3 py-0.5 text-[10px] font-bold text-white">
                  Autopercepción de Dificultades
                </span>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  Las pérdidas subjetivas de memoria no siempre reflejan un deterioro real,
                  pero pueden ser un primer signo de riesgo cognitivo que merece atención.
                </p>
              </div>
            </div>

            {/* Columna derecha: retrato alto VR */}
            <div className="relative w-52 flex-shrink-0 overflow-hidden rounded-2xl">
              <Image
                src="/neurolab/neurolab3.png"
                fill
                alt="Sesión NeuroLab con realidad virtual"
                className="object-cover object-top"
              />
            </div>

          </div>

          {/* Mobile: apilado simple */}
          <div className="flex flex-col gap-5 lg:hidden">
            {ESTIMULACIONES.map((e) => (
              <div key={e.titulo}>
                <div className="h-52 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={e.foto}
                    width={560}
                    height={416}
                    alt={e.titulo}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: e.pos === "object-top" ? "center 8%" : "center" }}
                  />
                </div>
                <h3 className="mt-3 text-sm font-black uppercase text-white">{e.titulo}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/80">{e.descripcion}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BENEFICIOS ── */}
      <section className="relative py-20">
        <Image
          src="/neurolab/sala1.jpeg"
          alt="Sala NeuroLab"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-brand-orange">
            Beneficios de NeuroLab
          </h2>
          <div className="flex flex-col gap-6">
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className="flex items-start gap-4">
                <CheckCircle size={24} className="mt-0.5 shrink-0 text-green-400" strokeWidth={2} />
                <div>
                  <p className="font-bold text-white">{b.titulo}</p>
                  <p className="mt-1 text-sm text-white/75">{b.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANES ── */}
      <section id="planes" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-black uppercase text-brand-gray-dark">
            Planes Flexibles para Cada Objetivo
          </h2>

          {/* REMOTO */}
          <div className="mt-12">
            <div className="mb-6 flex justify-center">
              <span className="rounded-full border-2 border-brand-orange bg-white px-8 py-2 text-xl font-black uppercase text-brand-orange">
                Remoto
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {PLANES_REMOTO.map((p) => (
                <div
                  key={p.numero + p.unidad}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Barra superior de color que entra deslizándose */}
                  <div
                    className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: p.accentColor }}
                  />
                  {/* Tinte suave del color en el fondo */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: `${p.accentColor}0d` }}
                  />
                  <div className="relative px-6 pt-6 text-center">
                    <p className="text-sm font-bold uppercase text-brand-gray-dark">{p.label}</p>
                    <p className="text-5xl font-black leading-none transition-colors duration-300" style={{ color: p.accentColor }}>
                      {p.numero}
                    </p>
                    <p className="text-lg font-bold uppercase" style={{ color: p.accentColor }}>
                      {p.unidad}
                    </p>
                    <p className="mt-3 text-3xl font-black text-brand-gray-dark">{p.precio}</p>
                    {p.mensual && <p className="text-xs text-brand-gray-dark/60">{p.mensual}</p>}
                  </div>
                  <div className="relative mt-4 bg-brand-gray-light/30 px-6 py-4">
                    <p className="text-center text-xs font-bold uppercase text-brand-gray-dark/70">{p.tipo}</p>
                    <p className="mt-3 text-center text-xs font-bold uppercase text-brand-gray-dark">Incluye</p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-brand-gray-dark/80">
                          <span
                            className="mt-0.5 h-2 w-2 shrink-0 rounded-full border transition-colors duration-300 group-hover:border-transparent group-hover:bg-current"
                            style={{ borderColor: p.accentColor, color: p.accentColor }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRESENCIAL */}
          <div className="mt-16">
            <div className="mb-6 flex justify-center">
              <span className="rounded-full border-2 border-brand-orange bg-brand-orange px-8 py-2 text-xl font-black uppercase text-white">
                Presencial
              </span>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {PLANES_PRESENCIAL.map((p) => (
                <div
                  key={p.numero + p.unidad}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* Barra superior de color */}
                  <div
                    className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ backgroundColor: p.accentColor }}
                  />
                  {/* Tinte suave */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: `${p.accentColor}0d` }}
                  />
                  <div className="relative px-6 pt-6 text-center">
                    <p className="text-sm font-bold uppercase text-brand-gray-dark">{p.label}</p>
                    <p className="text-4xl font-black leading-tight" style={{ color: p.accentColor }}>
                      {p.numero}
                    </p>
                    {p.unidad && (
                      <p className="text-lg font-bold uppercase" style={{ color: p.accentColor }}>
                        {p.unidad}
                      </p>
                    )}
                    <p className="mt-3 text-3xl font-black text-brand-gray-dark">{p.precio}</p>
                    {p.mensual && <p className="text-xs text-brand-gray-dark/60">{p.mensual}</p>}
                    {p.nota && <p className="text-xs italic text-brand-gray-dark/60">{p.nota}</p>}
                  </div>
                  <div className="relative mt-4 bg-brand-gray-light/30 px-6 py-4">
                    <p className="text-center text-xs font-bold uppercase text-brand-gray-dark/70">{p.tipo}</p>
                    <p className="mt-3 text-center text-xs font-bold uppercase text-brand-gray-dark">Incluye</p>
                    <ul className="mt-2 flex flex-col gap-2">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-brand-gray-dark/80">
                          <span
                            className="mt-0.5 h-2 w-2 shrink-0 rounded-full border transition-colors duration-300 group-hover:border-transparent group-hover:bg-current"
                            style={{ borderColor: p.accentColor, color: p.accentColor }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="rounded-full bg-[#3b5998] px-6 py-2 text-sm font-bold text-white">
                Tutoría presencial
              </span>
              <span className="rounded-full bg-[#3b5998] px-6 py-2 text-sm font-bold text-white">
                Asistencia psicopedagógica
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button href={waUrl} target="_blank" rel="noopener noreferrer" size="lg">
              Solicitar información
            </Button>
          </div>
        </div>
      </section>

      {/* ── KIT NEUROLAB REMOTO ── */}
      <section className="bg-brand-base py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="grid lg:grid-cols-[1fr_1fr]">

              {/* Columna izquierda */}
              <div className="flex flex-col justify-center px-8 py-10 lg:px-12">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Modalidad Remoto
                </span>
                <h2 className="mt-2 text-3xl font-black text-brand-gray-dark">
                  Kit NeuroLab<br />Memoria
                </h2>
                <p className="mt-1 text-sm font-bold italic text-brand-gray-dark/50">Incluye</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {[
                    "Software Especializado",
                    "Código de Acceso",
                    "Licencia de uso",
                    "Manual Físico y Digital",
                    "Certificado",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </span>
                      <span className="rounded-lg bg-brand-orange px-4 py-1.5 text-sm font-bold text-white">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna derecha: tablet + manual + specs */}
              <div className="flex flex-col items-center justify-center gap-4 bg-brand-base/50 px-8 py-10">
                <span className="rounded-full bg-brand-orange px-5 py-1.5 text-xs font-bold text-white">
                  Tablet Recomendada
                </span>
                <Image
                  src="/neurolab/laptop.png"
                  alt="Tablet NeuroLab Memoria"
                  width={480}
                  height={280}
                  className="h-auto w-full max-w-[320px] drop-shadow-xl"
                />
                <p className="text-center text-xs text-brand-gray-dark/60">
                  <span className="font-bold text-brand-gray-dark">Memoria:</span> 2 Gb &nbsp;·&nbsp;
                  <span className="font-bold text-brand-gray-dark">Compatibilidad:</span> iOS 13.0+, Android
                </p>
                <Image
                  src="/neurolab/manual.png"
                  alt="Manual de Usuario NeuroLab Memoria"
                  width={320}
                  height={260}
                  className="h-auto w-40 drop-shadow-lg"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CUADERNILLOS ── */}
      <section className="relative py-20">
        <Image
          src="/neurolab/neurolab1.png"
          alt="NeuroLab sala"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-wide text-brand-orange">
            Obtén tus Cuadernillos de Trabajo
          </h2>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Image
              src="/neurolab/cuadernos.png"
              alt="Cuadernillos NeuroLab Memoria"
              width={960}
              height={400}
              className="h-auto w-full drop-shadow-2xl"
            />
            <div className="rounded-2xl bg-brand-orange/90 px-8 py-6">
              <ul className="flex flex-col gap-3">
                {[
                  "Cuadernillos con actividades dirigidas a cada área.",
                  "6 categorías: Praxias y Gnosias, Razonamiento, Cálculo, Memoria, Lenguaje y Atención.",
                  "3 grados de dificultad: Alto, Medio y Bajo.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-right text-2xl font-black text-white">$15,00 c/u</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-black uppercase text-brand-gray-dark">
            Testimonios
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-brand-gray-dark/70">
            En NeuroLab fortalecemos tu memoria y concentración con programas personalizados
            que previenen el deterioro cognitivo y mejoran tu bienestar.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                foto: "/neurolab/testimonio1.jpeg",
                texto:
                  '"Desde que empecé en NeuroLab siento mi mente mucho más clara. Antes olvidaba cosas simples y ahora me concentro mejor en mi trabajo y en mi vida diaria."',
                nombre: "Marcos Torres, 62 años",
              },
              {
                foto: "/neurolab/testimonio2.png",
                texto:
                  '"El estrés me estaba afectando mucho. En NeuroLab encontré un espacio donde fortalecí mi concentración y logré equilibrar mi mente y emociones."',
                nombre: "Jorge Ramírez, 28 años",
              },
              {
                foto: "/neurolab/testimonio3.jpeg",
                texto:
                  '"Me preocupaba perder memoria con la edad, pero el programa me ayudó a ejercitar mi mente. Hoy puedo leer, aprender y recordar con más confianza."',
                nombre: "Paola Sánchez, 78 años",
              },
            ].map((t, i) => (
              <div
                key={t.nombre}
                className={`flex flex-col items-center rounded-2xl border-2 p-6 text-center ${
                  i === 1 ? "border-brand-gray-dark" : "border-brand-orange"
                }`}
              >
                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-brand-orange/40">
                  <Image
                    src={t.foto}
                    alt={t.nombre}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <p className="mt-5 text-sm italic leading-relaxed text-brand-gray-dark/80">
                  {t.texto}
                </p>
                <p className="mt-4 font-black italic text-brand-gray-dark">{t.nombre}</p>
                <div className={`mt-2 h-0.5 w-10 ${i === 1 ? "bg-brand-gray-dark" : "bg-brand-orange"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUESTROS ESPECIALISTAS ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-black uppercase tracking-wide text-brand-gray-dark">
            Nuestros Especialistas
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {ESPECIALISTAS.map((e) => (
              <div
                key={e.nombre}
                className="relative overflow-hidden rounded-2xl border border-brand-orange/30 p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-2xl border-2 border-brand-orange/40">
                  <Image
                    src={e.foto}
                    alt={e.nombre}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: e.objPos ?? "center top",
                      transform: `scale(${e.zoom ?? 1})`,
                      transformOrigin: `${e.zoomX ?? 50}% top`,
                    }}
                  />
                </div>
                <p className="font-black italic text-brand-gray-dark">{e.nombre}</p>
                <p className="text-sm font-medium text-brand-orange">{e.titulo}</p>
                <p className="mt-3 text-xs leading-relaxed text-brand-gray-dark/70 italic">
                  {e.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVALADO POR FUNDACIÓN INTRAS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl border border-[#d0d1d1]/60 bg-[#f5f5f6]">
            <div className="p-10 lg:p-14">

              {/* Logo + título */}
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-block rounded-full bg-brand-orange/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange">
                    Plataforma certificada
                  </span>
                  <h2 className="mt-4 text-2xl font-black leading-snug text-brand-gray-dark md:text-3xl">
                    Programa respaldado por<br />Fundación INTRAS
                  </h2>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/fundacionintras.png"
                  alt="Fundación INTRAS"
                  className="h-auto w-52 flex-shrink-0 object-contain sm:w-64"
                />
              </div>

              {/* Stats animados */}
              <div className="mt-10">
                <AnimatedStats
                  accentColor="#ff6b12"
                  borderColor="#e5e7eb"
                  stats={INTRAS_STATS}
                />
              </div>

              {/* Descripción */}
              <p className="mt-10 leading-relaxed text-[#606265]/70">
                Fundación INTRAS es una entidad sin ánimo de lucro fundada en 1994 dedicada
                al acompañamiento de personas con problemas de salud mental. Con casi 900
                profesionales y presencia en 8 provincias de España y una red activa en toda
                Europa, INTRAS desarrolla la plataforma de estimulación cognitiva que impulsa
                el programa NeuroLab. Su tecnología —ya presente en más de 500 centros europeos—
                llega a Ecuador de la mano de Clínica Ser Humano, siendo el{" "}
                <strong className="text-brand-gray-dark">primer centro autorizado en el país.</strong>
              </p>

              {/* Instituciones que nos avalan */}
              <div className="mt-10 border-t border-[#d0d1d1] pt-8">
                <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#606265]/50">
                  Instituciones que nos avalan:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {AVALADO_LOGOS.map((logo) => (
                    <div key={logo.alt} className="flex items-center justify-center">
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={200}
                        height={100}
                        className="object-contain opacity-75 transition-opacity hover:opacity-100"
                        style={{ height: logo.displayH, width: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <ContactSection />
    </>
  );
}
