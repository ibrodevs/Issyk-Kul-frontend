export default function StubSection({ id, eyebrow, title }) {
  return (
    <section id={id} className="relative px-4 py-16 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        </div>
        <div className="grid h-40 place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-400">Раздел в разработке</p>
        </div>
      </div>
    </section>
  );
}
