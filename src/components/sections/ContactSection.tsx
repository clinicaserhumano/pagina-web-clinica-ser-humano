"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { PHONE_NUMBER, CLINIC_ADDRESS, CLINIC_HOURS, CLINIC_MAPS_EMBED } from "@/lib/constants";
import { pushEvent } from "@/lib/gtm";
import { fbqEvent, capiEvent, generateEventId } from "@/lib/meta";

const CODIGOS_PAIS = [
  { code: "+593", label: "EC +593" },
  { code: "+57",  label: "CO +57" },
  { code: "+51",  label: "PE +51" },
  { code: "+58",  label: "VE +58" },
  { code: "+52",  label: "MX +52" },
  { code: "+54",  label: "AR +54" },
  { code: "+56",  label: "CL +56" },
  { code: "+1",   label: "US +1" },
  { code: "+34",  label: "ES +34" },
];

type Status = "idle" | "loading" | "ok" | "error";

interface Errors {
  nombre?: string;
  telefono?: string;
  mensaje?: string;
  consentimiento?: string;
}

const inputClass =
  "w-full rounded-xl border border-brand-gray-light/60 bg-brand-base px-4 py-3 text-sm text-brand-gray-dark placeholder:text-brand-gray-dark/40 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange";

const inputErrorClass =
  "w-full rounded-xl border border-red-400 bg-red-50 px-4 py-3 text-sm text-brand-gray-dark placeholder:text-brand-gray-dark/40 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400";

export default function ContactSection() {
  const [nombre, setNombre]           = useState("");
  const [codigo, setCodigo]           = useState("+593");
  const [telefono, setTelefono]       = useState("");
  const [mensaje, setMensaje]         = useState("");
  const [consentimiento, setConsent]  = useState(false);
  const [status, setStatus]           = useState<Status>("idle");
  const [errors, setErrors]           = useState<Errors>({});

  const validate = (): boolean => {
    const e: Errors = {};
    if (!nombre.trim() || nombre.trim().length < 2)
      e.nombre = "Ingresa tu nombre completo.";
    const soloDigitos = telefono.replace(/\D/g, "");
    if (!soloDigitos || soloDigitos.length < 6)
      e.telefono = "Ingresa un número de teléfono válido.";
    if (!mensaje.trim() || mensaje.trim().length < 5)
      e.mensaje = "Escribe un mensaje de al menos 5 caracteres.";
    if (!consentimiento)
      e.consentimiento = "Debes aceptar la política de protección de datos para continuar.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          telefono: `${codigo} ${telefono.trim()}`,
          mensaje: mensaje.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      pushEvent("contact_form_submit");
      const eventId = generateEventId();
      fbqEvent("Lead", {}, eventId);
      capiEvent({ event_name: "Lead", event_id: eventId, event_source_url: window.location.href });
      setNombre(""); setTelefono(""); setMensaje("");
      setCodigo("+593"); setConsent(false); setErrors({});
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="bg-brand-base overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brand-gray-dark md:text-4xl">
            Contáctanos
          </h2>
          <p className="mt-3 text-sm text-brand-gray-dark/70">
            Cuéntanos qué necesitas y te respondemos a la brevedad.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Formulario */}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            {status === "ok" ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 text-3xl text-brand-orange">
                  ✓
                </div>
                <p className="text-lg font-medium text-brand-gray-dark">
                  ¡Mensaje enviado!
                </p>
                <p className="text-sm text-brand-gray-dark/70">
                  Nos pondremos en contacto contigo muy pronto.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-brand-orange hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* Nombre */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-gray-dark">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => { setNombre(e.target.value); setErrors(p => ({ ...p, nombre: undefined })); }}
                    placeholder="Tu nombre completo"
                    className={errors.nombre ? inputErrorClass : inputClass}
                  />
                  {errors.nombre && (
                    <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                  )}
                </div>

                {/* Teléfono con código de país */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-gray-dark">
                    Número de teléfono
                  </label>
                  <div className={`flex overflow-hidden rounded-xl border ${errors.telefono ? "border-red-400 bg-red-50" : "border-brand-gray-light/60 bg-brand-base"} focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange`}>
                    <select
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      className="w-28 shrink-0 bg-transparent py-3 pl-3 pr-1 text-xs text-brand-gray-dark focus:outline-none sm:w-auto sm:text-sm"
                    >
                      {CODIGOS_PAIS.map((p) => (
                        <option key={p.code} value={p.code}>{p.label}</option>
                      ))}
                    </select>
                    <div className="my-3 w-px bg-brand-gray-light/60" />
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^\d\s\-]/g, "");
                        setTelefono(val);
                        setErrors(p => ({ ...p, telefono: undefined }));
                      }}
                      placeholder="999 999 999"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-brand-gray-dark placeholder:text-brand-gray-dark/40 focus:outline-none"
                    />
                  </div>
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-500">{errors.telefono}</p>
                  )}
                </div>

                {/* Mensaje */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-brand-gray-dark">
                    ¿En qué podemos ayudarte?
                  </label>
                  <textarea
                    rows={4}
                    value={mensaje}
                    onChange={(e) => { setMensaje(e.target.value); setErrors(p => ({ ...p, mensaje: undefined })); }}
                    placeholder="Cuéntanos brevemente lo que necesitas..."
                    className={`resize-none ${errors.mensaje ? inputErrorClass : inputClass}`}
                  />
                  {errors.mensaje ? (
                    <p className="mt-1 text-xs text-red-500">{errors.mensaje}</p>
                  ) : (
                    <p className="mt-1.5 text-xs text-brand-gray-dark/45">
                      Describe brevemente tu consulta. No es necesario incluir diagnósticos ni información médica detallada en este momento.
                    </p>
                  )}
                </div>

                {/* Consentimiento LOPDP */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentimiento}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors(p => ({ ...p, consentimiento: undefined }));
                      }}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-orange"
                    />
                    <span className="text-xs leading-relaxed text-brand-gray-dark/70">
                      He leído y acepto la{" "}
                      <Link href="/politica-de-privacidad" className="text-brand-orange underline underline-offset-2 hover:text-brand-orange/80" target="_blank">
                        Política de Protección de Datos Personales
                      </Link>{" "}
                      y autorizo el tratamiento de mis datos para atender mi solicitud.
                    </span>
                  </label>
                  {errors.consentimiento && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.consentimiento}</p>
                  )}
                </div>

                {status === "error" && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
                    Hubo un error al enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-brand-orange py-3 text-base font-medium text-white transition-colors hover:bg-[#e25c08] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>

          {/* Mapa + datos */}
          <div className="flex flex-col gap-6">
            <div className="h-72 overflow-hidden rounded-2xl shadow-sm lg:h-full lg:min-h-[360px]">
              <iframe
                src={CLINIC_MAPS_EMBED}
                title="Ubicación Clínica Ser Humano"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ maxWidth: "100%" }}
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-orange" />
                <p className="text-sm text-brand-gray-dark">{CLINIC_ADDRESS}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-orange" />
                <a href={`tel:+${PHONE_NUMBER.replace(/\s/g, "")}`} className="text-sm text-brand-gray-dark hover:text-brand-orange" onClick={() => pushEvent("phone_click", { location: "contact_section" })}>
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-brand-orange" />
                <div className="flex flex-col gap-0.5">
                  {CLINIC_HOURS.map((h) => (
                    <p key={h.dias} className="text-sm text-brand-gray-dark">
                      <span className="font-medium">{h.dias}:</span> {h.horario}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
