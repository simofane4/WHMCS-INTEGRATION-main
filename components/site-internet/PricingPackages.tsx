"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const packages = [
  {
    name: "Vitrine",
    description: "Site web professionnel pour présenter votre activité",
    price: "2999",
    features: [
      "Design responsive personnalisé",
      "Jusqu'à 5 pages",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Intégration réseaux sociaux",
      "Certificat SSL gratuit",
      "Hébergement 1 an offert"
    ],
    color: "border-blue-500/20",
    gradient: "from-blue-500/10 via-transparent",
    recommended: false
  },
  {
    name: "Business Pro",
    description: "Solution complète pour les entreprises en croissance",
    price: "4999",
    features: [
      "Design premium sur mesure",
      "Jusqu'à 10 pages",
      "Blog intégré",
      "Optimisation SEO avancée",
      "Système de réservation",
      "Chat en direct",
      "Formation utilisateur incluse"
    ],
    color: "border-purple-500/20",
    gradient: "from-purple-500/10 via-transparent",
    recommended: true
  },
  {
    name: "E-commerce",
    description: "Boutique en ligne complète et performante",
    price: "7999",
    features: [
      "Design e-commerce personnalisé",
      "Produits illimités",
      "Paiement en ligne sécurisé",
      "Gestion des stocks",
      "Tableau de bord analytics",
      "Multi-devises",
      "Support prioritaire 24/7"
    ],
    color: "border-amber-500/20",
    gradient: "from-amber-500/10 via-transparent",
    recommended: false
  }
];

const PricingPackages = () => {
  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#003B73] mb-6"
          >
            Nos Forfaits Sites Web
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Des solutions adaptées à tous vos besoins, avec un excellent rapport qualité-prix
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative h-full bg-white rounded-2xl p-6 border ${pkg.color} ${
                  pkg.recommended ? 'shadow-2xl scale-105 z-10' : 'shadow-lg hover:shadow-xl'
                } transition-all duration-300 flex flex-col`}
              >
                {/* Recommended Badge */}
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-[#F26522] text-white shadow-lg">
                      Recommandé
                    </span>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-gray-600">
                    {pkg.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline">
                    <span className="text-4xl font-bold text-[#003B73]">{pkg.price}</span>
                    <span className="text-xl text-gray-600 ml-2">DH</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full mt-auto ${
                    pkg.recommended
                      ? 'bg-[#F26522] hover:bg-[#d54d0d] text-white'
                      : 'bg-white text-[#003B73] border-2 border-[#003B73] hover:bg-[#003B73] hover:text-white'
                  }`}
                  aria-label={`Commander le forfait ${pkg.name}`}
                >
                  Commander Maintenant
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center bg-gradient-to-r from-[#003B73] to-[#0353a4] rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Besoin d&apos;une Solution Sur Mesure ?
          </h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Nos experts sont là pour créer le site web parfaitement adapté à vos besoins spécifiques.
            Contactez-nous pour une consultation gratuite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#003B73] hover:bg-gray-100"
            >
              Demander un Devis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#003B73]"
            >
              Nous Contacter
            </Button>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 text-gray-600"
        >
          <p>Tous les prix sont hors taxes. Paiement en plusieurs fois possible.</p>
          <p className="mt-2">
            Maintenance et support technique inclus pendant 1 an.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPackages;