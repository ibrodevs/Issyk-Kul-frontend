import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar } from 'lucide-react';
import { fetchProjectsList } from '../api/newsApi';
import SectionShell from './SectionShell';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 16, stiffness: 90 } },
};

const uiByLang = {
  ru: {
    loading: 'Загрузка проектов и программ...',
    error: 'Не удалось загрузить проекты и программы',
    empty: 'Проекты и программы пока не добавлены',
  },
  en: {
    loading: 'Loading projects and programs...',
    error: 'Failed to load projects and programs',
    empty: 'No projects or programs yet',
  },
  kg: {
    loading: 'Долбоорлор жана программалар жүктөлүүдө...',
    error: 'Долбоорлорду жана программаларды жүктөө мүмкүн болгон жок',
    empty: 'Долбоорлор жана программалар азырынча кошула элек',
  },
};

function stripHtml(value = '') {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function ProjectCard({ project, detailsLabel, yearsLabel }) {
  return (
    <motion.article
      variants={itemVariants}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.10)]"
    >
      <div className="h-52 overflow-hidden bg-slate-100">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{stripHtml(project.description)}</p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-medium text-sky-800">
          <Calendar className="h-3.5 w-3.5" />
          {yearsLabel}: {project.implementation_period}
        </div>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
        >
          {detailsLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection({ t, lang }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const section = t?.projects?.section ?? { eyebrow: 'Проекты и программы', title: 'Инвестиции и государственные программы', subtitle: '' };
  const detailsLabel = t?.projects?.detailsButton ?? 'Подробнее';
  const yearsLabel = t?.projects?.yearsLabel ?? 'Годы реализации';
  const ui = uiByLang[lang] ?? uiByLang.ru;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const items = await fetchProjectsList({ lang });

        if (!cancelled) {
          setProjects([...items].sort((a, b) => a.order - b.order));
        }
      } catch (err) {
        if (!cancelled) {
          setProjects([]);
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
      id="projects"
      eyebrow={section.eyebrow}
      title={section.title}
      subtitle={section.subtitle}
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="space-y-8"
      >
        {loading && <p className="text-sm text-slate-600">{ui.loading}</p>}
        {!loading && error && <p className="text-sm text-red-600">{ui.error}</p>}
        {!loading && !error && projects.length === 0 && <p className="text-sm text-slate-600">{ui.empty}</p>}

        {projects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                detailsLabel={detailsLabel}
                yearsLabel={yearsLabel}
              />
            ))}
          </div>
        )}
      </motion.div>
    </SectionShell>
  );
}
