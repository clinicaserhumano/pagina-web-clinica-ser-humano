export const WHATSAPP_NUMBER = "593969520111";

export const WHATSAPP_MESSAGES = {
  home: "Hola, me gustaría obtener más información sobre sus servicios.",
  neuroni: "Hola, me interesa conocer más sobre el tratamiento de Neuromodulación.",
  neurolab: "Hola, me interesa el programa NeuroLab.",
  programaser: "Hola, quisiera información sobre el Programa SER.",
  nadia: "Hola Dra. Nadia, quisiera agendar una consulta de psicoterapia.",
} as const;

export const PHONE_NUMBER = "+593 969 520 111";
export const CLINIC_ADDRESS = "Bálsamos 210 y Todos Los Santos, Urdesa Central, Guayaquil";
export const CLINIC_HOURS = [
  { dias: "Lunes – Viernes", horario: "10:00 – 19:00" },
  { dias: "Sábados", horario: "10:00 – 16:00" },
];
export const CLINIC_MAPS_EMBED = "https://maps.google.com/maps?q=-2.1751971,-79.9077487&hl=es&z=17&output=embed";

export function getWhatsappUrl(message: string = WHATSAPP_MESSAGES.home) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/clinicaserhumanoec",
  facebook: "https://facebook.com/clinicaserhumano",
  tiktok: "https://tiktok.com/@clinicaserhumanoec",
  linkedin: "https://linkedin.com/company/clinicaserhumano",
  youtube: "https://youtube.com/@clinicaserhumano",
};

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Novedades", href: "/novedades" },
  { label: "Contacto", href: "/#contacto" },
];

export const RESP_SOCIAL_PROYECTOS = [
  {
    slug: "proyecto-renacer",
    nombre: "Proyecto Renacer",
    tagline: "Rescate y reinserción social",
    descripcion: "Programa de la Fundación Ser Humano para la prevención y recuperación de personas en situación de desequilibrio existencial, con tratamiento psicoeducacional y neurológico.",
    imagen: "/social/20191222_110757.jpg",
    href: "/responsabilidad-social/proyecto-renacer",
  },
];

export const SUBMARCAS = [
  {
    slug: "neuroni",
    nombre: "Neuroni",
    logo: "/logos/neuroni.png",
    logoBlanco: "/logos/neuroni2.png",
    descripcion: "Regulación del sistema nervioso a través de neuromodulación no invasiva, sin psicofármacos.",
    href: "/servicios/neuromodulacion",
  },
  {
    slug: "neurolab",
    nombre: "NeuroLab",
    logo: "/logos/neurolab.png",
    logoBlanco: "/logos/neurolab2.png",
    descripcion: "Estimulación cognitiva sensorial para memoria, atención y bienestar cognitivo.",
    href: "/servicios/neurolab",
  },
  {
    slug: "nadia-donadonibus",
    nombre: "Nadia Donadonibus",
    logo: "/logos/dranadia.png",
    logoBlanco: "/logos/dranadia2.png",
    descripcion: "Psicoterapia y acompañamiento emocional desde la calma y la comprensión.",
    href: "/servicios/nadia-donadonibus",
  },
  {
    slug: "programa-ser",
    nombre: "Programa SER",
    logo: "/logos/programaser.png",
    logoBlanco: "/logos/programaser2.png",
    descripcion: "Acompañamiento integral en conductas adictivas y recuperación funcional.",
    href: "/servicios/programa-ser",
  },
];

export const VIDEO_SLIDES: string[][] = [
  ["DL97-pb3ieM", "5W9LckuGGkE", "EgY0rd7mfvs"],
  ["JYil59j1Rh8", "KJ39RMnbsWw", "g-a43y-GKy8"],
  ["Z6hhPjRoU9s", "GecMDq9yFsQ", "oo3Q101XhKU"],
  ["SeCFKfE52TA", "MiDG2DELIkw", "8Eeh5PkbQPE"],
];

export const UNIVERSIDADES = [
  {
    nombre: "Universidad Casa Grande",
    logo: "/logos/universidadcasagrande.png",
    width: 1551,
    height: 657,
    displayH: 42,  // wide 2.36:1 → renders ~99×42px
  },
  {
    nombre: "Universidad de La Habana",
    logo: "/logos/universidaddelahabana.png",
    width: 320,
    height: 320,
    displayH: 72,  // square 1:1 → 72×72px (taller to compensate)
  },
  {
    nombre: "Universidad Del Río",
    logo: "/logos/universidaddelrio.png",
    width: 447,
    height: 447,
    displayH: 68,  // square 1:1 → 68×68px
  },
  {
    nombre: "Universidad Ecotec",
    logo: "/logos/universidadecotec.png",
    width: 569,
    height: 214,
    displayH: 40,  // wide 2.66:1 → renders ~106×40px
  },
  {
    nombre: "Universidad Espíritu Santo",
    logo: "/logos/universidadespiritusanto.png",
    width: 1800,
    height: 1200,
    displayH: 56,  // 1.5:1 → renders ~84×56px
  },
  {
    nombre: "Universidad Internacional de La Rioja (UNIR)",
    logo: "/logos/universidadunir.png",
    width: 900,
    height: 255,
    displayH: 40,  // wide 3.53:1 → renders ~141×40px
  },
];

export const EQUIPO = [
  {
    nombre: "Dra. Sara Ochoa",
    foto: "/fotos/especialista-sara.webp",
    cargo: "Dirección General",
    descripcion: "Lidera la visión integral de Ser Humano, acompañando procesos de bienestar desde la cercanía y la claridad.",
  },
  {
    nombre: "Nat. Fabián Ochoa",
    foto: "/fotos/especialista-fabian.webp",
    cargo: "Director General",
    descripcion: "Orienta el enfoque clínico de la institución desde la precisión y el acompañamiento humano.",
  },
  {
    nombre: "Dra. Nadia Donadonibus",
    foto: "/fotos/especialista-nadia.webp",
    cargo: "Psicoterapeuta",
    descripcion: "Acompaña procesos de bienestar emocional desde la psicoterapia y la escucha activa.",
  },
];
