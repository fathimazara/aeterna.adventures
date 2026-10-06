import React from 'react';

/**
 * WhatsApp SVG icon — ultra-crisp vector representation
 */
export function WhatsAppIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * WhatsAppButton Component
 *
 * A reusable, responsive WhatsApp CTA button designed to match high-end travel branding.
 *
 * @param {Object} props
 * @param {Function} props.onClick - Click event handler
 * @param {string} [props.label="Book via WhatsApp"] - Button label text
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'icon'} [props.size='md'] - Button size
 * @param {'primary'|'secondary'|'outline'|'dark'|'gold'|'glass'|'card'} [props.variant='primary'] - Style variant
 * @param {string} [props.className=''] - Additional Tailwind CSS classes
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.badge] - Optional badge text (e.g. 'Instant Response')
 * @param {boolean} [props.fullWidth=false] - Whether to span full container width
 * @param {string} [props.title] - Tooltip title
 */
export default function WhatsAppButton({
  onClick,
  label = 'Book via WhatsApp',
  size = 'md',
  variant = 'primary',
  className = '',
  disabled = false,
  badge = '',
  fullWidth = false,
  title,
  children,
}) {
  const sizeClasses = {
    xs: 'px-2.5 py-1 text-[11px] gap-1 font-semibold rounded-lg',
    sm: 'px-3.5 py-1.5 text-xs gap-1.5 font-bold rounded-full',
    md: 'px-5 py-2.5 text-sm gap-2 font-bold rounded-full',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-extrabold rounded-full',
    xl: 'px-8 py-4 text-lg gap-3 font-extrabold rounded-full',
    icon: 'p-3 rounded-full',
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
    icon: 'w-6 h-6',
  };

  const variantClasses = {
    primary:
      'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md hover:shadow-lg hover:shadow-[#25D366]/30 active:bg-[#1caa52] border border-[#25D366]/40',
    secondary:
      'bg-[#128C7E] hover:bg-[#075E54] text-white shadow-md hover:shadow-lg hover:shadow-[#128C7E]/25 active:bg-[#064e46]',
    outline:
      'bg-white/80 hover:bg-[#25D366] text-[#25D366] hover:text-white border-2 border-[#25D366] shadow-sm hover:shadow-md transition-all',
    dark:
      'bg-[#1E1E1E] hover:bg-[#25D366] text-white hover:text-white border border-[#2B231F]/20 shadow-md hover:shadow-xl hover:shadow-[#25D366]/25',
    gold:
      'bg-gradient-to-r from-[#D4A373] to-[#c28f5d] hover:from-[#c28f5d] hover:to-[#b07d4b] text-[#1E1E1E] shadow-md hover:shadow-lg',
    glass:
      'backdrop-blur-md bg-[#25D366]/90 hover:bg-[#25D366] text-white border border-white/30 shadow-lg',
    card:
      'bg-[#25D366]/10 hover:bg-[#25D366] text-[#15803d] hover:text-white border border-[#25D366]/30 font-bold transition-all',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title || label}
      aria-label={label}
      className={[
        'inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none',
        'hover:-translate-y-0.5 active:translate-y-0 active:scale-98',
        'focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none',
        sizeClasses[size] || sizeClasses.md,
        variantClasses[variant] || variantClasses.primary,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      <WhatsAppIcon className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${iconSizes[size] || iconSizes.md}`} />
      
      {size !== 'icon' && (
        <span className="truncate">{children || label}</span>
      )}

      {badge && (
        <span className="ml-1.5 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-white/25 rounded-full text-white backdrop-blur-sm">
          {badge}
        </span>
      )}
    </button>
  );
}
