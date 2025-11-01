import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const categories: Project['category'][] = ['Site Web Vitrine', 'Site Entreprise', 'Site E-commerce', 'Site ONG et Fondation'];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');

  const filteredProjects = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">Nos Réalisations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez quelques-uns des projets que nous avons fièrement menés à bien pour nos clients.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-10">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            Tous
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full font-semibold transition-colors ${filter === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                <h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                <p className="text-indigo-400 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;