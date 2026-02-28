import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Flame } from 'lucide-react';
import { fetchNewsById, formatNewsDate } from '../api/newsApi';

const textByLang = {
  ru: {
    back: 'К новостям',
    loading: 'Загрузка новости...',
    error: 'Не удалось загрузить новость',
    notFound: 'Новость не найдена',
  },
  en: {
    back: 'Back to news',
    loading: 'Loading news...',
    error: 'Failed to load news',
    notFound: 'News not found',
  },
  kg: {
    back: 'Жаңылыктарга кайтуу',
    loading: 'Жаңылык жүктөлүүдө...',
    error: 'Жаңылыкты жүктөө мүмкүн болгон жок',
    notFound: 'Жаңылык табылган жок',
  },
};

export default function NewsDetailsPage({ lang, t }) {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ui = useMemo(() => textByLang[lang] ?? textByLang.ru, [lang]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const item = await fetchNewsById(id, { lang });
        if (!cancelled) {
          setNewsItem(item);
        }
      } catch (err) {
        if (!cancelled) {
          setNewsItem(null);
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

  if (!newsItem) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-slate-600">{ui.notFound}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <Link
        to="/#news"
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
        {newsItem.image && (
          <div className="h-[260px] w-full overflow-hidden md:h-[420px]">
            <img src={newsItem.image} alt={newsItem.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {newsItem.is_hot && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
                <Flame className="h-3.5 w-3.5" />
                {t.news.hot}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
              {newsItem.category?.name}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              {formatNewsDate(newsItem.date, lang)}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">{newsItem.title}</h1>

          {newsItem.short_description && (
            <div
              className="mt-4 text-base font-medium text-slate-700"
              dangerouslySetInnerHTML={{ __html: newsItem.short_description }}
            />
          )}

          <div
            className="mt-6 text-base leading-8 text-slate-700"
            dangerouslySetInnerHTML={{ __html: newsItem.description ?? '' }}
          />
        </div>
      </motion.article>
    </section>
  );
}
