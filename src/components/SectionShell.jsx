export default function SectionShell({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <section id={id} className={`relative px-4 py-16 sm:px-6 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title || subtitle) && (
          <div className="mb-8 flex flex-col gap-4 lg:mb-10">
            {eyebrow && (
              <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                {eyebrow}
              </span>
            )}
            {title && <h2 className="font-display text-2xl leading-tight text-slate-900 sm:text-3xl lg:text-4xl">{title}</h2>}
            {subtitle && <p className="max-w-3xl text-base leading-7 text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
