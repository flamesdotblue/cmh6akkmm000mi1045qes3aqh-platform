import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Pages from './components/Pages';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-slate-900 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Pages />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
