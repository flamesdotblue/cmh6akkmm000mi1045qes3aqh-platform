import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-600 text-white">
              <Rocket className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Free Tech Consultation</h3>
          </div>
          <p className="mt-3 text-slate-600">
            Want to take your local business online? We’ll guide you on domains, hosting, storefronts, payments, and SEO—free 30-minute call.
          </p>

          <form
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = data.get('name');
              const email = data.get('email');
              const message = data.get('message');
              const subject = encodeURIComponent('Free Consultation Request');
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
              window.location.href = `mailto:hello@verdetech.example?subject=${subject}&body=${body}`;
            }}
          >
            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
              <input
                name="name"
                required
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
              <input
                name="email"
                required
                type="email"
                placeholder="jane@company.com"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">What do you need help with?</label>
              <textarea
                name="message"
                rows={4}
                placeholder="e.g., Launch a site with online ordering, improve Google ranking, build an Android app..."
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
              >
                Request my free call
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
          <p className="mt-4 text-xs text-slate-500">We’ll reply within one business day.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
          <h4 className="relative text-2xl font-semibold text-emerald-900">Start local. Go global.</h4>
          <p className="relative mt-3 max-w-md text-emerald-900/80">
            From logo to live store in days. We set up your domain, hosting, CMS or storefront, payment gateways, analytics, and basic SEO so you can sell from day one.
          </p>
          <ul className="relative mt-6 grid grid-cols-1 gap-3 text-sm text-emerald-900/90 sm:grid-cols-2">
            <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" /> Domain & hosting setup</li>
            <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" /> Storefront or booking system</li>
            <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" /> Payments & invoicing</li>
            <li className="flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-700" /> SEO & analytics essentials</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
