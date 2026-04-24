import { ArrowRight } from 'lucide-react';

type CTAButtonProps = {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function CTAButton({
  href,
  label,
  variant = 'primary',
  className = '',
}: CTAButtonProps) {
  const baseClassName =
    'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 focus:ring-offset-2 focus:ring-offset-black';

  const variantClassName =
    variant === 'primary'
      ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37] via-[#F5E6B3] to-[#C9A227] text-black shadow-[0_10px_40px_rgba(212,175,55,0.24)] hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(212,175,55,0.28)]'
      : 'border-white/15 bg-white/5 text-white hover:border-[#D4AF37]/60 hover:bg-white/10';

  return (
    <a href={href} className={`${baseClassName} ${variantClassName} ${className}`.trim()}>
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
