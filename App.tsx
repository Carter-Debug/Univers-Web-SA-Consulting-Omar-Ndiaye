import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import UniversIA from './components/UniversIA';
import Dashboard from './components/Dashboard';
import Socials from './components/Socials';
import About from './components/About';

const App: React.FC = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const handleSelectService = (serviceId: string) => {
        setSelectedServices(prev => {
            if (!prev.includes(serviceId)) {
                return [...prev, serviceId];
            }
            return prev;
        });
        
        const contactElement = document.querySelector('#contact');
        if (contactElement) {
            contactElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-white text-gray-800">
            <div className="no-print">
                <Header />
            </div>
            <main>
                <Hero />
                <About />
                <Services onSelectService={handleSelectService} />
                <Portfolio />
                <Testimonials />
                <Socials />
                <Contact selectedServices={selectedServices} setSelectedServices={setSelectedServices} />
            </main>
            <div className="no-print">
                <Footer onDashboardToggle={() => setShowDashboard(prev => !prev)} />
                <UniversIA />
            </div>
            {showDashboard && <Dashboard onClose={() => setShowDashboard(false)} />}
        </div>
    );
};

export default App;