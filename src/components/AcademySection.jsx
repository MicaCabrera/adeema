import Button from './ui/Button';

const paths = [
  {
    icon: '📚',
    title: 'Cursos Especializados',
    description: 'Trayectos formativos enfocados en herramientas clave, gestión del entorno tecnológico y habilidades técnicas demandadas por el sector.',
  },
  {
    icon: '🎓',
    title: 'Diplomaturas Institucionales',
    description: 'Programas de formación continua con respaldo académico para profesionalizar la industria del gaming y los esports de manera sostenible.',
  },
  {
    icon: '🎤',
    title: 'Charlas & ADEEMA Talks',
    description: 'Ciclos de conferencias y masterclasses abiertas con expertos del sector, analizando el impacto educativo y social de la tecnología.',
  },
  {
    icon: '🚀',
    title: 'Programas de Innovación',
    description: 'Espacios de aceleración de conocimiento orientados al desarrollo de talento joven, transformación y capacidades tecnológicas aplicadas.',
  },
];

export default function AcademySection() {
  return (
    <section id="academy" className="section-padding relative overflow-hidden bg-dark border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-teal-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 mb-4 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            Formación
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ADEEMA{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Academy
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            El espacio de formación del ecosistema. Programas educativos estructurados para capacitar a las
            nuevas generaciones, profesionales y organizaciones en las competencias del futuro e innovación.
          </p>
        </div>

        {/* Paths grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {paths.map((path) => (
            <div
              key={path.title}
              className="group p-5 rounded-2xl border border-white/5 bg-dark-200/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {path.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{path.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{path.description}</p>
            </div>
          ))}
        </div>

        {/* CTA de la sección — al final */}
        <div className="text-center">
          <Button variant="secondary" size="lg" href="https://academy.adeema.org.ar">
            Ir a la Academia
          </Button>
        </div>
      </div>
    </section>
  );
}
