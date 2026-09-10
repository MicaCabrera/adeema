import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

const paths = [
  {
    title: 'Cursos Especializados',
    description: 'Trayectos formativos enfocados en herramientas clave, gestión del entorno tecnológico y habilidades técnicas demandadas por el sector.',
  },
  {
    title: 'Diplomaturas Institucionales',
    description: 'Programas de formación continua con respaldo académico para profesionalizar la industria del gaming y los esports de manera sostenible.',
  },
  {
    title: 'Charlas & ADEEMA Talks',
    description: 'Ciclos de conferencias y masterclasses abiertas con expertos del sector, analizando el impacto educativo y social de la tecnología.',
  },
  {
    title: 'Programas de Innovación',
    description: 'Espacios de aceleración de conocimiento orientados al desarrollo de talento joven, transformación y capacidades tecnológicas aplicadas.',
  },
];

function ArrowIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function AcademySection() {
  return (
    <section id="academy" className="section-padding relative bg-dark border-y border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: eyebrow arriba en su propia línea; el título y el CTA
            "Ir a la Academia" van alineados horizontalmente en la misma fila. */}
        <Eyebrow className="mb-4">Educación</Eyebrow>

        <div className="mb-10 md:mb-14 flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            ADEEMA Academy
          </h2>
          <CtaButton href="https://academy.adeema.org.ar">Ir a la Academia</CtaButton>
        </div>

        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mb-10 md:mb-14">
          El espacio de formación del ecosistema. Programas educativos estructurados para capacitar a las
          nuevas generaciones, profesionales y organizaciones en las competencias del futuro e innovación.
        </p>

        {/* Grid 2x2 (desktop) / 1 columna (mobile). Cada card sigue la
            anatomía de la referencia: bloque superior con el título
            superpuesto, fila de tags, descripción y botón chico con
            flecha — mismos colores/tamaños ya usados en el sitio. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {paths.map((path, index) => (
            <a
              key={path.title}
              href="https://academy.adeema.org.ar"
              className="block overflow-hidden rounded-medium border border-white/5 bg-dark-200/50"
            >
              <div className="flex h-40 flex-col justify-end bg-surface p-5 md:h-48 md:p-6">
                <h3 className="text-base md:text-lg font-medium text-white">{path.title}</h3>
              </div>
              <div className="p-5 md:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-small border border-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Academy
                  </span>
                  <span className="rounded-small border border-white/15 px-2.5 py-1 text-[10px] font-semibold tabular-nums text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mb-5 text-sm text-slate-400 leading-relaxed">{path.description}</p>
                {/* Botón de dos piezas separadas, igual que el CtaButton
                    principal (texto + gap + cuadrado celeste), no una sola caja
                    acordeón. El hover es local a este botón (group/btn) — no se
                    dispara al pasar el mouse por el resto de la card. En reposo
                    el texto "Ver" queda colapsado (w-0); al hoverear el botón
                    se expande como bloque propio, separado del cuadrado por el
                    mismo gap que usan los botones principales. */}
                <span className="group/btn inline-flex items-stretch gap-1.5">
                  <span className="flex w-0 items-center overflow-hidden whitespace-nowrap bg-white px-0 text-xs font-semibold uppercase tracking-widest text-dark transition-all duration-300 ease-in-out group-hover/btn:w-16 group-hover/btn:px-4">
                    Ver
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-small bg-brand-500 text-white">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
