import React from 'react';
import { SOCIAL_LINKS, CONTACT_INFO, Founder } from '../constants';
import { FacebookIcon, TikTokIcon, InstagramIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from './Icons';

const Footer: React.FC<{ onDashboardToggle: () => void }> = ({ onDashboardToggle }) => {
    const [clickCount, setClickCount] = React.useState(0);
    
    const handleCopyrightClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
            onDashboardToggle();
            setClickCount(0);
        }
    };
    
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Univers Web SA Consulting</h3>
            <p>{CONTACT_INFO.address}</p>
            <p>24h/24, 7j/7</p>
            <p className="mt-2">
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-indigo-600">{CONTACT_INFO.email}</a>
            </p>
            <p>
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-indigo-600">{CONTACT_INFO.phone}</a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Liens Rapides</h3>
            <ul>
              <li><a href="#services" className="hover:text-indigo-600">Services</a></li>
              <li><a href="#portfolio" className="hover:text-indigo-600">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-indigo-600">Devis</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Suivez-nous</h3>
            <div className="flex justify-center md:justify-start space-x-4 text-gray-500">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><FacebookIcon className="w-6 h-6"/></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><TikTokIcon className="w-6 h-6"/></a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><InstagramIcon className="w-6 h-6" fill="none" stroke="currentColor"/></a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><TwitterIcon className="w-6 h-6"/></a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><LinkedinIcon className="w-6 h-6"/></a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600"><WhatsappIcon className="w-6 h-6"/></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
            <p className="font-semibold text-gray-900">{Founder.name}</p>
            <p className="text-sm">{Founder.title}</p>
          <p className="mt-4 text-sm" onClick={handleCopyrightClick} style={{cursor: 'pointer'}}>
            &copy; {new Date().getFullYear()} Univers Web SA Consulting. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;