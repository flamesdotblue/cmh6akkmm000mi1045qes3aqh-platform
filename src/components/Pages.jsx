import React from 'react';
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Search as SearchIcon, Smartphone, Shield, Star } from 'lucide-react';
import { useCMS } from './Store';
import AdminPanel from './AdminPanel';

const SectionTitle = ({ title, subtitle }) => (
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
    {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
  </div>
);

const Hero = () => (
  <section className="relative w-full overflow-hidden">
    <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />
    <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-12 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-7">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">Build, Grow, and Scale with a Trusted Tech Partner</h1>
        <p className="mt-5 max-w-xl text-lg text-slate-600">Websites, apps, SEO, and IT solutions that turn local ideas into thriving online businesses.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-white shadow-sm transition-colors hover:bg-emerald-700">Book Free Consultation<ArrowRight className="h-4 w-4"/></Link>
          <Link to="/services" className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700">Explore Services</Link>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="md:col-span-5">
        <div className="rounded-2xl border border-emerald-200 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">Why choose us</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2"><Star className="h-4 w-4 text-emerald-600"/> Fast delivery & clear pricing</li>
            <li className="flex items-center gap-2"><Star className="h-4 w-4 text-emerald-600"/> Conversion-focused UX</li>
            <li className="flex items-center gap-2"><Star className="h-4 w-4 text-emerald-600"/> Long-term support & growth</li>
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

const ServicesOverview = () => {
  const items = [
    { icon: Code2, slug: 'web-development', title: 'Website Development', desc: 'Modern, fast, and accessible websites.' },
    { icon: SearchIcon, slug: 'seo', title: 'SEO & Growth', desc: 'Increase visibility and organic traffic.' },
    { icon: Smartphone, slug: 'app-development', title: 'App Development', desc: 'Mobile and cross-platform apps.' },
    { icon: Shield, slug: 'it-solutions', title: 'IT Solutions', desc: 'Hosting, security, and integrations.' },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="Our Services" subtitle="Outcomes over deliverables: full-stack capabilities to ship and grow." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((s, idx) => (
          <motion.div key={s.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-emerald-700"><s.icon className="h-6 w-6"/></div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{s.desc}</p>
            <Link to={`/services/${s.slug}`} className="mt-4 inline-block text-sm font-medium text-emerald-700 hover:underline">Learn more →</Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = useCMS((s) => s.services.find((x) => x.slug === slug));
  const navigate = useNavigate();
  if (!service) return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded border border-amber-200 bg-amber-50 p-4 text-amber-900">Service not found. <button onClick={()=>navigate('/services')} className="underline">Back to services</button></div>
    </div>
  );
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-6 text-sm text-emerald-700"><button onClick={()=>navigate('/services')} className="hover:underline">← All services</button></div>
      <h1 className="text-3xl font-bold text-slate-900">{service.title}</h1>
      <p className="mt-3 text-slate-600">{service.desc}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {(service.bullets||[]).map((b)=> <div key={b} className="rounded border border-slate-200 bg-white p-4 text-sm text-slate-700">{b}</div>)}
      </div>
      <div className="mt-8">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">Start this service<ArrowRight className="h-4 w-4"/></Link>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = useCMS((s) => s.projects);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="Projects" subtitle="Recent work across web, mobile, and growth." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-semibold text-slate-900">{p.title}</h4>
              <span className="text-xs text-emerald-700">{new Date(p.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">{(p.tags||[]).map(t=> <span key={t} className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{t}</span>)}</div>
            {p.link ? <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">Visit →</a> : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = useCMS((s) => s.posts);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="Blog" subtitle="Insights on web, SEO, apps, and scaling." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <motion.article key={p.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{new Date(p.createdAt).toLocaleDateString()}</span>
              {p.tag ? <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{p.tag}</span> : null}
            </div>
            {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium text-emerald-700 hover:underline">Read more →</a> : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
};

const About = () => (
  <section className="mx-auto max-w-4xl px-6 py-16">
    <SectionTitle title="About Us" subtitle="We are a product-minded software studio helping local businesses go online and grow." />
    <div className="mt-8 space-y-4 text-slate-700">
      <p>From high-performance websites to mobile apps and SEO, our team blends engineering, design, and growth to create measurable outcomes. We move fast, communicate clearly, and stay long-term partners.</p>
      <p>Our process prioritizes quick iterations, data-driven decisions, and ownership. We build for speed, accessibility, and conversion—then we keep improving.</p>
    </div>
  </section>
);

const Pricing = () => {
  const pricing = useCMS((s) => s.pricing);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="Pricing" subtitle="Transparent plans to match your stage." />
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {pricing.map((pl) => (
          <div key={pl.id} className={`rounded-xl border ${pl.highlight ? 'border-emerald-300' : 'border-slate-200'} bg-white p-6 shadow-sm`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{pl.name}</h3>
              {pl.highlight ? <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">Popular</span> : null}
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{pl.price}</div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">{(pl.features||[]).map(f => <li key={f} className="flex items-center gap-2"><Star className="h-4 w-4 text-emerald-600"/>{f}</li>)}</ul>
            <Link to="/contact" className="mt-6 inline-block rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">Get started</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const team = useCMS((s) => s.team);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="Our Team" subtitle="Small, senior, and dedicated to your outcomes." />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {team.map((m) => (
          <div key={m.id} className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100" />
            <div className="mt-3 text-base font-semibold text-slate-900">{m.name}</div>
            <div className="text-sm text-slate-600">{m.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const t = useCMS((s) => s.testimonials);
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <SectionTitle title="What clients say" />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {t.map((fb) => (
          <div key={fb.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm text-slate-700">“{fb.text}”</div>
            <div className="mt-3 text-sm font-medium text-slate-900">{fb.name} • {fb.rating}/5</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  const contact = useCMS((s) => s.contact);
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <SectionTitle title="Contact us" subtitle="Book a free 30-minute consultation." />
      <form className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e)=>{e.preventDefault(); const data=new FormData(e.currentTarget); const name=data.get('name'); const email=data.get('email'); const message=data.get('message'); const subject=encodeURIComponent('Free Consultation Request'); const body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`); window.location.href=`mailto:${contact.email}?subject=${subject}&body=${body}`;}}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
          <input required name="name" className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="Jane Doe" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input required type="email" name="email" className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="jane@company.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">How can we help?</label>
          <textarea name="message" rows={5} className="w-full rounded-md border border-slate-300 px-3 py-2" placeholder="e.g., Launch a site with online ordering, improve Google ranking, build an Android app..." />
        </div>
        <div className="sm:col-span-2 flex items-center gap-3 text-sm text-slate-600">
          <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700">Send</button>
          <span>Or email us at <a href={`mailto:${contact.email}`} className="text-emerald-700 underline">{contact.email}</a></span>
        </div>
      </form>
      <div className="mt-8 text-sm text-slate-600">
        <div>{contact.address}</div>
        <div>{contact.phone}</div>
      </div>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <ServicesOverview />
    <Projects />
    <Testimonials />
  </>
);

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<ServicesOverview />} />
      <Route path="/services/:slug" element={<ServiceDetail />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/team" element={<Team />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="*" element={<div className="mx-auto max-w-3xl px-6 py-16">Not found. <Link className="text-emerald-700 underline" to="/">Go home</Link></div>} />
    </Routes>
  );
};

export default Pages;
