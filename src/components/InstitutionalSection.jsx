import { useEffect, useRef, useState } from 'react';
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
} from './ui/CardCurtainReveal';
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

// Misión/Visión — cards compactas con efecto "Curtain Reveal" (hover en
// desktop, tap en touch/mobile), ver Bloque D más abajo.
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

export default function InstitutionalSection() {
  const partnersGridRef = useRef(null);
  const [linesVisible, setLinesVisible] = useState(false);

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
    <section id="institucional" className="bg-dark-100 relative border-t border-white/5">
      {/* Sin padding-top/bottom en la sección (a diferencia del resto de
          secciones, que usan la clase section-padding): con top:0 la banda
          blanca de "Quiénes somos" queda pegada al borde superior, y cada
          bloque interno (A, B, D) maneja su propio padding vertical. */}
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
          <h2 className="max-w-3xl text-3xl md:text-4xl lg:text-5xl font-medium text-[#141310] leading-tight mb-4">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
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
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/40 to-surface/0 opacity-0 transition-opacity duration-300 group-hover/feature:opacity-100"
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

      {/* Bloque D: Misión & Visión — dos cards compactas con efecto "Curtain
          Reveal" (ref. card-curtain-reveal de 21st.dev, ver
          components/ui/CardCurtainReveal.jsx). A diferencia del split hero
          full-bleed anterior, el contenido (título + descripción) queda
          siempre visible; solo el título se desplaza sutil y la foto del
          footer se revela en cortina al hacer hover/tap. */}
      <div id="mision-vision" className="relative z-10 border-t border-white/5 bg-dark-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {missionVisionCards.map((card) => (
              <CardCurtainReveal
                key={card.key}
                className="h-[380px] rounded-medium border border-white/10 bg-surface md:h-[420px]"
              >
                <CardCurtainRevealBody className="p-6 md:p-8">
                  <Eyebrow>{card.label}</Eyebrow>
                  <CardCurtainRevealTitle
                    shift={14}
                    className="mt-5 text-2xl font-medium leading-tight text-white md:text-3xl"
                  >
                    {card.headline}
                  </CardCurtainRevealTitle>
                  <p className="mt-4 text-sm font-semibold leading-snug text-white md:text-base">
                    {card.paragraphs[0]}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{card.paragraphs[1]}</p>

                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4">
                    {card.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-[11px] font-medium uppercase tracking-widest text-slate-400"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </CardCurtainRevealBody>

                {/* Footer: foto revelada en cortina desde el centro. La capa
                    CardCurtain con mix-blend-difference usa el navy de
                    marca (bg-surface, a pedido) — si contra la paleta de
                    ADEEMA se ve rara/ilegible, sacar esa capa y dejar solo
                    el reveal de la imagen (ya funciona sola). */}
                <CardCurtainRevealFooter className="h-28 shrink-0 overflow-hidden md:h-32">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <CardCurtain className="bg-surface mix-blend-difference" />
                </CardCurtainRevealFooter>
              </CardCurtainReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
