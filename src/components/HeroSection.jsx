import CtaButton from './ui/CtaButton';

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex h-[100svh] items-center overflow-hidden bg-dark pt-24 pb-16 sm:pb-20 md:pt-28 md:pb-20"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark to-dark" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          {/* Main title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-4 md:mb-6 animate-fade-in-up">
            <span className="text-white">ADE</span>
            <span className="text-gradient">EMA</span>
          </h1>

          {/* Impact phrase */}
          <div className="mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-base sm:text-xl md:text-2xl font-semibold text-white leading-snug">
              Impulsando el ecosistema tecnológico, académico y cultural{' '}
              <span className="text-gradient">del futuro.</span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-row flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CtaButton href="#institucional">
              Conocé ADEEMA
            </CtaButton>
            <CtaButton variant="secondary" href="#academy">
              Explorar Academy
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
