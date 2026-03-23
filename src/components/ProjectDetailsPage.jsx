import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import { investmentProjects } from './ProjectsSection';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = investmentProjects[Number(id)];

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6">
        <p className="text-sm text-slate-600">Проект не найден</p>
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
        К проектам
      </Link>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_42px_rgba(15,23,42,0.08)]"
      >
        <div className="h-[260px] w-full overflow-hidden md:h-[420px]">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${project.statusColor}`}>
              {project.status}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{project.title}</h1>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-blue-400" /> {project.budget}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-400" /> {project.period}
            </span>
          </div>

          <p className="mt-6 text-base leading-8 text-slate-700">{project.description}</p>
        </div>
      </motion.article>
    </section>
  );
}
