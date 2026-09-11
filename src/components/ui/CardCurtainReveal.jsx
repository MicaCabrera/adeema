import { createContext, forwardRef, useCallback, useContext, useState } from 'react';

// Puerto a JS/CSS puro del patrón "Curtain Reveal" (ref. componente
// card-curtain-reveal de 21st.dev) — sin sumar `motion`/radix/cva al
// proyecto: el resto del sitio ya resuelve sus animaciones con
// transitions de Tailwind + GSAP puntual, así que el mismo clip-path
// curtain se logra con una transición CSS sobre `clip-path` en vez de
// framer-motion. Misma API por composición (Reveal/Body/Footer/Title/
// Curtain) que el original, para que el uso en cada sección quede igual
// de declarativo.
//
// A diferencia del demo (donde título y descripción arrancan ocultos y
// se revelan en hover), acá el contenido de <CardCurtainRevealBody>
// queda SIEMPRE visible — solo el título se desplaza sutilmente y la
// imagen del footer hace el curtain reveal real. Ver uso en
// InstitutionalSection (Misión y Visión).
const CURTAIN_CLIP = {
  hidden: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)',
  visible: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
};

const CardCurtainRevealContext = createContext(undefined);

function useCardCurtainRevealContext() {
  const context = useContext(CardCurtainRevealContext);
  if (!context) {
    throw new Error('useCardCurtainRevealContext must be used within a CardCurtainReveal component');
  }
  return context;
}

// Hover real en desktop; en touch/mobile (sin hover), el tap togglea el
// estado "activo" — mismo criterio que ya usa el resto del sitio (ver
// supportsHover() en InstitutionalSection) para no disparar hovers
// fantasma en dispositivos táctiles.
function supportsHover() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
}

const CardCurtainReveal = forwardRef(function CardCurtainReveal(
  { children, className = '', ...props },
  ref
) {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (supportsHover()) setIsActive(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (supportsHover()) setIsActive(false);
  }, []);
  const handleClick = useCallback(() => {
    if (!supportsHover()) setIsActive((prev) => !prev);
  }, []);

  return (
    <CardCurtainRevealContext.Provider value={{ isActive }}>
      <div
        ref={ref}
        className={`relative flex flex-col overflow-hidden ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    </CardCurtainRevealContext.Provider>
  );
});

const CardCurtainRevealBody = forwardRef(function CardCurtainRevealBody(
  { className = '', ...props },
  ref
) {
  return <div ref={ref} className={`relative z-10 flex flex-1 flex-col ${className}`} {...props} />;
});

// Desplazamiento sutil del título en hover/tap (20-40px sugeridos, no los
// 170px del demo original — ahí el título arrancaba fuera de cuadro).
const CardCurtainRevealTitle = forwardRef(function CardCurtainRevealTitle(
  { className = '', shift = 24, style, ...props },
  ref
) {
  const { isActive } = useCardCurtainRevealContext();
  return (
    <h3
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `translateY(${isActive ? -shift : 0}px)`, ...style }}
      {...props}
    />
  );
});

// La pieza que sí hace el curtain reveal real: clip-path que crece desde
// una línea central hasta cubrir todo el contenedor (imagen de footer).
const CardCurtainRevealFooter = forwardRef(function CardCurtainRevealFooter(
  { className = '', style, ...props },
  ref
) {
  const { isActive } = useCardCurtainRevealContext();
  return (
    <div
      ref={ref}
      className={`relative transition-[clip-path] duration-[400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${className}`}
      style={{ clipPath: isActive ? CURTAIN_CLIP.visible : CURTAIN_CLIP.hidden, ...style }}
      {...props}
    />
  );
});

// Capa opcional con mix-blend-difference (bg color a elección vía
// className) que hace el mismo curtain reveal en simultáneo, superpuesta
// a lo que sea que tenga debajo. Queda aparte del Footer para poder
// sacarla sin tocar el resto si el blend no funciona contra la paleta.
const CardCurtain = forwardRef(function CardCurtain({ className = '', style, ...props }, ref) {
  const { isActive } = useCardCurtainRevealContext();
  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 transition-[clip-path] duration-300 ease-out ${className}`}
      style={{ clipPath: isActive ? CURTAIN_CLIP.visible : CURTAIN_CLIP.hidden, ...style }}
      {...props}
    />
  );
});

export {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
};
