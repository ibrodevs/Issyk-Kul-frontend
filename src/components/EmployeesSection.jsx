import { useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { fetchEmployees } from '../api/newsApi';
import SectionShell from './SectionShell';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 95 } },
};

export default function EmployeesSection({ t, lang }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const section = t?.employees ?? {
    section: {
      eyebrow: 'Сотрудники',
      title: 'Сотрудники аппарата',
      subtitle: 'Контактная информация сотрудников для быстрой связи.',
    },
    phoneLabel: 'Телефон',
    emailLabel: 'Почта',
    loading: 'Загрузка сотрудников...',
    error: 'Не удалось загрузить сотрудников',
    empty: 'Сотрудники пока не добавлены',
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const items = await fetchEmployees({ lang });
        if (!cancelled) {
          setEmployees([...items].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setEmployees([]);
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
      id="employees"
      eyebrow={section.section.eyebrow}
      title={section.section.title}
      subtitle={section.section.subtitle}
    >
      {loading && <p className="mb-6 text-sm text-slate-600">{section.loading}</p>}
      {!loading && error && <p className="mb-6 text-sm text-red-600">{section.error}</p>}
      {!loading && !error && employees.length === 0 && <p className="mb-6 text-sm text-slate-600">{section.empty}</p>}

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {employees.map((employee) => (
          <motion.article
            key={`${employee.id}-${employee.email}`}
            variants={cardVariants}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={employee.photo}
                alt={employee.full_name}
                className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
            </div>

            <div className="space-y-4 px-6 py-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-500">
                  {employee.position}
                </p>
                <h3 className="text-xl font-bold text-slate-900">{employee.full_name}</h3>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <a
                  href={`tel:${employee.phone}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span>
                    <span className="mr-2 font-medium text-slate-900">{section.phoneLabel}:</span>
                    {employee.phone}
                  </span>
                </a>

                <a
                  href={`mailto:${employee.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-blue-50/60"
                >
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span className="min-w-0">
                    <span className="mr-2 font-medium text-slate-900">{section.emailLabel}:</span>
                    <span className="break-all">{employee.email}</span>
                  </span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
