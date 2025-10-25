import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Discover',
    desc: 'Understand your goals, audience, and success metrics with a free consultation.'
  },
  {
    title: 'Design & Build',
    desc: 'We prototype, design, and develop in quick, reviewable iterations.'
  },
  {
    title: 'Launch & Grow',
    desc: 'Deploy with analytics, SEO, and ongoing optimization for measurable ROI.'
  }
];

const Process = () => {
  return (
    <section id="process" className="relative mx-auto max-w-7xl px-6 pb-12 pt-2 md:pt-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How we work</h2>
        <p className="mt-4 text-slate-600">
          A streamlined process designed to ship fast and iterate with data.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-2 text-emerald-700">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Step {i + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold">Guaranteed clarity before we build</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Get a roadmap and transparent quote after your free session—no pressure, no jargon.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Process;
