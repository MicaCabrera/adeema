import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';
import { BRAND_ASSETS } from '../assets/brandAssets';

const NEWS_PER_PAGE = 3;

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Flecha de navegación arriba/abajo del listado de noticias — mismo
// lenguaje visual que las flechas del carrusel de Media Hub (cuadrado
// celeste bg-brand-500, ícono blanco, hover con colores invertidos),
// rotando el mismo ícono en vez de crear uno nuevo.
function NewsNavArrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'up' ? 'Noticias anteriores' : 'Siguientes noticias'}
      className={[
        'group flex h-9 w-9 shrink-0 items-center justify-center rounded-small bg-brand-500 transition-colors duration-300 hover:bg-white md:h-10 md:w-10',
        disabled ? 'pointer-events-none opacity-30' : 'opacity-100',
      ].join(' ')}
    >
      <ArrowIcon
        className={`h-3.5 w-3.5 text-white transition-colors duration-300 group-hover:text-brand-500 ${direction === 'up' ? '-rotate-90' : 'rotate-90'}`}
      />
    </button>
  );
}

// Estilo ref. oci.madebybuzzworthy.com: panel sólido con textura de medio
// tono (halftone) + lista de notas con fecha/tag/título separadas por líneas
// finas. Colores de ADEEMA (navy/celeste) en vez del azul del sitio de
// referencia. Placeholders — se reemplazan por fotos reales más adelante.
const newsItems = [
  {
    date: '18 Sep',
    tag: 'Comunicados',
    title: 'ADEEMA consolida su red de alianzas estratégicas y convenios federales.',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    date: '10 Sep',
    tag: 'Eventos',
    title: 'Encuentros en Territorio: agenda de jornadas presenciales en todo el país.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    date: '02 Sep',
    tag: 'Actividades',
    title: 'Espacios de Innovación: nuevas convocatorias de ADEEMA Talks y la Academy.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    date: '28 Ago',
    tag: 'Novedades',
    title: 'Multimedia: lanzamientos y contenidos audiovisuales exclusivos de ADEEMA Media.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
  },
  {
    date: '20 Ago',
    tag: 'Prensa',
    title: 'ADEEMA fue destacada en medios nacionales por su rol en la formación tech.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    date: '12 Ago',
    tag: 'Comunicados',
    title: 'Nuevo convenio con universidades para becas de la Academy 2025.',
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function NewsSection() {
  const panelRef = useRef(null);
  const logoRef = useRef(null);
  const dotsRef = useRef(null);
  const listRef = useRef(null);
  const isFirstRender = useRef(true);
  const [groupIndex, setGroupIndex] = useState(0);

  const hoverCapable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  const totalGroups = Math.ceil(newsItems.length / NEWS_PER_PAGE);
  const visibleItems = newsItems.slice(
    groupIndex * NEWS_PER_PAGE,
    groupIndex * NEWS_PER_PAGE + NEWS_PER_PAGE
  );

  const goToPrevGroup = () => setGroupIndex((i) => Math.max(0, i - 1));
  const goToNextGroup = () => setGroupIndex((i) => Math.min(totalGroups - 1, i + 1));

  // Transición suave entre grupos de 3 noticias: fade + leve desplazamiento
  // vertical, mismo patrón de animación que ya usa el resto del sitio (ver
  // textRefs en MediaSection). Se salta en el primer render para no animar
  // la carga inicial de la sección.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const list = listRef.current;
    if (!list) return;
    gsap.fromTo(list, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }, [groupIndex]);

  // El logo (y, más sutil, la textura de puntos) "sigue" al mouse dentro
  // del panel navy con inercia (gsap.quickTo), no 1:1: da sensación de
  // profundidad en capas sin que el logo se deforme ni salga del panel.
  // Esto es pura animación de hover, sin relación con el scroll de la
  // lista — se mantiene igual que antes.
  useLayoutEffect(() => {
    if (!hoverCapable) return undefined;
    const panel = panelRef.current;
    const logo = logoRef.current;
    const dots = dotsRef.current;
    if (!panel || !logo || !dots) return undefined;

    const logoXTo = gsap.quickTo(logo, 'x', { duration: 0.7, ease: 'power3' });
    const logoYTo = gsap.quickTo(logo, 'y', { duration: 0.7, ease: 'power3' });
    const logoScaleTo = gsap.quickTo(logo, 'scale', { duration: 0.7, ease: 'power3' });
    const dotsXTo = gsap.quickTo(dots, 'x', { duration: 0.9, ease: 'power3' });
    const dotsYTo = gsap.quickTo(dots, 'y', { duration: 0.9, ease: 'power3' });

    const handleMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      logoXTo(relX * 24);
      logoYTo(relY * 24);
      logoScaleTo(1.05 + Math.min(Math.hypot(relX, relY), 0.7) * 0.07);
      dotsXTo(relX * -12);
      dotsYTo(relY * -12);
    };

    const handleLeave = () => {
      logoXTo(0);
      logoYTo(0);
      logoScaleTo(1);
      dotsXTo(0);
      dotsYTo(0);
    };

    panel.addEventListener('mousemove', handleMove);
    panel.addEventListener('mouseleave', handleLeave);
    return () => {
      panel.removeEventListener('mousemove', handleMove);
      panel.removeEventListener('mouseleave', handleLeave);
    };
  }, [hoverCapable]);

  return (
    <section id="noticias" className="section-padding bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow className="mb-4">Actualidad</Eyebrow>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-4">
          Actualidad & Prensa
        </h2>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mb-10 md:mb-14">
          El registro de nuestra actividad. Seguí las novedades, comunicados institucionales y eventos que
          marcan la agenda del ecosistema.
        </p>

        <div className="grid overflow-hidden rounded-medium border border-white/10 lg:grid-cols-[0.85fr_1.6fr]">
          {/* Panel sólido con textura halftone — puramente gráfico, ancla
              visual de la grilla. Logo y textura reaccionan al mouse. Sin
              scroll propio: se mantiene fijo en su lugar mientras la
              columna de al lado scrollea internamente. */}
          <div
            ref={panelRef}
            className="relative min-h-[280px] overflow-hidden bg-surface lg:h-[480px] lg:min-h-0"
          >
            <div ref={dotsRef} aria-hidden="true" className="halftone-dots absolute -inset-4 text-brand-500" />
            <img
              ref={logoRef}
              src={BRAND_ASSETS.emblemNegative}
              alt=""
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 object-contain opacity-20 will-change-transform"
              loading="lazy"
            />

            {/* CTA reubicado adentro del panel, anclado al margen inferior
                (antes iba suelto debajo de toda la grilla). */}
            <div className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8">
              <CtaButton as="button" type="button">
                Ver todas las novedades
              </CtaButton>
            </div>
          </div>

          {/* Lista de notas: antes tenía scroll interno nativo
              (`overflow-y-auto` + altura fija) para ver las 6 noticias de a
              3; ahora se muestran directamente solo las 3 del grupo activo
              (`visibleItems`) y se navega entre grupos con las flechas de
              abajo — mismo alto fijo total (lg:h-[480px]), sin scrollbar.
              Columna en flex-col: la lista toma el espacio restante
              (flex-1) y dejan su propia fila abajo para las flechas, en
              vez de superponerse encima de la última noticia. */}
          <div className="flex flex-col bg-white lg:h-[480px]">
            <div ref={listRef} className="flex-1 divide-y divide-surface/15 overflow-hidden">
              {visibleItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col gap-3 overflow-hidden p-6 sm:flex-row sm:items-start sm:gap-6"
                >
                  {/* Thumbnail chico en reposo (misma imagen, no dos elementos):
                      siempre absolute, posicionado sobre el "hueco" que reserva
                      el spacer de abajo. En hover crece a inset-0 (toda la
                      fila) — un crecimiento real de tamaño/posición, no un
                      fade de opacity entre dos estados. Tamaño reducido
                      (h-14, antes h-16) para que las 3 noticias del grupo
                      entren completas en el alto fijo de la columna junto
                      con la fila de flechas de abajo. */}
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute left-6 top-[52px] z-0 h-14 w-14 rounded-small object-cover transition-[left,top,width,height,border-radius] duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:rounded-none"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 bg-surface/0 transition-colors duration-300 ease-out group-hover:bg-surface/75"
                  />

                  {/* Fecha (alto fijo, h-5) + spacer invisible del mismo
                      tamaño que el thumbnail: reserva el espacio en el flujo
                      normal para que el título no quede tapado por la imagen
                      en reposo, en mobile y desktop por igual. */}
                  <div className="relative z-20 flex shrink-0 flex-col sm:w-14">
                    <span className="block h-5 text-xs font-semibold tabular-nums text-surface/40 transition-colors duration-300 group-hover:text-white/70">
                      {item.date}
                    </span>
                    <span aria-hidden="true" className="mt-2 block h-14 w-14" />
                  </div>

                  <div className="relative z-20">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-500">
                      {item.tag}
                    </span>
                    <h4 className="mt-1 text-base font-medium leading-snug text-surface transition-colors duration-300 group-hover:text-white sm:text-lg">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Flechas de navegación entre grupos de 3 noticias, en su
                propia fila debajo de la lista (no superpuestas) —
                reemplazan la barra de scroll que tenía antes esta
                columna. */}
            {totalGroups > 1 && (
              <div className="flex shrink-0 items-center justify-end gap-2 border-t border-surface/15 px-6 py-4 md:px-8">
                <NewsNavArrow direction="up" onClick={goToPrevGroup} disabled={groupIndex === 0} />
                <NewsNavArrow
                  direction="down"
                  onClick={goToNextGroup}
                  disabled={groupIndex === totalGroups - 1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
