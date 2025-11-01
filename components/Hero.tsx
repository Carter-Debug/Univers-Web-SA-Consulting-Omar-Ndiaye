import React from 'react';

const Hero: React.FC = () => {
    const scrollTo = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };

  return (
    <section className="py-20 md:py-32 bg-gray-50 text-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          <span className="gradient-text">Univers Web SA Consulting</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Votre vision, notre code, votre succès en ligne.
        </p>
        <div className="flex justify-center space-x-4">
            <button onClick={() => scrollTo('#services')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 text-lg">
                Découvrir nos services
            </button>
            <button onClick={() => scrollTo('#contact')} className="bg-transparent border-2 border-indigo-600 hover:bg-indigo-600 text-indigo-600 hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300 text-lg">
                Nous Contacter
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;