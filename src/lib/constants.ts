export const WHATSAPP_NUMBER = "593969520111";

export const WHATSAPP_MESSAGES = {
  home: "Hola, me gustaría obtener más información sobre sus servicios.",
  neuroni: "Hola, me interesa conocer más sobre el tratamiento de Neuromodulación.",
  neurolab: "Hola, me interesa el programa NeuroLab.",
  programaser: "Hola, quisiera información sobre el Programa SER.",
  nadia: "Hola Dra. Nadia, quisiera agendar una consulta de psicoterapia.",
  medicina: "Hola, quisiera información sobre medicina funcional y regenerativa (sueroterapia, ozono, PRP).",
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
    imagen: "/social/20191222_110757.webp",
    href: "/responsabilidad-social/proyecto-renacer",
  },
];

export const SUBMARCAS = [
  {
    slug: "neuroni",
    nombre: "Neuroni",
    logo: "/logos/neuroni.webp",
    logoBlanco: "/logos/neuroni2.webp",
    descripcion: "Regulación del sistema nervioso a través de neuromodulación no invasiva, sin psicofármacos.",
    href: "/servicios/neuromodulacion",
  },
  {
    slug: "neurolab",
    nombre: "NeuroLab",
    logo: "/logos/neurolab.webp",
    logoBlanco: "/logos/neurolab2.webp",
    descripcion: "Estimulación cognitiva sensorial para memoria, atención y bienestar cognitivo.",
    href: "/servicios/neurolab",
  },
  {
    slug: "nadia-donadonibus",
    nombre: "Nadia Donadonibus",
    logo: "/logos/dranadia.webp",
    logoBlanco: "/logos/dranadia2.webp",
    descripcion: "Psicoterapia y acompañamiento emocional desde la calma y la comprensión.",
    href: "/servicios/nadia-donadonibus",
  },
  {
    slug: "programa-ser",
    nombre: "Programa SER",
    logo: "/logos/programaser.webp",
    logoBlanco: "/logos/programaser-blanco.webp",
    descripcion: "Acompañamiento integral en conductas adictivas y recuperación funcional.",
    href: "/servicios/programa-ser",
  },
];

// Sección "Nuestros servicios" de la home: todos los servicios agrupados por área.
// `marca` apunta al slug de SUBMARCAS (muestra su logo); sin marca, el CTA va a WhatsApp.
export type Servicio = { nombre: string; descripcion: string };

export const SERVICIOS_AREAS = [
  {
    id: "neuromodulacion",
    area: "Neuromodulación",
    marca: "neuroni",
    descripcion: "Regulación del sistema nervioso sin psicofármacos.",
    href: "/servicios/neuromodulacion",
    servicios: [
      { nombre: "Neuromodulación no invasiva", descripcion: "Técnica que regula la actividad del sistema nervioso mediante estímulos externos, sin agujas, sin cirugía y sin psicofármacos. Actúa sobre los circuitos neurales para restaurar su equilibrio." },
      { nombre: "Estimulación eléctrica transcraneal", descripcion: "Corrientes eléctricas muy suaves aplicadas sobre el cuero cabelludo para modular la actividad de zonas específicas del cerebro. Es indolora y forma parte de nuestros protocolos de neuromodulación." },
      { nombre: "Estimulación magnética transcraneal", descripcion: "Uso de campos magnéticos para estimular, de forma no invasiva, regiones concretas del cerebro y favorecer la regulación del ánimo y la conducta." },
      { nombre: "Estimulación del nervio vago", descripcion: "Estimulación suave del nervio vago, clave en la respuesta de calma del organismo, para reducir la ansiedad y favorecer la regulación del sistema nervioso." },
      { nombre: "Ansiedad, depresión y estrés", descripcion: "Protocolos personalizados de neuromodulación para recuperar calma y estabilidad emocional, sin depender de medicamentos." },
      { nombre: "Insomnio y migraña", descripcion: "Regulación del sistema nervioso para mejorar la calidad del sueño y reducir la frecuencia e intensidad de los dolores de cabeza." },
      { nombre: "TDAH y conducta impulsiva", descripcion: "Acompañamiento para mejorar la atención, el autocontrol y la regulación de impulsos, con un protocolo adaptado a cada perfil neurológico." },
    ],
  },
  {
    id: "psicoterapia",
    area: "Psicoterapia",
    marca: "nadia-donadonibus",
    descripcion: "Acompañamiento emocional desde la calma y la comprensión.",
    href: "/servicios/nadia-donadonibus",
    servicios: [
      { nombre: "Psicodiagnóstico", descripcion: "Evaluación psicológica para niños, adolescentes y adultos que permite comprender lo que ocurre y definir el plan terapéutico más adecuado." },
      { nombre: "Psicoterapia individual", descripcion: "Sesiones personales enfocadas en tu proceso de crecimiento y bienestar emocional, de forma presencial en Guayaquil u online." },
      { nombre: "Terapia de pareja", descripcion: "Acompañamiento a parejas en crisis o que desean fortalecer su vínculo, mejorando la comunicación y la comprensión mutua." },
      { nombre: "Psicoterapia familiar, niños y adolescentes", descripcion: "Trabajo con el sistema familiar para mejorar la comunicación y resolver conflictos, con atención especial a niños y adolescentes." },
      { nombre: "EMDR y EFT", descripcion: "EMDR (desensibilización y reprocesamiento por movimientos oculares) y EFT (técnica de liberación emocional) ayudan a procesar experiencias difíciles y reducir su carga emocional." },
      { nombre: "Hipnosis clínica", descripcion: "Uso terapéutico de un estado de concentración profunda para trabajar emociones, hábitos y síntomas, siempre de forma consciente y acompañada." },
      { nombre: "Psicoterapia autógena", descripcion: "Técnicas de autorregulación corporal y mental, y de Neutralización Autógena, según la escuela CISSPAT de Italia." },
      { nombre: "Terapia DEI", descripcion: "Desensibilización Emocional del Invisible: un abordaje para trabajar cargas emocionales que no siempre se reconocen a simple vista." },
      { nombre: "Logoterapia", descripcion: "Enfoque humanista existencial que acompaña a la persona a encontrar sentido y propósito en su vida, incluso en los momentos difíciles." },
    ],
  },
  {
    id: "cognitivo",
    area: "Bienestar cognitivo",
    marca: "neurolab",
    descripcion: "Estimulación para memoria, atención y autonomía.",
    href: "/servicios/neurolab",
    servicios: [
      { nombre: "Evaluación cognitiva", descripcion: "Valoración inicial de la memoria, la atención y otras funciones cognitivas para diseñar un plan personalizado." },
      { nombre: "Estimulación cognitiva sensorial", descripcion: "Programa que combina estimulación multisensorial y ejercicios neurocognitivos para fortalecer la memoria, la atención y el bienestar mental. Presencial o remoto." },
      { nombre: "Memoria y demencia senil", descripcion: "Ejercicios para mantener la agilidad mental en adultos mayores y acompañar el deterioro cognitivo leve, mejorando la autonomía y la calidad de vida." },
      { nombre: "Refuerzo pedagógico", descripcion: "Apoyo a niños y jóvenes con dificultades de aprendizaje, fortaleciendo la atención, la memoria y los hábitos de estudio." },
      { nombre: "TDAH y espectro autista", descripcion: "Estimulación cognitiva adaptada para mejorar la atención, la regulación emocional y la autonomía en el día a día." },
      { nombre: "Estimulación cognitiva en salud mental", descripcion: "Programa para personas con una condición de salud mental que fortalece el funcionamiento diario, la motivación y la capacidad de decisión." },
    ],
  },
  {
    id: "adicciones",
    area: "Conductas adictivas",
    marca: "programa-ser",
    descripcion: "Recuperación integral, ambulatoria y reservada.",
    href: "/servicios/programa-ser",
    servicios: [
      { nombre: "Evaluación y diagnóstico", descripcion: "Primera etapa del programa: conocemos la historia de la persona y su entorno para definir un plan de recuperación a su medida." },
      { nombre: "Detox físico y mental", descripcion: "Medicina funcional y ortomolecular aplicada a la desintoxicación y a la restauración integral del organismo." },
      { nombre: "Terapia individual y grupal", descripcion: "Abordaje que combina educación emocional, terapia grupal e individual para la recuperación de conductas adictivas." },
      { nombre: "Gimnasia psicofísica", descripcion: "Ejercicio guiado que integra cuerpo y mente para liberar tensión, mejorar el autocontrol y acompañar la recuperación." },
      { nombre: "Plan nutricional", descripcion: "Alimentación adaptada a cada persona para apoyar la recuperación física y el equilibrio del sistema nervioso." },
      { nombre: "Prevención de recaídas", descripcion: "Seguimiento y mantenimiento tras el tratamiento, con integración de la personalidad y neuromodulación para sostener los avances." },
    ],
  },
  {
    id: "medicina",
    area: "Medicina funcional y regenerativa",
    marca: null,
    descripcion: "El cuerpo y la mente, tratados como un todo.",
    href: null,
    servicios: [
      { nombre: "Medicina funcional e integrativa", descripcion: "Busca el origen de los síntomas y atiende a la persona como un todo, integrando su salud física, mental y emocional." },
      { nombre: "Medicina ortomolecular", descripcion: "Uso de vitaminas, minerales y nutrientes en las dosis que el organismo necesita para recuperar su equilibrio." },
      { nombre: "Medicina regenerativa: PRP y ácido hialurónico", descripcion: "Plasma rico en plaquetas y ácido hialurónico para favorecer la recuperación de las articulaciones y aliviar el dolor." },
      { nombre: "Sueroterapia", descripcion: "Sueros con nutrientes que apoyan la relajación, la energía, la vitalidad, el ánimo y la digestión." },
      { nombre: "Ozono hiperbárico", descripcion: "Terapia con ozono médico, parte de nuestra medicina regenerativa, orientada a reducir la inflamación y la sensación de agotamiento." },
      { nombre: "Tratamiento del dolor crónico", descripcion: "Abordaje integral del dolor persistente que combina medicina funcional y regulación del sistema nervioso." },
    ],
  },
] as const satisfies readonly {
  id: string;
  area: string;
  marca: string | null;
  descripcion: string;
  href: string | null;
  servicios: readonly Servicio[];
}[];

export const VIDEO_SLIDES: string[][] = [
  // Ansiedad y depresión · Nervio vago · Medicina regenerativa
  ["Z6hhPjRoU9s", "5W9LckuGGkE", "EgY0rd7mfvs"],
];

// Logos recortados al contenido (sin márgenes vacíos). El tamaño se calcula
// por ÁREA visual igual, no por altura igual: así un logo cuadrado y uno muy
// ancho se perciben del mismo "peso". LOGO_MAX_H limita los logos cuadrados.
const LOGO_AREA = 13000; // px² en desktop (en mobile se escala con CSS)
const LOGO_MAX_H = 96;
const logoH = (w: number, h: number) =>
  Math.round(Math.min(LOGO_MAX_H, Math.sqrt(LOGO_AREA / (w / h))));

export const UNIVERSIDADES = [
  { nombre: "Universidad Casa Grande", logo: "/logos/universidadcasagrande.webp", width: 800, height: 253 },
  { nombre: "Universidad de La Habana", logo: "/logos/universidaddelahabana.webp", width: 200, height: 200 },
  { nombre: "Universidad Del Río", logo: "/logos/universidaddelrio.webp", width: 356, height: 141 },
  { nombre: "Universidad Ecotec", logo: "/logos/universidadecotec.webp", width: 507, height: 169 },
  { nombre: "Universidad Espíritu Santo", logo: "/logos/universidadespiritusanto.webp", width: 800, height: 298 },
  { nombre: "Universidad Internacional de La Rioja (UNIR)", logo: "/logos/universidadunir.webp", width: 800, height: 199 },
  { nombre: "Universidad Laica Vicente Rocafuerte de Guayaquil", logo: "/logos/universidadulvr.webp", width: 556, height: 118 },
  { nombre: "Universidad Hemisferios", logo: "/logos/universidadhemisferios.webp", width: 800, height: 574, escala: 0.83 },
].map(({ escala = 1, ...u }: { nombre: string; logo: string; width: number; height: number; escala?: number }) => ({
  ...u,
  displayH: Math.round(logoH(u.width, u.height) * escala),
}));

export const EQUIPO = [
  {
    nombre: "Dra. Sara Ochoa",
    foto: "/fotos/especialista-sara.webp",
    objPos: "center 37%",
    zoom: 1.8,
    zoomX: 50,
    cargo: "Dirección General",
    descripcion: "Lidera la visión integral de Ser Humano, acompañando procesos de bienestar desde la cercanía y la claridad.",
  },
  {
    nombre: "Nat. Fabián Ochoa",
    foto: "/fotos/especialista-fabian.webp",
    objPos: "center 70%",
    zoom: 1.9,
    zoomX: 40,
    cargo: "Director General",
    descripcion: "Orienta el enfoque clínico de la institución desde la precisión y el acompañamiento humano.",
  },
  {
    nombre: "Dra. Nadia Donadonibus",
    foto: "/fotos/especialista-nadia.webp",
    objPos: "50% 23%",
    zoom: 2.5,
    zoomX: 55,
    cargo: "Psicoterapeuta",
    descripcion: "Acompaña procesos de bienestar emocional desde la psicoterapia y la escucha activa.",
  },
];

/* ── Autores del blog (/novedades) ─────────────────────────────────────────
   Se eligen en el panel al crear/editar un artículo; su foto aparece junto al nombre. */
export const AUTORES_BLOG = [
  { nombre: "Dra. Sara Ochoa", cargo: "Dirección General", foto: "/team/avatar-sara.webp" },
  { nombre: "Nat. Fabián Ochoa", cargo: "Director General", foto: "/team/avatar-fabian.webp" },
  { nombre: "Dra. Nadia Donadonibus", cargo: "Psicoterapeuta", foto: "/team/avatar-nadia.webp" },
  { nombre: "Clínica Ser Humano", cargo: "Equipo Ser Humano", foto: "/apple-icon-180x180.png" },
] as const;

export type AutorBlog = (typeof AUTORES_BLOG)[number];

/** Devuelve el autor por su nombre (o el genérico "Clínica Ser Humano") */
export function getAutorBlog(nombre: string | null | undefined): AutorBlog {
  return AUTORES_BLOG.find((a) => a.nombre === nombre) ?? AUTORES_BLOG[AUTORES_BLOG.length - 1];
}
