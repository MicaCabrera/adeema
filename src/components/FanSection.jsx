import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaButton from './ui/CtaButton';
import Eyebrow from './ui/Eyebrow';

gsap.registerPlugin(ScrollTrigger);

const provincias = [
  'Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut',
  'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis',
  'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán',
];

const textFields = [
  { id: 'nombre', label: 'Nombre', type: 'text', required: true },
  { id: 'apellido', label: 'Apellido', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
];

function CheckIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Input moderno tipo Awwwards: sin caja/borde completo, solo underline fino
// que en foco se anima de izquierda a derecha en celeste; label flotante que
// sube y se achica en foco o si ya hay contenido (vía :placeholder-shown,
// sin estado de React por campo). En error, el underline pasa a #E0CA8E.
function FloatingInput({ id, label, type, required, value, onChange, error }) {
  return (
    <div className="relative h-full">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer relative z-10 w-full border-0 bg-transparent px-0 pb-1 pt-3 text-sm text-white placeholder-transparent transition-shadow duration-300 focus:outline-none focus:shadow-[0_10px_24px_-12px_rgba(85,180,235,0.45)]"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-3 text-sm text-slate-500 transition-all duration-200 ease-out peer-focus:top-0 peer-focus:text-xs peer-focus:text-slate-400 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-slate-400"
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
        <p className="animate-fade-in absolute left-0 top-full mt-1.5 text-xs text-[#E0CA8E]">{error}</p>
      )}
    </div>
  );
}

// Select nativo (provincia/ciudad) con la misma línea visual que
// FloatingInput (underline animado en foco), pero con el label siempre
// arriba: a diferencia de un input, un <select> siempre muestra un valor
// (aunque sea el placeholder), así que no hay estado ":placeholder-shown"
// que animar — el label queda fijo chico. La búsqueda es la nativa del
// navegador: al tipear una letra con el select enfocado, salta a la
// primera opción que empieza con esa letra.
function FloatingSelect({ id, label, value, onChange }) {
  return (
    <div className="relative h-full">
      <label htmlFor={id} className="absolute left-0 top-0 text-xs text-slate-400">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="peer relative z-10 w-full cursor-pointer appearance-none border-0 bg-transparent px-0 pb-1 pt-3 text-sm text-white focus:outline-none"
      >
        <option value="" className="bg-dark-200 text-slate-400">
          Seleccionar…
        </option>
        {provincias.map((p) => (
          <option key={p} value={p} className="bg-dark-200 text-white">
            {p}
          </option>
        ))}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-0 top-3 h-4 w-4 text-slate-500" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-white/20" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-[#55B4EB] transition-all duration-300 ease-out peer-focus:w-full"
      />
    </div>
  );
}

export default function FanSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

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
  // viewport — un solo card, una sola animación de entrada.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 26 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(cardRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="comunidad" ref={sectionRef} className="section-padding relative bg-dark border-y border-white/5">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header directo sobre el fondo general de la sección — mismo
            patrón que Academy/Media (badge chico arriba, título grande,
            párrafo debajo), sin ningún card/rectángulo propio detrás. */}
        <div ref={cardRef}>
          {/* Título + párrafo ocupan solo la primera mitad del ancho en
              desktop (la sección sigue pensada como dos partes iguales:
              texto institucional a la izquierda, form a lo ancho debajo). */}
          <div className="lg:w-1/2">
            <Eyebrow className="mb-4">Área FAN</Eyebrow>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Una comunidad para seguir conectados
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10">
              El espacio para seguidores, entusiastas y profesionales que quieren estar cerca del ecosistema sin
              competir. Al sumarte, quedás registrado en nuestra base de contactos, recibís el newsletter con
              novedades y análisis del sector, y tenés acceso prioritario a convocatorias, encuentros y
              actividades de ADEEMA.
            </p>
          </div>

          {status === 'success' ? (
            <div className="border border-white/10 bg-dark-200/50 p-8 text-center">
              <CheckIcon className="mx-auto mb-4 h-8 w-8 text-[#55B4EB]" />
              <h4 className="text-white font-semibold text-lg mb-2">¡Listo, ya sos parte del Área FAN!</h4>
              <p className="text-slate-400 text-sm">Revisá tu correo para confirmar tu registro.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Fila horizontal inline en desktop (ref. sharplink): los 4
                  campos + el botón comparten una sola fila, separados por un
                  borde vertical fino (divide-x), con un fondo apenas
                  distinguible (no el rectángulo grande de antes). En
                  mobile/tablet (<lg) se apilan verticalmente (divide-y) y el
                  CTA queda debajo del último campo, ocupando el ancho
                  completo. */}
              <div className="flex flex-col divide-y divide-white/10 border border-white/10 bg-dark-200/40 lg:flex-row lg:items-stretch lg:divide-x lg:divide-y-0">
                {textFields.map((field) => (
                  <div key={field.id} className="px-5 py-3 lg:flex-1">
                    <FloatingInput
                      id={field.id}
                      label={field.label}
                      type={field.type}
                      required={field.required}
                      value={values[field.id]}
                      onChange={handleChange(field.id)}
                      error={errors[field.id]}
                    />
                  </div>
                ))}
                <div className="px-5 py-3 lg:flex-1">
                  <FloatingSelect
                    id="ciudad"
                    label="Ciudad"
                    value={values.ciudad}
                    onChange={handleChange('ciudad')}
                  />
                </div>
                <div className="flex items-center px-5 py-3 lg:flex-shrink-0">
                  <CtaButton as="button" type="submit" className="w-full justify-center lg:w-auto">
                    {status === 'sending' ? 'Enviando…' : 'Sumarme'}
                  </CtaButton>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Al registrarte aceptás recibir comunicaciones de ADEEMA. Podés darte de baja cuando quieras.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
