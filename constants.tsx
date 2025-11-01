import { Service, Testimonial, Project } from './types';

export const SERVICES: Service[] = [
  { id: 'vitrine', title: 'Site Web Vitrine', description: 'Une présence en ligne élégante pour présenter votre activité.', basePrice: 120000, discountedPrice: 90000 },
  { id: 'entreprise', title: 'Site Professionnel Entreprise', description: 'Une solution complète pour les entreprises établies.', basePrice: 200000, discountedPrice: 150000 },
  { id: 'ong', title: 'Site ONG et Fondations', description: 'Amplifiez votre impact avec un site web dédié à votre cause.', basePrice: 250000, discountedPrice: 180000 },
  { id: 'ecommerce', title: 'Site E-commerce', description: 'Vendez vos produits en ligne avec une boutique performante.', basePrice: 300000, discountedPrice: 200000 },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: 'Aïssatou Diallo', role: 'Entrepreneur', company: 'Sira Couture', quote: "Univers Web a transformé ma vision en une réalité numérique. Mon site vitrine est magnifique et attire de nouveaux clients chaque jour.", image: 'https://picsum.photos/id/237/100/100' },
  { name: 'Moussa Diop', role: 'E-commerçant', company: 'Dakar Deals', quote: "Leur équipe a développé une boutique e-commerce robuste qui a doublé nos ventes en 6 mois. Un service impeccable.", image: 'https://picsum.photos/id/238/100/100' },
  { name: 'Fatima Gueye', role: 'Directrice', company: 'Fondation Espoir', quote: "Le site créé pour notre ONG nous a permis de toucher plus de donateurs. Leur professionnalisme est remarquable.", image: 'https://picsum.photos/id/239/100/100' },
  { name: 'Jean-Pierre Dubois', role: 'PDG', company: 'Innovatech Solutions', quote: "Un site d'entreprise qui reflète parfaitement notre image de marque. Rapide, sécurisé et très bien conçu.", image: 'https://picsum.photos/id/240/100/100' },
];

export const PROJECTS: Project[] = [
    { id: 1, category: 'Site Web Vitrine', title: 'Cabinet d\'Avocats Alliance', imageUrl: 'https://source.unsplash.com/random/600x400?website,law,office' },
    { id: 2, category: 'Site Entreprise', title: 'Sénégal Logistique Express', imageUrl: 'https://source.unsplash.com/random/600x400?website,logistics,corporate' },
    { id: 3, category: 'Site E-commerce', title: 'AfroChic Marketplace', imageUrl: 'https://source.unsplash.com/random/600x400?website,ecommerce,fashion' },
    { id: 4, category: 'Site ONG et Fondation', title: 'Fondation Soleil d\'Enfance', imageUrl: 'https://source.unsplash.com/random/600x400?website,charity,children' },
    { id: 5, category: 'Site Web Vitrine', title: 'Studio Kélina Photographie', imageUrl: 'https://source.unsplash.com/random/600x400?website,photography,portfolio' },
    { id: 6, category: 'Site E-commerce', title: 'Teranga Bio & Local', imageUrl: 'https://source.unsplash.com/random/600x400?website,food,market' },
    { id: 7, category: 'Site Entreprise', title: 'Bati-Concept SA', imageUrl: 'https://source.unsplash.com/random/600x400?website,construction,architecture' },
    { id: 8, category: 'Site ONG et Fondation', title: 'Action Verte Sahel', imageUrl: 'https://source.unsplash.com/random/600x400?website,environment,nonprofit' },
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/profile.php?id=61579392244563',
  tiktok: 'https://www.tiktok.com/@univers.web.sa.consulting',
  instagram: 'https://www.instagram.com/univers_web_sa_consulting',
  twitter: 'https://x.com/web22858',
  linkedin: 'http://www.linkedin.com/in/univers-web-sa-consulting-235063397',
  whatsapp: 'https://wa.me/221775936938',
};

export const PROMO_CODE = 'UniversWeb025';

export const PAYMENT_METHODS = [
    { name: 'Wave', icon: '🌊' },
    { name: 'Orange Money', icon: '🟠' },
    { name: 'Wizall', icon: '💸' },
    { name: 'Visa', icon: '💳' },
    { name: 'PayPal', icon: '🅿️' },
];

export const CONTACT_INFO = {
    phone: '+221 77 593 69 38',
    whatsapp: '+221775936938',
    email: 'universwebsaconsulting090@gmail.com',
    address: 'Dakar, Sénégal'
};

export const Founder = {
    name: 'Omar Ndiaye',
    title: 'Fondateur d\'Univers Web SA Consulting, Développeur et Entrepreneur'
}