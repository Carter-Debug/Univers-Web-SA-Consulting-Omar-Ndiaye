import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { FacebookIcon, TikTokIcon, InstagramIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from './Icons';

const socialPlatforms = [
  { name: 'Facebook', icon: <FacebookIcon className="w-8 h-8"/>, href: SOCIAL_LINKS.facebook },
  { name: 'TikTok', icon: <TikTokIcon className="w-8 h-8"/>, href: SOCIAL_LINKS.tiktok },
  { name: 'Instagram', icon: <InstagramIcon className="w-8 h-8" fill="none" stroke="currentColor"/>, href: SOCIAL_LINKS.instagram },
  { name: 'Twitter (X)', icon: <TwitterIcon className="w-8 h-8"/>, href: SOCIAL_LINKS.twitter },
  { name: 'LinkedIn', icon: <LinkedinIcon className="w-8 h-8"/>, href: SOCIAL_LINKS.linkedin },
  { name: 'WhatsApp', icon: <WhatsappIcon className="w-8 h-8"/>, href: SOCIAL_LINKS.whatsapp },
];

const Socials: React.FC = () => {
  return (
    <section id="socials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Rejoignez Notre Communauté</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suivez-nous sur les réseaux sociaux pour ne rien manquer de nos actualités, conseils et réalisations.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-center border border-gray-200 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
                {platform.icon}
              </div>
              <p className="mt-4 font-semibold text-gray-800 group-hover:text-white">{platform.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;