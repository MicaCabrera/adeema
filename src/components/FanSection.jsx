import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const titleWords = 'Una comunidad para seguir conectados'.split(' ');

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function FanSection() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const formRef = useRef(null);
  const wordRefs = useRef([]);
  wordRefs.current = [];

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Ingresá tu email.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Ingresá un email válido.');
      return;
    }

    setError('');
    setStatus('sending');
    setTimeout(() => setStatus('success'), 600);
  };

  // Entrada de la sección, en secuencia: eyebrow, título palabra por
  // palabra (reveal con máscara), párrafo con delay. En mobile el reveal
  // por palabra se simplifica a un fade del título completo. El form tiene
  // su propia entrada, más simple, cuando entra en su propio viewport.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const words = wordRefs.current.filter(Boolean);

      gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
      gsap.set(paragraphRef.current, { opacity: 0, y: 18 });

      if (isMobile) {
        gsap.set(titleRef.current, { opacity: 0 });
      } else {
        gsap.set(words, { yPercent: 115, opacity: 0 });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 72%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
          tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.5 });

          if (isMobile) {
            tl.to(titleRef.current, { opacity: 1, duration: 0.7 }, '-=0.15');
          } else {
            tl.to(words, { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.055 }, '-=0.15');
          }

          tl.to(paragraphRef.current, { opacity: 1, y: 0, duration: 0.6 }, isMobile ? '-=0.25' : '-=0.4');
        },
      });

      gsap.set(formRef.current, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(formRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="comunidad" ref={sectionRef} className="section-padding bg-dark relative border-y border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloque newsletter (ref. "newsletter-2" de 21st.dev), adaptado a la
            paleta de ADEEMA: panel gris translúcido (no un card blanco
            opaco) que flota sobre el navy de fondo de la sección, texto a
            la izquierda y form compacto de una sola línea (email + CTA) a
            la derecha — sin nombre/apellido/ciudad, reducido a lo esencial
            como en la referencia. */}
        <div className="rounded-medium bg-white/5 px-6 py-10 backdrop-blur-sm sm:px-10 md:px-12 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-3 md:max-w-sm">
              <div ref={eyebrowRef}>
                <Eyebrow>Área FAN</Eyebrow>
              </div>

              <h2
                ref={titleRef}
                className="text-2xl font-medium leading-tight text-white sm:text-3xl"
              >
                {titleWords.map((word, i) => (
                  <span key={word + i} className="inline-block overflow-hidden pb-1 align-bottom">
                    <span
                      ref={(el) => {
                        wordRefs.current[i] = el;
                      }}
                      className="inline-block"
                    >
                      {word}
                      {i < titleWords.length - 1 ? ' ' : ''}
                    </span>
                  </span>
                ))}
              </h2>

              <p ref={paragraphRef} className="text-sm text-slate-400">
                Novedades, alertas y contenido exclusivo del ecosistema tech, académico y cultural de ADEEMA,
                directo en tu correo.
              </p>
            </div>

            <div ref={formRef} className="flex flex-col gap-3 md:min-w-0 md:max-w-md md:flex-1">
              {status === 'success' ? (
                <div className="flex flex-col items-start gap-2 py-1 text-left">
                  <CheckIcon className="h-6 w-6 text-brand-500" />
                  <p className="text-sm font-semibold text-white">¡Listo, ya sos parte del Área FAN!</p>
                  <p className="text-sm text-slate-400">Revisá tu correo para confirmar tu suscripción.</p>
                </div>
              ) : (
                <>
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        aria-label="Email"
                        className="h-10 flex-1 rounded-small border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
                      />
                      <CtaButton
                        as="button"
                        type="submit"
                        variant="secondary"
                        className="shrink-0 justify-center !bg-brand-500 !text-white hover:!bg-brand-500/90 hover:!text-white"
                      >
                        {status === 'sending' ? 'Enviando…' : 'Sumarme'}
                      </CtaButton>
                    </div>

                    {error && <p className="text-xs text-[#E0CA8E]">{error}</p>}

                    <div className="flex items-center gap-2">
                      <input
                        id="fan-consent"
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="h-4 w-4 shrink-0 rounded-small border-white/30 bg-white/5 text-brand-500 focus:ring-brand-500"
                        style={{ accentColor: '#55B4EB' }}
                      />
                      <label htmlFor="fan-consent" className="text-sm text-slate-400">
                        Acepto recibir el newsletter de ADEEMA.
                      </label>
                    </div>
                  </form>

                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <LockIcon className="h-3 w-3 shrink-0" />
                    Tus datos están protegidos. Podés darte de baja cuando quieras.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
