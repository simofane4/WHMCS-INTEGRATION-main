"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const plans = [
  {
    name: "Starter",
    description: "Idéal pour les sites personnels",
    price: "29",
    period: "mois",
    features: [
      "5 Go d'espace SSD NVMe",
      "Bande passante illimitée",
      "5 bases de données",
      "10 adresses email",
      "SSL gratuit",
      "Support par email"
    ],
    color: "border-blue-500/20",
    recommended: false
  },
  {
    name: "Business",
    description: "Pour les entreprises en croissance",
    price: "49",
    period: "mois",
    features: [
      "20 Go d'espace SSD NVMe",
      "Bande passante illimitée",
      "Bases de données illimitées",
      "Email illimité",
      "SSL Wildcard gratuit",
      "Support prioritaire 24/7"
    ],
    color: "border-purple-500/20",
    recommended: true
  },
  {
    name: "Premium",
    description: "Pour les sites à fort trafic",
    price: "99",
    period: "mois",
    features: [
      "50 Go d'espace SSD NVMe",
      "Bande passante illimitée",
      "Bases de données illimitées",
      "Email illimité",
      "SSL Wildcard + CDN",
      "Support VIP 24/7"
    ],
    color: "border-amber-500/20",
    recommended: false
  }
];

const PricingPlans = () => {
  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#003B73] mb-6"
          >
            Nos Plans d&apos;Hébergement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Des solutions adaptées à tous vos besoins
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className={`relative h-full bg-white rounded-2xl p-6 border ${plan.color} ${
                  plan.recommended ? 'shadow-2xl scale-105 z-10' : 'shadow-lg hover:shadow-xl'
                } transition-all duration-300 flex flex-col`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-[#F26522] text-white shadow-lg">
                      Recommandé
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline">
                    <span className="text-4xl font-bold text-[#003B73]">{plan.price}</span>
                    <span className="text-xl text-gray-600 ml-2">DH/{plan.period}</span>
                  </div>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="lg"
                  className={`w-full mt-auto ${
                    plan.recommended
                      ? 'bg-[#F26522] hover:bg-[#d54d0d] text-white'
                      : 'bg-white text-[#003B73] border-2 border-[#003B73] hover:bg-[#003B73] hover:text-white'
                  }`}
                >
                  Commander
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            Tous les prix sont hors taxes. Engagement minimum d&apos;un mois.
          </p>
          <p className="mt-2">
            Besoin d&apos;une solution personnalisée ?{" "}
            <a href="#contact" className="text-[#F26522] hover:underline">
              Contactez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;