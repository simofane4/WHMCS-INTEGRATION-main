import { Metadata } from 'next';
import BackupFeatures from '@/components/hebergement/BackupFeatures';
import WhyChooseUs from '@/components/hebergement/WhyChooseUs';
import HeroHebergement from '@/components/hebergement/HeroHebergement';
import PricingPlans from '@/components/hebergement/PricingPlans';
import ServerFeatures from '@/components/hebergement/ServerFeatures';

export const metadata: Metadata = {
  title: 'Hébergement Web Professionnel au Maroc | WGET',
  description: 'Solutions d\'hébergement web haute performance pour votre site. Sauvegardes automatiques, support 24/7 et infrastructure cloud sécurisée au Maroc.',
  keywords: ['hébergement web Maroc', 'hébergement sites web', 'serveurs cloud Maroc', 'hébergement professionnel'],
};

export default function Hebergement() {
  return (
    <>
      <HeroHebergement />
      <WhyChooseUs />
      <ServerFeatures />
      <BackupFeatures />
      <PricingPlans />
    </>
  );
}