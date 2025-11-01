import React from 'react';
import { InvoiceData } from '../types';
import { CONTACT_INFO } from '../constants';

interface InvoiceProps {
  data: InvoiceData;
  onNewRequest: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ data, onNewRequest }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-lg border border-gray-200 shadow-lg print:shadow-none print:border-none">
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Univers Web SA Consulting</h1>
          <p>{CONTACT_INFO.address}</p>
          <p>{CONTACT_INFO.email}</p>
          <p>{CONTACT_INFO.phone}</p>
        </div>
        <div className="text-left sm:text-right mt-4 sm:mt-0">
          <h2 className="text-2xl font-bold text-gray-800">FACTURE</h2>
          <p className="text-gray-600">N°: {data.invoiceNumber}</p>
          <p className="text-gray-600">Date: {data.date}</p>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-500 mb-1">Facturé à:</h3>
        <p className="font-bold text-gray-900">{data.clientName}</p>
        <p className="text-gray-700">{data.clientEmail}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold text-right">Montant</th>
            </tr>
          </thead>
          <tbody>
            {data.services.map((service, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-4">{service.title}</td>
                <td className="py-4 px-4 text-right">{service.price.toLocaleString('fr-FR')} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-8">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="flex justify-between py-2 border-b">
            <span className="font-medium text-gray-600">Sous-total</span>
            <span className="font-medium text-gray-800">{data.subtotal.toLocaleString('fr-FR')} FCFA</span>
          </div>
          {data.discount > 0 && (
            <div className="flex justify-between py-2 border-b text-green-600">
              <span className="font-medium">Réduction (PROMO)</span>
              <span className="font-medium">- {data.discount.toLocaleString('fr-FR')} FCFA</span>
            </div>
          )}
          <div className="flex justify-between py-3 bg-indigo-50 px-2 rounded-md mt-2">
            <span className="font-bold text-lg text-indigo-800">Total à payer</span>
            <span className="font-bold text-lg text-indigo-800">{data.total.toLocaleString('fr-FR')} FCFA</span>
          </div>
        </div>
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm print:hidden">
        <p>Merci pour votre confiance ! Le paiement peut être effectué via les options de paiement mobile ou par carte.</p>
        <p>Notre numéro commercial pour les transferts : <strong>{CONTACT_INFO.phone}</strong></p>
      </div>

      <div className="mt-8 flex justify-end gap-4 print:hidden">
        <button
          onClick={onNewRequest}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Nouvelle Demande
        </button>
        <button
          onClick={handlePrint}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
        >
          Imprimer la Facture
        </button>
      </div>
    </div>
  );
};

export default Invoice;
