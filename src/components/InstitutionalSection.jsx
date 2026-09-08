import Button from './ui/Button';
import Card from './ui/Card';

const networkPartners = [
  { icon: '🏛️', label: 'Municipios y Gobiernos' },
  { icon: '🏢', label: 'Cámaras Empresariales e Instituciones' },
  { icon: '🎓', label: 'Universidades y Colegios' },
  { icon: '💡', label: 'Centros Tech e Incubadoras' },
  { icon: '🌐', label: 'Organismos Multilaterales y Asociaciones' },
  { icon: '💻', label: 'Empresas Tech y Sponsors' },
];

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
  return (
    <section id="institucional" className="section-padding bg-dark-100 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Bloque A + B: Quiénes somos / Red de Articulación */}
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 items-start mb-16">
          {/* Bloque A - texto */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
              Quiénes somos
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Impulsamos el ecosistema institucional,{' '}
              <span className="text-gradient">académico y tecnológico</span>{' '}
              de Argentina
            </h2>
            <div className="space-y-3 text-slate-400 leading-relaxed">
              <p>
                ADEEMA promueve y desarrolla el impacto de la cultura del gaming y las nuevas tecnologías en la
                sociedad. Articulamos comunidades, universidades, empresas e instituciones dentro de un mismo
                ecosistema de innovación y gaming con el objetivo de construir capacidades para el futuro.
              </p>
            </div>
          </div>

          {/* Bloque B - Red de articulación */}
          <div>
            <p className="text-slate-500 text-sm uppercase tracking-widest font-medium mb-6">
              Trabajamos junto a:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {networkPartners.map((partner) => (
                <Card key={partner.label} className="p-4 text-center" hover>
                  <div className="text-3xl mb-2">{partner.icon}</div>
                  <p className="text-slate-300 text-xs font-medium leading-snug">{partner.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bloque C: Alcance Federal */}
        <div className="mb-16 rounded-2xl border border-primary-500/20 bg-primary-500/5 p-6 md:p-8 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="text-4xl flex-shrink-0">🗺️</div>
          <div>
            <h3 className="text-white font-bold text-xl mb-2">Alcance Federal</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              ADEEMA opera con visión federal, llegando a comunidades e instituciones de todas las provincias.
              Cada programa, charla y contenido estratégico apunta a un ecosistema nacional, inclusivo y accesible.
            </p>
          </div>
        </div>

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
