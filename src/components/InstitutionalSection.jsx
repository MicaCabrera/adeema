import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Mismo ícono/patrón (stroke, currentColor) que el resto de flechas del
// sitio (ver MediaSection/AcademySection/NewsSection/Footer).
function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Fondo compartido "Quiénes somos" + "Red de articulación" — scroll-driven
// gradient (ref. sharplink.com): en vez de un linear-gradient plano, son
// varios blobs radiales (radial-gradient vía bg-color + blur, no imagen)
// difusos, cada uno con su propia posición/velocidad/dirección. El
// predominio de color pasa de celeste (arriba, "Quiénes somos") a navy
// (abajo, "Red de articulación") haciendo cross-fade de opacidad entre
// blobs claros y oscuros — no interpolando el string de color cuadro a
// cuadro: solo transform (x/y/scale) y opacity, las dos propiedades que el
// navegador puede acelerar por GPU sin re-pintar el gradiente por
// JS/canvas. `from`/`to` son los extremos en scroll progress 0 y 1 — cada
// blob se anima con su propio `gsap.fromTo(...)` + `scrollTrigger` (ver
// useEffect en InstitutionalSection), todos atados al mismo trigger/rango
// pero con distinto desplazamiento → distinta velocidad/dirección.
const heroBlobs = [
  {
    key: 'brand-a',
    className: 'left-[-10%] top-[-15%] h-[55vw] w-[55vw] max-h-[620px] max-w-[620px] bg-brand-500',
    from: { x: '0vw', y: '0vh', scale: 1, opacity: 0.55 },
    to: { x: '8vw', y: '32vh', scale: 0.85, opacity: 0.12 },
  },
  {
    key: 'brand-b',
    // Oculto en mobile — parte de la simplificación de performance pedida
    // (menos blobs en vez de desactivar el efecto entero).
    className:
      'right-[-15%] top-[5%] hidden h-[42vw] w-[42vw] max-h-[480px] max-w-[480px] bg-brand-300 lg:block',
    from: { x: '0vw', y: '0vh', scale: 0.9, opacity: 0.32 },
    to: { x: '-16vw', y: '50vh', scale: 1.15, opacity: 0.08 },
  },
  {
    key: 'navy-a',
    // bg-brand-700 en vez de bg-surface: mismo hue navy pero con más
    // saturación, así se sigue distinguiendo del fondo base incluso a
    // opacidad alta (surface/#043766 quedaba casi invisible contra
    // bg-dark/#020D1A — muy poco contraste de luminancia entre ambos).
    className: 'left-[8%] bottom-[-12%] h-[50vw] w-[50vw] max-h-[560px] max-w-[560px] bg-brand-700',
    from: { x: '-4vw', y: '8vh', scale: 0.7, opacity: 0.22 },
    to: { x: '0vw', y: '-12vh', scale: 1.1, opacity: 0.85 },
  },
  {
    key: 'navy-b',
    className:
      'right-[-12%] bottom-[-18%] hidden h-[46vw] w-[46vw] max-h-[520px] max-w-[520px] bg-brand-800 lg:block',
    from: { x: '6vw', y: '12vh', scale: 0.6, opacity: 0.16 },
    to: { x: '0vw', y: '-16vh', scale: 1, opacity: 0.7 },
  },
];

// Red de articulación — patrón "pin + swap in-place" (ref. cantor8.com,
// sección "We work directly with institutions..."): columna izquierda fija
// (título+párrafo) mientras la sección está pineada; a la derecha, una sola
// "ventana" de tamaño fijo donde las cards se van sucediendo una por una a
// medida que se scrollea (fade + slide corto), no un carrusel horizontal.
// Ver ArticulationCard y el ScrollTrigger más abajo.
const ARTICULATION_STEP_PX = 450; // scroll "virtual" que consume cada paso/card durante el pin
const ARTICULATION_CARD_HEIGHT = 200; // px — la ventana (lg:h-[520px] en el JSX) muestra ~2.5 cards a la vez
const ARTICULATION_CARD_GAP = 16; // debe coincidir con el gap real entre cards (ver translateY más abajo)

const articulationCards = [
  {
    badge: 'Gobierno',
    title: 'Municipios y Gobiernos',
    description: 'Acercamos innovación, tecnología y formación a comunidades de todo el país.',
  },
  {
    badge: 'Instituciones',
    title: 'Cámaras Empresariales e Instituciones',
    description: 'Generamos alianzas y proyectos que fortalecen el desarrollo empresarial e institucional.',
  },
  {
    badge: 'Educación',
    title: 'Universidades y Colegios',
    description: 'Conectamos educación, conocimiento e innovación para crear nuevas oportunidades de formación.',
  },
  {
    badge: 'Innovación',
    title: 'Centros Tech e Incubadoras',
    description: 'Potenciamos talento, proyectos y emprendimientos que impulsan el futuro tecnológico.',
  },
  {
    badge: 'Cooperación',
    title: 'Organismos y Asociaciones',
    description: 'Articulamos cooperación y alianzas para desarrollar iniciativas de impacto nacional e internacional.',
  },
  {
    badge: 'Sponsors',
    title: 'Empresas Tech y Sponsors',
    description: 'Creamos oportunidades de colaboración, visibilidad y participación en nuevas iniciativas tecnológicas.',
  },
];

// Card individual: badge (pill clara, 8px de radio — no --radius--round) +
// título arriba, descripción anclada abajo, hueco vacío al medio a
// propósito (mismo patrón de la referencia: contenido pegado arriba/abajo,
// no centrado ni distribuido parejo). En desktop (lg+), cada card tiene
// alto fijo (ARTICULATION_CARD_HEIGHT) y se apila dentro de la ventana vía
// `lg:absolute` + `translateY` — varias cards conviven a la vez (~2.5
// visibles), no una sola por encima de las demás. El desplazamiento entre
// pasos de scroll se maneja imperativamente vía `innerRef` (inline style
// transform seteado a mano desde el ScrollTrigger, ver useEffect más
// abajo) — a propósito NI por gsap.set/to (animar la transform de un
// descendiente de un elemento con pin:true le rompe el tracking del propio
// pin, ya nos pasó con Noticias) NI por estado de React (un re-render del
// componente que contiene el ref pineado hace que React reconcilie y saque
// el nodo del pin-spacer que GSAP insertó por fuera del control de React,
// rompiendo el pin en cuanto cambia la card activa). Clases estáticas acá,
// el inline style es lo único dinámico. En mobile las clases lg: no
// aplican, así que la card queda simplemente en flujo normal, siempre
// visible, apilada con el resto (sin pin ni JS).
function ArticulationCard({ card, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="rounded-medium bg-surface p-6 opacity-100 transition-transform duration-[450ms] ease-out md:p-8 lg:absolute lg:inset-x-0 lg:top-0 lg:flex lg:h-[200px] lg:items-start lg:gap-6"
    >
      <span className="mb-3 inline-block shrink-0 rounded-[8px] bg-[#EEF0F3] px-3 py-1 text-xs font-semibold text-surface lg:mb-0">
        {card.badge}
      </span>
      <div className="flex flex-1 flex-col lg:h-full lg:justify-between">
        <h3 className="text-xl font-medium leading-tight text-white md:text-2xl">{card.title}</h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 lg:mt-0">{card.description}</p>
      </div>
    </div>
  );
}

// Misión/Visión — transición editorial split-screen vinculada 100% al
// scroll (ref. mock del pedido): dos "carriles" ocupan la sección, uno de
// texto y uno visual. Cada carril tiene dos capas apiladas (Misión/Visión)
// que se desplazan en direcciones opuestas a medida que avanza el
// scroll — el texto sube, lo visual baja — dando la sensación de que las
// dos mitades se cruzan verticalmente. Sin hover, sin botones, sin
// autoplay: el único input es el progreso de scroll (ver
// MISSION_VISION_TRANSITION_PX/MISSION_VISION_HOLD_PX y el useEffect más
// abajo).
const MISSION_VISION_TRANSITION_PX = 1250; // scroll "virtual" que consume el intercambio Misión↔Visión (solo desktop, pineado)
const MISSION_VISION_HOLD_PX = 450; // scroll "virtual" extra, ya con la transición terminada, antes de soltar el pin — le da tiempo al usuario de leer

const missionVisionCards = [
  {
    key: 'mision',
    label: 'Misión',
    headline: 'Impulsar las competencias del futuro en Argentina.',
    paragraphs: [
      'Creamos programas de formación, comunidades y espacios de articulación que conectan conocimiento, tecnología y oportunidades para fortalecer el desarrollo sostenible del ecosistema en todo el país.',
    ],
    concepts: ['Formación', 'Comunidad', 'Innovación'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Equipo colaborando en un espacio de formación',
  },
  {
    key: 'vision',
    label: 'Visión',
    headline: 'Ser una organización de referencia en la región.',
    paragraphs: [
      'Impulsamos la investigación, el desarrollo y la articulación en torno al gaming, los esports y la innovación tecnológica, conectando nuevas generaciones, educación y tecnología con una mirada federal y de largo plazo.',
    ],
    concepts: ['Alcance Federal', 'Estrategia', 'Legitimidad'],
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Setup tecnológico con iluminación ambiental',
  },
];

// Carril de texto (Misión o Visión): ocupa toda la celda de su carril
// (absolute inset-0) y arranca en la posición que le indique
// `initialTransform` (0% la card activa al inicio, 100% la que espera
// "debajo" lista para subir). El desplazamiento en scroll se aplica
// imperativamente sobre `innerRef` (inline style, ver useEffect en
// InstitutionalSection) — mismo motivo que ArticulationCard: nada de
// gsap.set/to ni de estado de React sobre un elemento pineado.
function MissionVisionTextPanel({ card, innerRef, initialTransform }) {
  return (
    <div
      ref={innerRef}
      className="absolute inset-0 flex flex-col justify-center px-6 py-10 will-change-transform sm:px-10 md:px-12 lg:px-16"
      style={{ transform: initialTransform }}
    >
      <span className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">{card.label}</span>
      <h3 className="text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl">
        {card.headline}
      </h3>
      <div className="mt-4 max-w-sm">
        <p className="text-sm leading-relaxed text-slate-300 md:text-base">{card.paragraphs[0]}</p>
        {card.paragraphs[1] && (
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.paragraphs[1]}</p>
        )}
      </div>
      <div className="mt-6 flex max-w-sm flex-wrap gap-x-4 gap-y-1">
        {card.concepts.map((concept) => (
          <span key={concept} className="text-[11px] font-medium uppercase tracking-widest text-slate-400">
            {concept}
          </span>
        ))}
      </div>
    </div>
  );
}

// Carril visual (Misión o Visión): la foto a pantalla completa de ese
// carril, con el mismo overlay oscuro de siempre para contraste — sin
// cortina ni reveal por hover (la única animación de esta sección es el
// desplazamiento por scroll). Misma mecánica de posicionamiento que el
// panel de texto.
function MissionVisionVisualPanel({ card, innerRef, initialTransform }) {
  return (
    <div ref={innerRef} className="absolute inset-0 will-change-transform" style={{ transform: initialTransform }}>
      <img src={card.image} alt={card.imageAlt} loading="lazy" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-dark/40" />
    </div>
  );
}

export default function InstitutionalSection() {
  const articulationSectionRef = useRef(null);
  const articulationCardRefs = useRef([]);
  const activeCardIndexRef = useRef(0);
  const missionVisionSectionRef = useRef(null);
  const missionVisionTextRefs = useRef([]);
  const missionVisionVisualRefs = useRef([]);
  const heroBgWrapperRef = useRef(null);
  const heroBlobRefs = useRef([]);

  // Red de articulación — pin + swap in-place, solo desktop (>=1024px,
  // mismo criterio que el pin de Media): la sección queda fija y cada paso
  // de scroll hace un crossfade+slide corto entre la card activa y la
  // siguiente/anterior. El swap se aplica imperativamente (inline style
  // seteado a mano sobre los nodos, ref.current.style.opacity/transform),
  // sin pasar por gsap.set/to NI por estado de React — ver el comentario
  // largo en ArticulationCard con el motivo (ambos rompen el pin acá). En
  // mobile no se crea nada — las cards quedan apiladas en flujo normal
  // (ver className lg: en ArticulationCard) y scrollean con la página.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const trigger = articulationSectionRef.current;
      const cards = articulationCardRefs.current.filter(Boolean);
      if (!trigger || cards.length < 2) return undefined;

      // Apila las cards vía translateY relativo al índice activo (todas
      // quedan opacity-100 siempre — la ventana con overflow-hidden es la
      // que recorta las que quedan arriba/abajo del rango visible). Esto es
      // lo único que cambió respecto a la versión anterior (que mostraba
      // una sola card con crossfade); el ScrollTrigger de abajo (pin,
      // snap, cálculo de índice) sigue exactamente igual.
      const applyCardState = (index) => {
        cards.forEach((el, i) => {
          const offset = (i - index) * (ARTICULATION_CARD_HEIGHT + ARTICULATION_CARD_GAP);
          el.style.transform = `translateY(${offset}px)`;
        });
      };

      activeCardIndexRef.current = 0;
      applyCardState(0);

      const steps = cards.length - 1;

      const st = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: () => `+=${steps * ARTICULATION_STEP_PX}`,
        pin: true,
        anticipatePin: 1,
        scrub: 0.3,
        snap: {
          snapTo: 1 / steps,
          duration: 0.3,
          ease: 'power2.out',
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * steps);
          if (idx !== activeCardIndexRef.current) {
            activeCardIndexRef.current = idx;
            applyCardState(idx);
          }
        },
      });

      return () => {
        st.kill();
        cards.forEach((el) => {
          el.style.transform = '';
        });
      };
    });

    // Refresh de seguridad: esta sección va antes que el pin de Media en el
    // orden de la página — si Media (u otra sección lazy) termina de montar
    // después de que este ScrollTrigger ya calculó su `start`, ese valor
    // queda desactualizado. `load` cubre imágenes/fuentes tardías.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const refreshTimeout = setTimeout(refresh, 600);

    return () => {
      mm.kill();
      window.removeEventListener('load', refresh);
      clearTimeout(refreshTimeout);
    };
  }, []);

  // Fondo compartido de "Quiénes somos" + "Red de articulación" — un
  // gsap.fromTo(...) por blob, cada uno con su propio scrollTrigger (mismo
  // trigger/rango, valores from/to distintos → distinta velocidad/
  // dirección), en vez de un ScrollTrigger.create + onUpdate manual: es el
  // patrón estándar de GSAP para esto, y evita cualquier bug de interpolar
  // a mano (unidades, redondeo, etc.). Todos comparten:
  //   trigger: heroBgWrapperRef → el wrapper envuelve AMBOS bloques (A+B);
  //     al ser un contenedor de flujo normal, su alto YA incluye el
  //     pin-spacer que el efecto anterior (Red de articulación) generó, así
  //     que 'top top'/'bottom bottom' cubre el recorrido de scroll
  //     combinado real, no solo el alto visual.
  //   scrub: true → el progreso queda atado 1:1 al scrollbar (sin inercia,
  //     sin loop propio): si el usuario deja de scrollear, el blob queda
  //     congelado en ese frame. GSAP no corre ningún timer/rAF propio
  //     fuera del rango activo del trigger.
  //   ease: 'none' → imprescindible en un tween con scrub: sin esto, GSAP
  //     aplica su ease por defecto (power1) DENTRO del mapeo de scroll, y
  //     el movimiento deja de sentirse 1:1 con la posición del scrollbar.
  // `ScrollTrigger.refresh()` al final, sincrónico (no solo en 'load'/
  // setTimeout): fuerza el recálculo de start/end inmediatamente con el
  // pin-spacer ya en el DOM, por si el timing de otro efecto lo dejó mal
  // calculado en el primer render.
  useEffect(() => {
    const wrapper = heroBgWrapperRef.current;
    const blobEls = heroBlobRefs.current;
    if (!wrapper || blobEls.filter(Boolean).length === 0) return undefined;

    const tweens = heroBlobs
      .map((blob, i) => {
        const el = blobEls[i];
        if (!el) return null;

        return gsap.fromTo(
          el,
          { x: blob.from.x, y: blob.from.y, scale: blob.from.scale, opacity: blob.from.opacity },
          {
            x: blob.to.x,
            y: blob.to.y,
            scale: blob.to.scale,
            opacity: blob.to.opacity,
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      })
      .filter(Boolean);

    ScrollTrigger.refresh();

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  // Misión/Visión — transición split-screen vinculada al scroll. Dos
  // carriles (texto / visual), cada uno con dos capas apiladas (Misión y
  // Visión) desplazadas en sentidos opuestos: el texto sube, lo visual
  // baja. `applyProgress(0..1)` es la única fuente de verdad del
  // movimiento — se llama tanto en desktop (pineado, progreso atado al
  // scroll "virtual" de MISSION_VISION_TRANSITION_PX) como en mobile (sin pin,
  // progreso atado a cuánto atravesó la sección el viewport). Igual que en
  // Red de articulación: transform seteado a mano sobre los refs, nunca
  // gsap.set/to ni estado de React (rompe el pin / el tracking del
  // ScrollTrigger).
  useEffect(() => {
    const section = missionVisionSectionRef.current;
    const [textMision, textVision] = missionVisionTextRefs.current;
    const [visualMision, visualVision] = missionVisionVisualRefs.current;
    if (!section || !textMision || !textVision || !visualMision || !visualVision) return undefined;

    const applyProgress = (progress) => {
      const p = Math.min(1, Math.max(0, progress));
      textMision.style.transform = `translateY(${-p * 100}%)`;
      textVision.style.transform = `translateY(${100 - p * 100}%)`;
      visualMision.style.transform = `translateY(${p * 100}%)`;
      visualVision.style.transform = `translateY(${-100 + p * 100}%)`;
    };

    applyProgress(0);

    const mm = gsap.matchMedia();

    // Desktop: pineada (como Red de articulación/Media). El pin dura
    // MISSION_VISION_TRANSITION_PX + MISSION_VISION_HOLD_PX de scroll
    // virtual, pero el intercambio (applyProgress) solo avanza durante el
    // primer tramo (TRANSITION_PX) — el resto (HOLD_PX) es scroll "muerto"
    // en el que la vista ya terminada de Visión queda quieta, dándole
    // tiempo al usuario de leerla antes de que el pin suelte la página
    // hacia la siguiente sección. `scrub` más alto (antes 0.6) suma además
    // ~1s de inercia/"catch-up" al movimiento en sí. `snap` sigue atado al
    // progreso crudo del ScrollTrigger (0..1 en TODO el pin), así que solo
    // hay dos reposos posibles: arranque o transición+retención completas.
    mm.add('(min-width: 1024px)', () => {
      const totalPx = MISSION_VISION_TRANSITION_PX + MISSION_VISION_HOLD_PX;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${totalPx}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.6,
        snap: { snapTo: [0, 1], duration: 0.4, ease: 'power2.out' },
        onUpdate: (self) => {
          const transitionProgress = (self.progress * totalPx) / MISSION_VISION_TRANSITION_PX;
          applyProgress(transitionProgress);
        },
      });

      return () => {
        st.kill();
        applyProgress(0);
      };
    });

    // Mobile/tablet: sin pin (evita el scroll-hijack en pantallas chicas,
    // mismo criterio que el resto de la sección) — el progreso sigue el
    // recorrido natural de la sección por el viewport, de abajo arriba.
    // Sin pin no hay forma de "retener" la vista final sin bloquear el
    // scroll nativo, así que acá el único ajuste de timing es el mismo
    // scrub más alto (movimiento algo más suave/lento al soltar).
    mm.add('(max-width: 1023.98px)', () => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.6,
        onUpdate: (self) => applyProgress(self.progress),
      });

      return () => {
        st.kill();
        applyProgress(0);
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const refreshTimeout = setTimeout(refresh, 600);

    return () => {
      mm.kill();
      window.removeEventListener('load', refresh);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <section id="institucional" className="bg-dark relative">
      {/* Sin padding-top/bottom en la sección (a diferencia del resto de
          secciones, que usan la clase section-padding): con top:0 la banda
          blanca de "Quiénes somos" queda pegada al borde superior, los
          bloques A y B manejan su propio padding vertical, y el bloque D
          (Misión & Visión, full-bleed) toca el borde inferior real de la
          sección sin dejar una franja de bg-dark visible debajo. */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />

      {/* Fondo compartido de Bloque A + Bloque B — un solo wrapper (relative,
          sin altura propia: la da el flujo normal de sus hijos, incluido el
          pin-spacer de Red de articulación) con el fondo scroll-driven
          detrás (blobs + grano) y ambos bloques encima con fondo
          transparente, así no hay corte duro entre ambos. Ver
          heroBgWrapperRef/heroBlobs y su useEffect más arriba. */}
      <div ref={heroBgWrapperRef} className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-dark-100">
          {heroBlobs.map((blob, index) => (
            <div
              key={blob.key}
              ref={(el) => {
                heroBlobRefs.current[index] = el;
              }}
              className={`absolute rounded-full blur-2xl will-change-transform lg:blur-3xl ${blob.className}`}
            />
          ))}

          {/* Grano muy sutil sobre todo el fondo — textura estática (no
              animada), vía SVG feTurbulence inline, para que el degradé no
              se sienta plano/digital. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '160px 160px',
            }}
          />
        </div>

        {/* Bloque A: Quiénes somos — rediseño hero-style (ref. mock tipo
            Sharplink): eyebrow con punto celeste + CTA "Conocer más" arriba
            a la derecha, título grande en blanco (mismo tamaño que antes) y
            párrafo más chico en gris tenue debajo. El fondo ya no es propio
            de este bloque, vive en heroBgWrapperRef de arriba. */}
        <div className="relative z-10 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between md:mb-16">
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Quiénes somos
                </span>
              </div>

              {/* Botón de dos piezas (texto + cuadrado con flecha), mismo
                  patrón que CtaButton, pero en versión "vidrio oscuro"
                  (bg-white/10) en vez de blanco+celeste — así se integra
                  sobre el degradado en vez de competir con él. */}
              <a href="#mision-vision" className="group inline-flex items-stretch gap-1 self-start sm:self-auto">
                <span className="flex h-8 items-center rounded-small bg-white/10 px-4 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/15 md:h-9">
                  Conocer más
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-small bg-white/10 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/15 md:h-9 md:w-9">
                  <ArrowIcon className="h-3 w-3 text-white md:h-3.5 md:w-3.5" />
                </span>
              </a>
            </div>

            <h2 className="max-w-3xl text-3xl font-medium leading-tight text-white md:text-4xl lg:text-5xl">
              Una asociación que conecta tecnología, conocimiento y comunidad.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
              ADEEMA impulsa el impacto del gaming y las nuevas tecnologías en la sociedad. Articulamos
              comunidades, universidades, empresas e instituciones para conectar conocimiento, innovación y
              oportunidades, fortaleciendo las capacidades necesarias para el futuro.
            </p>
          </div>
        </div>

        {/* Bloque B: Red de articulación — patrón "pin + swap in-place" (ref.
            cantor8.com). Columna izquierda fija (título+párrafo) mientras la
            sección está pineada; columna derecha: ventana de tamaño fijo
            donde las 6 cards se suceden una por vez (ver useEffect arriba).
            En mobile no hay pin: la ventana es un bloque normal con las
            cards apiladas (ArticulationCard resuelve ambos casos por CSS). */}
        <div
          ref={articulationSectionRef}
          className="relative z-10 py-16 md:py-20 lg:flex lg:h-screen lg:items-center lg:py-0"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:w-full lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col lg:h-[70vh] lg:justify-between">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
                  Red de articulación
                </h2>
                <p className="mt-3 max-w-md text-sm md:text-base text-slate-400 lg:mt-0">
                  Construimos vínculos estratégicos entre instituciones, empresas y comunidades para impulsar el
                  desarrollo tecnológico y académico.
                </p>
              </div>

              <div className="relative space-y-6 lg:h-[70vh] lg:space-y-0 lg:overflow-hidden">
                {articulationCards.map((card, index) => (
                  <ArticulationCard
                    key={card.title}
                    card={card}
                    innerRef={(el) => {
                      articulationCardRefs.current[index] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque D: Misión & Visión — transición editorial split-screen
          vinculada al scroll (fuera del max-w-7xl a propósito, full-bleed,
          igual que el bloque "Trabajamos junto a"). Dos carriles de 50%
          (texto | visual) en desktop, apilados en mobile; cada uno con
          Misión y Visión superpuestas que se desplazan en sentidos
          opuestos según el progreso del scroll (ver useEffect arriba). Sin
          hover, sin botones, sin cards independientes. */}
      <div
        ref={missionVisionSectionRef}
        id="mision-vision"
        className="relative z-10 overflow-hidden bg-dark lg:h-screen"
      >
        <div className="relative flex w-full flex-col lg:h-full lg:flex-row">
          <div className="relative h-[380px] w-full overflow-hidden lg:h-full lg:w-1/2">
            <MissionVisionTextPanel
              card={missionVisionCards[0]}
              innerRef={(el) => {
                missionVisionTextRefs.current[0] = el;
              }}
              initialTransform="translateY(0%)"
            />
            <MissionVisionTextPanel
              card={missionVisionCards[1]}
              innerRef={(el) => {
                missionVisionTextRefs.current[1] = el;
              }}
              initialTransform="translateY(100%)"
            />
          </div>

          <div className="relative h-[380px] w-full overflow-hidden lg:h-full lg:w-1/2">
            <MissionVisionVisualPanel
              card={missionVisionCards[0]}
              innerRef={(el) => {
                missionVisionVisualRefs.current[0] = el;
              }}
              initialTransform="translateY(0%)"
            />
            <MissionVisionVisualPanel
              card={missionVisionCards[1]}
              innerRef={(el) => {
                missionVisionVisualRefs.current[1] = el;
              }}
              initialTransform="translateY(-100%)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
