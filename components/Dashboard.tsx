import React, { useState, useRef } from 'react';
import { TrendingUpIcon, UsersIcon, DollarSignIcon, BriefcaseIcon, XIcon, SettingsIcon } from './Icons';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change: string;
}

interface StatCardData extends StatCardProps {
    id: string;
}

const initialStats: StatCardData[] = [
    { id: 'visitors', icon: <TrendingUpIcon className="text-indigo-500"/>, title: "Visiteurs (30j)", value: "1,250", change: "+12% vs mois dernier" },
    { id: 'clients', icon: <UsersIcon className="text-indigo-500"/>, title: "Nouveaux Clients (30j)", value: "4", change: "+1 vs mois dernier" },
    { id: 'services', icon: <BriefcaseIcon className="text-indigo-500"/>, title: "Services Rendus (30j)", value: "4", change: "+25% vs mois dernier" },
    { id: 'revenue', icon: <DollarSignIcon className="text-indigo-500"/>, title: "Bénéfices (30j)", value: "620,000", change: "+30% vs mois dernier" },
];

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            {icon}
        </div>
        <div className="mt-4">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-green-500 mt-1">{change}</p>
        </div>
    </div>
);

const recentClients = [
    { name: 'Sira Couture', service: 'Site Web Vitrine', amount: '90,000 FCFA' },
    { name: 'Dakar Deals', service: 'Site E-commerce', amount: '200,000 FCFA' },
    { name: 'Fondation Espoir', service: 'Site ONG', amount: '180,000 FCFA' },
    { name: 'Innovatech', service: 'Site Entreprise', amount: '150,000 FCFA' },
];

const Dashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [stats, setStats] = useState<StatCardData[]>(initialStats);
    const [visibleStats, setVisibleStats] = useState<Record<string, boolean>>({
        visitors: true,
        clients: true,
        services: true,
        revenue: true,
    });
    const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
    const [tempVisibleStats, setTempVisibleStats] = useState(visibleStats);
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        e.currentTarget.classList.add('dragging');
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        e.currentTarget.classList.add('drag-over');
        dragOverItem.current = position;
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = () => {
        if (dragItem.current !== null && dragOverItem.current !== null) {
            const newStats = [...stats];
            const dragItemContent = newStats[dragItem.current];
            newStats.splice(dragItem.current, 1);
            newStats.splice(dragOverItem.current, 0, dragItemContent);
            dragItem.current = null;
            dragOverItem.current = null;
            setStats(newStats);
        }
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('dragging');
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        handleDrop();
    };
    
    const openCustomizeModal = () => {
        setTempVisibleStats(visibleStats);
        setIsCustomizeModalOpen(true);
    };

    const handleVisibilityChange = (id: string) => {
        setTempVisibleStats(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSaveChanges = () => {
        setVisibleStats(tempVisibleStats);
        setIsCustomizeModalOpen(false);
    };

    const handleCancelChanges = () => {
        setIsCustomizeModalOpen(false);
    };

    const displayedStats = stats.filter(stat => visibleStats[stat.id]);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <div className="bg-gray-50 w-full max-w-5xl h-[90vh] rounded-2xl border border-gray-200 shadow-2xl flex flex-col text-gray-900 relative">
                <header className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
                    <h2 className="text-2xl font-bold gradient-text">Tableau de Bord Administrateur</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={openCustomizeModal} className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-semibold py-2 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors">
                            <SettingsIcon className="w-5 h-5" />
                            <span>Personnaliser</span>
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {displayedStats.map((stat) => (
                            <div
                                key={stat.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, stats.findIndex(s => s.id === stat.id))}
                                onDragEnter={(e) => handleDragEnter(e, stats.findIndex(s => s.id === stat.id))}
                                onDragLeave={handleDragLeave}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => e.preventDefault()}
                                className="cursor-grab transition-all duration-300"
                            >
                                <StatCard icon={stat.icon} title={stat.title} value={stat.value} change={stat.change} />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Clients Récents</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-sm text-gray-600">
                                            <th className="py-2 px-2">Client</th>
                                            <th className="py-2 px-2">Service</th>
                                            <th className="py-2 px-2 text-right">Montant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentClients.map((client, i) => (
                                            <tr key={i} className="border-b border-gray-200 last:border-b-0">
                                                <td className="py-3 px-2 font-medium">{client.name}</td>
                                                <td className="py-3 px-2 text-gray-700">{client.service}</td>
                                                <td className="py-3 px-2 text-right text-indigo-600 font-semibold">{client.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold mb-4 text-gray-900">Répartition des Services</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>E-commerce</span>
                                        <span>32%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-indigo-500 h-2.5 rounded-full" style={{width: '32%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>ONG & Fondations</span>
                                        <span>29%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-purple-500 h-2.5 rounded-full" style={{width: '29%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Entreprise</span>
                                        <span>24%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-pink-500 h-2.5 rounded-full" style={{width: '24%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Vitrine</span>
                                        <span>15%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-teal-500 h-2.5 rounded-full" style={{width: '15%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {isCustomizeModalOpen && (
                    <div className="absolute inset-0 bg-black/30 flex justify-center items-center z-10" onClick={handleCancelChanges}>
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">Personnaliser les statistiques</h3>
                            <p className="text-gray-600 mb-6">Sélectionnez les statistiques à afficher et glissez-déposez pour réorganiser.</p>
                            <div className="space-y-3">
                                {initialStats.map(stat => (
                                    <label key={stat.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md cursor-pointer">
                                        <span className="font-medium text-gray-800">{stat.title}</span>
                                        <input
                                            type="checkbox"
                                            checked={tempVisibleStats[stat.id]}
                                            onChange={() => handleVisibilityChange(stat.id)}
                                            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        />
                                    </label>
                                ))}
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={handleCancelChanges}
                                    className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;