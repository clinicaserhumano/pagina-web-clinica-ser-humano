"use client";

import Image from "next/image";
import { AUTORES_BLOG } from "@/lib/constants";

/** Selector de autor del artículo: tarjetas con la foto de cada especialista. */
export default function AutorSelector({ value, onChange }: { value: string; onChange: (nombre: string) => void }) {
  return (
    <div role="radiogroup" aria-label="Autor del artículo" className="flex flex-col gap-1.5">
      {AUTORES_BLOG.map((a) => {
        const activo = value === a.nombre;
        return (
          <button
            key={a.nombre}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => onChange(a.nombre)}
            className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left transition-colors ${
              activo ? "border-[#ff6b12] bg-[#ff6b12]/[0.06]" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image
              src={a.foto}
              alt=""
              width={32}
              height={32}
              className={`h-8 w-8 shrink-0 rounded-full object-cover ${activo ? "ring-2 ring-[#ff6b12]" : ""}`}
            />
            <span className="min-w-0">
              <span className={`block truncate text-[12px] font-semibold ${activo ? "text-[#ff6b12]" : "text-gray-700"}`}>{a.nombre}</span>
              <span className="block truncate text-[10px] text-gray-400">{a.cargo}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
