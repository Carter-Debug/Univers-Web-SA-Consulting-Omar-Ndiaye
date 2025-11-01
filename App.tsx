import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Socials from './components/Socials';
import Footer from './components/Footer';
import UniversIA from './components/UniversIA';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div className="bg-white text-gray-800">
            <div className="no-print">
                <Header />
            </div>
            <main>
                <Hero />
                <Services />
                <Portfolio />
                <Testimonials />
                <Contact />
                <Socials />
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