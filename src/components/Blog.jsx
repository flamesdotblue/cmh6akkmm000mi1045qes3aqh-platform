import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogCard = ({ post }) => (
  <motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
    <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
    <p className="mt-2 text-sm text-slate-600">{post.excerpt}</p>
    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      {post.tag ? <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{post.tag}</span> : null}
    </div>
    {post.url ? (
      <a href={post.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">Read more →</a>
    ) : null}
  </motion.article>
);

const Blog = ({ posts }) => {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');

  const tags = useMemo(() => {
    const t = new Set();
    posts.forEach((p) => p.tag && t.add(p.tag));
    return Array.from(t);
  }, [posts]);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const q = query.toLowerCase();
      const matchQ = !query || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q);
      const matchT = !tag || p.tag === tag;
      return matchQ && matchT;
    });
  }, [posts, query, tag]);

  return (
    <section id="blog" className="relative mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Blog</h2>
          <p className="mt-2 text-slate-600">Insights on web, SEO, apps, and scaling local businesses online.</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts..." className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 sm:w-48">
            <option value="">All topics</option>
            {tags.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.length ? (
            filtered.map((p) => <BlogCard key={p.id} post={p} />)
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600">No posts yet. Add some in the Admin panel.</motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Blog;
