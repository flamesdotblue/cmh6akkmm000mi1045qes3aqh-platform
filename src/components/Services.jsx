import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Search, Smartphone, Shield } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Website Development',
    desc: 'Conversion-focused, fast, and accessible websites built with modern stacks and best practices.'
  },
  {
    icon: Search,
    title: 'SEO & Growth',
    desc: 'Technical SEO, on-page optimization, and content strategy to rank higher and grow organically.'
  },
  {
    icon: Smartphone,
    title: 'App Development',
    desc: 'iOS, Android, and cross-platform apps designed for performance and delightful UX.'
  },
  {
    icon: Shield,
    title: 'IT Solutions',
    desc: 'Hosting, security hardening, analytics, and integrations tailored to your business.'
  }
];

const Services = () => {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What we do</h2>
        <p className="mt-4 text-slate-600">
          A full-stack digital partner focused on outcomes, not just deliverables.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-emerald-100 bg-emerald-50 p-6 text-emerald-900">
        <p className="text-sm">
          Not sure where to start? We help local businesses go online — from branding and domain setup to store, payments, and marketing.
        </p>
      </div>
    </section>
  );
};

export default Services;
