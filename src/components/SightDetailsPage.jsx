import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { fetchSightById } from '../api/newsApi';

const textByLang = {
  ru: {
    back: 'К достопримечательностям',
    loading: 'Загрузка достопримечательности...',
    error: 'Не удалось загрузить достопримечательность',
    notFound: 'Достопримечательность не найдена',
    gallery: 'Галерея',
  },
  en: {
    back: 'Back to sights',
    loading: 'Loading sight...',
    error: 'Failed to load sight',
    notFound: 'Sight not found',
    gallery: 'Gallery',
  },
  kg: {
    back: 'Көрүнүктүү жерлерге кайтуу',
    loading: 'Көрүнүктүү жер жүктөлүүдө...',
    error: 'Көрүнүктүү жерди жүктөө мүмкүн болгон жок',
    notFound: 'Көрүнүктүү жер табылган жок',
    gallery: 'Галерея',
  },
};

export default function SightDetailsPage({ lang }) {
  const { id } = useParams();
  const [sight, setSight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ui = useMemo(() => textByLang[lang] ?? textByLang.ru, [lang]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const item = await fetchSightById(id, { lang });

        if (!cancelled) {
          setSight(item);
        }
      } catch (err) {
        if (!cancelled) {
          setSight(null);
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
  }, [id, lang]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-slate-600">{ui.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-red-600">{ui.error}</p>
      </div>
    );
  }

  if (!sight) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-slate-600">{ui.notFound}</p>
      </div>
    );
  }

  const sortedGallery = [...(sight.gallery ?? [])].sort((a, b) => a.order - b.order);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <Link
        to="/#tourism"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {ui.back}
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)]"
      >
        {sight.main_image && (
          <div className="h-[260px] w-full overflow-hidden md:h-[460px]">
            <img src={sight.main_image} alt={sight.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">{sight.title}</h1>

          {sight.short_description && (
            <div
              className="mt-4 text-base font-medium text-slate-700"
              dangerouslySetInnerHTML={{ __html: sight.short_description }}
            />
          )}

          <div
            className="mt-6 text-base leading-8 text-slate-700"
            dangerouslySetInnerHTML={{ __html: sight.description ?? '' }}
          />

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900">{ui.gallery}</h2>

            {sortedGallery.length === 0 ? (
              <p className="mt-3 text-sm text-slate-600">{lang === 'en' ? 'No gallery images' : lang === 'kg' ? 'Галереяда сүрөттөр жок' : 'В галерее нет изображений'}</p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedGallery.map((item) => (
                  <figure
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                    <figcaption className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700">
                      <ImageIcon className="h-4 w-4 text-slate-500" />
                      {item.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </section>
  );
}
