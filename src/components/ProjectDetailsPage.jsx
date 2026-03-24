import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { fetchProjectById } from '../api/newsApi';

const uiByLang = {
  ru: {
    loading: 'Загрузка проекта...',
    error: 'Не удалось загрузить проект',
  },
  en: {
    loading: 'Loading project...',
    error: 'Failed to load project',
  },
  kg: {
    loading: 'Долбоор жүктөлүүдө...',
    error: 'Долбоорду жүктөө мүмкүн болгон жок',
  },
};

export default function ProjectDetailsPage({ t, lang }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const backLabel = t?.projects?.backButton ?? 'К проектам';
  const notFoundLabel = t?.projects?.notFound ?? 'Проект не найден';
  const yearsLabel = t?.projects?.yearsLabel ?? 'Годы реализации';
  const descriptionTitle = t?.projects?.descriptionTitle ?? 'Описание проекта';
  const ui = uiByLang[lang] ?? uiByLang.ru;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const item = await fetchProjectById(id, { lang });

        if (!cancelled) {
          setProject(item);
        }
      } catch (err) {
        if (!cancelled) {
          setProject(null);
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

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-slate-600">{notFoundLabel}</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)]"
      >
        {project.image && (
          <div className="h-[260px] w-full overflow-hidden md:h-[420px]">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">{project.title}</h1>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800">
            <Calendar className="h-4 w-4" />
            {yearsLabel}: {project.implementation_period}
          </div>

          <div className="mt-8 rounded-3xl bg-slate-50 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              {descriptionTitle}
            </h2>
            <div
              className="mt-4 text-base leading-8 text-slate-700"
              dangerouslySetInnerHTML={{ __html: project.description ?? '' }}
            />
          </div>
        </div>
      </motion.article>
    </section>
  );
}
