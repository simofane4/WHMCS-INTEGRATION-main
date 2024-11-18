"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';

export const CartButton = () => {
  const router = useRouter();
  const { items } = useCart();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push('/cart')}
      className="relative"
      aria-label="Voir le panier"
    >
      <ShoppingCart className="h-5 w-5" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#F26522] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {items.length}
        </span>
      )}
    </Button>
  );
};