import { useEffect, useRef, useState } from 'react';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

// Íconos lineales (solo stroke, sin relleno) — estilo minimal tipo la
// referencia de sentientx.com, un ícono simple y reconocible por tarjeta.
const icons = {
  landmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M4 21V10m16 11V10M3 10l9-6 9 6M6 10v6m4-6v6m4-6v6m4-6v6" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  cap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l10 5-10 5L2 8l10-5z" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
    </svg>
  ),
  chip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="12" height="12" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9z" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
};

const networkPartners = [
  {
    title: 'Municipios y Gobiernos',
    description: 'Acercamos innovación, tecnología y formación a comunidades de todo el país.',
    icon: icons.landmark,
  },
  {
    title: 'Cámaras Empresariales e Instituciones',
    description: 'Generamos alianzas y proyectos que fortalecen el desarrollo empresarial e institucional.',
    icon: icons.briefcase,
  },
  {
    title: 'Universidades y Colegios',
    description: 'Conectamos educación, conocimiento e innovación para crear nuevas oportunidades de formación.',
    icon: icons.cap,
  },
  {
    title: 'Centros Tech e Incubadoras',
    description: 'Potenciamos talento, proyectos y emprendimientos que impulsan el futuro tecnológico.',
    icon: icons.chip,
  },
  {
    title: 'Organismos y asociaciones',
    description: 'Articulamos cooperación y alianzas para desarrollar iniciativas de impacto nacional e internacional.',
    icon: icons.globe,
  },
  {
    title: 'Empresas Tech y Sponsors',
    description: 'Creamos oportunidades de colaboración, visibilidad y participación en nuevas iniciativas tecnológicas.',
    icon: icons.monitor,
  },
];

// El CTA "Explorar" ahora es el componente compartido ui/CtaButton (mismo
// estilo/animación en todos los botones del sitio).

// Think Tank — índice editorial de líneas estratégicas (sin cards, sin íconos).
const managementAxes = [
  {
    title: 'Claustro de Innovación y Futuro',
    description: 'Espacio de pensamiento y análisis sobre el porvenir social, educativo y tecnológico.',
  },
  {
    title: 'Informes, Estudios y Contenido Estratégico',
    description: 'Publicaciones y análisis sectoriales sobre la cultura tecnológica y las nuevas generaciones.',
  },
  {
    title: 'Convenios y Articulaciones Institucionales',
    description: 'Alianzas que consolidan nuestro marco institucional y amplían el impacto del ecosistema.',
  },
];

// Misión/Visión — split hero a pantalla completa con hover/tap para expandir.
const missionVisionCards = [
  {
    key: 'mision',
    label: 'Misión',
    headline: 'Misión',
    paragraphs: [
      'Promover, formar y desarrollar las competencias del futuro en Argentina.',
      'A través de la creación de programas académicos, comunidades y espacios de articulación que permitan el crecimiento sostenible del ecosistema tecnológico en todo el territorio nacional.',
    ],
    concepts: ['Formación', 'Comunidad', 'Innovación'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Equipo colaborando en un espacio de formación',
  },
  {
    key: 'vision',
    label: 'Visión',
    headline: 'Visión',
    paragraphs: [
      'Ser la organización de referencia en la región para la investigación y desarrollo del gaming, los esports y la innovación tecnológica.',
      'Conectando a las nuevas generaciones, la educación y la tecnología bajo un marco de legitimidad.',
    ],
    concepts: ['Alcance Federal', 'Estrategia', 'Legitimidad'],
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Setup tecnológico con iluminación ambiental',
  },
];

// Card individual de Misión/Visión: título centrado en reposo, contenido
// completo en estado activo (hover en desktop, tap en mobile/touch — ver
// supportsHover() en el componente padre). flex-grow anima el ancho/alto
// (según flex-row/flex-col por breakpoint) sin tocar width/height directo,
// así el layout no "salta" y la transición es una sola propiedad animable.
function MissionVisionCard({ card, isActive, onEnter, onLeave, onClick }) {
  return (
    <div
      className="group relative h-full min-h-0 min-w-0 cursor-pointer overflow-hidden"
      style={{ flexGrow: isActive ? 1.7 : 1, transition: 'flex-grow 700ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Fondo: imagen desenfocada + overlay oscuro para legibilidad */}
      <div className="absolute inset-0">
        <img
          src={card.image}
          alt={card.imageAlt}
          className="h-full w-full scale-105 object-cover blur-sm"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-dark-100/80" />
      </div>

      {/* Divisor sutil, siempre perceptible sin importar el ancho relativo */}
      <div className="absolute inset-y-0 right-0 w-px bg-white/10" aria-hidden="true" />

      {/* Indicador de interacción — sin botón tradicional */}
      <div
        aria-hidden="true"
        className={[
          'absolute right-6 top-6 md:right-8 md:top-8 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-opacity duration-500',
          isActive ? 'opacity-0' : 'opacity-60 group-hover:opacity-100',
        ].join(' ')}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>

      {/* Título centrado — estado de reposo */}
      <div
        className={[
          'absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-out',
          isActive ? 'scale-95 opacity-0' : 'delay-150 scale-100 opacity-100',
        ].join(' ')}
      >
        <h3 className="text-5xl font-bold tracking-tight text-white md:text-6xl">{card.headline}</h3>
      </div>

      {/* Contenido completo — estado activo. Padding horizontal alineado al
          contenedor estándar del sitio (px-4 sm:px-6 lg:px-8); el vertical
          mantiene su propio ritmo, más generoso, propio de este hero full-bleed. */}
      <div
        className={[
          'absolute inset-0 flex flex-col justify-center px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16 transition-all duration-500 ease-out',
          isActive ? 'delay-150 translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
        ].join(' ')}
      >
        <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{card.label}</span>
        <p className="mb-4 text-xl font-semibold leading-snug text-white md:text-2xl">{card.paragraphs[0]}</p>
        <p className="leading-relaxed text-slate-300">{card.paragraphs[1]}</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 pt-6">
          {card.concepts.map((concept, i) => (
            <span
              key={concept}
              className={[
                'text-xs font-medium uppercase tracking-widest text-slate-400 transition-all duration-500 ease-out',
                isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: isActive ? `${300 + i * 90}ms` : '0ms' }}
            >
              {concept}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InstitutionalSection() {
  const partnersGridRef = useRef(null);
  const [linesVisible, setLinesVisible] = useState(false);
  const [activeMissionVision, setActiveMissionVision] = useState(null);
  const [activeAxis, setActiveAxis] = useState(null);

  // Hover (desktop) vs. tap (touch/mobile), compartido por Misión/Visión y
  // Think Tank: en dispositivos con hover real, el hover maneja todo el
  // estado; el click no hace nada (si no, un click mientras se está
  // hovereando colapsaría la card). En touch, el hover nunca dispara, así
  // que el tap sí togglea el estado activo.
  const supportsHover = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const handleMissionVisionEnter = (key) => {
    if (supportsHover()) setActiveMissionVision(key);
  };
  const handleMissionVisionLeave = (key) => {
    if (supportsHover()) setActiveMissionVision((prev) => (prev === key ? null : prev));
  };
  const handleMissionVisionClick = (key) => {
    if (!supportsHover()) setActiveMissionVision((prev) => (prev === key ? null : key));
  };

  // Think Tank: en reposo ningún item tiene relleno. El hover (desktop)
  // activa el item bajo el cursor y vuelve a reposo al salir. En touch no
  // hay hover, así que el tap fija/togglea el activo de forma persistente.
  const handleAxisEnter = (index) => {
    if (supportsHover()) setActiveAxis(index);
  };
  const handleAxisLeave = () => {
    if (supportsHover()) setActiveAxis(null);
  };
  const handleAxisClick = (index) => {
    if (!supportsHover()) setActiveAxis((prev) => (prev === index ? null : index));
  };

  // Scroll-reveal de las líneas divisorias de la grilla "Red de articulación":
  // threshold 0.35 + rootMargin -120px exigen que la sección esté bien entrada
  // en pantalla (no solo asomando) para disparar. Una sola vez: el observer se
  // desconecta al primer intersect, no vuelve a repetirse al scrollear arriba/abajo.
  useEffect(() => {
    const el = partnersGridRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLinesVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -120px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="institucional" className="pb-14 md:pb-20 bg-dark-100 relative border-t border-white/5">
      {/* Sin padding-top (a diferencia del resto de secciones, que usan la
          clase section-padding): con top:0 la banda blanca de "Quiénes
          somos" queda pegada al borde superior de la sección, sin la franja
          de bg-dark-100 (+ el degradé de abajo) que quedaba visible antes.
          pb-14/md:pb-20 replica el padding-bottom que daba section-padding. */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />

      {/* Bloque A: Quiénes somos — banda blanca full-bleed (única excepción
          clara del bloque, a pedido), título + párrafo en texto oscuro para
          contraste. Mismo patrón de banda que ya usan Academy/Fan/Contact
          (full-bleed + contenedor estándar adentro). */}
      <div className="relative z-10 bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sin eyebrow: era redundante (el título ya dice de qué se trata).
              Tamaño de heading unificado con el resto del sitio (mismo H2 que
              SectionHeader/Contact/News/Sponsors/Think Tank), sin mezcla de
              colores dentro del título. */}
          <h2 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-bold text-[#141310] leading-tight mb-4">
            Una asociación que conecta tecnología, conocimiento y comunidad
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-2xl">
            ADEEMA promueve y desarrolla el impacto de la cultura del gaming y las nuevas tecnologías en la
            sociedad. Articulamos comunidades, universidades, empresas e instituciones dentro de un mismo
            ecosistema de innovación y gaming con el objetivo de construir capacidades para el futuro.
          </p>
        </div>
      </div>

      {/* Bloque B: Red de articulación — grid con hover tipo "feature section"
          (ref. de estructura/interacción: feature-section-with-hover-effects),
          adaptado a la paleta oscura del sitio: degradé sutil #043766 detrás
          del item en hover, barra de acento que crece y pasa a celeste
          #55B4EB, título con micro-desplazamiento — mismo copy/íconos de
          siempre, sin esquinas redondeadas. */}
      <div className="relative z-10 border-y border-white/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Red de articulación
          </h2>
          <p className="mb-10 mt-3 max-w-2xl text-sm md:text-base text-slate-400 md:mb-14">
            Construimos vínculos estratégicos entre instituciones, empresas y comunidades para impulsar el
            desarrollo tecnológico y académico.
          </p>

          {/* Sin marco exterior: nada de línea arriba/izquierda/derecha/abajo que
              recubra todo el rectángulo — solo quedan los divisores internos entre
              tarjetas. Cada celda dibuja su propia línea derecha e inferior, pero se
              ocultan cuando esa celda cae en la última columna o última fila del
              breakpoint activo (1 columna en mobile, 2 en tablet, 3 en desktop —
              ajustado a los 6 items reales de la sección). */}
          <div ref={partnersGridRef} className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {networkPartners.map((partner, index) => {
              const isLastColTablet = index % 2 === 1;
              const isLastColDesktop = index % 3 === 2;
              const isLastRowMobile = index === networkPartners.length - 1;
              const isLastRowTablet = index >= networkPartners.length - 2;
              const isLastRowDesktop = index >= networkPartners.length - 3;

              return (
                <div key={partner.title} className="group/feature relative p-6 md:p-8">
                  {/* Degradé de hover — sutil, #043766 a baja opacidad, detrás del contenido */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#043766]/0 via-[#043766]/40 to-[#043766]/0 opacity-0 transition-opacity duration-300 group-hover/feature:opacity-100"
                  />

                  <div className="relative z-10 mb-8 h-6 w-6 text-white" aria-hidden="true">
                    {partner.icon}
                  </div>

                  <div className="relative z-10 mb-2 flex items-center gap-3">
                    {/* Barra de acento: recta (sin rounded-full), gris tenue en
                        reposo, celeste y más alta en hover. */}
                    <span
                      aria-hidden="true"
                      className="h-5 w-0.5 flex-shrink-0 bg-white/20 transition-all duration-300 group-hover/feature:h-7 group-hover/feature:bg-[#55B4EB]"
                    />
                    <h3 className="text-base md:text-lg font-medium text-white transition-transform duration-300 group-hover/feature:translate-x-2">
                      {partner.title}
                    </h3>
                  </div>
                  <p className="relative z-10 pl-[14px] text-sm text-slate-400 leading-relaxed">
                    {partner.description}
                  </p>

                  {/* Línea derecha: escala en Y desde arriba — mismo estilo sutil
                      (white/10) que el resto de separadores del sitio. Oculta en
                      la última columna del breakpoint activo (nunca en mobile,
                      que es 1 sola columna). */}
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none absolute right-0 top-0 hidden h-full w-px origin-top bg-white/10 transition-transform duration-[2500ms] ease-out',
                      linesVisible ? 'scale-y-100' : 'scale-y-0',
                      isLastColTablet ? 'sm:hidden' : 'sm:block',
                      isLastColDesktop ? 'lg:hidden' : 'lg:block',
                    ].filter(Boolean).join(' ')}
                    style={{ transitionDelay: `${index * 400}ms` }}
                  />
                  {/* Línea inferior: escala en X desde la izquierda. Oculta en la
                      última fila del breakpoint activo. */}
                  <span
                    aria-hidden="true"
                    className={[
                      'pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-white/10 transition-transform duration-[2500ms] ease-out',
                      linesVisible ? 'scale-x-100' : 'scale-x-0',
                      isLastRowMobile ? 'hidden' : 'block',
                      isLastRowTablet ? 'sm:hidden' : 'sm:block',
                      isLastRowDesktop ? 'lg:hidden' : 'lg:block',
                    ].filter(Boolean).join(' ')}
                    style={{ transitionDelay: `${index * 400 + 450}ms` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bloque D: Misión & Visión — split hero full-bleed a pantalla completa.
          Fuera del max-w-7xl a propósito (igual que el bloque "Trabajamos junto a")
          para que las dos cards ocupen el ancho completo del viewport. */}
      <div id="mision-vision" className="relative z-10 bg-dark-100">
        <div className="flex h-[100svh] w-full flex-col overflow-hidden lg:flex-row">
          {missionVisionCards.map((card) => (
            <MissionVisionCard
              key={card.key}
              card={card}
              isActive={activeMissionVision === card.key}
              onEnter={() => handleMissionVisionEnter(card.key)}
              onLeave={() => handleMissionVisionLeave(card.key)}
              onClick={() => handleMissionVisionClick(card.key)}
            />
          ))}
        </div>
      </div>

      {/* Bloque E: Think Tank — mismo patrón de dos cuadrados que Misión y
          Visión (dos columnas grandes lado a lado): izquierdo con título +
          lista de líneas estratégicas, derecho con el CTA. Sin divisor entre
          columnas. Full-bleed a propósito, igual que el bloque de Misión y Visión. */}
      <div id="think-tank" className="relative z-10 bg-dark-100">
        <div className="flex w-full flex-col lg:h-[100svh] lg:flex-row">
          {/* Cuadrado izquierdo: título arriba, lista de 3 items compacta y
              pegada al margen inferior */}
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-between overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:h-full lg:px-8 lg:py-16">
            <div>
              <Eyebrow className="mb-4">Think Tank</Eyebrow>
              {/* Mismo tamaño/fuente de heading que el resto del sitio (ver
                  ui/SectionHeader.jsx y Contact/News/Sponsors), sin tamaño custom. */}
              <h2 className="max-w-xl text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ideas que construyen el futuro.
              </h2>
            </div>

            {/* Lista de 3 items — más chica que antes, pegada al margen inferior.
                Separador solo ENTRE items: border-b en todos menos el último,
                sin border-t en el contenedor (evita la línea arriba del primero). */}
            <div>
              {managementAxes.map((axis, index) => {
                const isActive = activeAxis === index;
                const isLast = index === managementAxes.length - 1;

                return (
                  <div
                    key={axis.title}
                    className={[
                      'relative cursor-pointer overflow-hidden',
                      isLast ? '' : 'border-b border-white/15',
                    ].join(' ')}
                    onMouseEnter={() => handleAxisEnter(index)}
                    onMouseLeave={handleAxisLeave}
                    onClick={() => handleAxisClick(index)}
                  >
                    {/* Relleno tipo barra de progreso: crece desde el borde
                        izquierdo (scaleX, origin-left) hasta cubrir el 100%
                        del ancho del item — sin border-radius. */}
                    <span
                      aria-hidden="true"
                      className={[
                        'absolute inset-y-0 left-0 w-full origin-left bg-[#043766] transition-transform duration-300 ease-out',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                      ].join(' ')}
                    />

                    <div className="relative flex items-center justify-between gap-4 px-4 py-3 md:px-5 md:py-4">
                      <span
                        className={[
                          'font-bold tracking-tight transition-[transform,color] duration-300 ease-out',
                          isActive ? 'translate-x-2 text-white' : 'translate-x-0 text-slate-300',
                          'text-sm md:text-base',
                        ].join(' ')}
                      >
                        {axis.title}
                      </span>
                      <span
                        className={[
                          'flex shrink-0 items-center gap-1.5 text-xs font-medium tabular-nums tracking-wide transition-[transform,color] duration-300 ease-out',
                          isActive ? '-translate-x-2 text-[#55B4EB]/70' : 'translate-x-0 text-slate-500',
                        ].join(' ')}
                      >
                        <span aria-hidden="true">‹</span>
                        {String(index + 1).padStart(2, '0')}
                        <span aria-hidden="true">›</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cuadrado derecho: mismo esqueleto que el izquierdo (título +
              filas invisibles) para que el CTA quede exactamente a la altura
              de la fila "03 Convenios y Articulaciones Institucionales";
              alineado a la izquierda, no centrado. */}
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-between overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:h-full lg:px-8 lg:py-16">
            <div aria-hidden="true" className="invisible">
              <Eyebrow className="mb-4">Think Tank</Eyebrow>
              <h2 className="max-w-xl text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ideas que construyen el futuro.
              </h2>
            </div>

            <div>
              {managementAxes.map((axis, index) => {
                const isLast = index === managementAxes.length - 1;

                return (
                  <div
                    key={axis.title}
                    className={['relative', isLast ? '' : 'border-b border-transparent'].join(' ')}
                  >
                    {/* Fila invisible: mismas clases que la fila real de la
                        izquierda, solo para reservar exactamente el mismo alto
                        y que la fila "03" quede a la misma altura en ambos lados. */}
                    <div
                      aria-hidden="true"
                      className="invisible flex items-center justify-between gap-4 px-4 py-3 md:px-5 md:py-4"
                    >
                      <span className="text-sm font-bold tracking-tight md:text-base">{axis.title}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium tabular-nums tracking-wide">
                        <span>‹</span>
                        {String(index + 1).padStart(2, '0')}
                        <span>›</span>
                      </span>
                    </div>

                    {isLast && (
                      <div className="absolute inset-0 flex items-center px-4 md:px-5">
                        <CtaButton href="#comunidad">Sumarme al ecosistema</CtaButton>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
