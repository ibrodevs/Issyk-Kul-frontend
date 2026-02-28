import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import SectionShell from './SectionShell';
import { fetchMediaList } from '../api/newsApi';

const uiByLang = {
  ru: {
    loading: 'Загрузка медиа...',
    error: 'Не удалось загрузить медиа',
    empty: 'Медиа материалов пока нет',
    photo: 'Фото',
    video: 'Видео',
    open: 'Открыть',
  },
  en: {
    loading: 'Loading media...',
    error: 'Failed to load media',
    empty: 'No media items yet',
    photo: 'Photo',
    video: 'Video',
    open: 'Open',
  },
  kg: {
    loading: 'Медиа жүктөлүүдө...',
    error: 'Медианы жүктөө мүмкүн болгон жок',
    empty: 'Азырынча медиа материалдар жок',
    photo: 'Сүрөт',
    video: 'Видео',
    open: 'Ачуу',
  },
};

export default function MediaSection({ t, lang }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedType, setSelectedType] = useState('photo');
  const [loadingMedia, setLoadingMedia] = useState(true);
  const [error, setError] = useState('');

  const ui = useMemo(() => uiByLang[lang] ?? uiByLang.ru, [lang]);

  useEffect(() => {
    let cancelled = false;

    const loadMedia = async () => {
      setLoadingMedia(true);
      setError('');

      try {
        const list = await fetchMediaList({
          lang,
          type: selectedType,
        });

        if (!cancelled) {
          setMediaItems([...list].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setMediaItems([]);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) {
          setLoadingMedia(false);
        }
      }
    };

    loadMedia();

    return () => {
      cancelled = true;
    };
  }, [lang, selectedType]);

  const typeFilters = [
    { id: 'photo', label: ui.photo },
    { id: 'video', label: ui.video },
  ];

  const isLoading = loadingMedia;

  return (
    <SectionShell
      id="media"
      eyebrow={t.media.section.eyebrow}
      title={t.media.section.title}
      subtitle={t.media.section.subtitle}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedType(filter.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedType === filter.id
                  ? 'bg-gradient-to-r from-blue-500 to-sky-500 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-sm text-slate-600">{ui.loading}</p>}
        {!isLoading && error && <p className="text-sm text-red-600">{ui.error}</p>}

        {!isLoading && !error && mediaItems.length === 0 && <p className="text-sm text-slate-600">{ui.empty}</p>}

        {!isLoading && !error && mediaItems.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {mediaItems.map((item) => (
              <motion.article
                key={item.id}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)]"
              >
                <img
                  src={item.preview_image || item.file}
                  alt={item.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountain/90 via-mountain/25 to-transparent" />
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-y-0 left-0 w-12 -skew-x-12 bg-white/20 blur-md animate-shine" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-xl">
                      {item.type === 'video' ? ui.video : ui.photo}
                    </span>
                    <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xl">
                      {item.category?.name}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white">{item.title}</h3>

                  <a
                    href={item.file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex rounded-lg border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-white/20"
                  >
                    {ui.open}
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
