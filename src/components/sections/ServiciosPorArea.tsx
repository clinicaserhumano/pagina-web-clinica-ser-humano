"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ServicioDesplegable from "@/components/ui/ServicioDesplegable";
import { Brain, Droplets, HeartHandshake, Sprout, Zap, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { SERVICIOS_AREAS, SUBMARCAS, WHATSAPP_MESSAGES, getWhatsappUrl } from "@/lib/constants";

const AREA_ICONOS: Record<(typeof SERVICIOS_AREAS)[number]["id"], LucideIcon> = {
  neuromodulacion: Zap,
  psicoterapia: HeartHandshake,
  cognitivo: Brain,
  adicciones: Sprout,
  medicina: Droplets,
};

/** Lista de todos los servicios de la institución, agrupados por área (datos en SERVICIOS_AREAS). */
export default function ServiciosPorArea() {
  // Solo un servicio desplegado a la vez en toda la lista
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <div className="divide-y divide-brand-gray-light/50 border-y border-brand-gray-light/50">
      {SERVICIOS_AREAS.map((area, i) => {
        const Icono = AREA_ICONOS[area.id];
        const marca = SUBMARCAS.find((m) => m.slug === area.marca);
        return (
          <motion.div
            key={area.id}
            initial={{ y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.05 }}
            className="grid gap-6 py-8 md:grid-cols-[300px_1fr] md:gap-10"
          >
            {/* Área */}
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                  <Icono size={22} />
                </span>
                <h3 className="text-xl font-bold text-brand-gray-dark">{area.area}</h3>
              </div>
              <p className="text-sm text-brand-gray-dark/70">{area.descripcion}</p>
              {marca && (
                <Image src={marca.logo} alt={marca.nombre} width={140} height={52} className="h-8 w-auto" />
              )}
              {area.href ? (
                <Button href={area.href} variant="ghost" size="sm" className="!px-0">
                  Conocer más →
                </Button>
              ) : (
                <Button
                  href={getWhatsappUrl(WHATSAPP_MESSAGES.medicina)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="!px-0"
                >
                  Consultar por WhatsApp →
                </Button>
              )}
            </div>

            {/* Servicios del área */}
            <ul className="grid content-start items-start gap-x-8 gap-y-1 sm:grid-cols-2">
              {area.servicios.map((s) => (
                <li key={s.nombre}>
                  <ServicioDesplegable
                    servicio={s}
                    open={abierto === `${area.id}:${s.nombre}`}
                    onToggle={() => {
                      const key = `${area.id}:${s.nombre}`;
                      setAbierto((k) => (k === key ? null : key));
                    }}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
}
