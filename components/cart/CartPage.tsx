"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { Trash2, ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface ProductFeature {
  feature: string;
  value: string;
}

interface SuggestedProduct {
  pid: string;
  name: string;
  description: string;
  pricing: {
    monthly: string;
    quarterly: string;
    semiannually: string;
    annually: string;
  };
  features: {
    feature: ProductFeature[];
  };
  configoptions?: any;
}

const CartPage = () => {
  const router = useRouter();
  const { items, removeItem, getTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<SuggestedProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const fetchSuggestedProducts = async () => {
    setIsLoadingProducts(true);
    try {
      const params = new URLSearchParams({
        action: 'GetProducts',
        username: 'PLAfTuv5XfgMDdsy0a6ETC3sjs9qFwLU',
        password: 'pw08vf3Il8lHsm2P7Hyx0kyTFdtXwo9X',
        accesskey: 'CE39E3CFFC98BE973FDDD165C9AC9',
        responsetype: 'json',
        pid: '1,2,3'
      });

      const response = await axios.post(
        'https://login.wget.ma/includes/api.php',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.result === 'success' && Array.isArray(response.data.products?.product)) {
        setSuggestedProducts(response.data.products.product);
      } else {
        console.log('No products found or invalid response format:', response.data);
      }
    } catch (error: any) {
      console.error('Error fetching products:', error.response?.data || error.message);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchSuggestedProducts();
  }, []);

  const handleNext = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      router.push('/checkout');
    } catch (error: any) {
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre panier est vide</h1>
            <Button
              onClick={() => router.push('/')}
              className="bg-[#003B73] hover:bg-[#002347] text-white"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Votre panier</h1>
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="text-gray-600"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continuer mes achats
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.domain}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-lg shadow-md p-6 mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.domain}</h3>
                      <p className="text-sm text-gray-500">Extension .{item.tld}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-lg font-bold text-[#003B73]">{item.price} DH</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.domain)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-[#003B73]">{getTotal()} DH</span>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-4">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleNext}
                  disabled={isProcessing}
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white"
                >
                  {isProcessing ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Suivant
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produits suggérés</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {suggestedProducts.map((product) => (
                <div
                  key={product.pid}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  {/* Product Features */}
                  <div className="space-y-3 mb-6">
                    {product.features?.feature?.map((feature: ProductFeature, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Options */}
                  <div className="border-t pt-6">
                    <div className="flex flex-col gap-2 mb-6">
                      {product.pricing?.monthly && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Mensuel</span>
                          <span className="font-bold text-[#003B73]">{product.pricing.monthly} DH</span>
                        </div>
                      )}
                      {product.pricing?.annually && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Annuel</span>
                          <span className="font-bold text-[#003B73]">{product.pricing.annually} DH</span>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-[#003B73] hover:bg-[#002347] text-white"
                      onClick={() => router.push(`/products/${product.pid}`)}
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;