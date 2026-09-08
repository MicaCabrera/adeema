export default function SectionHeader({ label, title, subtitle, centered = true, className = '' }) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
