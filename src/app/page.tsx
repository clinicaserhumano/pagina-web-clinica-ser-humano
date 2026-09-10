"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, AlertTriangle, Brain, ChevronLeft, ChevronRight, Clock, CloudRain,
  Eye, Heart, Moon, Search, Shield, Star, UserCircle, Users, Wifi, Zap,
} from "lucide-react";
import Button from "@/components/ui/Button";
import VideoCarousel from "@/components/ui/VideoCarousel";
import ContactSection from "@/components/sections/ContactSection";
import InstagramFeed from "@/components/sections/InstagramFeed";
import { EQUIPO, SUBMARCAS, UNIVERSIDADES, getWhatsappUrl } from "@/lib/constants";

const TESTIMONIOS = [
  {
    texto: "Llegué con dolores de cabeza crónicos que nadie había podido explicar en años. Después de las sesiones de neuromodulación empecé a sentir una diferencia real, no solo en el dolor sino en mi energía y concentración. Por primera vez me explicaron qué estaba pasando en mi sistema nervioso.",
    nombre: "Marcelo R.",
    servicio: "Neuromodulación · Neuroni",
    foto: "/testimonios/marcelo.png",
  },
  {
    texto: "La Dra. Nadia tiene una forma de escuchar que no había encontrado en ningún otro profesional. Mi relación de pareja estaba en un punto crítico y gracias al proceso terapéutico logramos entendernos de una manera que creíamos imposible. No solo salvamos la relación, crecimos.",
    nombre: "Andrés y Gabriela M.",
    servicio: "Psicoterapia de parejas",
    foto: "/testimonios/andresygabriela.png",
  },
  {
    texto: "Estuve en el Programa SER y fue lo mejor que pude hacer. Lo que más me sorprendió fue que no me trataron como un caso sino como una persona. El equipo estuvo presente en cada etapa y los horarios after office me permitieron continuar con mi trabajo sin tener que parar mi vida.",
    nombre: "Roberto C.",
    servicio: "Programa SER Libre",
    foto: "/testimonios/roberto.png",
  },
  {
    texto: "Mi madre tiene 72 años y notábamos que su memoria estaba fallando cada vez más. En NeuroLab le hicieron una evaluación completa y nos dieron un plan claro. Después de meses de seguimiento la mejoría es evidente. El equipo nos explicó todo en términos que pudimos entender.",
    nombre: "Familia Espinoza",
    servicio: "NeuroLab · Evaluación cognitiva",
    foto: "/testimonios/espinoza.png",
  },
  {
    texto: "Vine por ansiedad severa que me impedía trabajar con normalidad. Me sorprendió el enfoque integral: no solo me dieron herramientas psicológicas, sino que revisaron mi parte física también. En tres meses recuperé una calidad de vida que hacía años no tenía.",
    nombre: "Sofía T.",
    servicio: "Salud integral · Ser Humano",
    foto: "/testimonios/sofia.png",
  },
];

const PILARES = [
  {
    icon: Brain,
    titulo: "Salud mental",
    descripcion: "Acompañamiento psicológico y psiquiátrico desde la comprensión, sin juzgar.",
  },
  {
    icon: Shield,
    titulo: "Conductas adictivas",
    descripcion: "Procesos de recuperación integral, con acompañamiento cercano y sostenido.",
  },
  {
    icon: Activity,
    titulo: "Medicina funcional",
    descripcion: "Bienestar físico desde una mirada clínica precisa y comprensible.",
  },
  {
    icon: Zap,
    titulo: "Regulación del sistema nervioso",
    descripcion: "Recuperar calma y estabilidad a través de neuromodulación no invasiva.",
  },
  {
    icon: Eye,
    titulo: "Bienestar cognitivo",
    descripcion: "Estimulación de memoria y atención para una vida cotidiana más plena.",
  },
  {
    icon: Heart,
    titulo: "Sistema de cuidado integral",
    descripcion: "Un equipo que acompaña cada proceso de recuperación de forma continua.",
  },
];

function TestimoniosCarrusel() {
  const PER_PAGE = 3;
  const totalGroups = Math.ceil(TESTIMONIOS.length / PER_PAGE); // 2 grupos con 5 testimonios

  const [single, setSingle] = useState(0);
  const [group, setGroup]   = useState(0);
  const [dir, setDir]       = useState(1);

  const prevSingle = () => { setDir(-1); setSingle(i => (i - 1 + TESTIMONIOS.length) % TESTIMONIOS.length); };
  const nextSingle = () => { setDir(1);  setSingle(i => (i + 1) % TESTIMONIOS.length); };
  const prevGroup  = () => { setDir(-1); setGroup(g => (g - 1 + totalGroups) % totalGroups); };
  const nextGroup  = () => { setDir(1);  setGroup(g => (g + 1) % totalGroups); };

  // Auto-avance cada 5s (sincronizado)
  useEffect(() => {
    const t = setTimeout(() => {
      setDir(1);
      setSingle(i => (i + 1) % TESTIMONIOS.length);
      setGroup(g => (g + 1) % totalGroups);
    }, 5000);
    return () => clearTimeout(t);
  }, [single, totalGroups]);

  const currentSingle = TESTIMONIOS[single];
  const groupItems = Array.from({ length: PER_PAGE }, (_, i) =>
    TESTIMONIOS[(group * PER_PAGE + i) % TESTIMONIOS.length]
  );

  const cardVariants = {
    enter:  (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d * -60, opacity: 0 }),
  };

  const renderCard = (t: typeof TESTIMONIOS[0], keyStr: string) => (
    <div key={keyStr} className="flex h-full flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={13} className="fill-[#ff6b12] text-[#ff6b12]" />
        ))}
      </div>
      <p className="text-4xl font-black leading-none text-[#ff6b12]/20">&ldquo;</p>
      <p className="flex-1 text-sm leading-relaxed text-[#616569]/75 -mt-3">{t.texto}</p>
      <div className="flex items-center gap-3 border-t border-[#ebece8] pt-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#ebece8]">
          {t.foto ? (
            <Image src={t.foto} alt={t.nombre} fill className="object-cover" />
          ) : (
            <UserCircle size={24} className="m-auto mt-1.5 text-[#616569]/40" />
          )}
        </div>
        <div>
          <p className="text-sm font-bold text-[#616569]">{t.nombre}</p>
          <p className="text-xs text-[#ff6b12]">{t.servicio}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-[#ebece8] py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...{ initial:{y:20}, whileInView:{y:0}, viewport:{once:true}, transition:{duration:0.45} }} className="mb-12 text-center">
          <span className="inline-block rounded-full bg-[#ff6b12]/15 px-4 py-1.5 text-sm font-bold text-[#ff6b12]">
            Testimonios
          </span>
          <h2 className="mt-4 text-3xl font-black text-[#616569] md:text-4xl">
            Lo que dicen nuestros pacientes
          </h2>
        </motion.div>

        {/* ── MOBILE: 1 card ── */}
        <div className="md:hidden">
          <div className="relative mx-auto max-w-sm">
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={single}
                  custom={dir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  {renderCard(currentSingle, `m-${single}`)}
                </motion.div>
              </AnimatePresence>
            </div>
            <button onClick={prevSingle} className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#ff6b12] hover:text-white text-[#616569]" aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextSingle} className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#ff6b12] hover:text-white text-[#616569]" aria-label="Siguiente">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIOS.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > single ? 1 : -1); setSingle(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${i === single ? "w-6 bg-[#ff6b12]" : "w-2 bg-[#616569]/25"}`}
                aria-label={`Testimonio ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* ── DESKTOP: 3 cards por grupo ── */}
        <div className="hidden md:block">
          <div className="relative">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={group}
                custom={dir}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-3 gap-6"
              >
                {groupItems.map((t, i) => renderCard(t, `d-${group}-${i}`))}
              </motion.div>
            </AnimatePresence>

            <button onClick={prevGroup} className="absolute -left-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#ff6b12] hover:text-white text-[#616569]" aria-label="Anterior">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextGroup} className="absolute -right-6 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-[#ff6b12] hover:text-white text-[#616569]" aria-label="Siguiente">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalGroups }).map((_, i) => (
              <button key={i} onClick={() => { setDir(i > group ? 1 : -1); setGroup(i); }}
                className={`h-2 rounded-full transition-all duration-300 ${i === group ? "w-6 bg-[#ff6b12]" : "w-2 bg-[#616569]/25"}`}
                aria-label={`Grupo ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const fadeUp = {
  initial: { y: 20 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: "easeOut" as const },
};


export default function Home() {
  return (
    <>
      {/* SECCIÓN 1 — HERO */}
      <section className="relative flex min-h-[620px] items-center overflow-hidden md:min-h-[680px]">
        <video
          src="/videos/hero-clinica.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          className="absolute inset-0 h-full w-full object-cover object-center lg:object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 text-center md:py-28">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-2xl"
          >
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              Recuperar equilibrio también es{" "}
              <span className="relative inline-block text-brand-orange">
                salud
                <motion.svg
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full md:-bottom-3 md:h-4"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M4 16 Q 100 2, 196 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.45, delay: 0.3, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>
              <span className="text-brand-orange">.</span>
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Descubre{" "}
              <a href="#programas" className="text-brand-orange hover:underline">
                nuestros tratamientos
              </a>
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="#programas" size="lg">
                Ver tratamientos
              </Button>
              <Button href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
                Escríbenos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 2 — 35 AÑOS DE EXPERIENCIA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="inline-flex flex-wrap items-baseline justify-center gap-x-3">
              <span className="text-7xl font-black leading-none text-brand-orange md:text-8xl">35</span>
              <span className="text-5xl font-black leading-none text-brand-orange md:text-6xl">AÑOS</span>
              <span className="text-2xl font-light text-brand-gray-dark md:text-3xl">de</span>
              <span className="text-4xl font-bold text-brand-gray-dark md:text-5xl">EXPERIENCIA</span>
            </p>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <motion.div {...fadeUp}>
              <p className="text-lg leading-relaxed text-brand-gray-dark/80">
                Somos un centro de psicomedicina funcional y de precisión, donde la ciencia,
                la experiencia clínica y la calidez humana se integran bajo una metodología
                basada en evidencia.
              </p>
              <p className="mt-5 text-xl font-medium italic text-brand-orange">
                &ldquo;Nos enfocamos en la recuperación del ser en su mente y cuerpo.&rdquo;
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-brand-gray-light/40 pt-8">
                {[
                  { num: "35+", label: "Años de experiencia" },
                  { num: "4",   label: "Programas especializados" },
                  { num: "3",   label: "Especialistas clínicos" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-black text-brand-orange">{s.num}</p>
                    <p className="mt-1 text-xs text-brand-gray-dark/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="grid h-[480px] grid-cols-3 grid-rows-2 gap-2 overflow-hidden rounded-2xl"
            >
              <div className="relative col-span-2 row-span-1 overflow-hidden">
                <Image fill className="object-cover" src="/fotos/nosotros-salaestar.png"
                  alt="Sala de estar Clínica Ser Humano" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <div className="relative col-span-1 row-span-2 overflow-hidden">
                <Image fill className="object-cover object-top" src="/fotos/collage-vr-fabian.jpg"
                  alt="Nat. Fabián Ochoa con tecnología VR" sizes="(max-width:768px) 100vw, 25vw" />
              </div>
              <div className="relative col-span-1 row-span-1 overflow-hidden">
                <Image fill className="object-cover" src="/nadia/nadia-sesion2.jpeg"
                  alt="Dra. Nadia Donadonibus en sesión" sizes="(max-width:768px) 100vw, 25vw"
                  style={{ objectPosition: "center -40px" }} />
              </div>
              <div className="relative col-span-1 row-span-1 overflow-hidden">
                <Image fill className="object-cover object-center" src="/fotos/collage-consulta.jpg"
                  alt="Consulta Clínica Ser Humano" sizes="(max-width:768px) 100vw, 25vw" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3 — SERVICIOS */}
      <section id="programas" className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold text-brand-gray-dark md:text-4xl">
            Nuestros programas
          </motion.h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {SUBMARCAS.map((marca, i) => (
              <motion.div
                key={marca.slug}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-start gap-4 rounded-2xl border border-brand-gray-light/50 p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <Image
                  src={marca.logo}
                  alt={marca.nombre}
                  width={140}
                  height={52}
                  className="h-10 w-auto shrink-0"
                />
                <h3 className="text-xl font-medium text-brand-gray-dark">{marca.nombre}</h3>
                <p className="text-sm text-brand-gray-dark/75">{marca.descripcion}</p>
                <Button href={marca.href} variant="ghost" size="sm" className="self-start !px-0">
                  Conocer más →
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 — SOMOS ESPECIALISTAS EN */}
      <section className="bg-brand-gray-dark py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Somos especialistas en:
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Condiciones que acompañamos con experiencia clínica y calidez humana.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: Brain,         label: "Ansiedad" },
              { icon: Moon,          label: "Insomnio" },
              { icon: Zap,           label: "Estrés" },
              { icon: AlertTriangle, label: "Pánico" },
              { icon: CloudRain,     label: "Depresión" },
              { icon: Clock,         label: "Demencia / Senil" },
              { icon: Search,        label: "Pérdida de la memoria" },
              { icon: Shield,        label: "Dependencias" },
              { icon: Activity,      label: "Dolor crónico" },
              { icon: Wifi,          label: "Regulación nerviosa" },
              { icon: Users,         label: "Conflictos de pareja y familia" },
              { icon: Eye,           label: "Bienestar cognitivo" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ y: 16 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/20">
                    <Icon size={18} className="text-brand-orange" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-medium leading-tight text-white">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5 — ECOSISTEMA CLÍNICO */}
      <section className="bg-brand-base">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold text-brand-gray-dark md:text-4xl">
            Una visión integral del bienestar
          </motion.h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PILARES.map((pilar, i) => {
              const Icon = pilar.icon;
              return (
                <motion.div
                  key={pilar.titulo}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                  className="flex flex-col gap-3 rounded-2xl bg-white p-6"
                >
                  <Icon className="text-brand-orange" size={32} strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-brand-gray-dark">{pilar.titulo}</h3>
                  <p className="text-sm text-brand-gray-dark/75">{pilar.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 — CLAIM / MANIFIESTO */}
      <section className="bg-brand-orange">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl px-6 py-20 text-center text-white">
          <p className="text-3xl font-bold leading-snug md:text-4xl">
            Antes que cualquier diagnóstico, siempre está el ser humano.
          </p>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/90">
            Comprender antes de tratar, acompañar antes de juzgar, explicar antes de intervenir.
            Así entendemos la salud integral.
          </p>
          <div className="mt-8">
            <Button
              href="/nosotros"
              variant="secondary"
              size="lg"
              className="!border-white !text-white hover:!bg-white/10"
            >
              Conoce nuestra historia
            </Button>
          </div>
        </motion.div>
      </section>

      {/* SECCIÓN 5 — EQUIPO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold text-brand-gray-dark md:text-4xl">
            Nuestro equipo
          </motion.h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {EQUIPO.map((persona, i) => (
              <motion.div
                key={persona.nombre}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={persona.foto}
                  alt={persona.nombre}
                  width={224}
                  height={224}
                  className="h-28 w-28 rounded-full object-cover object-top"
                />
                <h3 className="mt-4 text-lg font-medium text-brand-gray-dark">{persona.nombre}</h3>
                <p className="text-sm font-medium text-brand-orange">{persona.cargo}</p>
                <p className="mt-2 max-w-xs text-sm text-brand-gray-dark/75">{persona.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 6 — UNIVERSIDADES (espacio de pasantías) */}
      <section className="bg-brand-base">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-brand-gray-dark md:text-4xl">
              Convenios con universidades
            </h2>
            <p className="mt-3 text-sm text-brand-gray-dark/70">
              Instituciones con las que hemos colaborado a lo largo de nuestra trayectoria.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {UNIVERSIDADES.map((u, i) => (
              <motion.div
                key={u.nombre}
                initial={{ y: 16 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
                className="flex items-center justify-center"
              >
                <Image
                  src={u.logo}
                  alt={u.nombre}
                  width={u.width}
                  height={u.height}
                  style={{ height: u.displayH, width: "auto" }}
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7 — TERAPIAS AVANZADAS (carrusel YouTube) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div {...fadeUp} className="text-center">
            <h2 className="text-3xl font-bold text-brand-gray-dark md:text-4xl">
              Terapias avanzadas
            </h2>
            <p className="mt-3 text-sm text-brand-gray-dark/70">
              Conoce nuestros tratamientos, técnicas y testimonios en video.
            </p>
          </motion.div>
          <div className="mt-10">
            <VideoCarousel />
          </div>
        </div>
      </section>

      {/* SECCIÓN 8 — TESTIMONIOS (carrusel) */}
      <TestimoniosCarrusel />

      {/* SECCIÓN 9 — INSTAGRAM */}
      <InstagramFeed />

      {/* SECCIÓN 10 — CONTACTO */}
      <ContactSection />

      {/* SECCIÓN 9 — CTA FINAL WHATSAPP */}
      <section className="bg-gradient-to-br from-brand-orange to-brand-human">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl px-6 py-20 text-center text-white">
          <h2 className="text-3xl font-bold md:text-4xl">¿Listo para dar el primer paso?</h2>
          <p className="mt-4 text-lg text-white/90">Acompañamos tu regreso al equilibrio.</p>
          <div className="mt-8">
            <Button
              href={getWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="!bg-white !text-brand-orange hover:!bg-white/90"
            >
              Escríbenos al WhatsApp
            </Button>
          </div>
        </motion.div>
      </section>

    </>
  );
}
