// Eyebrow minimal: bullet cuadrado + texto tracked, sin pill/borde. Badge de
// sección reutilizado en todo el sitio (Academy, Media, Área FAN, etc.).
// tone="brand" usa el celeste de marca #55B4EB en vez del accent por defecto
// (#00e5ff) — para secciones con fondo claro, donde #55B4EB da más contraste.
export default function Eyebrow({ children, className = '', tone = 'default' }) {
  const colorClass = tone === 'brand' ? 'text-[#55B4EB]' : 'text-accent';
  const bulletClass = tone === 'brand' ? 'bg-[#55B4EB]' : 'bg-accent';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`h-1 w-1 flex-shrink-0 ${bulletClass}`} aria-hidden="true" />
      <span className={`text-xs font-semibold tracking-widest uppercase ${colorClass}`}>
        {children}
      </span>
    </div>
  );
}
