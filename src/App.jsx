import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import ContactCTA from './components/ContactCTA';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased">
      <Hero />
      <Services />
      <Process />
      <ContactCTA />
      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} VerdeTech Solutions. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
