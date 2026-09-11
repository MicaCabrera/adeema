import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Eyebrow from './ui/Eyebrow';

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, ScrollToPlugin);

// Placeholders — se reemplazan por fotografía real más adelante.
const mediaItems = [
  {
    title: 'Transmisiones en Vivo / Streaming',
    description: 'Programación institucional en directo junto a referentes del sector, conversando sobre gaming, innovación, educación y nuevas generaciones.',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Ciclos de Entrevistas',
    description: 'Charlas profundas con líderes de la industria, académicos y tomadores de decisión que impulsan el desarrollo.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Contenido Audiovisual',
    description: 'Resúmenes, contenidos en formato corto y material interactivo diseñado para plataformas digitales.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Cobertura de Eventos',
    description: 'Difusión audiovisual de las activaciones presenciales, jornadas de vinculación y encuentros de la asociación.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
  },
];

const GAP = 24; // px — mismo valor que gap-6
const PARALLAX_FACTOR = 0.05;
const SCROLL_PER_CARD = 480; // px de scroll "virtual" que consume cada paso de card durante el pin

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Flecha de navegación del carrusel: mismo lenguaje visual que el cuadrado
// celeste del CtaButton global (fondo #55B4EB, flecha blanca), con el radio
// chico del sistema (rounded-small) en vez de esquinas rectas. En hover se
// invierten los colores (fondo blanco, flecha celeste) en vez de cambiar de
// ícono.
function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
      className={[
        'group flex h-9 w-9 shrink-0 items-center justify-center rounded-small bg-brand-500 transition-colors duration-300 hover:bg-white md:h-10 md:w-10',
        disabled ? 'pointer-events-none opacity-30' : 'opacity-100',
      ].join(' ')}
    >
      <ArrowIcon
        className={`h-3.5 w-3.5 text-white transition-colors duration-300 group-hover:text-brand-500 ${direction === 'prev' ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

export default function MediaSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const headerRef = useRef(null);
  const navRowRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const cursorRef = useRef(null);
  const draggableRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const hoverCapable = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Entrada del título/descripción de la card activa: fade + leve
  // desplazamiento vertical, no aparecen de golpe.
  useEffect(() => {
    const textEl = textRefs.current[activeIndex];
    if (!textEl) return;
    gsap.fromTo(textEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  }, [activeIndex]);

  // Alto de las cards en desktop: se mide el alto real disponible dentro
  // del pin (wrapper con h-full, altura fija por CSS e independiente del
  // contenido) menos el header y la fila de flechas (ninguno de los dos
  // depende del alto de la card). El resultado se clampea entre un piso de
  // último recurso y un techo — pero NUNCA se fuerza por encima de lo que
  // realmente entra: en notebook (1366-1440) la ventana real suele ser más
  // baja que el preview del editor, y forzar un piso alto cortaba la card o
  // tapaba las flechas. El techo (650px) es alto a propósito: en notebook
  // el alto disponible real ya queda muy por debajo de eso (no cambia nada
  // ahí), pero en desktop grande, donde SÍ sobra alto disponible, deja que
  // la card seguir creciendo en vez de quedar anclada a un tope chico. El
  // ancho (ver className de la card) ya escala con clamp() + vw.
  useLayoutEffect(() => {
    const FLOOR_HEIGHT = 260; // último recurso en ventanas extremadamente bajas
    const MAX_HEIGHT = 650; // techo alto: en notebook no se llega a usar, en desktop grande sí
    const GAP_BEFORE_ROW = 16; // mt-4 de la fila de flechas

    const applyCardHeight = () => {
      if (window.innerWidth < 1024) {
        cardRefs.current.forEach((el) => {
          if (el) el.style.height = '';
        });
        return;
      }

      const wrapperEl = wrapperRef.current;
      const headerEl = headerRef.current;
      const navEl = navRowRef.current;
      if (!wrapperEl || !headerEl || !navEl) return;

      const available = wrapperEl.clientHeight - headerEl.offsetHeight - navEl.offsetHeight - GAP_BEFORE_ROW;
      const height = Math.max(FLOOR_HEIGHT, Math.min(MAX_HEIGHT, available));

      cardRefs.current.forEach((el) => {
        if (el) el.style.height = `${height}px`;
      });
    };

    applyCardHeight();
    window.addEventListener('resize', applyCardHeight);

    const onLoad = () => {
      applyCardHeight();
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', onLoad);
    const loadTimeout = setTimeout(onLoad, 600);

    return () => {
      window.removeEventListener('resize', applyCardHeight);
      window.removeEventListener('load', onLoad);
      clearTimeout(loadTimeout);
    };
  }, []);

  const getCardStep = () => (cardRefs.current[0]?.offsetWidth || 0) + GAP;
  const getSnaps = () => mediaItems.map((_, i) => -(i * getCardStep()));

  const applyParallax = () => {
    const track = trackRef.current;
    if (!track) return;
    const x = gsap.getProperty(track, 'x');
    const snaps = getSnaps();
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      const relative = x - snaps[i];
      gsap.set(img, { x: relative * PARALLAX_FACTOR });
    });
  };

  // Drag/swipe + inercia real (GSAP Draggable) — sigue activo aunque la
  // sección esté pineada por el ScrollTrigger de más abajo.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const syncActiveFromX = () => {
      const x = gsap.getProperty(track, 'x');
      const snaps = getSnaps();
      let closest = 0;
      let min = Infinity;
      snaps.forEach((s, i) => {
        const d = Math.abs(s - x);
        if (d < min) {
          min = d;
          closest = i;
        }
      });
      setActiveIndex(closest);
      isDraggingRef.current = false;

      // Si la sección está pineada, sincronizamos el scroll "virtual" de la
      // página con el índice al que quedó la card tras soltar/arrastrar, así
      // la rueda del mouse sigue desde el lugar correcto (sin esto, el
      // próximo scroll pisaría la posición arrastrada).
      const st = scrollTriggerRef.current;
      if (st) {
        const progress = mediaItems.length > 1 ? closest / (mediaItems.length - 1) : 0;
        window.scrollTo({ top: st.start + progress * (st.end - st.start) });
      }
    };

    const setup = () => {
      const snaps = getSnaps();
      const minX = snaps[snaps.length - 1];

      if (draggableRef.current) {
        draggableRef.current[0].kill();
      }

      draggableRef.current = Draggable.create(track, {
        type: 'x',
        bounds: { minX, maxX: 0 },
        inertia: true,
        edgeResistance: 0.8,
        dragClickables: true,
        snap: { x: snaps },
        onDragStart: () => {
          isDraggingRef.current = true;
        },
        onDrag: applyParallax,
        onThrowUpdate: applyParallax,
        onDragEnd: syncActiveFromX,
        onThrowComplete: syncActiveFromX,
      });

      applyParallax();
    };

    setup();
    window.addEventListener('resize', setup);
    return () => {
      window.removeEventListener('resize', setup);
      if (draggableRef.current) draggableRef.current[0].kill();
    };
  }, []);

  const goTo = (index) => {
    const clamped = Math.max(0, Math.min(mediaItems.length - 1, index));
    const track = trackRef.current;
    if (!track) return;

    const st = scrollTriggerRef.current;
    if (st) {
      // Con el pin activo, "navegar" es simplemente mover el scroll real de
      // la página al punto que corresponde a esa card — el onUpdate del
      // ScrollTrigger se encarga de mover el track en sincronía.
      const progress = mediaItems.length > 1 ? clamped / (mediaItems.length - 1) : 0;
      gsap.to(window, {
        scrollTo: { y: st.start + progress * (st.end - st.start) },
        duration: 0.7,
        ease: 'power3.out',
      });
      setActiveIndex(clamped);
      return;
    }

    const step = getCardStep();
    const target = -(clamped * step);
    gsap.to(track, {
      x: target,
      duration: 0.7,
      ease: 'power3.out',
      onUpdate: applyParallax,
    });
    setActiveIndex(clamped);
  };

  // Pin + scroll-hijack (solo desktop, >=1024px): con la sección pineada,
  // el scroll vertical deja de mover la página y en su lugar avanza el
  // carrusel horizontalmente, con snap nativo de ScrollTrigger a cada card.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return undefined;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${(mediaItems.length - 1) * SCROLL_PER_CARD}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.4,
        snap: {
          snapTo: 1 / (mediaItems.length - 1),
          duration: 0.5,
          ease: 'power3.out',
        },
        onUpdate: (self) => {
          if (isDraggingRef.current) return;
          const step = getCardStep();
          const x = -self.progress * (mediaItems.length - 1) * step;
          gsap.set(track, { x });
          applyParallax();
          const idx = Math.round(self.progress * (mediaItems.length - 1));
          if (idx !== activeIndexRef.current) setActiveIndex(idx);
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
        st.kill();
      };
    });

    // Refresh de seguridad: si alguna sección lazy-loaded arriba (Academy)
    // termina de montar/medir después de que este ScrollTrigger ya calculó
    // su `start`, ese valor queda desactualizado y el pin se desalinea del
    // borde real de la sección. `load` cubre imágenes/fuentes tardías.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const refreshTimeout = setTimeout(refresh, 600);

    return () => {
      mm.kill();
      window.removeEventListener('load', refresh);
      clearTimeout(refreshTimeout);
    };
  }, []);

  // Cursor custom (solo desktop/hover): reemplaza el cursor nativo dentro
  // del carrusel por un círculo celeste que sigue al mouse con inercia leve.
  useEffect(() => {
    if (!hoverCapable) return undefined;
    const cursor = cursorRef.current;
    const viewport = viewportRef.current;
    if (!cursor || !viewport) return undefined;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const onEnter = () => gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' });
    const onLeave = () => gsap.to(cursor, { opacity: 0, scale: 0.6, duration: 0.25, ease: 'power2.out' });

    viewport.addEventListener('mousemove', onMove);
    viewport.addEventListener('mouseenter', onEnter);
    viewport.addEventListener('mouseleave', onLeave);
    return () => {
      viewport.removeEventListener('mousemove', onMove);
      viewport.removeEventListener('mouseenter', onEnter);
      viewport.removeEventListener('mouseleave', onLeave);
    };
  }, [hoverCapable]);

  return (
    <section
      ref={sectionRef}
      id="media"
      className="relative overflow-hidden bg-dark py-14 md:py-20 lg:h-screen lg:py-10"
    >
      <div ref={wrapperRef} className="relative z-10 flex h-full flex-col lg:justify-center">
        <div ref={headerRef} className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Header: eyebrow + título solo (el CTA ahora va abajo del
              carrusel, junto a las flechas). */}
          <Eyebrow className="mb-3" tone="brand">Media Hub</Eyebrow>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-4">
            ADEEMA Media
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mb-6 lg:mb-6">
            Conectando audiencias a través de contenidos estratégicos, streaming y producciones audiovisuales
            sobre innovación y cultura del gaming.
          </p>
        </div>

        {/* Carrusel: full-bleed a la derecha (el viewport recorta, pero el
            contenedor no está limitado por max-w-7xl para que la card "a
            medias" pueda asomar hasta el borde real de la pantalla). */}
        <div className="relative z-10 pl-4 sm:pl-6 lg:pl-8">
          <div
            ref={viewportRef}
            className={`relative overflow-hidden ${hoverCapable ? 'cursor-none' : ''}`}
          >
            <div ref={trackRef} className="flex gap-6 will-change-transform" style={{ touchAction: 'pan-y' }}>
              {mediaItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.title}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={[
                      // Ancho en desktop con clamp(): escala de forma
                      // fluida con el viewport (68vw) en vez de quedar fijo,
                      // con un piso (640px, ~lg mínimo) y un techo (1500px,
                      // para que no sea gigante en 4K/ultrawide). A 1366-1440
                      // (notebook) da prácticamente el mismo ancho que el
                      // 70% fijo anterior; en desktop grande sigue creciendo.
                      // Deja ver la mitad de la siguiente card (peek).
                      // La ALTURA no se fija por CSS sino que se calcula en
                      // JS (ver useLayoutEffect más abajo) a partir del alto
                      // real disponible entre el header y la fila de
                      // flechas, así la card es grande pero nunca tapa esa
                      // fila ni se corta en ventanas más bajas.
                      'group relative aspect-[4/5] w-[82%] shrink-0 overflow-hidden rounded-medium transition-[opacity,transform] duration-500 ease-out sm:aspect-[16/10] sm:w-[72%] lg:w-[clamp(640px,68vw,1500px)] lg:aspect-auto',
                      isActive ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-60',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                        src={item.image}
                        alt=""
                        draggable={false}
                        loading="lazy"
                        className="h-full w-full scale-110 object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04]"
                      />
                    </div>

                    {/* Overlay: degradé negro de abajo hacia arriba, para legibilidad */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />

                    <div
                      ref={(el) => {
                        textRefs.current[index] = el;
                      }}
                      className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8"
                    >
                      <h3 className="mb-2 text-base font-medium text-white md:text-lg">{item.title}</h3>
                      <p className="max-w-md text-sm text-white/80 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flechas prev/next — único contenido de la fila de abajo (el CTA
              se eliminó de esta fila). */}
          <div ref={navRowRef} className="mt-4 flex items-center justify-end gap-3 pr-4 sm:pr-6 lg:pr-8">
            <CarouselArrow direction="prev" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} />
            <CarouselArrow
              direction="next"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === mediaItems.length - 1}
            />
          </div>
        </div>
      </div>

      {/* Cursor custom — solo se monta en dispositivos con hover real */}
      {hoverCapable && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 flex h-14 w-14 scale-[0.6] items-center justify-center rounded-round bg-brand-500 text-[10px] font-semibold uppercase tracking-widest text-white opacity-0"
        >
          Drag
        </div>
      )}
    </section>
  );
}
