import React, { useEffect, useMemo, useState } from 'react';
import HeaderHero from './components/HeaderHero';
import Sections from './components/Sections';
import Projects from './components/Projects';
import Blog from './components/Blog';
import AdminPanel from './components/AdminPanel';

const LS_KEYS = {
  posts: 'verdetech_posts_v1',
  projects: 'verdetech_projects_v1',
};

function App() {
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem(LS_KEYS.posts) || '[]');
      const pr = JSON.parse(localStorage.getItem(LS_KEYS.projects) || '[]');
      setPosts(Array.isArray(p) ? p : []);
      setProjects(Array.isArray(pr) ? pr : []);
    } catch {
      setPosts([]);
      setProjects([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.posts, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.projects, JSON.stringify(projects));
  }, [projects]);

  const addPost = (post) => {
    const withId = { ...post, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setPosts((prev) => [withId, ...prev]);
  };
  const updatePost = (id, patch) => setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const deletePost = (id) => setPosts((prev) => prev.filter((p) => p.id !== id));

  const addProject = (project) => {
    const withId = { ...project, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    setProjects((prev) => [withId, ...prev]);
  };
  const updateProject = (id, patch) => setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const deleteProject = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const featured = useMemo(() => projects.slice(0, 3), [projects]);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <HeaderHero onOpenAdmin={() => setAdminOpen(true)} featured={featured} />
      <Sections />
      <Projects projects={projects} />
      <Blog posts={posts} />

      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} VerdeTech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-3 text-sm">
            <a className="text-slate-500 hover:text-emerald-700" href="mailto:hello@verdetech.example">hello@verdetech.example</a>
            <span className="text-slate-200">|</span>
            <button onClick={() => setAdminOpen(true)} className="rounded-md border border-slate-200 px-3 py-1.5 text-slate-600 hover:border-emerald-300 hover:text-emerald-700">Admin</button>
          </div>
        </div>
      </footer>

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        posts={posts}
        addPost={addPost}
        updatePost={updatePost}
        deletePost={deletePost}
        projects={projects}
        addProject={addProject}
        updateProject={updateProject}
        deleteProject={deleteProject}
      />
    </div>
  );
}

export default App;
