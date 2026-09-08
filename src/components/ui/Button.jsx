const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-500 text-white border border-primary-500/50 hover:border-primary-400 shadow-lg hover:shadow-primary-500/25',
  secondary:
    'bg-primary-500/15 border border-primary-300/80 text-white hover:bg-primary-500/25 hover:border-primary-200 shadow-lg shadow-primary-900/20',
  accent:
    'bg-accent hover:bg-accent-dark text-dark font-semibold border border-accent/50 hover:border-accent shadow-lg hover:shadow-accent/25',
  fan:
    'bg-violet-500/15 border border-violet-400/60 text-white hover:bg-violet-500/25 hover:border-violet-300 shadow-lg shadow-violet-950/20',
  ghost:
    'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 border border-transparent',
  outline:
    'bg-transparent border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
  xl: 'px-10 py-5 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as = 'button',
  href,
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-95';

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  const Component = href ? 'a' : as;
  const componentProps = href ? { href, onClick, ...props } : { onClick, ...props };

  return (
    <Component className={classes} {...componentProps}>
      {children}
    </Component>
  );
}
