// Eyebrow minimal: bullet cuadrado + texto tracked, sin pill/borde. Badge de
// sección reutilizado en todo el sitio (Academy, Media, Área FAN, etc.).
// tone="brand" usa el celeste de marca #55B4EB en vez del accent por defecto
// (#00e5ff) — para secciones con fondo claro, donde #55B4EB da más contraste.
// tone="dark" usa el navy #043766 — para fondos claros/cálidos (ej. el card
// dorado de Área FAN) donde ni el accent ni el celeste dan contraste.
// tone="light" es blanco puro — para fondos sólidos de acento (ej. el panel
// de Contacto), donde ni el accent ni el celeste (que ES el fondo) sirven.
const TONE_CLASSES = {
  default: { text: 'text-accent', bullet: 'bg-accent' },
  brand: { text: 'text-brand-500', bullet: 'bg-brand-500' },
  dark: { text: 'text-surface', bullet: 'bg-surface' },
  light: { text: 'text-white', bullet: 'bg-white' },
};

export default function Eyebrow({ children, className = '', tone = 'default' }) {
  const { text: colorClass, bullet: bulletClass } = TONE_CLASSES[tone] ?? TONE_CLASSES.default;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`h-1 w-1 flex-shrink-0 ${bulletClass}`} aria-hidden="true" />
      <span className={`text-xs font-semibold tracking-widest uppercase ${colorClass}`}>
        {children}
      </span>
    </div>
  );
}
