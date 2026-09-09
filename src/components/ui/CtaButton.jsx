import { BRAND_ASSETS } from '../../assets/brandAssets';

// Único componente de CTA del sitio, con un único tamaño fijo (no acepta
// variación de tamaño): las medidas son las del CTA del Hero ("Conocé
// ADEEMA" / "Explorá Academy"), la fuente de verdad para alto, padding y
// tipografía de todos los botones de la página, sin importar la sección ni
// el largo del texto de cada uno.
//
// Variante "primary": rectángulo de texto blanco primero + cuadrado celeste
// con flecha después, separados por gap chico (ref. sharplink.com). El
// cuadrado va con z-index por encima del rectángulo de texto ("adelante"),
// misma altura entre ambos (items-stretch + aspect-square). En hover, la
// flecha "escapa" arriba-izquierda mientras el emblema de ADEEMA entra desde
// abajo-izquierda — dos capas superpuestas dentro del mismo cuadrado con
// overflow-hidden, dando sensación de loop continuo.
//
// Variante "secondary": una sola pieza gris/semitransparente, misma altura
// que la primaria, sin cuadrado ni barra de acento. En hover la palabra
// "sale" por la derecha y una copia idéntica entra por la izquierda (slide,
// no fade), con distancia > 100% para que quede un hueco visible entre
// ambas en vez de verse pegadas.
function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Medidas del CTA del Hero — única fuente de verdad de tamaño para todo el sitio.
const SIZE = {
  square: 'w-8 md:w-9',
  height: 'h-8 md:h-9',
  icon: 'h-3 w-3 md:h-3.5 md:w-3.5',
  emblem: 'h-3.5 w-3.5',
  text: 'px-4 text-xs',
  gap: 'gap-1',
};

export default function CtaButton({
  children,
  variant = 'primary',
  href,
  as = 'button',
  className = '',
  onClick,
  ...props
}) {
  const Component = href ? 'a' : as;
  const componentProps = href ? { href, onClick, ...props } : { onClick, ...props };

  if (variant === 'secondary') {
    return (
      <Component
        className={`group inline-flex items-center justify-center overflow-hidden rounded-lg bg-white/10 font-semibold uppercase tracking-widest text-slate-300 backdrop-blur-sm transition-colors duration-500 ease-in-out hover:bg-white/15 hover:text-white ${SIZE.height} ${SIZE.text} ${className}`}
        {...componentProps}
      >
        <span className="relative inline-block overflow-hidden">
          <span className="invisible whitespace-nowrap">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-[145%]">
            {children}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex -translate-x-[145%] items-center justify-center whitespace-nowrap transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:translate-x-0"
          >
            {children}
          </span>
        </span>
      </Component>
    );
  }

  return (
    <Component className={`group inline-flex items-stretch ${SIZE.gap} ${className}`} {...componentProps}>
      <span
        className={`relative z-0 flex items-center rounded-lg bg-white ${SIZE.text} font-semibold uppercase tracking-widest text-dark transition-colors duration-300 group-hover:bg-white/90`}
      >
        {children}
      </span>

      <span
        aria-hidden="true"
        className={`relative z-10 aspect-square shrink-0 overflow-hidden rounded-lg bg-[#55B4EB] ${SIZE.square}`}
      >
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:-translate-x-full group-hover:-translate-y-full">
          <ArrowIcon className={`${SIZE.icon} text-white`} />
        </span>
        <span className="absolute inset-0 flex -translate-x-full translate-y-full items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0">
          <img
            src={BRAND_ASSETS.emblemNegative}
            alt=""
            aria-hidden="true"
            className={`${SIZE.emblem} object-contain`}
            loading="lazy"
          />
        </span>
      </span>
    </Component>
  );
}
