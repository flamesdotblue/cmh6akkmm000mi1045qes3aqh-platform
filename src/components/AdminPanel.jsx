import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const Modal = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {children}
          </motion.div>
          <button aria-label="Close" onClick={onClose} className="absolute right-5 top-5 rounded-full bg-white p-2 shadow"><X className="h-5 w-5" /></button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const AdminPanel = ({ open, onClose, posts, addPost, updatePost, deletePost, projects, addProject, updateProject, deleteProject }) => {
  const [tab, setTab] = useState('posts');

  useEffect(() => {
    if (!open) setTab('posts');
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between border-b border-slate-200 bg-emerald-50 px-5 py-3">
        <div className="flex items-center gap-2 text-emerald-800">
          <Settings className="h-5 w-5" />
          <h3 className="text-sm font-semibold">Admin Panel</h3>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setTab('posts')} className={`rounded-md px-3 py-1.5 ${tab === 'posts' ? 'bg-white text-emerald-700 shadow' : 'text-emerald-800 hover:bg-white/60'}`}>Posts</button>
          <button onClick={() => setTab('projects')} className={`rounded-md px-3 py-1.5 ${tab === 'projects' ? 'bg-white text-emerald-700 shadow' : 'text-emerald-800 hover:bg-white/60'}`}>Projects</button>
        </div>
      </div>

      {tab === 'posts' ? (
        <PostsTab posts={posts} addPost={addPost} updatePost={updatePost} deletePost={deletePost} />
      ) : (
        <ProjectsTab projects={projects} addProject={addProject} updateProject={updateProject} deleteProject={deleteProject} />
      )}
    </Modal>
  );
};

const PostsTab = ({ posts, addPost, updatePost, deletePost }) => {
  const [draft, setDraft] = useState({ title: '', excerpt: '', url: '', tag: '' });
  const [editing, setEditing] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    addPost(draft);
    setDraft({ title: '', excerpt: '', url: '', tag: '' });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (editing && editing.id) {
      updatePost(editing.id, editing);
      setEditing(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-900">New Post</h4>
        <form onSubmit={onSubmit} className="mt-3 grid grid-cols-1 gap-3">
          <input value={draft.title} onChange={(e) => setDraft((s) => ({ ...s, title: e.target.value }))} placeholder="Title" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <input value={draft.excerpt} onChange={(e) => setDraft((s) => ({ ...s, excerpt: e.target.value }))} placeholder="Short excerpt" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input value={draft.tag} onChange={(e) => setDraft((s) => ({ ...s, tag: e.target.value }))} placeholder="Tag (e.g., SEO)" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
            <input value={draft.url} onChange={(e) => setDraft((s) => ({ ...s, url: e.target.value }))} placeholder="External URL (optional)" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"><Plus className="h-4 w-4" /> Add Post</button>
        </form>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-900">Posts</h4>
        <div className="mt-3 space-y-3">
          {posts.length === 0 ? (
            <p className="text-sm text-slate-600">No posts yet.</p>
          ) : (
            posts.map((p) => (
              <div key={p.id} className="rounded-md border border-slate-200 p-3">
                {editing?.id === p.id ? (
                  <form onSubmit={onUpdate} className="grid grid-cols-1 gap-2">
                    <input value={editing.title} onChange={(e) => setEditing((s) => ({ ...s, title: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    <input value={editing.excerpt} onChange={(e) => setEditing((s) => ({ ...s, excerpt: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input value={editing.tag || ''} onChange={(e) => setEditing((s) => ({ ...s, tag: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                      <input value={editing.url || ''} onChange={(e) => setEditing((s) => ({ ...s, url: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="inline-flex items-center gap-2 rounded bg-emerald-600 px-3 py-1.5 text-white"><Save className="h-4 w-4" /> Save</button>
                      <button type="button" onClick={() => setEditing(null)} className="rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="font-medium text-slate-900">{p.title}</h5>
                      <p className="text-sm text-slate-600">{p.excerpt}</p>
                      <div className="mt-1 text-xs text-slate-500">{new Date(p.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button onClick={() => setEditing(p)} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => deletePost(p.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsTab = ({ projects, addProject, updateProject, deleteProject }) => {
  const [draft, setDraft] = useState({ title: '', description: '', link: '', tags: '' });
  const [editing, setEditing] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const payload = { ...draft, tags: draft.tags ? draft.tags.split(',').map((t) => t.trim()).filter(Boolean) : [] };
    addProject(payload);
    setDraft({ title: '', description: '', link: '', tags: '' });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (editing && editing.id) {
      const payload = { ...editing, tags: typeof editing.tags === 'string' ? editing.tags.split(',').map((t) => t.trim()).filter(Boolean) : editing.tags };
      updateProject(editing.id, payload);
      setEditing(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-2">
      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-900">New Project</h4>
        <form onSubmit={onSubmit} className="mt-3 grid grid-cols-1 gap-3">
          <input value={draft.title} onChange={(e) => setDraft((s) => ({ ...s, title: e.target.value }))} placeholder="Title" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <textarea value={draft.description} onChange={(e) => setDraft((s) => ({ ...s, description: e.target.value }))} placeholder="Short description" rows={3} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input value={draft.tags} onChange={(e) => setDraft((s) => ({ ...s, tags: e.target.value }))} placeholder="Tags (comma separated)" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
            <input value={draft.link} onChange={(e) => setDraft((s) => ({ ...s, link: e.target.value }))} placeholder="Project URL (optional)" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30" />
          </div>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"><Plus className="h-4 w-4" /> Add Project</button>
        </form>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <h4 className="font-semibold text-slate-900">Projects</h4>
        <div className="mt-3 space-y-3">
          {projects.length === 0 ? (
            <p className="text-sm text-slate-600">No projects yet.</p>
          ) : (
            projects.map((p) => (
              <div key={p.id} className="rounded-md border border-slate-200 p-3">
                {editing?.id === p.id ? (
                  <form onSubmit={onUpdate} className="grid grid-cols-1 gap-2">
                    <input value={editing.title} onChange={(e) => setEditing((s) => ({ ...s, title: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    <textarea value={editing.description} onChange={(e) => setEditing((s) => ({ ...s, description: e.target.value }))} rows={2} className="rounded border border-slate-300 px-2 py-1" />
                    <input value={typeof editing.tags === 'string' ? editing.tags : (editing.tags || []).join(', ')} onChange={(e) => setEditing((s) => ({ ...s, tags: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    <input value={editing.link || ''} onChange={(e) => setEditing((s) => ({ ...s, link: e.target.value }))} className="rounded border border-slate-300 px-2 py-1" />
                    <div className="flex gap-2">
                      <button type="submit" className="inline-flex items-center gap-2 rounded bg-emerald-600 px-3 py-1.5 text-white"><Save className="h-4 w-4" /> Save</button>
                      <button type="button" onClick={() => setEditing(null)} className="rounded px-3 py-1.5 text-slate-600 hover:bg-slate-100">Cancel</button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="font-medium text-slate-900">{p.title}</h5>
                      <p className="text-sm text-slate-600">{p.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {(p.tags || []).map((t) => (
                          <span key={t} className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button onClick={() => setEditing(p)} className="rounded px-2 py-1 text-emerald-700 hover:bg-emerald-50"><Edit3 className="h-4 w-4" /></button>
                      <button onClick={() => deleteProject(p.id)} className="rounded px-2 py-1 text-rose-700 hover:bg-rose-50"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
