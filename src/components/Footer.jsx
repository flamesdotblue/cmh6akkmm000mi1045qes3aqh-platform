import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Phone } from 'lucide-react';
import { useCMS } from './Store';

const Footer = () => {
  const contact = useCMS((s) => s.contact);
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/about" className="hover:text-emerald-700">About</Link></li>
            <li><Link to="/team" className="hover:text-emerald-700">Team</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-700">Pricing</Link></li>
            <li><Link to="/projects" className="hover:text-emerald-700">Projects</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/services/web-development" className="hover:text-emerald-700">Website Development</Link></li>
            <li><Link to="/services/seo" className="hover:text-emerald-700">SEO & Growth</Link></li>
            <li><Link to="/services/app-development" className="hover:text-emerald-700">App Development</Link></li>
            <li><Link to="/services/it-solutions" className="hover:text-emerald-700">IT Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Resources</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/blog" className="hover:text-emerald-700">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-700">Contact</Link></li>
            <li><a href="#" className="hover:text-emerald-700">Privacy</a></li>
            <li><a href="#" className="hover:text-emerald-700">Terms</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Get in touch</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> <a className="hover:text-emerald-700" href={`mailto:${contact.email}`}>{contact.email}</a></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> <a className="hover:text-emerald-700" href={`tel:${contact.phone}`}>{contact.phone}</a></div>
            <div>{contact.address}</div>
          </div>
          <div className="mt-4 flex items-center gap-3 text-slate-600">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-emerald-700"><Github className="h-5 w-5" /></a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="hover:text-emerald-700"><Twitter className="h-5 w-5" /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-emerald-700"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} VerdeTech Solutions. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
