import React, { useState, useMemo } from 'react';
import { SERVICES, PROMO_CODE, PAYMENT_METHODS, CONTACT_INFO } from '../constants';
import { InvoiceData } from '../types';
import Invoice from './Invoice';

interface ContactProps {
    selectedServices: string[];
    setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
}

const Contact: React.FC<ContactProps> = ({ selectedServices, setSelectedServices }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [project, setProject] = useState('');
  const [promo, setPromo] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId) 
        : [...prev, serviceId]
    );
  };

  const totalPrice = useMemo(() => {
    const total = selectedServices.reduce((sum, serviceId) => {
      const service = SERVICES.find(s => s.id === serviceId);
      return sum + (service ? service.discountedPrice : 0);
    }, 0);
    return total;
  }, [selectedServices]);

  const finalPrice = useMemo(() => {
    return isPromoValid ? totalPrice * 0.5 : totalPrice;
  }, [totalPrice, isPromoValid]);

  const checkPromo = () => {
    if (promo === PROMO_CODE) {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
      alert("Code promo invalide.");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoiceServices = selectedServices.map(id => {
        const service = SERVICES.find(s => s.id === id);
        return { title: service?.title || '', price: service?.discountedPrice || 0 };
    });

    const data: InvoiceData = {
        clientName: name,
        clientEmail: email,
        invoiceNumber: `UWSC-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString('fr-FR'),
        services: invoiceServices,
        subtotal: totalPrice,
        discount: isPromoValid ? totalPrice - finalPrice : 0,
        total: finalPrice,
    };
    setInvoiceData(data);
  };

  const handleNewRequest = () => {
    setInvoiceData(null);
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setProject('');
    setSelectedServices([]);
    setPromo('');
    setIsPromoValid(false);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4">{invoiceData ? 'Votre Facture Électronique' : 'Demandez votre Devis Gratuit'}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {invoiceData ? 'Merci pour votre confiance. Vous pouvez imprimer votre facture et procéder au paiement.' : 'Remplissez ce formulaire et nous vous contacterons dans les plus brefs délais.'}
          </p>
        </div>
        {invoiceData ? (
            <Invoice data={invoiceData} onNewRequest={handleNewRequest} />
        ) : (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Votre Nom Complet" required className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Votre Email" required className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Votre Téléphone" className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <input value={company} onChange={e => setCompany(e.target.value)} type="text" placeholder="Nom de l'entreprise (optionnel)" className="bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div className="mb-6">
                        <textarea value={project} onChange={e => setProject(e.target.value)} placeholder="Décrivez votre projet..." rows={4} required className="w-full bg-gray-100 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-semibold mb-3">Sélectionnez les services :</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {SERVICES.map(service => (
                            <label key={service.id} className={`p-4 rounded-md border text-center cursor-pointer transition-all ${selectedServices.includes(service.id) ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-100 border-gray-300 hover:border-indigo-500'}`}>
                            <input type="checkbox" className="hidden" checked={selectedServices.includes(service.id)} onChange={() => handleServiceChange(service.id)} />
                            <span className="font-medium">{service.title}</span>
                            </label>
                        ))}
                        </div>
                    </div>
                    
                    {totalPrice >= 500000 && (
                        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-6 transition-all duration-300">
                            <h4 className="font-bold text-indigo-800">🎉 Félicitations pour votre projet d'envergure !</h4>
                            <p className="text-indigo-700 mt-1">
                                Pour les projets de plus de 500 000 FCFA, utilisez le code <code className="bg-indigo-200 text-indigo-900 font-mono py-0.5 px-1 rounded">{PROMO_CODE}</code> pour obtenir une réduction exceptionnelle de 50%.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 mt-4 items-center">
                                <input type="text" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Entrez le code promo" className="bg-white p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow w-full" />
                                <button type="button" onClick={checkPromo} className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors">Appliquer</button>
                            </div>
                        </div>
                    )}

                    {isPromoValid && <p className="text-green-500 mb-4 text-center">🎉 Code promo de 50% appliqué avec succès !</p>}
                    
                    <div className="text-center mb-6">
                        <p className="text-xl">Total estimé: <span className="font-bold text-2xl text-indigo-600">{finalPrice.toLocaleString('fr-FR')} FCFA</span></p>
                        {isPromoValid && totalPrice > 0 && <p className="text-gray-500 line-through">{totalPrice.toLocaleString('fr-FR')} FCFA</p>}
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-4 rounded-md transition-colors text-lg">Envoyer la demande et générer la facture</button>
                </form>

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-center mb-6">Options de Paiement</h3>
                    <div className="text-center mb-6">
                    <p className="text-gray-600">Paiement mobile sur le numéro commercial :</p>
                    <p className="text-xl font-semibold text-gray-800">{CONTACT_INFO.phone}</p>
                    </div>
                    <div className="flex justify-center items-center flex-wrap gap-6 mb-6">
                    {PAYMENT_METHODS.map(method => (
                        <div key={method.name} className="flex flex-col items-center gap-2 bg-gray-100 p-4 rounded-lg">
                        <span className="text-2xl">{method.icon}</span>
                        <span className="font-medium">{method.name}</span>
                        </div>
                    ))}
                    </div>
                    <p className="text-center text-gray-500">Les paiements internationaux par carte (Visa, UBA, PayPal) sont également acceptés. Contactez-nous pour les détails.</p>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default Contact;