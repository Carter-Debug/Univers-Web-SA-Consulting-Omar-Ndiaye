import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Nos Services de Création de Site Web</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions sur mesure pour chaque projet, adaptées à vos besoins et à votre budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="bg-white rounded-lg p-8 flex flex-col border border-gray-200 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
              <div className="mt-auto">
                <p className="text-gray-500 text-lg line-through">
                  {service.basePrice.toLocaleString('fr-FR')} FCFA
                </p>
                <p className="text-3xl font-extrabold text-indigo-600 mb-6">
                  {service.discountedPrice.toLocaleString('fr-FR')} FCFA
                </p>
                <button 
                    onClick={() => {
                        const contact = document.querySelector('#contact');
                        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full transition-colors duration-300">
                  Choisir ce plan
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-gray-100 rounded-lg p-10 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
                <h3 className="text-3xl font-extrabold text-gray-900">Vous avez un projet d'envergure ?</h3>
                <p className="text-gray-600 mt-2 max-w-3xl">
                    Pour les solutions d'entreprise complexes, les plateformes sur-mesure et les projets à partir de 400 000 FCFA, nous offrons une approche personnalisée pour donner vie à vos ambitions.
                </p>
            </div>
            <div className="flex-shrink-0">
                <button
                    onClick={() => {
                        const contact = document.querySelector('#contact');
                        if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 text-lg whitespace-nowrap">
                    Devis Personnalisé
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Services;