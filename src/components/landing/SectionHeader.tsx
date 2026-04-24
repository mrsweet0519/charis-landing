type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-[#D4AF37]">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-[#CCCCCC] sm:text-lg">{description}</p>
    </div>
  );
}
