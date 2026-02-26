import SectionShell from './SectionShell';
import { mediaItems } from '../data/siteData';

export default function MediaSection({ t }) {
  const localizedItems = mediaItems.map((item, idx) => ({
    ...item,
    ...(t.media.items[idx] ?? {}),
  }));

  return (
    <SectionShell
      id="media"
      eyebrow={t.media.section.eyebrow}
      title={t.media.section.title}
      subtitle={t.media.section.subtitle}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {localizedItems.map((item) => (
          <article key={item.title} className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-glass">
            <img src={item.image} alt={item.title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-mountain/90 via-mountain/25 to-transparent" />
            <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
              <div className="absolute inset-y-0 left-0 w-12 -skew-x-12 bg-white/20 blur-md animate-shine" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                {item.type}
              </span>
              <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
