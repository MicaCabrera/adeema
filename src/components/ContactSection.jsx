import { useState } from 'react';
import CtaButton from './ui/CtaButton';

const motivos = [
  'Alianzas y Convenios Marcos',
  'Propuestas de Patrocinio y Sponsors',
  'Consultas Académicas (Academy)',
  'Prensa y Media',
  'Mensaje / Propuesta',
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="section-padding bg-dark-100 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
            Contacto
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Vinculación Institucional
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
            ¿Querés sumar a tu organización, proponer una alianza estratégica o conocer más sobre nuestros
            programas? Escribinos para coordinar una reunión con nuestro equipo de relaciones institucionales.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-primary-500/30 bg-primary-500/10 p-10 text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-white font-semibold text-xl mb-2">¡Gracias por tu mensaje!</h3>
            <p className="text-slate-300 text-sm">Nuestro equipo de relaciones institucionales se va a contactar a la brevedad.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-dark-200/50 p-6 md:p-10 grid sm:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Nombre y Apellido / Institución o Empresa"
              required
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 sm:col-span-2"
            />
            <input
              type="email"
              placeholder="Correo Electrónico Corporativo"
              required
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50"
            />
            <input
              type="tel"
              placeholder="Teléfono de Contacto"
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50"
            />
            <select
              defaultValue=""
              required
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 sm:col-span-2"
            >
              <option value="" disabled>Motivo de la Consulta</option>
              {motivos.map((m) => (
                <option key={m} value={m} className="bg-dark-200">{m}</option>
              ))}
            </select>
            <textarea
              placeholder="Mensaje / Propuesta"
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-dark/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 sm:col-span-2 resize-none"
            />
            <CtaButton as="button" type="submit" className="sm:col-span-2 justify-center">
              Enviar
            </CtaButton>
          </form>
        )}
      </div>
    </section>
  );
}
