import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionShell from './SectionShell';
import { fetchSightsList } from '../api/newsApi';

const uiByLang = {
  ru: {
    loading: 'Загрузка достопримечательностей...',
    error: 'Не удалось загрузить достопримечательности',
    empty: 'Достопримечательностей пока нет',
  },
  en: {
    loading: 'Loading sights...',
    error: 'Failed to load sights',
    empty: 'No sights yet',
  },
  kg: {
    loading: 'Көрүнүктүү жерлер жүктөлүүдө...',
    error: 'Көрүнүктүү жерлерди жүктөө мүмкүн болгон жок',
    empty: 'Азырынча көрүнүктүү жерлер жок',
  },
};

export default function TourismSection({ t, lang }) {
  const [sights, setSights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ui = useMemo(() => uiByLang[lang] ?? uiByLang.ru, [lang]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const list = await fetchSightsList({ lang });

        if (!cancelled) {
          setSights(list);
        }
      } catch (err) {
        if (!cancelled) {
          setSights([]);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <SectionShell
      id="tourism"
      eyebrow={t.tourism.section.eyebrow}
      title={t.tourism.section.title}
      subtitle={t.tourism.section.subtitle}
    >
      {loading && <p className="text-sm text-slate-600">{ui.loading}</p>}
      {!loading && error && <p className="text-sm text-red-600">{ui.error}</p>}

      {!loading && !error && sights.length === 0 && <p className="text-sm text-slate-600">{ui.empty}</p>}

      {!loading && !error && sights.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sights.map((sight, idx) => (
            <article
              key={sight.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              style={{ animationDelay: `${idx * 70}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={sight.main_image}
                  alt={sight.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountain/85 via-mountain/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                  {sight.gallery?.length ?? 0} фото
                </span>
              </div>

              <div className="relative p-5">
                <h3 className="text-lg font-bold text-slate-900">{sight.title}</h3>
                <div
                  className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: sight.short_description ?? '' }}
                />

                <Link
                  to={`/sights/${sight.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  {t.tourism.cta} <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionShell>
  );
}
