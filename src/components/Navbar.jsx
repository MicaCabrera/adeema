import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CtaButton from './ui/CtaButton';
import LangSwitcher from './ui/LangSwitcher';
import { BRAND_ASSETS } from '../assets/brandAssets';

const navLinks = [
  { label: 'Institucional', href: '#institucional' },
  { label: 'Academy', href: '#academy' },
  { label: 'Media', href: '#media' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Convenios & Sponsors', shortLabel: 'Alianzas', href: '#alianzas' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [activeHref, setActiveHref] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // El overlay se mantiene montado durante la animación de salida: "closing"
  // se activa al vuelo durante el render (ajuste de estado sin efecto) y se
  // apaga en el onComplete del tween de salida.
  const [closing, setClosing] = useState(false);
  const [prevMenuOpen, setPrevMenuOpen] = useState(false);
  if (menuOpen !== prevMenuOpen) {
    setPrevMenuOpen(menuOpen);
    if (!menuOpen) setClosing(true);
  }
  const menuRendered = menuOpen || closing;

  const progressRefs = useRef({});
  const mobileOverlayRef = useRef(null);
  const mobileItemRefs = useRef([]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Scroll-spy: qué sección está cerca del centro del viewport.
  // Las secciones se montan vía React.lazy/Suspense en App.jsx, así que
  // pueden no existir todavía en el DOM cuando este efecto corre — se
  // reintenta por rAF hasta que aparezcan (o hasta un máximo razonable).
  useEffect(() => {
    let observer;
    let rafId;
    let attempts = 0;
    const MAX_ATTEMPTS = 240; // ~4s a 60fps

    const trySetup = () => {
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);

      attempts += 1;
      if (sections.length < navLinks.length && attempts < MAX_ATTEMPTS) {
        rafId = requestAnimationFrame(trySetup);
        return;
      }
      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((entry) => entry.isIntersecting);
          if (visible.length === 0) return;
          const closest = visible.reduce((best, entry) =>
            entry.intersectionRatio > best.intersectionRatio ? entry : best
          );
          setActiveHref(`#${closest.target.id}`);
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      sections.forEach((section) => observer.observe(section));
    };

    rafId = requestAnimationFrame(trySetup);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, []);

  // Barra de progreso de scroll por sección, debajo de cada link: las
  // secciones ya recorridas quedan llenas (scaleX 1), las futuras vacías
  // (scaleX 0) — solo la sección activa se anima una vez por cambio acá.
  useEffect(() => {
    const activeIndex = navLinks.findIndex((link) => link.href === activeHref);
    navLinks.forEach((link, index) => {
      const el = progressRefs.current[link.href];
      if (!el || index === activeIndex) return;
      const target = activeIndex === -1 ? 0 : index < activeIndex ? 1 : 0;
      gsap.to(el, { scaleX: target, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });
  }, [activeHref]);

  // Progreso continuo de la barra activa: se recalcula en cada tick del
  // ticker de GSAP (comparte el mismo loop que el resto de las animaciones,
  // no un segundo rAF propio) para que sea fluido y sin jank al scrollear.
  useEffect(() => {
    const tick = () => {
      const link = navLinks.find((item) => item.href === activeHref);
      if (!link) return;
      const section = document.querySelector(link.href);
      const el = progressRefs.current[link.href];
      if (!section || !el) return;

      const sectionTop = window.scrollY + section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight || 1;
      const raw = (window.scrollY - sectionTop) / sectionHeight;
      const progress = Math.min(1, Math.max(0, raw));

      gsap.to(el, { scaleX: progress, duration: 0.15, ease: 'none', overwrite: 'auto' });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [activeHref]);

  // Bloquea el scroll de fondo mientras el overlay mobile está montado
  useEffect(() => {
    document.body.style.overflow = menuRendered ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuRendered]);

  // Entrada / salida del menú full-screen con stagger de links (GSAP)
  useEffect(() => {
    if (!menuRendered) return;
    const overlay = mobileOverlayRef.current;
    const items = mobileItemRefs.current.filter(Boolean);
    if (!overlay) return;

    if (menuOpen) {
      gsap.set(overlay, { opacity: 0 });
      gsap.set(items, { opacity: 0, y: 28 });
      gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.1,
      });
    } else {
      gsap.to(items, {
        opacity: 0,
        y: -16,
        duration: 0.2,
        ease: 'power2.in',
        stagger: 0.03,
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        delay: 0.08,
        onComplete: () => setClosing(false),
      });
    }
  }, [menuOpen, menuRendered]);

  return (
    <>
      {/* Dock fijo arriba — tres cápsulas independientes (desktop, >=1280px) */}
      <div
        className="hidden xl:flex fixed inset-x-0 top-6 z-50 items-center justify-center gap-3 pointer-events-none"
      >
        {/* Logo — cápsula chica */}
        <a
          href="#inicio"
          aria-label="Ir al inicio"
          className="pointer-events-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-dark/70 backdrop-blur-lg transition-colors duration-200 hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
        >
          <img
            src={BRAND_ASSETS.emblemNegative}
            alt="ADEEMA"
            className="h-6 w-6 object-contain"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Links — cápsula larga con subrayado de progreso + idioma */}
        <nav
          aria-label="Navegación principal"
          className="pointer-events-auto flex h-12 flex-shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-dark/70 px-1.5 backdrop-blur-lg"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              title={link.shortLabel ? link.label : undefined}
              aria-current={activeHref === link.href ? 'true' : undefined}
              className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 ${
                activeHref === link.href ? 'text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.shortLabel ?? link.label}
              {/* Pista de fondo, siempre visible */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-2.5 bottom-0.5 h-0.5 rounded-full bg-white/15"
              />
              {/* Barra de progreso de scroll dentro de la sección */}
              <span
                ref={(el) => {
                  progressRefs.current[link.href] = el;
                }}
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-2.5 bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent"
              />
            </a>
          ))}
          <span className="mx-1 h-5 w-px flex-shrink-0 bg-white/10" aria-hidden="true" />
          <LangSwitcher variant="flat" />
        </nav>

        {/* Acciones — cápsula separada para no competir con los links */}
        <div className="pointer-events-auto flex h-12 flex-shrink-0 items-center gap-1 rounded-full border border-white/10 bg-dark/70 px-1.5 backdrop-blur-lg">
          <a
            href="#login"
            className="rounded-full px-3.5 py-2 text-[13px] font-medium text-slate-300 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
          >
            Iniciar Sesión
          </a>
          <a
            href="#comunidad"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-primary-500/50 bg-primary-600 px-3.5 py-2 text-[13px] font-medium text-white shadow-lg shadow-primary-900/30 transition-all duration-200 hover:border-primary-400 hover:bg-primary-500 hover:shadow-primary-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 active:scale-95"
          >
            Sumate
          </a>
        </div>
      </div>

      {/* Botón flotante mobile / tablet (<1280px) — abre el menú full-screen */}
      <button
        type="button"
        className="xl:hidden fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-dark/80 backdrop-blur-lg text-slate-200 shadow-xl shadow-black/30 transition-colors duration-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        <span className="relative block h-4 w-5">
          <span
            className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </span>
      </button>

      {/* Menú full-screen mobile / tablet (<1280px) */}
      {menuRendered && (
        <div
          id="mobile-menu"
          ref={mobileOverlayRef}
          className="xl:hidden fixed inset-0 z-40 flex flex-col bg-dark/98 backdrop-blur-xl opacity-0"
        >
          <div className="flex-1 overflow-y-auto px-6 sm:px-10 pt-16 pb-28">
            <nav aria-label="Navegación mobile" className="flex flex-col">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  ref={(el) => {
                    mobileItemRefs.current[index] = el;
                  }}
                  href={link.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl sm:text-4xl font-semibold text-slate-200 transition-colors hover:text-white focus:outline-none focus-visible:text-white"
                >
                  <span>{link.label}</span>
                  <span
                    aria-hidden="true"
                    className="text-primary-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    →
                  </span>
                </a>
              ))}
            </nav>

            <div
              ref={(el) => {
                mobileItemRefs.current[navLinks.length] = el;
              }}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-3">
                <CtaButton
                  href="#login"
                  onClick={closeMenu}
                >
                  Iniciar Sesión
                </CtaButton>
                <LangSwitcher />
              </div>
              <CtaButton
                href="#comunidad"
                className="w-full justify-center"
                onClick={closeMenu}
              >
                Sumate
              </CtaButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
