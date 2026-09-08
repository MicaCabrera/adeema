import Button from './ui/Button';
import BrandMark from './ui/BrandMark';

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
          <div className="mb-2 md:mb-3 flex animate-fade-in-up">
            <BrandMark
              size="sm"
              badgeClassName="shadow-[0_0_45px_rgba(0,229,255,0.18)]"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-3 py-1.5 mb-4 md:mb-5 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-accent">
              Asociación Argentina
            </span>
          </div>

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
            <Button variant="primary" size="sm" href="#institucional">
              Conocé ADEEMA
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
            <Button variant="secondary" size="sm" href="#academy">
              Explorar Academy
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
