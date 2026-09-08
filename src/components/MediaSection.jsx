import Button from './ui/Button';

const contentBlocks = [
  {
    icon: '📡',
    title: 'Transmisiones en Vivo / Streaming',
    description: 'Programación institucional en directo junto a referentes del sector, conversando sobre gaming, innovación, educación y nuevas generaciones.',
  },
  {
    icon: '🎙️',
    title: 'Ciclos de Entrevistas',
    description: 'Charlas profundas con líderes de la industria, académicos y tomadores de decisión que impulsan el desarrollo.',
  },
  {
    icon: '🎬',
    title: 'Contenido Audiovisual',
    description: 'Resúmenes, contenidos en formato corto y material interactivo diseñado para plataformas digitales.',
  },
  {
    icon: '📸',
    title: 'Cobertura de Eventos',
    description: 'Difusión audiovisual de las activaciones presenciales, jornadas de vinculación y encuentros de la asociación.',
  },
];

export default function MediaSection() {
  return (
    <section id="media" className="section-padding relative overflow-hidden bg-dark-100 border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 via-transparent to-violet-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary-400 mb-4 px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full">
            Media Hub
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ADEEMA{' '}
            <span className="text-gradient">Media</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Conectando audiencias a través de contenidos estratégicos, streaming y producciones audiovisuales
            sobre innovación y cultura del gaming.
          </p>
        </div>

        {/* Content blocks grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {contentBlocks.map((block) => (
            <div
              key={block.title}
              className="group p-5 rounded-2xl border border-white/5 bg-dark-200/50 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {block.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{block.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{block.description}</p>
            </div>
          ))}
        </div>

        {/* CTA único */}
        <div className="text-center">
          <Button variant="primary" size="lg" href="#media">
            Ver Transmisiones
          </Button>
        </div>
      </div>
    </section>
  );
}
