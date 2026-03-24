import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, DollarSign, ExternalLink, X } from 'lucide-react';
import { fetchProcurementsList, formatShortDate, formatSomAmount } from '../api/newsApi';
import SectionShell from './SectionShell';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const rowVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 100 } },
};

const uiByLang = {
  ru: {
    loading: 'Загрузка закупок и тендеров...',
    error: 'Не удалось загрузить закупки и тендеры',
    empty: 'Закупки и тендеры пока не добавлены',
    open: 'Открыт',
    closed: 'Завершён',
    until: 'До',
  },
  en: {
    loading: 'Loading procurements and tenders...',
    error: 'Failed to load procurements and tenders',
    empty: 'No procurements or tenders yet',
    open: 'Open',
    closed: 'Closed',
    until: 'Until',
  },
  kg: {
    loading: 'Сатып алуулар жана тендерлер жүктөлүүдө...',
    error: 'Сатып алууларды жана тендерлерди жүктөө мүмкүн болгон жок',
    empty: 'Сатып алуулар жана тендерлер азырынча кошула элек',
    open: 'Ачык',
    closed: 'Жабык',
    until: 'Чейин',
  },
};

function getItemStatus(item, ui) {
  const deadline = new Date(`${item.deadline}T00:00:00`);
  const now = new Date();
  const isOpen = !Number.isNaN(deadline.getTime()) && deadline >= new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return {
    label: isOpen ? ui.open : ui.closed,
    className: isOpen ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500',
  };
}

export default function TendersSection({ t, lang }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const section = t?.tenders?.section ?? { eyebrow: 'Тендеры и закупки', title: 'Государственные закупки и тендеры', subtitle: '' };
  const detailsLabel = t?.tenders?.detailsButton ?? 'Детали';
  const modalText = t?.tenders?.modal ?? {
    close: 'Закрыть',
    number: 'Номер процедуры',
    budget: 'Бюджет',
    deadline: 'Срок подачи',
    status: 'Статус',
    category: 'Категория',
    descriptionTitle: 'Описание',
    descriptionFallback: 'Подробная информация по закупке доступна в полном пакете тендерной документации и сопровождающих материалах.',
  };
  const ui = uiByLang[lang] ?? uiByLang.ru;
  const itemTypeLabel = (item) => (item.type === 'tender' ? t.navSub.tendersItem : t.navSub.stateProcurement);
  const selectedStatus = selectedItem ? getItemStatus(selectedItem, ui) : null;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const list = await fetchProcurementsList({ lang });

        if (!cancelled) {
          setItems([...list].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setItems([]);
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

  useEffect(() => {
    if (!selectedItem) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <SectionShell
      id="tenders"
      eyebrow={section.eyebrow}
      title={section.title}
      subtitle={section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-6"
      >
        {loading && <p className="text-sm text-slate-600">{ui.loading}</p>}
        {!loading && error && <p className="text-sm text-red-600">{ui.error}</p>}
        {!loading && !error && items.length === 0 && <p className="text-sm text-slate-600">{ui.empty}</p>}

        {items.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {items.map((item, i) => {
              const status = getItemStatus(item, ui);

              return (
                <motion.div
                  key={item.id}
                  variants={rowVariants}
                  className={`flex flex-col gap-3 px-5 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center ${
                    i < items.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="mt-1 text-sm font-medium text-slate-800">{item.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-400">
                      <span><DollarSign className="mr-0.5 inline h-3 w-3" />{formatSomAmount(item.amount_som, lang)}</span>
                      <span><Calendar className="mr-0.5 inline h-3 w-3" />{ui.until} {formatShortDate(item.deadline, lang)}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedItem(item)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> {detailsLabel}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {selectedItem ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-8 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                  {itemTypeLabel(selectedItem)}
                </span>
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">{selectedItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={modalText.close}
                className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{modalText.status}</p>
                <p className="mt-2 text-sm font-medium text-slate-800">{selectedStatus?.label}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{modalText.budget}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                  <DollarSign className="h-4 w-4 text-sky-600" />
                  {formatSomAmount(selectedItem.amount_som, lang)}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{modalText.deadline}</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-800">
                  <Calendar className="h-4 w-4 text-sky-600" />
                  {formatShortDate(selectedItem.deadline, lang)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-sky-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{modalText.descriptionTitle}</p>
              <div
                className="mt-3 text-sm leading-6 text-slate-600"
                dangerouslySetInnerHTML={{ __html: selectedItem.description ?? modalText.descriptionFallback }}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </SectionShell>
  );
}
