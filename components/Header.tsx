import React, { useState } from 'react';
import { MenuIcon, XIcon } from './Icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // FIX: Completed the navLinks array.
  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#testimonials', label: 'Témoignages' },
    { href: '#socials', label: 'Réseaux' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 no-print">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
            <a href="#" className="gradient-text">Univers Web SA</a>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="text-gray-600 hover:text-indigo-600 font-semibold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2 bg-white border-t border-gray-200">
          {navLinks.map(link => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                scrollTo(link.href);
              }} 
              className="text-gray-600 hover:text-indigo-600 font-semibold py-2 rounded-md text-center"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

// FIX: Added the missing default export to resolve the import error in App.tsx.
export default Header;
