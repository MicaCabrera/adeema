import { useEffect, useRef, useState } from 'react';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

// Patrón de interacción ref. specia1ne.com: bloque CTA sólido que dispara un
// panel lateral (drawer) con el formulario — colores de marca ADEEMA en vez
// del azul de la referencia (el celeste #55B4EB cumple el mismo rol de
// "color de acento sólido" que ahí tenía el azul).
const motivos = [
  'Alianzas y Convenios Marcos',
  'Patrocinio y Sponsors',
  'Consultas de Academy',
  'Prensa y Media',
];

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// Input con label flotante + underline animado (mismo lenguaje visual que
// el resto del sitio), recoloreado en blanco: el fondo acá es el celeste de
// marca sólido, no oscuro ni blanco como en el resto de los usos.
function FloatingInput({ id, label, type = 'text', required, inputRef }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        ref={inputRef}
        type={type}
        required={required}
        placeholder=" "
        className="peer w-full border-0 bg-transparent px-0 pb-2 pt-5 text-sm text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 text-sm text-white/70 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white"
      >
        {label}
      </label>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/25" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 ease-out peer-focus:w-full" />
    </div>
  );
}

function FloatingSelect({ id, label, required }) {
  return (
    <div className="relative">
      <label htmlFor={id} className="absolute left-0 top-0 text-xs text-white/70">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        className="peer w-full cursor-pointer appearance-none border-0 bg-transparent px-0 pb-2 pt-5 text-sm text-white focus:outline-none"
      >
        <option value="" disabled className="bg-dark-200 text-white/50">
          Seleccionar…
        </option>
        {motivos.map((m) => (
          <option key={m} value={m} className="bg-dark-200 text-white">
            {m}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/25" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 ease-out peer-focus:w-full" />
    </div>
  );
}

function FloatingTextarea({ id, label, required }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        required={required}
        rows={3}
        placeholder=" "
        className="peer w-full resize-none border-0 bg-transparent px-0 pb-2 pt-5 text-sm text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-5 text-sm text-white/70 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-white"
      >
        {label}
      </label>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/25" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 ease-out peer-focus:w-full" />
    </div>
  );
}

export default function ContactSection() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Foco al primer campo al abrir, Escape para cerrar, trap de Tab dentro
  // del panel, y devolución del foco al bloque CTA al cerrar (por cualquier
  // vía: Escape, click en el backdrop o el botón Cerrar).
  useEffect(() => {
    if (!open) return undefined;

    firstFieldRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'input, select, textarea, button, a[href]'
        );
        if (focusables.length === 0) return;
        const list = Array.from(focusables);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    };
  }, [open]);

  return (
    <section
      id="contacto"
      className="section-padding relative flex min-h-[100svh] items-center overflow-hidden bg-dark"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Vista inicial: badge + título + subtítulo apilados, en una sola
            columna (sin el split a 2 columnas que tenía antes). */}
        <div className="max-w-2xl">
          <Eyebrow className="mb-4">Contacto</Eyebrow>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-4">
            Vinculación Institucional
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            ¿Querés sumar a tu organización, proponer una alianza estratégica o conocer más sobre nuestros
            programas?
          </p>
        </div>

        {/* CTA principal — mismo componente global de botón que el resto del
            sitio (ya no un rectángulo de color propio). El wrapper con ref
            es solo para poder devolver el foco acá al cerrar el panel,
            porque CtaButton no reenvía refs. Separado del título/párrafo con
            más aire (mt-16/20) para que no quede pegado. */}
        <div className="mt-16 md:mt-20">
          <span ref={triggerRef} className="inline-block">
            <CtaButton
              as="button"
              type="button"
              onClick={openDrawer}
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              Iniciar conversación
            </CtaButton>
          </span>
        </div>
      </div>

      {/* Panel lateral (drawer). Montado siempre para que la transición de
          salida también anime; pointer-events-none + aria-hidden cuando
          está cerrado para que no capture clicks ni foco. */}
      <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div
          onClick={closeDrawer}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ease-out ${open ? 'opacity-70' : 'opacity-0'}`}
        />

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contacto-panel-title"
          className={`absolute right-0 top-0 flex h-full w-full flex-col overflow-hidden bg-surface p-6 shadow-2xl transition-transform duration-300 ease-out sm:w-[45%] sm:min-w-[420px] sm:p-8 md:p-10 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="mb-6 flex shrink-0 items-center justify-between">
            <Eyebrow tone="light">Contacto</Eyebrow>
            <button
              type="button"
              onClick={closeDrawer}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition-colors duration-200 hover:text-white"
            >
              Cerrar
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-1 flex-col items-start justify-center gap-3">
              <h3 className="text-2xl font-medium text-white md:text-3xl">¡Gracias por tu mensaje!</h3>
              <p className="text-sm text-white/70">
                Nuestro equipo de relaciones institucionales se va a contactar a la brevedad.
              </p>
            </div>
          ) : (
            <>
              <h3 id="contacto-panel-title" className="shrink-0 text-2xl font-medium text-white leading-tight md:text-3xl">
                Vinculación Institucional
              </h3>
              <p className="mt-2 shrink-0 text-sm text-white/70">Contanos qué necesitás.</p>

              <form onSubmit={handleSubmit} className="mt-6 flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
                <FloatingInput
                  id="contacto-nombre"
                  label="Nombre y Apellido / Institución o Empresa"
                  required
                  inputRef={firstFieldRef}
                />
                <FloatingInput id="contacto-email" label="Email" type="email" required />
                <FloatingSelect id="contacto-motivo" label="Motivo de la Consulta" required />
                <FloatingTextarea id="contacto-mensaje" label="Mensaje / Propuesta" required />

                <div className="mt-2">
                  <CtaButton as="button" type="submit" className="w-full justify-center">
                    Enviar
                  </CtaButton>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
