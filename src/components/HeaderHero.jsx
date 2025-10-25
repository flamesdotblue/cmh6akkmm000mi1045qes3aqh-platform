import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const AnimatedBlob = ({ className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 0.6, scale: 1 }}
    transition={{ duration: 2.2, ease: 'easeOut' }}
    className={`absolute blur-3xl ${className}`}
    aria-hidden
  />
);

const HeaderHero = ({ onOpenAdmin, featured }) => {
  return (
    <section className="relative w-full" aria-label="Hero">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <AnimatedBlob className="left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-emerald-200/60" />
          <AnimatedBlob className="right-[-10%] top-1/4 h-80 w-80 rounded-full bg-emerald-300/40" />
          <AnimatedBlob className="bottom-[-10%] left-1/3 h-96 w-96 rounded-full bg-emerald-100/70" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald-600 text-white shadow-sm">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">VerdeTech Solutions</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm text-slate-700 transition-colors hover:text-emerald-700">Services</a>
            <a href="#process" className="text-sm text-slate-700 transition-colors hover:text-emerald-700">Process</a>
            <a href="#projects" className="text-sm text-slate-700 transition-colors hover:text-emerald-700">Projects</a>
            <a href="#blog" className="text-sm text-slate-700 transition-colors hover:text-emerald-700">Blog</a>
            <button onClick={onOpenAdmin} className="text-sm text-slate-700 transition-colors hover:text-emerald-700">Admin</button>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Free Tech Consultation</a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-7"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Build, Grow, and Scale with a Trusted Tech Partner
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              We craft high-performance websites, apps, and SEO strategies that turn local ideas into thriving online businesses.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                Explore Projects
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>Fast delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>Transparent pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-600" />
                <span>Long-term support</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4 text-slate-600">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-700"><Github className="h-4 w-4" /> GitHub</a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-700"><Twitter className="h-4 w-4" /> Twitter</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-700"><Linkedin className="h-4 w-4" /> LinkedIn</a>
              <a href="mailto:hello@verdetech.example" className="inline-flex items-center gap-2 hover:text-emerald-700"><Mail className="h-4 w-4" /> Email</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="rounded-2xl border border-emerald-200 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">Featured Projects</p>
              <div className="mt-2 grid grid-cols-1 gap-3">
                {(featured?.length ? featured : [
                  { id: 'f1', title: 'Local Bakery Online Ordering', tags: ['Next.js', 'Stripe', 'Vercel'] },
                  { id: 'f2', title: 'SEO Growth for Clinic', tags: ['Technical SEO', 'Content', 'Analytics'] },
                  { id: 'f3', title: 'Fitness App MVP', tags: ['React Native', 'Firebase'] },
                ]).map((p) => (
                  <div key={p.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-900">{p.title}</h4>
                      <span className="text-xs text-emerald-700">View →</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {(p.tags || []).map((t) => (
                        <span key={t} className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
