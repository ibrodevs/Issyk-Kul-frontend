import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { fetchLeadershipMembers } from '../api/newsApi';
import SectionShell from './SectionShell';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15, stiffness: 90 } },
};

const uiByLang = {
  ru: {
    loading: 'Загрузка руководства...',
    error: 'Не удалось загрузить руководство',
    empty: 'Данные о руководстве пока не добавлены',
  },
  en: {
    loading: 'Loading leadership...',
    error: 'Failed to load leadership',
    empty: 'Leadership data has not been added yet',
  },
  kg: {
    loading: 'Жетекчилик жүктөлүүдө...',
    error: 'Жетекчиликти жүктөө мүмкүн болгон жок',
    empty: 'Жетекчилик боюнча маалымат азырынча кошула элек',
  },
};

export default function LeadershipSection({ t, lang }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ui = uiByLang[lang] ?? uiByLang.ru;

  const section = t?.leadership?.section ?? {
    eyebrow: 'Руководство',
    title: 'Полномочный представитель и заместители',
    subtitle:
      'Руководящий состав аппарата полномочного представителя Президента Кыргызской Республики в Иссык-Кульской области',
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const items = await fetchLeadershipMembers({ lang });

        if (!cancelled) {
          setLeaders([...items].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setLeaders([]);
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
    <SectionShell id="leadership" eyebrow={section.eyebrow} title={section.title} subtitle={section.subtitle}>
      {loading && <p className="mb-6 text-sm text-slate-600">{ui.loading}</p>}
      {!loading && error && <p className="mb-6 text-sm text-red-600">{ui.error}</p>}
      {!loading && !error && leaders.length === 0 && <p className="mb-6 text-sm text-slate-600">{ui.empty}</p>}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {leaders.map((leader) => (
          <motion.div
            key={leader.id}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] hover:-translate-y-1"
          >
            <div className="relative aspect-[3/4] w-full bg-slate-100 overflow-hidden">
              <img
                src={leader.photo}
                alt={leader.full_name}
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
            </div>

            <div className="px-5 py-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-500">{leader.position}</p>
              <h3 className="text-lg font-bold text-slate-900">{leader.full_name}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
