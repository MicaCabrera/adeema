import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';
import { BRAND_ASSETS } from '../assets/brandAssets';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const logoRef = useRef(null);
  const dotsRef = useRef(null);
  const listViewportRef = useRef(null);
  const listTrackRef = useRef(null);

  const hoverCapable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  // Mejora 1 — el logo (y, más sutil, la textura de puntos) "sigue" al mouse
  // dentro del panel navy con inercia (gsap.quickTo), no 1:1: da sensación
  // de profundidad en capas sin que el logo se deforme ni salga del panel.
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

  // Mejora 3 — pin + scroll interno (solo desktop, >=1024px). A diferencia
  // del carrusel de Media (que anima `x`, horizontal), acá se anima `y`
  // (vertical) en un descendiente del elemento pineado — con un
  // ScrollTrigger.create() + onUpdate() manual (el patrón de Media, punto
  // por punto) eso confunde el tracking interno de posición de GSAP: al
  // soltar el pin queda un salto de exactamente el alto del overflow
  // pegado a la sección. La solución probada es usar un tween real
  // (gsap.to) con el scrollTrigger colgado del tween en vez de un
  // ScrollTrigger suelto + gsap.set manual — mismo pin, sin ese salto.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const section = sectionRef.current;
      const viewport = listViewportRef.current;
      const track = listTrackRef.current;
      if (!section || !viewport || !track) return undefined;

      // El trigger se crea recién cuando la sección está por entrar en
      // viewport (no al montar): la posición absoluta de #noticias depende
      // de la altura de TODO lo que está arriba, incluido el pin de Media
      // (que reserva su propio rango de scroll "virtual"). Crearlo al
      // montar mide esa posición antes de que el pin de Media termine de
      // asentarse, y un refresh() posterior no siempre corrige bien un
      // trigger creado más allá de un pin ajeno. Crearlo acá, cuando el
      // usuario ya scrolleó todo lo anterior, evita el problema de raíz.
      let tween = null;

      const createTween = () => {
        if (tween) return;

        const overflow = track.scrollHeight - viewport.clientHeight;
        if (overflow <= 0) return;

        tween = gsap.to(track, {
          y: -overflow,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${overflow}`,
            pin: true,
            scrub: true,
          },
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              createTween();
              observer.disconnect();
            }
          });
        },
        { rootMargin: '600px 0px 600px 0px' }
      );
      observer.observe(section);

      return () => {
        observer.disconnect();
        if (tween) {
          tween.scrollTrigger?.kill();
          tween.kill();
        }
      };
    });

    return () => mm.kill();
  }, []);

  return (
    <section id="noticias" ref={sectionRef} className="section-padding bg-dark relative border-y border-white/5">
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
              visual de la grilla. Logo y textura reaccionan al mouse
              (mejora 1); permanece fijo durante el scroll interno de la
              lista (mejora 3). */}
          <div
            ref={panelRef}
            className="relative min-h-[220px] overflow-hidden bg-surface lg:h-[480px] lg:min-h-0"
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
          </div>

          {/* Lista de notas: fecha + tag + título, separadas por líneas
              finas. En hover, cada fila revela una foto a su propio tamaño
              con overlay navy (mejora 2). En desktop, la lista scrollea
              dentro de este contenedor de alto fijo (mejora 3); en mobile
              queda con su alto natural y scroll normal de página. */}
          <div ref={listViewportRef} className="relative bg-white lg:h-[480px] lg:overflow-hidden">
            <div ref={listTrackRef} className="flex flex-col divide-y divide-surface/15 will-change-transform">
              {newsItems.map((item) => (
                <div
                  key={item.title}
                  className="group relative flex flex-col gap-1 overflow-hidden p-6 sm:flex-row sm:items-baseline sm:gap-6 md:p-8"
                >
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-surface/0 transition-colors duration-300 ease-out group-hover:bg-surface/75"
                  />

                  <span className="relative z-10 shrink-0 text-xs font-semibold tabular-nums text-surface/40 transition-colors duration-300 group-hover:text-white/70 sm:w-14">
                    {item.date}
                  </span>
                  <div className="relative z-10">
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
          </div>
        </div>

        <div className="mt-10 text-center">
          <CtaButton as="button" type="button">
            Ver todas las novedades
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
