import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Scale, ScrollText } from 'lucide-react';
import { fetchDocuments } from '../api/newsApi';
import SectionShell from './SectionShell';

const catIcon = { regulations: Scale, orders: ScrollText, reports: FileText };

const uiByLang = {
  ru: {
    loading: 'Загрузка документов...',
    error: 'Не удалось загрузить документы',
    empty: 'Документы пока не добавлены',
  },
  en: {
    loading: 'Loading documents...',
    error: 'Failed to load documents',
    empty: 'No documents yet',
  },
  kg: {
    loading: 'Документтер жүктөлүүдө...',
    error: 'Документтерди жүктөө мүмкүн болгон жок',
    empty: 'Документтер азырынча кошула элек',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const rowVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 100 } },
};

export default function DocumentsSection({ t, lang }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const section = t?.documents?.section ?? { eyebrow: 'Документы', title: 'Нормативные акты, распоряжения и отчёты', subtitle: '' };
  const downloadLabel = t?.documents?.downloadButton ?? 'Скачать';
  const ui = uiByLang[lang] ?? uiByLang.ru;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const items = await fetchDocuments({ lang });

        if (!cancelled) {
          setDocuments([...items].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setDocuments([]);
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
      id="documents"
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
        {!loading && !error && documents.length === 0 && <p className="text-sm text-slate-600">{ui.empty}</p>}

        {documents.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {documents.map((doc, i) => {
              const Icon = catIcon[doc.category] ?? FileText;
              return (
                <motion.div
                  key={doc.id}
                  variants={rowVariants}
                  className={`flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50 ${
                    i < documents.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-50 to-sky-50">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{doc.title}</p>
                  </div>
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noreferrer"
                    className="flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100"
                  >
                    <Download className="h-3.5 w-3.5" /> {downloadLabel}
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </SectionShell>
  );
}
