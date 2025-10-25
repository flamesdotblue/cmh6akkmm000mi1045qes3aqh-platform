import { create } from 'zustand';

const LS_KEY = 'verdetech_cms_v2';

const defaults = {
  posts: [
    { id: 'p1', title: 'How to take your local store online', excerpt: 'A step-by-step path from domain to first sale.', tag: 'Getting Started', url: '', createdAt: new Date().toISOString() },
    { id: 'p2', title: 'SEO basics for local businesses', excerpt: 'Titles, meta, speed, and Google Business Profile.', tag: 'SEO', url: '', createdAt: new Date().toISOString() }
  ],
  projects: [
    { id: 'pr1', title: 'Bakery Online Ordering', description: 'Next.js storefront with Stripe payments.', link: '#', tags: ['Next.js', 'Stripe', 'Vercel'], createdAt: new Date().toISOString() },
    { id: 'pr2', title: 'Clinic SEO Growth', description: 'Technical SEO and content strategy for local clinic.', link: '#', tags: ['SEO', 'Content'], createdAt: new Date().toISOString() }
  ],
  team: [
    { id: 't1', name: 'Ava Patel', role: 'Founder & Tech Lead' },
    { id: 't2', name: 'Leo Kim', role: 'Product Designer' },
    { id: 't3', name: 'Sara Ali', role: 'SEO Strategist' }
  ],
  pricing: [
    { id: 'pl1', name: 'Starter', price: '$899', features: ['Single-page site', 'Basic SEO', 'Contact form'], highlight: false },
    { id: 'pl2', name: 'Growth', price: '$2,499', features: ['Multi-page site', 'On-page SEO', 'Analytics + CMS'], highlight: true },
    { id: 'pl3', name: 'Scale', price: 'Custom', features: ['Web + App', 'Tech integrations', 'Ongoing growth'], highlight: false }
  ],
  testimonials: [
    { id: 'fb1', name: 'Maria G.', text: 'We launched in 2 weeks and tripled online orders.', rating: 5 },
    { id: 'fb2', name: 'Dr. Chen', text: 'SEO plan brought us to page 1 for key terms.', rating: 5 }
  ],
  services: [
    { id: 's1', slug: 'web-development', title: 'Website Development', desc: 'Fast, accessible, conversion-focused websites built with modern stacks.', bullets: ['Next.js/React', 'Performance & accessibility', 'CMS integration'] },
    { id: 's2', slug: 'seo', title: 'SEO & Growth', desc: 'Technical SEO, on-page optimization, and content to grow organically.', bullets: ['Technical audit', 'On-page fixes', 'Content strategy'] },
    { id: 's3', slug: 'app-development', title: 'App Development', desc: 'iOS, Android, and cross-platform apps designed for performance.', bullets: ['React Native', 'PWAs', 'Launch & analytics'] },
    { id: 's4', slug: 'it-solutions', title: 'IT Solutions', desc: 'Hosting, security, analytics, and integrations tailored to your business.', bullets: ['Cloud hosting', 'Security hardening', 'Automation & integrations'] }
  ],
  contact: { email: 'hello@verdetech.example', phone: '+1 (555) 123-4567', address: '123 Market Street, San Francisco, CA' },
};

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

function save(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export const useCMS = create((set, get) => ({
  ...load(),
  addPost: (post) => set((s) => { const p = { ...post, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; const out = { ...s, posts: [p, ...s.posts] }; save(out); return out; }),
  updatePost: (id, patch) => set((s) => { const posts = s.posts.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, posts }; save(out); return out; }),
  deletePost: (id) => set((s) => { const posts = s.posts.filter((x) => x.id !== id); const out = { ...s, posts }; save(out); return out; }),

  addProject: (project) => set((s) => { const p = { ...project, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; const out = { ...s, projects: [p, ...s.projects] }; save(out); return out; }),
  updateProject: (id, patch) => set((s) => { const projects = s.projects.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, projects }; save(out); return out; }),
  deleteProject: (id) => set((s) => { const projects = s.projects.filter((x) => x.id !== id); const out = { ...s, projects }; save(out); return out; }),

  addMember: (m) => set((s) => { const out = { ...s, team: [...s.team, { ...m, id: crypto.randomUUID() }] }; save(out); return out; }),
  updateMember: (id, patch) => set((s) => { const team = s.team.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, team }; save(out); return out; }),
  deleteMember: (id) => set((s) => { const out = { ...s, team: s.team.filter((x) => x.id !== id) }; save(out); return out; }),

  addPlan: (pl) => set((s) => { const out = { ...s, pricing: [...s.pricing, { ...pl, id: crypto.randomUUID() }] }; save(out); return out; }),
  updatePlan: (id, patch) => set((s) => { const pricing = s.pricing.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, pricing }; save(out); return out; }),
  deletePlan: (id) => set((s) => { const out = { ...s, pricing: s.pricing.filter((x) => x.id !== id) }; save(out); return out; }),

  addTestimonial: (fb) => set((s) => { const out = { ...s, testimonials: [...s.testimonials, { ...fb, id: crypto.randomUUID() }] }; save(out); return out; }),
  updateTestimonial: (id, patch) => set((s) => { const testimonials = s.testimonials.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, testimonials }; save(out); return out; }),
  deleteTestimonial: (id) => set((s) => { const out = { ...s, testimonials: s.testimonials.filter((x) => x.id !== id) }; save(out); return out; }),

  updateContact: (patch) => set((s) => { const out = { ...s, contact: { ...s.contact, ...patch } }; save(out); return out; }),

  addService: (sv) => set((s) => { const out = { ...s, services: [...s.services, { ...sv, id: crypto.randomUUID() }] }; save(out); return out; }),
  updateService: (id, patch) => set((s) => { const services = s.services.map((x) => x.id === id ? { ...x, ...patch } : x); const out = { ...s, services }; save(out); return out; }),
  deleteService: (id) => set((s) => { const out = { ...s, services: s.services.filter((x) => x.id !== id) }; save(out); return out; }),
}));
