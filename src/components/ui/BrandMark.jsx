import { BRAND_ASSETS } from '../../assets/brandAssets';

const sizes = {
  sm: {
    badge: 'h-10 w-10 p-2.5',
    wordmark: 'h-4',
  },
  md: {
    badge: 'h-12 w-12 p-3',
    wordmark: 'h-5',
  },
  lg: {
    badge: 'h-16 w-16 p-4',
    wordmark: 'h-6',
  },
  xl: {
    badge: 'h-20 w-20 p-5',
    wordmark: 'h-7',
  },
  hero: {
    badge: 'h-24 w-24 p-5 sm:h-28 sm:w-28 md:h-32 md:w-32 md:p-6',
    wordmark: 'h-8',
  },
};

export default function BrandMark({
  size = 'md',
  withWordmark = false,
  className = '',
  badgeClassName = '',
  wordmarkClassName = '',
}) {
  const selectedSize = sizes[size] ?? sizes.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-primary-500/20 via-dark-100 to-dark shadow-[0_18px_45px_rgba(5,10,24,0.45)] ring-1 ring-white/5 ${selectedSize.badge} ${badgeClassName}`}
      >
        <span className="absolute inset-[3px] rounded-full border border-white/10 bg-dark-200/95" />
        <img
          src={BRAND_ASSETS.emblemNegative}
          alt="Emblema ADEEMA"
          className="relative z-10 h-full w-full object-contain"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </span>

      {withWordmark && (
        <img
          src={BRAND_ASSETS.logoOnDark}
          alt="ADEEMA"
          className={`w-auto object-contain ${selectedSize.wordmark} ${wordmarkClassName}`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}
