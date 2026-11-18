"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Heart, HeartHandshake, type LucideIcon } from "lucide-react";

/**
 * Visión integral del bienestar: todas las especialidades que atiende la clínica,
 * catalogadas en tres dimensiones (Cuerpo · Mente · Emociones).
 * Fuentes: páginas de Neuroni, NeuroLab, Nadia Donadonibus, Programa SER y la home.
 */
type Bloque = {
  id: string;
  num: string;
  dimension: string;
  descripcion: string;
  icon: LucideIcon;
  especialidades: string[];
};

const BLOQUES: Bloque[] = [
  {
    id: "cuerpo",
    num: "01",
    dimension: "Cuerpo",
    descripcion: "Bienestar físico y regulación del sistema nervioso.",
    icon: Activity,
    especialidades: [
      "Dolor crónico",
      "Migraña",
      "Insomnio",
      "Regulación nerviosa",
      "Fatiga y agotamiento físico",
      "Trastornos psicosomáticos",
      "Dolor articular",
    ],
  },
  {
    id: "mente",
    num: "02",
    dimension: "Mente",
    descripcion: "Claridad, atención y salud mental.",
    icon: Brain,
    especialidades: [
      "Ansiedad",
      "Estrés crónico",
      "Pánico",
      "TOC",
      "TDAH",
      "Espectro autista",
      "Conducta impulsiva",
      "Pérdida de la memoria",
      "Demencia senil",
      "Bienestar cognitivo",
      "Refuerzo pedagógico",
    ],
  },
  {
    id: "emocion",
    num: "03",
    dimension: "Emociones",
    descripcion: "Calma emocional, vínculos y recuperación.",
    icon: Heart,
    especialidades: [
      "Depresión y bajo ánimo",
      "Trauma y TEPT",
      "Duelo y pérdidas",
      "Burnout y agotamiento emocional",
      "Desregulación emocional",
      "Dependencias y adicciones",
      "Conflictos de pareja",
      "Crisis familiares",
      "Dificultades en las relaciones",
      "Cambios vitales y transiciones",
    ],
  },
];

export default function BienestarIntegral() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ff6b12] via-[#ff7a26] to-[#f25500] py-20 md:py-28">
      {/* Fondo decorativo: brillos y anillos */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#ffb07a]/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#d94400]/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-16 h-40 w-40 rounded-full border border-white/25" />
      <div aria-hidden className="pointer-events-none absolute bottom-20 left-[6%] h-20 w-20 rounded-full border border-white/20" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Encabezado */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
            Cuerpo · Mente · Emociones
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
            Una visión integral del bienestar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/90 md:text-base">
            Somos especialistas en acompañar a la persona completa, con experiencia clínica y calidez humana.
          </p>
        </motion.div>

        {/* Tres bloques */}
        <div className="grid gap-6 lg:grid-cols-3">
          {BLOQUES.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.article
                key={b.id}
                initial={{ y: 24 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col rounded-3xl bg-white p-7 shadow-[0_20px_50px_-15px_rgba(120,40,0,0.45)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b12] to-[#f25500] text-white shadow-lg shadow-brand-orange/30">
                    <Icon size={28} strokeWidth={1.75} />
                  </span>
                  <span className="text-5xl font-bold leading-none text-brand-orange/15">{b.num}</span>
                </div>

                <h3 className="mt-6 text-3xl font-bold text-brand-gray-dark">{b.dimension}</h3>
                <p className="mt-1.5 text-sm text-brand-gray-dark/65">{b.descripcion}</p>

                <div className="my-6 h-px bg-gradient-to-r from-brand-orange/40 to-transparent" />

                <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  Especialistas en
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {b.especialidades.map((e) => (
                    <li
                      key={e}
                      className="rounded-full bg-brand-orange/10 px-3 py-1.5 text-[13px] font-medium text-brand-gray-dark"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Cierre */}
        <motion.div
          initial={{ y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-white/15 px-6 py-5 text-center backdrop-blur-sm sm:flex-row sm:justify-center sm:text-left"
        >
          <HeartHandshake size={26} className="shrink-0 text-white" strokeWidth={1.75} />
          <p className="text-sm text-white">
            <span className="font-bold">Sistema de cuidado integral:</span>{" "}
            un equipo que acompaña cada proceso de recuperación de forma continua.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
