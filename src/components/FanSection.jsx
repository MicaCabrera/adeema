import { useState } from 'react';
import Button from './ui/Button';

const valueCards = [
  {
    icon: '📝',
    title: 'Registro Área FAN',
    description: 'Sumate de forma oficial a nuestra comunidad. Un espacio abierto para compartir ideas y conectar con pares.',
  },
  {
    icon: '🗂️',
    title: 'Base de Datos & Interesados',
    description: 'Registro federal para vincular el talento de las nuevas generaciones con instituciones y proyectos estratégicos.',
  },
  {
    icon: '✉️',
    title: 'Newsletter y Tendencias',
    description: 'Recibí en tu correo análisis exclusivos, novedades institucionales y alertas clave del ecosistema.',
  },
  {
    icon: '🎟️',
    title: 'Participación en Actividades',
    description: 'Acceso prioritario a convocatorias, encuentros virtuales y novedades de la cultura tecnológica.',
  },
];

const checks = [
  'Registro oficial al Área FAN y base de datos',
  'Newsletter con novedades y alertas exclusivas',
  'Participación en actividades y contenidos del ecosistema',
];

export default function FanSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="comunidad" className="section-padding relative overflow-hidden bg-dark border-y border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-primary-900/10 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
            Comunidad
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            ÁREA{' '}
            <span className="bg-gradient-to-r from-violet-400 to-primary-400 bg-clip-text text-transparent">
              FAN
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
            El espacio para seguidores, entusiastas y profesionales que quieren ser parte del ecosistema sin competir.
          </p>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
          {valueCards.map((card) => (
            <div
              key={card.title}
              className="group p-4 rounded-2xl border border-white/5 bg-dark-200/50 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
            >
              <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>

        {/* CTA único de la sección — después de la información */}
        <div className="text-center mb-10">
          <Button variant="fan" size="lg" href="#sumate-form">
            Quiero entrar al Área FAN
          </Button>
        </div>

        {/* Caja de formulario — donde ancla el CTA "Sumate" del nav */}
        <div id="sumate-form" className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-900/25 to-primary-900/10 p-6 md:p-10 scroll-mt-28">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Una comunidad para seguir conectados.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Dejanos tus datos para sumarte al Área FAN y recibir el newsletter.
              </p>
              <div className="flex flex-col gap-2.5">
                {checks.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <svg className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-8 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h4 className="text-white font-semibold text-lg mb-2">¡Listo, ya sos parte del Área FAN!</h4>
                <p className="text-slate-300 text-sm">Revisá tu correo para confirmar tu registro.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre y Apellido"
                  required
                  className="w-full rounded-lg border border-white/10 bg-dark-200/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  required
                  className="w-full rounded-lg border border-white/10 bg-dark-200/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
                />
                <input
                  type="text"
                  placeholder="Provincia / Ciudad"
                  className="w-full rounded-lg border border-white/10 bg-dark-200/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 sm:col-span-2"
                />
                <Button variant="fan" size="md" as="button" type="submit" className="sm:col-span-2 justify-center">
                  Sumarme al Área FAN
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
