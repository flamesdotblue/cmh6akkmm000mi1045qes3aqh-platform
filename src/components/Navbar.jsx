import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';

const NavItem = ({ to, children }) => (
  <NavLink to={to} className={({ isActive }) => `px-2 py-1 text-sm ${isActive ? 'text-emerald-700' : 'text-slate-700 hover:text-emerald-700'}`}>{children}</NavLink>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-emerald-600 text-white shadow-sm">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">VerdeTech Solutions</span>
        </Link>
        <nav className="hidden items-center gap-3 md:flex">
          <NavItem to="/about">About</NavItem>
          <NavItem to="/services">Services</NavItem>
          <NavItem to="/projects">Projects</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/pricing">Pricing</NavItem>
          <NavItem to="/team">Team</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/admin">Admin</NavItem>
        </nav>
        <button onClick={() => setOpen((o) => !o)} className="grid place-items-center rounded-md p-2 text-slate-700 hover:bg-slate-50 md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-3 md:hidden">
          <div className="grid gap-2">
            <NavItem to="/about">About</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/projects">Projects</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/pricing">Pricing</NavItem>
            <NavItem to="/team">Team</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/admin">Admin</NavItem>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
