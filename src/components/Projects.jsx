import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard = ({ p }) => (
  <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
    <div className="flex items-center justify-between">
      <h4 className="text-base font-semibold text-slate-900">{p.title}</h4>
      <span className="text-xs text-emerald-700">{new Date(p.createdAt).toLocaleDateString()}</span>
    </div>
    {p.description ? <p className="mt-2 text-sm text-slate-600">{p.description}</p> : null}
    <div className="mt-3 flex flex-wrap gap-1">
      {(p.tags || []).map((t) => (
        <span key={t} className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{t}</span>
      ))}
    </div>
    {p.link ? (
      <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">Visit Project →</a>
    ) : null}
  </motion.div>
);

const Projects = ({ projects }) => {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');

  const allTags = useMemo(() => {
    const t = new Set();
    projects.forEach((p) => (p.tags || []).forEach((x) => t.add(x)));
    return Array.from(t);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase()) || (p.description || '').toLowerCase().includes(query.toLowerCase());
      const matchT = !tag || (p.tags || []).includes(tag);
      return matchQ && matchT;
    });
  }, [projects, query, tag]);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Projects</h2>
          <p className="mt-2 text-slate-600">A selection of our recent work across web, mobile, and growth.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-48">
            <option value="">All tags</option>
            {allTags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.length ? (
            filtered.map((p) => <ProjectCard key={p.id} p={p} />)
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">No projects yet. Add some in the Admin panel.</motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
