import { useEffect, useRef, useState } from 'react';
import Button from './ui/Button';

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
    title: 'Organismos Multilaterales y Asociaciones',
    description: 'Articulamos cooperación y alianzas para desarrollar iniciativas de impacto nacional e internacional.',
    icon: icons.globe,
  },
  {
    title: 'Empresas Tech y Sponsors',
    description: 'Creamos oportunidades de colaboración, visibilidad y participación en nuevas iniciativas tecnológicas.',
    icon: icons.monitor,
  },
];

// Eyebrow minimal: bullet cuadrado + texto tracked, sin pill/borde.
// Local a esta sección — el resto del sitio sigue usando el pill
// (ver SectionHeader.jsx, hoy sin uso, y el markup inline de Bloques D/E).
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="h-1 w-1 flex-shrink-0 bg-accent" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-widest uppercase text-accent">
        {children}
      </span>
    </div>
  );
}

const managementAxes = [
  {
    title: 'Claustro de Innovación y Futuro',
    description: 'Espacio de pensamiento y análisis sobre el porvenir social, educativo y tecnológico.',
    icon: '🧠',
  },
  {
    title: 'Informes, Estudios y Contenido Estratégico',
    description: 'Publicaciones y análisis sectoriales sobre la cultura tecnológica y nuevas generaciones.',
    icon: '📊',
  },
  {
    title: 'Convenios y Articulaciones Institucionales',
    description: 'Alianzas firmadas para consolidar el marco institucional.',
    icon: '🤝',
  },
];

export default function InstitutionalSection() {
  const partnersGridRef = useRef(null);
  const [linesVisible, setLinesVisible] = useState(false);

  // Scroll-reveal de las líneas divisorias de la grilla "Red de articulación":
  // se dispara una sola vez al entrar en viewport (observer se desconecta al
  // primer intersect), no vuelve a repetirse al scrollear arriba/abajo.
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="institucional" className="section-padding bg-dark-100 relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloque A: Quiénes somos — ancho completo, título + párrafo secundario */}
        {/* pt-6/md:pt-8 suma sobre el pt de section-padding (56px/80px) para llegar a
            80px/112px de aire arriba; pb-20/md:pb-28 reemplaza el mb-16 anterior para dar
            80px/112px de aire abajo, sin tocar el py del bloque blanco de "Trabajamos junto a" */}
        <div className="pt-6 pb-20 md:pt-8 md:pb-28">
          <Eyebrow>Quiénes somos</Eyebrow>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-5">
            Una asociación que conecta{' '}
            <span className="text-gradient">tecnología, conocimiento y comunidad</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
            ADEEMA promueve y desarrolla el impacto de la cultura del gaming y las nuevas tecnologías en la
            sociedad. Articulamos comunidades, universidades, empresas e instituciones dentro de un mismo
            ecosistema de innovación y gaming con el objetivo de construir capacidades para el futuro.
          </p>
        </div>
      </div>

      {/* Bloque B: Red de articulación — banda crema full-bleed, grilla estática
          tipo "Traps to Avoid" de sentientx.com. Sin hover, sin sombras, sin
          bordes redondeados: grilla continua con líneas finas tipo tabla. */}
      <div className="relative z-10 bg-[#f7f5f0] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 md:mb-14 text-2xl md:text-3xl font-medium tracking-tight text-[#141310]">
            Red de articulación
          </h2>

          {/* El contenedor pone el borde superior + izquierdo (fijos, sin animar).
              Cada celda dibuja su propio borde derecho + inferior como líneas que
              se "trazan" con scroll-reveal — así nunca se duplican entre celdas,
              sin importar cuántas columnas haya por breakpoint (2 en mobile, 3 en desktop). */}
          <div
            ref={partnersGridRef}
            className="grid grid-cols-2 border-t border-l border-[#141310]/10 lg:grid-cols-3"
          >
            {networkPartners.map((partner, index) => (
              <div key={partner.title} className="relative p-6 md:p-8">
                <span className="block text-xs tabular-nums text-[#8a8579]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-base md:text-lg font-medium text-[#141310]">
                  {partner.title}
                </h3>
                <p className="mt-2 text-sm text-[#8a8579]">
                  {partner.description}
                </p>
                <div className="mt-8 h-6 w-6 text-[#141310]" aria-hidden="true">
                  {partner.icon}
                </div>

                {/* Línea derecha: escala en Y desde arriba */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-0 top-0 h-full w-px origin-top bg-[rgba(20,19,16,0.15)] transition-transform duration-700 ease-out ${
                    linesVisible ? 'scale-y-100' : 'scale-y-0'
                  }`}
                  style={{ transitionDelay: `${index * 70}ms` }}
                />
                {/* Línea inferior: escala en X desde la izquierda, con delay extra sobre la derecha */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left bg-[rgba(20,19,16,0.15)] transition-transform duration-700 ease-out ${
                    linesVisible ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ transitionDelay: `${index * 70 + 180}ms` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Bloque D: Misión & Visión */}
        <div id="mision-vision" className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              Nuestra identidad
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Misión & Visión
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <div className="relative group rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-900/30 to-dark-200 p-8 md:p-10 overflow-hidden hover:border-primary-500/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-600/30 border border-primary-500/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary-400">
                    Misión
                  </span>
                </div>
                <p className="text-white text-xl md:text-2xl font-semibold leading-snug mb-4">
                  Promover, formar y desarrollar las competencias del futuro en Argentina.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  A través de la creación de programas académicos, comunidades y espacios de articulación que
                  permitan el crecimiento sostenible del ecosistema tecnológico en todo el territorio nacional.
                </p>
                <div className="mt-8 pt-6 border-t border-primary-500/20 grid grid-cols-3 gap-4">
                  {[
                    { icon: '🎓', label: 'Formación' },
                    { icon: '🤝', label: 'Comunidad' },
                    { icon: '💡', label: 'Innovación' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visión */}
            <div className="relative group rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-dark-200 p-8 md:p-10 overflow-hidden hover:border-cyan-500/60 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                    Visión
                  </span>
                </div>
                <p className="text-white text-xl md:text-2xl font-semibold leading-snug mb-4">
                  Ser la organización de referencia en la región para la investigación y desarrollo del gaming, los esports y la innovación tecnológica.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Conectando a las nuevas generaciones, la educación y la tecnología bajo un marco de legitimidad.
                </p>
                <div className="mt-8 pt-6 border-t border-cyan-500/20 grid grid-cols-3 gap-4">
                  {[
                    { icon: '🗺️', label: 'Alcance Federal' },
                    { icon: '📈', label: 'Estrategia' },
                    { icon: '⭐', label: 'Legitimidad' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <span className="text-xs text-slate-500 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bloque E: Ejes de Gestión (Think Tank) */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              Think Tank
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Líneas Estratégicas y Contenido Estratégico
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {managementAxes.map((axis) => (
              <div
                key={axis.title}
                className="group p-6 rounded-2xl border border-white/5 bg-dark-200/50 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {axis.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{axis.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{axis.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="primary" size="lg" href="#comunidad">
              Quiero Sumarme
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
