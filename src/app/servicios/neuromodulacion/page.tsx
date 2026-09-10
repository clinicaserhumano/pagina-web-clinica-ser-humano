import Image from "next/image";
import AnimatedStats from "@/components/ui/AnimatedStats";
import {
  Brain, Wind, Clock, BookOpen, Network, Heart, Flame, Target,
  Zap, Shield, Activity, ArrowRight, Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ContactSection from "@/components/sections/ContactSection";
import { getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { servicePageSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { buildMeta, BASE_URL } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Neuroni · Neuromodulación No Invasiva | Clínica Ser Humano",
  description: "Regula tu sistema nervioso sin psicofármacos. Neuromodulación no invasiva con respaldo clínico en Guayaquil, Ecuador.",
  path: "/servicios/neuromodulacion",
  image: `${BASE_URL}/fotos/hero-neuroni4.webp`,
});

const CONDICIONES = [
  { label: "Ansiedad",          icon: Wind      },
  { label: "Depresión",         icon: Heart     },
  { label: "Estrés Crónico",    icon: Activity  },
  { label: "TDAH",              icon: Target    },
  { label: "Insomnio",          icon: Clock     },
  { label: "Trauma",            icon: Shield    },
  { label: "Espectro Autista",  icon: Network   },
  { label: "Conducta Impulsiva",icon: Flame     },
  { label: "Migraña",           icon: Brain     },
  { label: "TOC",               icon: BookOpen  },
];

const DIFERENCIADORES = [
  {
    titulo: "No invasivo",
    descripcion: "Sin agujas, sin cirugía, sin dolor. El tratamiento se aplica de forma externa, segura y confortable.",
    icon: Shield,
  },
  {
    titulo: "Sin psicofármacos",
    descripcion: "Trabajamos directamente con la actividad del sistema nervioso, sin depender de medicamentos.",
    icon: Zap,
  },
  {
    titulo: "Basado en evidencia",
    descripcion: "Protocolos respaldados por investigación clínica internacional, adaptados a cada persona.",
    icon: Brain,
  },
  {
    titulo: "Acompañamiento continuo",
    descripcion: "Seguimiento clínico en cada etapa del proceso, con evaluaciones de progreso periódicas.",
    icon: Users,
  },
];

const PROCESO = [
  {
    num: "01",
    titulo: "Valoración inicial",
    descripcion: "Conversamos sobre tu historia, síntomas y objetivos para entender qué necesita tu sistema nervioso.",
  },
  {
    num: "02",
    titulo: "Protocolo personalizado",
    descripcion: "Diseñamos un plan de neuromodulación adaptado a tu perfil neurológico y ritmo de vida.",
  },
  {
    num: "03",
    titulo: "Sesiones de tratamiento",
    descripcion: "Sesiones regulares de neuromodulación no invasiva con tecnología de última generación.",
  },
  {
    num: "04",
    titulo: "Seguimiento y ajuste",
    descripcion: "Evaluamos tu evolución y ajustamos el protocolo para maximizar los resultados.",
  },
];

const EQUIPO = [
  {
    nombre: "Dra. Sara Ochoa",
    cargo: "Directora General · Neuroni",
    foto: "/fotos/especialista-sara.webp",
    objPos: "center 34%",
    zoom: 1.8,
  },
  {
    nombre: "Nat. Fabián Ochoa",
    cargo: "Director General",
    foto: "/fotos/especialista-fabian.webp",
    objPos: "center 64%",
    zoom: 1.8,
  },
];

export default function NeuroniPage() {
  const waUrl = getWhatsappUrl(WHATSAPP_MESSAGES.neuroni);

  return (
    <>
      <JsonLd data={servicePageSchema({
        name: "Neuroni · Neuromodulación No Invasiva",
        description: "Regula tu sistema nervioso sin psicofármacos. Neuromodulación no invasiva con respaldo clínico en Guayaquil, Ecuador.",
        url: "https://www.clinicaserhumano.ec/servicios/neuromodulacion",
        image: "https://www.clinicaserhumano.ec/fotos/hero-neuroni4.webp",
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio",    url: "https://www.clinicaserhumano.ec" },
        { name: "Servicios", url: "https://www.clinicaserhumano.ec/servicios" },
        { name: "Neuroni · Neuromodulación", url: "https://www.clinicaserhumano.ec/servicios/neuromodulacion" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "¿Qué es la neuromodulación no invasiva?", a: "Es una técnica que regula la actividad del sistema nervioso mediante estímulos externos — sin agujas, sin cirugía y sin psicofármacos. Actúa directamente sobre los circuitos neurales para restaurar su equilibrio." },
        { q: "¿Qué condiciones trata la neuromodulación?", a: "Trata ansiedad, depresión, estrés crónico, TDAH, insomnio, trauma, espectro autista, conducta impulsiva, migraña y TOC, entre otras condiciones del sistema nervioso." },
        { q: "¿Cuántas sesiones se necesitan para ver resultados?", a: "Los resultados varían según cada persona y condición. Generalmente se observan mejoras desde las primeras sesiones, con un protocolo personalizado diseñado según el perfil neurológico de cada paciente." },
        { q: "¿La neuromodulación tiene efectos secundarios?", a: "Al ser no invasiva y no utilizar psicofármacos, presenta un perfil de seguridad muy alto. Los protocolos están basados en evidencia clínica internacional y son adaptados individualmente." },
      ])} />
      {/* ── HERO ── */}
      <section className="relative min-h-[640px] overflow-hidden lg:min-h-[700px]">
        <Image
          src="/fotos/hero-neuroni4.webp"
          alt="Dra. Sara Ochoa con tecnología de neuromodulación"
          fill
          priority
          quality={95}
          className="object-cover object-[61%_center] lg:object-center lg:scale-125 lg:origin-[-10%_35%]"
        />
        {/* Mobile: degradado de abajo hacia arriba, deja la foto más visible arriba */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4f5571]/95 via-[#4f5571]/70 to-[#4f5571]/25 lg:hidden" />
        {/* Desktop: degradado izquierda → derecha con colores Neuroni */}
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#4f5571] from-[0%] via-[#566597]/75 via-[45%] to-transparent to-[70%]" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-center px-6 py-24 lg:min-h-[700px]">
          <div className="max-w-xl">
            <Image
              src="/logos/neuroni2.png"
              alt="Neuroni"
              width={200}
              height={70}
              className="mb-6 h-auto w-40"
            />
            <p className="text-sm font-semibold uppercase tracking-widest text-[#d0d1d1]">
              Neuromodulación No Invasiva
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
              Regula tu sistema<br />nervioso.<br />
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/85">
              Un enfoque clínico que trabaja directamente con la actividad cerebral
              para restaurar el equilibrio desde adentro.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-[#566597] hover:!bg-[#4f5571]"
              >
                Agenda tu valoración
              </Button>
              <Button href="#proceso" variant="secondary" size="lg">
                Cómo funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUÉ ES NEURONI ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_420px]">

            <div>
              <span className="inline-block rounded-full bg-[#566597]/15 px-4 py-1.5 text-sm font-bold text-[#566597]">
                Qué es Neuroni
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#606265] md:text-4xl">
                Tecnología que habla<br />directamente con<br />tu cerebro.
              </h2>
              <p className="mt-5 leading-relaxed text-[#606265]/75">
                Neuroni es un programa de neuromodulación no invasiva que regula la actividad
                del sistema nervioso central mediante tecnología clínica de precisión. Sin
                procedimientos quirúrgicos, sin medicamentos y con resultados medibles.
              </p>
              <p className="mt-4 leading-relaxed text-[#606265]/75">
                Cada protocolo es diseñado individualmente por nuestro equipo clínico,
                combinando evaluación neurológica, tecnología avanzada y seguimiento continuo
                para acompañarte en cada etapa del proceso.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[#d0d1d1] pt-8">
                {[
                  { num: "0",      label: "Psicofármacos" },
                  { num: "100%",   label: "No invasivo" },
                  { num: "Clínico", label: "Respaldo científico" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-black text-[#566597]">{s.num}</p>
                    <p className="mt-1 text-xs text-[#606265]/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/fotos/que-es-neuroni.webp"
                  alt="Nat. Fabián Ochoa en consultorio Neuroni"
                  width={1536}
                  height={2752}
                  className="h-[560px] w-full object-cover"
                  style={{ objectPosition: "center -60px", transform: "scale(1)", transformOrigin: "center center" }}
                />
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-2xl bg-[#566597] px-6 py-4 shadow-xl">
                <p className="text-xs font-semibold text-white/70">Especialidad</p>
                <p className="text-sm font-black text-white">Neuromodulación</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CONDICIONES ── */}
      <section className="bg-[#f5f5f6] py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-10 text-center text-2xl font-black uppercase tracking-wide text-[#566597]">
            Tratamiento efectivo para:
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {CONDICIONES.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex flex-col items-center gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#566597]/25 bg-[#566597]/10 transition-colors duration-300 hover:bg-[#566597] hover:border-[#566597] group">
                    <Icon size={30} className="text-[#566597] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full bg-[#566597] px-3 py-1 text-xs font-bold uppercase text-white">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ NEURONI ── */}
      <section className="bg-[#4f5571] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white">
              Por qué Neuroni
            </span>
            <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">
              Un enfoque diferente<br />al que conoces.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFERENCIADORES.map(({ titulo, descripcion, icon: Icon }) => (
              <div
                key={titulo}
                className="group rounded-2xl bg-white/10 p-6 transition-all duration-300 hover:bg-white/20"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 transition-colors duration-300 group-hover:bg-[#566597]">
                  <Icon size={22} className="text-[#d0d1d1]" strokeWidth={1.5} />
                </div>
                <p className="font-bold text-white">{titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section id="proceso" className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#566597]/15 px-4 py-1.5 text-sm font-bold text-[#566597]">
              Proceso
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Así funciona tu tratamiento
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO.map((p, i) => (
              <div key={p.num} className="relative">
                {i < PROCESO.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 translate-x-full bg-[#d0d1d1] lg:block" />
                )}
                <div className="rounded-2xl bg-[#f5f5f6] p-6">
                  <p className="text-4xl font-black text-[#d0d1d1]">{p.num}</p>
                  <p className="mt-3 font-bold text-[#566597]">{p.titulo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#606265]/65">{p.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ── */}
      <section className="bg-[#f5f5f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#566597]/15 px-4 py-1.5 text-sm font-bold text-[#566597]">
              Nuestro equipo
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Especialistas que te acompañan
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
            {EQUIPO.map((m) => (
              <div key={m.nombre} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={m.foto}
                    alt={m.nombre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: m.objPos, transform: `scale(${m.zoom})`, transformOrigin: "center top" }}
                  />
                </div>
                <div className="p-5">
                  <p className="font-black text-[#4f5571]">{m.nombre}</p>
                  <p className="mt-1 text-sm text-[#566597]">{m.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVALADO POR NESA WORLD ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-3xl border border-[#d0d1d1]/60 bg-[#f5f5f6]">
            <div className="p-10 lg:p-14">

              {/* Logo + badge */}
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-block rounded-full bg-[#566597]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#566597]">
                    Tecnología certificada
                  </span>
                  <h2 className="mt-4 text-2xl font-black leading-snug text-[#4f5571] md:text-3xl">
                    Respaldados por la tecnología<br />NESA XSIGNAL®
                  </h2>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/nesa.png"
                  alt="NESA World"
                  className="h-auto w-52 flex-shrink-0 object-contain sm:w-64"
                />
              </div>

              {/* Stats animados */}
              <div className="mt-10">
                <AnimatedStats />
              </div>

              {/* Descripción */}
              <p className="mt-10 leading-relaxed text-[#606265]/70">
                NESA® combina visión clínica, formación, soporte y expansión internacional.
                Su crecimiento se sustenta sobre una red de hospitales, clínicas, universidades
                y distribuidores presentes en más de 47 países. La tecnología opera en ocho
                especialidades —rehabilitación, neurología, salud mental, dolor, odontología,
                medicina deportiva, medicina interna y estética— y avanza hacia nuevas áreas
                como gastroenterología, neumología, cardiología y pediatría, donde el sistema
                nervioso autónomo juega un papel determinante. Cuando el SNA funciona bien,
                el sueño se restaura, la inflamación disminuye y el paciente responde mejor
                a cualquier intervención. <strong className="text-[#4f5571]">NESA® no compite con la especialidad: la potencia.</strong>
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SPLIT ── */}
      <section className="overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative h-80 lg:h-auto lg:min-h-[380px]">
            <Image
              src="/fotos/frase-sara.webp"
              alt="Consulta Neuroni"
              fill
              className="object-cover"
              style={{ objectPosition: "center 33%", transform: "scale(1)", transformOrigin: "center center" }}
            />
          </div>
          <div className="flex flex-col justify-center bg-[#566597] px-10 py-16 lg:px-14">
            <p className="text-5xl font-black leading-none text-white/20">&ldquo;</p>
            <p className="mt-2 text-xl font-light italic leading-relaxed text-white">
              El sistema nervioso puede aprender a regularse. Solo necesita
              el estímulo correcto y el acompañamiento adecuado.
            </p>
            <p className="mt-6 font-black text-white">— Equipo Neuroni</p>
            <div className="mt-8">
              <Button
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-white !text-[#566597] hover:!bg-white/90"
              >
                Agenda tu valoración
                <ArrowRight size={18} className="ml-2 inline" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <ContactSection />
    </>
  );
}
