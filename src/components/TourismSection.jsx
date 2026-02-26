import SectionShell from './SectionShell';
import { tourismPlaces } from '../data/siteData';

export default function TourismSection({ t }) {
  const localizedPlaces = tourismPlaces.map((place, idx) => ({
    ...place,
    ...(t.tourism.places[idx] ?? {}),
  }));

  return (
    <SectionShell
      id="tourism"
      eyebrow={t.tourism.section.eyebrow}
      title={t.tourism.section.title}
      subtitle={t.tourism.section.subtitle}
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {localizedPlaces.map((place, idx) => (
          <article key={place.name} className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]" style={{ animationDelay: `${idx * 70}ms` }}>
            <div className="relative h-52 overflow-hidden">
              <img src={place.image} alt={place.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-mountain/85 via-mountain/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                {place.badge}
              </span>
            </div>
            <div className="relative p-5">
              <h3 className="text-lg font-bold text-slate-900">{place.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{place.description}</p>
              <button type="button" className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                {t.tourism.cta} <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
