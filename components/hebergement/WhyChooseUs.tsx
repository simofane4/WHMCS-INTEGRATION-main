"use client";

import { motion } from "framer-motion";
import { Server, Shield, Gauge, Headphones } from "lucide-react";

const features = [
  {
    icon: Server,
    title: "Infrastructure Cloud",
    description: "Serveurs haute performance avec stockage SSD NVMe",
    color: "#003B73"
  },
  {
    icon: Shield,
    title: "Protection DDoS",
    description: "Protection avancée contre les attaques DDoS",
    color: "#22c55e"
  },
  {
    icon: Gauge,
    title: "Performance",
    description: "Uptime garanti de 99.9% avec monitoring 24/7",
    color: "#0ea5e9"
  },
  {
    icon: Headphones,
    title: "Support Expert",
    description: "Support technique disponible 24/7",
    color: "#F26522"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-[#003B73] mb-16"
        >
          Pourquoi choisir notre hébergement web ?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-6 relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative"
                  >
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${feature.color}10`,
                        color: feature.color
                      }}
                    >
                      <Icon className="w-12 h-12" />
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-[#003B73] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;