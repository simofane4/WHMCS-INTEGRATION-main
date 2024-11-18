import { Metadata } from 'next';
import CartPage from '@/components/cart/CartPage';

export const metadata: Metadata = {
  title: 'Panier | WGET',
  description: 'Votre panier de noms de domaine',
};

export default function Cart() {
  return <CartPage />;
}