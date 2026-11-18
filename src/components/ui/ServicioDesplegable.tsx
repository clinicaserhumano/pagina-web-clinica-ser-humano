"use client";

import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getWhatsappUrl, type Servicio } from "@/lib/constants";

/** Servicio con punto naranja: al hacer clic despliega su descripción debajo.
 *  Es controlado por el padre para que solo haya uno abierto a la vez. */
export default function ServicioDesplegable({
  servicio,
  open,
  onToggle,
  size = "md",
}: {
  servicio: Servicio;
  open: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
}) {
  const panelId = useId();

  return (
    <div
      className={`-mx-2 rounded-xl transition-colors ${open ? "bg-brand-orange/[0.07]" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`group flex w-full items-start gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:text-brand-orange ${
          open ? "text-brand-orange" : "text-brand-gray-dark"
        } ${size === "sm" ? "text-sm" : "text-[15px]"}`}
      >
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
        <span className="flex-1 font-medium">{servicio.nombre}</span>
        <ChevronDown
          size={16}
          aria-hidden
          className={`mt-[2px] shrink-0 text-brand-orange/50 transition-transform duration-300 group-hover:text-brand-orange ${
            open ? "rotate-180 text-brand-orange" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-[26px] pr-3">
              <p className="text-sm leading-relaxed text-brand-gray-dark/75">{servicio.descripcion}</p>
              <a
                href={getWhatsappUrl(`Hola, quisiera información sobre ${servicio.nombre}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[13px] font-semibold text-brand-orange hover:text-[#e25c08]"
              >
                Consultar por WhatsApp →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
