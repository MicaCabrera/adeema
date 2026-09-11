const footerNavLinks = [
  { label: 'Quiénes somos', href: '#institucional' },
  { label: 'Misión y Visión', href: '#mision-vision' },
  { label: 'ADEEMA Academy', href: '#academy' },
  { label: 'ADEEMA Media', href: '#media' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
];

// Nav en dos sub-columnas (ref. footer de Sharplink) — split manual en vez
// de grid-cols-2 porque el auto-flow de grid intercala los links
// izquierda/derecha fila por fila; acá van agrupados en dos bloques
// secuenciales, como en la referencia.
const NAV_COLUMN_SPLIT = 4;

// Mismo lenguaje visual (stroke, currentColor) que el resto de los íconos
// del sitio (ver ArrowIcon en MediaSection/AcademySection/NewsSection) —
// sin fondo ni contenedor, solo el trazo.
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/adeemaoficial/',
    icon: <InstagramIcon className="h-[18px] w-[18px]" />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/adeema/posts/?feedView=all',
    icon: <LinkedinIcon className="h-[18px] w-[18px]" />,
  },
];

const legalLinks = ['Términos y condiciones', 'Política de privacidad'];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Footer() {
  return (
    // Fondo degradado de marca (brand-500 → surface → dark) — única
    // sección del sitio que rompe con el bg-dark plano, a propósito, como
    // cierre visual (ref. footer de Sharplink). El resto de la página no
    // se toca.
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_0%,#55B4EB_0%,#043766_45%,#020D1A_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-[1.1fr_1.5fr_0.7fr_auto] lg:border-t lg:border-dashed lg:border-white/15 lg:pt-12">
          {/* Marca + contacto */}
          <div className="lg:border-r lg:border-dashed lg:border-white/15 lg:pr-8">
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Asociación de Deportes Electrónicos y Electromecánicos de Argentina.
            </p>
            <a
              href="mailto:contacto@adeema.org.ar"
              className="mt-4 inline-block text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              contacto@adeema.org.ar
            </a>
          </div>

          {/* Navegación */}
          <div className="lg:border-r lg:border-dashed lg:border-white/15 lg:pr-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Navegación</span>
            <div className="mt-5 flex gap-8">
              <div className="flex flex-col gap-3">
                {footerNavLinks.slice(0, NAV_COLUMN_SPLIT).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-white transition-colors duration-200 hover:text-white/70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {footerNavLinks.slice(NAV_COLUMN_SPLIT).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-base font-medium text-white transition-colors duration-200 hover:text-white/70"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="lg:border-r lg:border-dashed lg:border-white/15 lg:pr-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Social</span>
            <div className="mt-5 flex flex-col gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-medium text-white transition-colors duration-200 hover:text-white/70"
                >
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Volver arriba */}
          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end lg:justify-start lg:gap-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">Volver arriba</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-small bg-white/10 transition-colors duration-200 hover:bg-white"
            >
              <ArrowIcon className="h-4 w-4 -rotate-90 text-white transition-colors duration-200 group-hover:text-brand-500" />
            </button>
          </div>
        </div>

        {/* Legal + copyright */}
        <div className="mt-12 flex flex-col gap-4 border-t border-dashed border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between md:mt-14">
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            {legalLinks.map((item) => (
              <a key={item} href="#" className="transition-colors duration-200 hover:text-white">
                {item}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} ADEEMA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
