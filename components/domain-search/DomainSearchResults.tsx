"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CheckCircle2, XCircle, Loader2, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/cart';
import axios from 'axios';

interface SearchResult {
  result: string;
  status: 'available' | 'unavailable';
  whois?: string;
}

interface TLDPricing {
  result: string;
  currency: {
    prefix: string;
    suffix: string;
  };
  pricing: {
    [key: string]: {
      register: {
        [key: string]: string;
      };
    };
  };
}

const popularTLDs = ['com', 'ma', 'net', 'org', 'info'];

const DomainSearchResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('domain');
  const { addItem } = useCart();

  const [domain, setDomain] = useState(searchQuery || '');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pricingData, setPricingData] = useState<TLDPricing | null>(null);
  const [isLoadingPricing, setIsLoadingPricing] = useState(false);
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});

  const ensureDomainHasTLD = (domainName: string) => {
    return domainName.includes('.') ? domainName : `${domainName}.com`;
  };

  const getDomainWithoutTLD = (domainName: string) => {
    return domainName.split('.')[0];
  };

  const getTLD = (domainName: string) => {
    return domainName.split('.').pop() || 'com';
  };

  const handleAddToCart = (domainName: string, tld: string, price: number) => {
    addItem({
      domain: domainName,
      tld,
      price: parseFloat(price.toString()),
      period: 1
    });
    setAddedToCart({ ...addedToCart, [domainName]: true });
  };

  const fetchTLDPricing = async () => {
    setIsLoadingPricing(true);
    const params = new URLSearchParams({
      action: 'GetTLDPricing',
      username: 'PLAfTuv5XfgMDdsy0a6ETC3sjs9qFwLU',
      password: 'pw08vf3Il8lHsm2P7Hyx0kyTFdtXwo9X',
      accesskey: 'CE39E3CFFC98BE973FDDD165C9AC9',
      currencyid: '1',
      responsetype: 'json'
    });

    try {
      const response = await axios.post<TLDPricing>(
        'https://login.wget.ma/includes/api.php',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.result === 'success') {
        setPricingData(response.data);
      }
    } catch (error) {
      console.error('Error fetching TLD pricing:', error);
    } finally {
      setIsLoadingPricing(false);
    }
  };

  const handleSearch = async (searchDomain: string) => {
    if (!searchDomain) return;
    
    const formattedDomain = ensureDomainHasTLD(searchDomain.toLowerCase().trim());
    
    setError(null);
    setSearchResult(null);
    setPricingData(null);
    setAddedToCart({});
    setIsSearching(true);

    const params = new URLSearchParams({
      action: 'DomainWhois',
      username: 'PLAfTuv5XfgMDdsy0a6ETC3sjs9qFwLU',
      password: 'pw08vf3Il8lHsm2P7Hyx0kyTFdtXwo9X',
      accesskey: 'CE39E3CFFC98BE973FDDD165C9AC9',
      domain: formattedDomain,
      responsetype: 'json'
    });

    try {
      const response = await axios.post<SearchResult>(
        'https://login.wget.ma/includes/api.php',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data.result === 'success') {
        setSearchResult(response.data);
        if (response.data.status === 'available') {
          await fetchTLDPricing();
        }
      } else {
        throw new Error(response.data.result);
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || err.message
        : 'Une erreur est survenue lors de la vérification du domaine';
      setError(errorMessage);
      console.error('Domain search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    
    router.push(`/domain-search?domain=${encodeURIComponent(domain)}`);
    await handleSearch(domain);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  const renderDomainSuggestions = () => {
    if (!searchResult || searchResult.status !== 'available' || !pricingData || !domain) return null;

    const domainName = getDomainWithoutTLD(domain.toLowerCase().trim());
    
    return popularTLDs.map(tld => {
      const pricing = pricingData.pricing[tld]?.register['1'];
      if (!pricing) return null;

      const fullDomain = `${domainName}.${tld}`;
      
      return (
        <motion.div
          key={tld}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center justify-between bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div>
            <span className="text-xl font-bold text-gray-900">{fullDomain}</span>
            <p className="text-sm text-gray-500 mt-1">Extension .{tld}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-2xl font-bold text-[#003B73]">{pricing}</span>
              <span className="text-gray-600 ml-1">DH/an</span>
            </div>
            <Button 
              size="lg"
              onClick={() => handleAddToCart(fullDomain, tld, parseFloat(pricing))}
              disabled={addedToCart[fullDomain]}
              className={
                addedToCart[fullDomain]
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#22c55e] hover:bg-[#16a34a] text-white"
              }
            >
              {addedToCart[fullDomain] ? (
                <>
                  Ajouté au panier
                  <CheckCircle2 className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Ajouter au panier
                  <ShoppingCart className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Rechercher votre nom de domaine..."
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="h-12"
                aria-label="Nom de domaine"
              />
            </div>
            <Button 
              type="submit"
              size="lg"
              disabled={isSearching}
              className="bg-[#003B73] hover:bg-[#002347] text-white font-semibold h-12"
            >
              {isSearching ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Vérifier
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Search Results */}
        <AnimatePresence mode="wait">
          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className={`p-6 rounded-xl shadow-md ${
                searchResult.status === 'available' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-3">
                  {searchResult.status === 'available' ? (
                    <>
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Domaine disponible !</h2>
                        <p className="text-gray-600">Réservez votre nom de domaine dès maintenant.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-red-500" />
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Domaine déjà pris</h2>
                        <p className="text-gray-600">Essayez une autre extension ou un nom différent.</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {searchResult.status === 'available' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">Extensions disponibles :</h3>
                  {isLoadingPricing ? (
                    <div className="flex items-center justify-center p-8">
                      <Loader2 className="w-8 h-8 animate-spin text-[#003B73]" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {renderDomainSuggestions()}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 shadow-md"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <div className="mt-8">
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DomainSearchResults;