import Image from "next/image";
import { getAutorBlog } from "@/lib/constants";

/** Foto pequeña + nombre del autor de un artículo */
export default function AutorBadge({
  autor,
  size = "md",
  className = "",
}: {
  autor: string | null | undefined;
  size?: "sm" | "md";
  className?: string;
}) {
  const a = getAutorBlog(autor);
  const px = size === "sm" ? 22 : 32;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={a.foto}
        alt={a.nombre}
        width={px}
        height={px}
        className="shrink-0 rounded-full object-cover ring-2 ring-white/70"
        style={{ width: px, height: px }}
      />
      <span className="leading-tight">
        <span className="block font-medium">{a.nombre}</span>
        {size === "md" && <span className="block text-[11px] opacity-70">{a.cargo}</span>}
      </span>
    </span>
  );
}
