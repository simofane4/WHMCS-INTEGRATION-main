import { Metadata } from 'next';
import DomainSearchResults from '@/components/domain-search/DomainSearchResults';

export const metadata: Metadata = {
  title: 'Résultats de recherche de nom de domaine | WGET',
  description: 'Vérifiez la disponibilité de votre nom de domaine et découvrez les extensions disponibles.',
};

export default function DomainSearchPage() {
  return <DomainSearchResults />;
}