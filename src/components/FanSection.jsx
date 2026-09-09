import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  'Acceso a la base de contactos oficial de ADEEMA',
  'Newsletter con novedades y alertas exclusivas',
  'Invitaciones a actividades y contenidos del ecosistema',
];

const fields = [
  { id: 'nombre', label: 'Nombre', type: 'text', required: true },
  { id: 'apellido', label: 'Apellido', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  { id: 'ciudad', label: 'Ciudad', type: 'text', required: false },
];

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Input moderno tipo Awwwards: sin caja/borde completo, solo underline fino
// que en foco se anima de izquierda a derecha en celeste; label flotante que
// sube y se achica en foco o si ya hay contenido (vía :placeholder-shown,
// sin estado de React por campo). En error, el underline pasa a #E0CA8E.
function FloatingInput({ id, label, type, required, value, onChange, error }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer relative z-10 w-full border-0 bg-transparent px-0 pb-2 pt-6 text-sm text-white placeholder-transparent transition-shadow duration-300 focus:outline-none focus:shadow-[0_10px_24px_-12px_rgba(85,180,235,0.45)]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 text-sm text-slate-500 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-400 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-400"
      >
        {label}
      </label>
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/20" />
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute bottom-0 left-0 h-px transition-all duration-300 ease-out',
          error ? 'w-full bg-[#E0CA8E]' : 'w-0 bg-[#55B4EB] peer-focus:w-full',
        ].join(' ')}
      />
      {error && (
        <p className="animate-fade-in mt-1.5 text-xs text-[#E0CA8E]">{error}</p>
      )}
    </div>
  );
}

export default function FanSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const bulletRefs = useRef([]);

  const [values, setValues] = useState({ nombre: '', apellido: '', email: '', ciudad: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.nombre.trim()) nextErrors.nombre = 'Ingresá tu nombre.';
    if (!values.apellido.trim()) nextErrors.apellido = 'Ingresá tu apellido.';
    if (!values.email.trim()) {
      nextErrors.email = 'Ingresá tu email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Ingresá un email válido.';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    setTimeout(() => setStatus('success'), 600);
  };

  // Entrada de la sección: fade + desplazamiento vertical al entrar en
  // viewport, columna izquierda primero y el form con un pequeño delay.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([leftColRef.current, rightColRef.current], { opacity: 0, y: 26 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(leftColRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
          gsap.to(rightColRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.12 });
        },
      });

      gsap.set(bulletRefs.current, { opacity: 0, y: 10 });
      ScrollTrigger.create({
        trigger: leftColRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(bulletRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.09,
            delay: 0.3,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="comunidad" ref={sectionRef} className="section-padding relative bg-dark border-y border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Columna izquierda: institucional */}
          <div ref={leftColRef}>
            <Eyebrow className="mb-4">Área FAN</Eyebrow>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Área FAN
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              El espacio para seguidores, entusiastas y profesionales que quieren estar cerca del ecosistema sin
              competir. Al sumarte, quedás registrado en nuestra base de contactos, recibís el newsletter con
              novedades y análisis del sector, y tenés acceso prioritario a convocatorias, encuentros y
              actividades de ADEEMA.
            </p>

            <h3 className="text-base md:text-lg font-medium text-white mb-4">
              Una comunidad para seguir conectados
            </h3>

            <div className="flex flex-col gap-3">
              {bullets.map((item, index) => (
                <div
                  key={item}
                  ref={(el) => {
                    bulletRefs.current[index] = el;
                  }}
                  className="flex items-start gap-3 text-sm md:text-base text-slate-300"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#55B4EB]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div ref={rightColRef}>
            {status === 'success' ? (
              <div className="border border-white/10 bg-dark-200/50 p-8 text-center">
                <CheckIcon className="mx-auto mb-4 h-8 w-8 text-[#55B4EB]" />
                <h4 className="text-white font-semibold text-lg mb-2">¡Listo, ya sos parte del Área FAN!</h4>
                <p className="text-slate-400 text-sm">Revisá tu correo para confirmar tu registro.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  {fields.map((field) => (
                    <FloatingInput
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      type={field.type}
                      required={field.required}
                      value={values[field.id]}
                      onChange={handleChange(field.id)}
                      error={errors[field.id]}
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <CtaButton as="button" type="submit">
                    {status === 'sending' ? 'Enviando…' : 'Quiero entrar al Área FAN'}
                  </CtaButton>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Al registrarte aceptás recibir comunicaciones de ADEEMA. Podés darte de baja cuando quieras.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
