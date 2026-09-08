import Button from './ui/Button';

const axes = [
  {
    icon: '🏛️',
    title: 'Convenios e Instituciones',
    description: 'Articulación con gobiernos y universidades para el co-desarrollo de proyectos estratégicos e investigación aplicada.',
  },
  {
    icon: '🏢',
    title: 'Empresas Aliadas',
    description: 'Integración de actores corporativos comprometidos con la transformación tecnológica, impulsando sinergias que fortalecen el sector y generan valor de cara al futuro.',
  },
  {
    icon: '📡',
    title: 'Espacios de Patrocinio',
    description: 'Presencia y posicionamiento de marca dentro de nuestra agenda multimedia, ciclos de streaming de ADEEMA Media y entornos de difusión orientados a las nuevas generaciones.',
  },
  {
    icon: '⭐',
    title: 'Beneficios Institucionales',
    description: 'Acceso preferencial a informes y estudios del sector, networking de alto nivel, vinculación en el Claustro de Innovación y conexión directa con el talento joven.',
  },
];

export default function SponsorsSection() {
  return (
    <section id="alianzas" className="section-padding bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-100 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            Convenios & Sponsors
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Alianzas y Cooperación Estratégica
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
            Conectamos instituciones, empresas y marcas con un ecosistema de innovación aplicada, educación y
            desarrollo federal. Potenciamos el impacto a través de la articulación conjunta y el beneficio
            institucional mutuo.
          </p>
        </div>

        {/* Ejes estratégicos */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {axes.map((axis) => (
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

        {/* Bloque de cierre */}
        <div className="relative rounded-2xl border border-primary-500/30 bg-gradient-to-r from-primary-900/30 to-dark-200 p-8 md:p-12 overflow-hidden text-center">
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-slate-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              Diseñamos propuestas de colaboración y vinculación alineadas a objetivos institucionales,
              de posicionamiento y de desarrollo territorial.
            </p>
            <Button variant="primary" size="lg" href="#contacto">
              Quiero ser aliado
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
