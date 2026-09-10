import BrandMark from './ui/BrandMark';

const footerLinks = {
  Institución: [
    { label: 'Quiénes somos', href: '#institucional' },
    { label: 'Misión y Visión', href: '#mision-vision' },
    { label: 'ADEEMA Academy', href: '#academy' },
  ],
  Ecosistema: [
    { label: 'ADEEMA Media', href: '#media' },
    { label: 'Comunidad / Área FAN', href: '#comunidad' },
  ],
  Novedades: [
    { label: 'Noticias', href: '#noticias' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

const socialLinks = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'Twitch',
    href: '#',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark-200 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 xl:pb-32">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <BrandMark size="md" withWordmark />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Asociación de Deportes Electrónicos y Electromecánicos de Argentina. Promovemos, organizamos
              y desarrollamos el ecosistema deportivo tecnológico en todo el país.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary-500/50 hover:bg-primary-500/10 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-widest">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '📧', label: 'Email institucional', value: 'contacto@adeema.org.ar' },
              { icon: '📍', label: 'Sede central', value: 'Buenos Aires, Argentina' },
              { icon: '📞', label: 'Consultas', value: 'Contacto vía formulario web' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-slate-500 text-xs uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="text-slate-300 text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} ADEEMA — Asociación de Deportes Electrónicos y Electromecánicos de Argentina.
            Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {['Términos y condiciones', 'Política de privacidad'].map((item) => (
              <a key={item} href="#" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
