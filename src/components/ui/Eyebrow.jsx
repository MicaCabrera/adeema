// Eyebrow minimal: bullet cuadrado + texto tracked, sin pill/borde. Badge de
// sección reutilizado en todo el sitio (Think Tank, Academy, etc.).
export default function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-1 w-1 flex-shrink-0 bg-accent" aria-hidden="true" />
      <span className="text-xs font-semibold tracking-widest uppercase text-accent">
        {children}
      </span>
    </div>
  );
}
