import CtaButton from './ui/CtaButton';

const sideBlocks = [
  {
    tag: 'EVENTOS',
    title: 'Encuentros en Territorio',
    description: 'Agenda de jornadas presenciales, activaciones de gaming social y encuentros de vinculación del ecosistema en las provincias.',
  },
  {
    tag: 'ACTIVIDADES',
    title: 'Espacios de Innovación',
    description: 'Convocatorias abiertas a las nuevas ADEEMA Talks, seminarios y programas de formación interactivos de la Academy.',
  },
  {
    tag: 'NOVEDADES',
    title: 'Multimedia',
    description: 'Lanzamientos de producciones multimedia, clips ágiles y contenidos audiovisuales exclusivos a través de ADEEMA Media.',
  },
];

export default function NewsSection() {
  return (
    <section id="noticias" className="section-padding bg-dark relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            Actualidad
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Actualidad & Prensa
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
            El registro de nuestra actividad. Seguí las novedades, comunicados institucionales y eventos que
            marcan la agenda del ecosistema.
          </p>
        </div>

        {/* Grilla 65/35 */}
        <div className="grid lg:grid-cols-[1.85fr_1fr] gap-8 mb-10">
          {/* Columna izquierda destacada */}
          <div className="rounded-2xl border border-primary-500/20 bg-dark-200/50 p-8 md:p-10 flex flex-col justify-end min-h-[320px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 mb-4 w-fit">
                Comunicados
              </span>
              <h3 className="text-white font-bold text-2xl md:text-3xl leading-snug mb-4">
                ADEEMA consolida su red de alianzas estratégicas y convenios federales.
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                Firma de acuerdos marco con universidades, cámaras y organismos para impulsar la innovación
                aplicada, la formación y el desarrollo tecnológico en territorio.
              </p>
            </div>
          </div>

          {/* Columna derecha — lista de texto puro */}
          <div className="flex flex-col divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {sideBlocks.map((block) => (
              <div key={block.tag} className="p-6 flex-1">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {block.tag}
                </span>
                <h4 className="text-white font-semibold text-base mt-2 mb-2">{block.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{block.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA único */}
        <div className="text-center">
          <CtaButton as="button" type="button">
            Ver todas las novedades
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
