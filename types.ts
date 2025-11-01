export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  discountedPrice: number;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface Project {
  id: number;
  category: 'Site Web Vitrine' | 'Site Entreprise' | 'Site E-commerce' | 'Site ONG et Fondation';
  title: string;
  imageUrl: string;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface InvoiceData {
    clientName: string;
    clientEmail: string;
    invoiceNumber: string;
    date: string;
    services: { title: string; price: number }[];
    subtotal: number;
    discount: number;
    total: number;
}