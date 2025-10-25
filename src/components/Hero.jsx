import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full" aria-label="Hero">
      <div className="relative h-[82vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0">
          <Spline
            scene="https://prod.spline.design/Gt5HUob8aGDxOUep/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white" />
        </div>

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald-600 text-white shadow-sm">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">VerdeTech Solutions</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm text-slate-700 hover:text-emerald-700 transition-colors">Services</a>
            <a href="#process" className="text-sm text-slate-700 hover:text-emerald-700 transition-colors">Process</a>
            <a href="#contact" className="text-sm text-slate-700 hover:text-emerald-700 transition-colors">Contact</a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Free Tech Consultation
            </a>
          </nav>
        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-12 md:py-20">
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
                href="#services"
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700"
              >
                Explore Services
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
