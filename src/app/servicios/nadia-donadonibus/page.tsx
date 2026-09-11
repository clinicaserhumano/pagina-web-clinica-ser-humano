import Image from "next/image";
import { Heart, MessageCircle, Shield, BookOpen, CheckCircle, Sparkles, Clock, ArrowRight, Award, GraduationCap } from "lucide-react";
import Button from "@/components/ui/Button";
import ImageCarousel from "@/components/ui/ImageCarousel";
import Reveal from "@/components/ui/Reveal";
import ContactSection from "@/components/sections/ContactSection";
import { getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";
import JsonLd from "@/components/seo/JsonLd";
import { servicePageSchema, physicianSchema, breadcrumbSchema, faqSchema } from "@/lib/schemas";
import { buildMeta, BASE_URL } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Dra. Nadia Donadonibus · Psicoterapeuta | Clínica Ser Humano",
  description: "Psicoterapeuta y psicoanalista con más de 40 años de experiencia en Italia y Ecuador. Psicoterapia individual, familiar y de pareja en Guayaquil.",
  path: "/servicios/nadia-donadonibus",
  image: `${BASE_URL}/fotos/hero-nadia.webp`,
});

const ENFOQUE = [
  {
    icon: MessageCircle,
    titulo: "Escucha sin juicios",
    descripcion: "Un espacio donde puedes hablar con libertad, sabiendo que serás comprendido tal como eres.",
  },
  {
    icon: Heart,
    titulo: "Acompañamiento real",
    descripcion: "Presencia humana genuina en cada sesión, adaptada a tu momento de vida. No solo técnicas.",
  },
  {
    icon: Shield,
    titulo: "Confidencialidad total",
    descripcion: "Todo lo que se comparte en consulta permanece en absoluta reserva. Tu privacidad es sagrada.",
  },
  {
    icon: Sparkles,
    titulo: "Metodología propia",
    descripcion: "Creadora de la Metodología Donado, un enfoque multiterapéutico para el abordaje integral de las personas.",
  },
];

const AREAS = [
  "Ansiedad y estrés crónico",
  "Depresión y bajo ánimo",
  "Crisis familiares y de pareja",
  "Duelo y pérdidas",
  "Trauma y TEPT",
  "Terapia EMDR y EFT",
  "Psicodiagnóstico",
  "Adicciones",
  "Dificultades en las relaciones",
  "Burnout y agotamiento emocional",
  "Cambios vitales y transiciones",
  "Hipnosis clínica",
];

const ESPECIALIDADES = [
  {
    titulo: "Psicodiagnóstico",
    desc: "Para niños, adolescentes y adultos.",
  },
  {
    titulo: "Psicoterapia familiar",
    desc: "Adolescentes y niños.",
  },
  {
    titulo: "EMDR · EFT · Hipnosis clínica",
    desc: "Brainstomping, Neuropersonalidad, Psicoterapia Floral (Italia).",
  },
  {
    titulo: "Psicoterapia Autógena",
    desc: "Autorregulación corporal, mental y Neutralización Autógena (CISSPAT Italia).",
  },
  {
    titulo: "Terapia DEI",
    desc: "Desensibilización emocional del invisible.",
  },
  {
    titulo: "Logoterapia",
    desc: "Humanista existencial (UNIR).",
  },
];

const TRAYECTORIA = [
  {
    icon: GraduationCap,
    titulo: "Doctora en Psicología Clínica",
    sub: "Universidad de Padua · Italia",
  },
  {
    icon: GraduationCap,
    titulo: "Máster en Salud Mental y Conductas Adictivas",
    sub: "Universidad de Valencia",
  },
  {
    icon: GraduationCap,
    titulo: "Especialización en Logoterapia Humanista",
    sub: "UNIR",
  },
  {
    icon: Award,
    titulo: "Ex-funcionaria del Ministerio de Salud Italiano",
    sub: "20 años en puestos de alto nivel",
  },
  {
    icon: Award,
    titulo: "Directora y Fundadora",
    sub: "Fundación Ser Humano",
  },
  {
    icon: BookOpen,
    titulo: "Diplomado en Marketing Social",
    sub: "Universidad de la Habana",
  },
];

const MODALIDADES = [
  {
    titulo: "Individual",
    descripcion: "Sesiones personales enfocadas en tu proceso de crecimiento y bienestar emocional.",
    duracion: "50 min / sesión",
    bg: "bg-[#556497]",
  },
  {
    titulo: "Familiar",
    descripcion: "Trabajo con el sistema familiar para mejorar la comunicación y resolver conflictos.",
    duracion: "60 min / sesión",
    bg: "bg-[#9483a4]",
  },
  {
    titulo: "De pareja",
    descripcion: "Acompañamiento a parejas en crisis o que desean fortalecer su vínculo.",
    duracion: "60 min / sesión",
    bg: "bg-[#e2b1ab]",
  },
];

const PROCESO = [
  {
    num: "01",
    titulo: "Primera consulta",
    descripcion: "Conversamos sobre lo que te trae, tus necesidades y lo que esperas del proceso.",
  },
  {
    num: "02",
    titulo: "Plan personalizado",
    descripcion: "Diseñamos juntos un plan terapéutico adaptado a tu situación y ritmo.",
  },
  {
    num: "03",
    titulo: "Acompañamiento continuo",
    descripcion: "Sesiones regulares donde trabajamos en profundidad hacia el cambio que buscas.",
  },
  {
    num: "04",
    titulo: "Seguimiento y cierre",
    descripcion: "Evaluamos los avances y consolidamos los recursos para sostenerlos en el tiempo.",
  },
];

export default function PsicoterapiaPage() {
  const waUrl = getWhatsappUrl(WHATSAPP_MESSAGES.nadia);

  return (
    <>
      <JsonLd data={servicePageSchema({
        name: "Dra. Nadia Donadonibus · Psicoterapeuta y Psicoanalista",
        description: "Más de 40 años acompañando procesos de sanación. Psicoterapia individual, familiar y de pareja en Guayaquil, Ecuador.",
        url: "https://www.clinicaserhumano.ec/servicios/nadia-donadonibus",
        image: "https://www.clinicaserhumano.ec/fotos/hero-nadia.webp",
      })} />
      <JsonLd data={breadcrumbSchema([
        { name: "Inicio",    url: "https://www.clinicaserhumano.ec" },
        { name: "Servicios", url: "https://www.clinicaserhumano.ec/servicios" },
        { name: "Dra. Nadia Donadonibus", url: "https://www.clinicaserhumano.ec/servicios/nadia-donadonibus" },
      ])} />
      <JsonLd data={faqSchema([
        { q: "¿Qué tipo de psicoterapia ofrece la Dra. Nadia Donadonibus?", a: "La Dra. Nadia Donadonibus ofrece psicoterapia individual, de pareja y familiar, integrando el psicoanálisis con su Metodología Donado y la Metodología Galimberti, fruto de más de 40 años de experiencia en Italia y Ecuador." },
        { q: "¿Atiende parejas y familias?", a: "Sí, la Dra. Nadia atiende procesos de psicoterapia de pareja y familiar, además de sesiones individuales, abordando conflictos relacionales, crisis y procesos de crecimiento personal." },
        { q: "¿Las sesiones son presenciales u online?", a: "Se ofrecen sesiones tanto presenciales en Guayaquil como en modalidad online, adaptándose a las necesidades y disponibilidad de cada paciente." },
        { q: "¿Cuánto dura el proceso terapéutico?", a: "La duración del proceso terapéutico varía según cada persona y sus objetivos. Tras una primera consulta de evaluación se define un plan de acompañamiento personalizado." },
      ])} />
      <JsonLd data={physicianSchema({
        name: "Dra. Nadia Donadonibus",
        description: "Psicoterapeuta y psicoanalista con más de 40 años de experiencia en Italia y Ecuador. Creadora de la Metodología Donado.",
        url: "https://www.clinicaserhumano.ec/servicios/nadia-donadonibus",
        image: "https://www.clinicaserhumano.ec/fotos/hero-nadia.webp",
        jobTitle: "Psicoterapeuta · Psicoanalista · Ms.C",
        specialty: "Psychology",
      })} />
      {/* ── HERO ── */}
      <section className="relative min-h-[640px] overflow-hidden lg:min-h-[700px]">
        <Reveal mode="load" y={0} scale={1.08} className="absolute inset-0">
          <Image
            src="/fotos/hero-nadia.webp"
            alt="Dra. Nadia Donadonibus - Psicoterapeuta"
            fill
            priority
            className="object-cover object-[70%_15%] lg:object-center"
          />
        </Reveal>
        {/* Móvil: degradado de abajo hacia arriba, deja el rostro visible arriba */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#556497]/90 via-[#556497]/50 to-[#556497]/20 lg:hidden" />
        {/* Desktop: degradado izquierda → transparente */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-[#556497]/90 from-0% via-[#556497]/30 via-[40%] to-transparent to-[62%] lg:block" />

        <div className="relative z-10 mx-auto flex min-h-[640px] max-w-6xl items-center px-6 py-24 lg:min-h-[700px]">
          <div className="max-w-lg">
            <Image
              src="/logos/dranadia2.png"
              alt="Nadia Donadonibus"
              width={400}
              height={140}
              className="mb-6 h-auto w-52"
            />
            <Reveal mode="load">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#e2b1ab]">
                Psicoterapeuta · Psicoanalista · Ms.C
              </p>
            </Reveal>
            <Reveal mode="load" delay={0.15}>
              <h1 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
                Un espacio seguro<br />para sanar.
              </h1>
            </Reveal>
            <Reveal mode="load" delay={0.3}>
              <p className="mt-5 text-lg leading-relaxed text-white/85">
                Más de 40 años acompañando a personas y familias en Italia y Ecuador,
                desde la calma, la comprensión y el rigor clínico.
              </p>
            </Reveal>
            <Reveal mode="load" delay={0.45} className="mt-8 flex flex-wrap gap-4">
              <Button
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-[#e2b1ab] !text-[#556497] hover:!bg-[#d9a09a]"
              >
                Te espero en mi consulta
              </Button>
              <Button href="#proceso" variant="secondary" size="lg">
                Cómo funciona
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOBRE NADIA ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_420px]">

            <Reveal>
              <span className="inline-block rounded-full bg-[#e2b1ab]/30 px-4 py-1.5 text-sm font-bold text-[#556497]">
                Sobre Nadia
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#606265] md:text-4xl">
                Más de cuatro décadas<br />acompañando procesos<br />de vida.
              </h2>
              <p className="mt-5 leading-relaxed text-[#606265]/75">
                Soy psicoterapeuta y psicoanalista, especializada en psicosomática y salud mental.
                He trabajado durante más de 40 años en Italia y Ecuador, acompañando a personas,
                familias y parejas en sus momentos más difíciles — desde la presencia humana genuina,
                no desde la distancia técnica.
              </p>
              <p className="mt-4 leading-relaxed text-[#606265]/75">
                Soy creadora de la <strong className="text-[#556497]">Metodología Donado</strong>,
                un abordaje multiterapéutico de las adicciones. Además he sido perito de tribunal
                eclesiástico, articulista, docente universitaria y conferencista.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[#e2b1ab]/40 pt-8">
                {[
                  { num: "40+", label: "Años de experiencia" },
                  { num: "Dr.",  label: "Psicología Clínica · Padua" },
                  { num: "Ms.C", label: "Salud Mental · Valencia" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-3xl font-black text-[#556497]">{s.num}</p>
                    <p className="mt-1 text-xs text-[#606265]/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/nadia/nadia.webp"
                  alt="Dra. Nadia Donadonibus"
                  width={1536}
                  height={2752}
                  className="h-[560px] w-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#556497] px-6 py-4 shadow-xl">
                <p className="text-xs font-semibold text-white/70">Italia · Ecuador</p>
                <p className="text-sm font-black text-white">40+ años de trayectoria</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── TRAYECTORIA ACADÉMICA ── */}
      <section className="bg-[#f7f4f6] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#9483a4]/20 px-4 py-1.5 text-sm font-bold text-[#9483a4]">
              Trayectoria académica y profesional
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Formación y experiencia
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRAYECTORIA.map(({ icon: Icon, titulo, sub }, i) => (
              <Reveal key={titulo} delay={i * 0.08} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#556497]/10">
                  <Icon size={18} className="text-[#556497]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold leading-snug text-[#606265]">{titulo}</p>
                  <p className="mt-0.5 text-xs text-[#9483a4]">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MI ENFOQUE ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#e2b1ab]/30 px-4 py-1.5 text-sm font-bold text-[#556497]">
              Mi enfoque
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265] md:text-4xl">
              Cómo trabajo contigo
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ENFOQUE.map(({ icon: Icon, titulo, descripcion }, i) => (
              <Reveal
                key={titulo}
                delay={i * 0.1}
                className="group rounded-2xl bg-[#f7f4f6] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#556497]/10 transition-colors duration-300 group-hover:bg-[#556497]">
                  <Icon size={22} className="text-[#556497] transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                </div>
                <p className="font-bold text-[#606265]">{titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#606265]/65">{descripcion}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÁREAS DE TRABAJO ── */}
      <section className="bg-[#556497] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <Reveal>
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white">
                Áreas de trabajo
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">
                ¿En qué puedo<br />acompañarte?
              </h2>
              <div className="mt-8 grid grid-cols-2 gap-2.5">
                {AREAS.map((area, i) => (
                  <Reveal key={area} delay={i * 0.05} className="flex items-center gap-2.5">
                    <CheckCircle size={15} className="shrink-0 text-[#e2b1ab]" strokeWidth={2} />
                    <span className="text-sm text-white/85">{area}</span>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            {/* Carrusel de fotos */}
            <Reveal delay={0.15}>
              <ImageCarousel
                aspectSquare
                bgClassName="bg-[#42517d]"
                images={[
                  { src: "/nadia/IMG_0015 (1).webp", alt: "Dra. Nadia Donadonibus en sesión", objectPosition: "center 5%" },
                  { src: "/nadia/IMG_0027 (1).webp", alt: "Consulta de psicoterapia", objectPosition: "center 40%" },
                  { src: "/nadia/IMG_0030 (2) (1).webp", alt: "Dra. Nadia Donadonibus", objectPosition: "top" },
                ]}
              />
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── ESPECIALIDADES ── */}
      <section className="bg-[#f7f4f6] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#9483a4]/20 px-4 py-1.5 text-sm font-bold text-[#9483a4]">
              Especialización
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Técnicas y herramientas terapéuticas
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ESPECIALIDADES.map((e, i) => (
              <Reveal key={e.titulo} delay={i * 0.08} className="rounded-2xl border border-[#e2b1ab]/40 bg-white p-5">
                <p className="font-bold text-[#556497]">{e.titulo}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#606265]/70">{e.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODALIDADES ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#e2b1ab]/30 px-4 py-1.5 text-sm font-bold text-[#556497]">
              Modalidades
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Elige tu tipo de sesión
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {MODALIDADES.map((m, i) => (
              <Reveal
                key={m.titulo}
                delay={i * 0.12}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className={`h-2 w-full ${m.bg}`} />
                <div className="p-6">
                  <p className="text-xl font-black text-[#606265]">{m.titulo}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#606265]/65">{m.descripcion}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-[#9483a4]">
                    <Clock size={14} />
                    {m.duracion}
                  </div>
                  <Button
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    className="mt-5 w-full !bg-[#556497] hover:!bg-[#445280]"
                  >
                    Agendar
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section id="proceso" className="bg-[#f7f4f6] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal className="mb-12 text-center">
            <span className="inline-block rounded-full bg-[#9483a4]/20 px-4 py-1.5 text-sm font-bold text-[#9483a4]">
              Proceso terapéutico
            </span>
            <h2 className="mt-4 text-3xl font-black text-[#606265]">
              Así funciona nuestro trabajo juntos
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESO.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.1} className="relative">
                {i < PROCESO.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 translate-x-full bg-[#e2b1ab]/40 lg:block" />
                )}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-4xl font-black text-[#e2b1ab]">{p.num}</p>
                  <p className="mt-3 font-bold text-[#556497]">{p.titulo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#606265]/65">{p.descripcion}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOTO + CITA ── */}
      <section className="relative overflow-hidden py-0">
        <div className="grid lg:grid-cols-2">
          <Reveal scale={0.95} className="relative h-80 lg:min-h-[420px]">
            <Image
              src="/nadia/frase-nadia.webp"
              alt="Dra. Nadia Donadonibus"
              fill
              className="object-cover"
              style={{ objectPosition: "center 8%" }}
            />
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col justify-center bg-[#9483a4] px-10 py-16 lg:px-14">
            <p className="text-5xl font-black leading-none text-white/20">&ldquo;</p>
            <p className="mt-2 text-xl font-light italic leading-relaxed text-white">
              Cada persona merece un espacio donde pueda ser escuchada sin ser juzgada,
              y acompañada con respeto en su propio proceso de cambio.
            </p>
            <p className="mt-6 font-black text-white">— Nadia Donadonibus</p>
            <div className="mt-8">
              <Button
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!bg-white !text-[#9483a4] hover:!bg-white/90"
              >
                Te espero en mi consulta
                <ArrowRight size={18} className="ml-2 inline" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <ContactSection />
    </>
  );
}
