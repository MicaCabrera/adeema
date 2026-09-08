import Button from './ui/Button';

const networkPartners = [
  {
    title: 'Municipios y Gobiernos',
    description: 'Acercamos innovación, tecnología y formación a comunidades de todo el país.',
  },
  {
    title: 'Cámaras Empresariales e Instituciones',
    description: 'Generamos alianzas y proyectos que fortalecen el desarrollo empresarial e institucional.',
  },
  {
    title: 'Universidades y Colegios',
    description: 'Conectamos educación, conocimiento e innovación para crear nuevas oportunidades de formación.',
  },
  {
    title: 'Centros Tech e Incubadoras',
    description: 'Potenciamos talento, proyectos y emprendimientos que impulsan el futuro tecnológico.',
  },
  {
    title: 'Organismos Multilaterales y Asociaciones',
    description: 'Articulamos cooperación y alianzas para desarrollar iniciativas de impacto nacional e internacional.',
  },
  {
    title: 'Empresas Tech y Sponsors',
    description: 'Creamos oportunidades de colaboración, visibilidad y participación en nuevas iniciativas tecnológicas.',
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
  return (
    <section id="institucional" className="section-padding bg-dark-100 relative border-t border-white/5">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloque A: Quiénes somos — ancho completo, título + párrafo secundario */}
        <div className="mb-16">
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

      {/* Bloque B: Red de articulación — banda propia en modo claro, aislada del resto (dark) */}
      <div className="relative z-10 bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
            {/* Columna izquierda: eyebrow + título, fija (sticky) hasta que termina la lista */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-1 w-1 flex-shrink-0 bg-primary-600" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-widest uppercase text-primary-600">
                  Red de articulación
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Trabajamos junto a
              </h2>
            </div>

            {/* Columna derecha: lista de 6 items, alto natural, sin scroll interno */}
            <div>
              {networkPartners.map((partner, index) => (
                <div
                  key={partner.title}
                  className={`flex gap-4 py-6 ${
                    index !== networkPartners.length - 1 ? 'border-b border-dashed border-gray-200' : ''
                  }`}
                >
                  <span className="flex-shrink-0 text-sm text-primary-600">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                      {partner.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Bloque C: Alcance Federal — bloque "por qué importa" */}
        <div className="mb-16 mt-16">
          <Eyebrow>Alcance Federal</Eyebrow>
          <p className="max-w-3xl text-base md:text-lg leading-relaxed">
            <span className="text-white font-semibold">
              ADEEMA opera con visión federal, llegando a comunidades e instituciones de{' '}
              <span className="text-accent">todas las provincias</span>.
            </span>{' '}
            <span className="text-slate-400">
              Cada programa, charla y contenido estratégico apunta a un ecosistema nacional, inclusivo y accesible.
            </span>
          </p>
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
