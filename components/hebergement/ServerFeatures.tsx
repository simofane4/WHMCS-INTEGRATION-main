"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Shield, Zap, Server, Cloud } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Infrastructure Cloud",
    description: "Plus de 4,5 millions de dirhams investis dans notre nouvelle infrastructure cloud",
    gradient: "from-blue-500 via-blue-400 to-blue-300",
    iconColor: "text-blue-500"
  },
  {
    icon: Database,
    title: "Stockage NVMe Samsung",
    description: "Plus d'1 Po de stockage NVMe pur et non contendu pour des performances optimales",
    gradient: "from-purple-500 via-purple-400 to-purple-300",
    iconColor: "text-purple-500"
  },
  {
    icon: Shield,
    title: "Protection CPGUARD",
    description: "Protection automatique contre les malwares et les attaques par force brute",
    gradient: "from-green-500 via-green-400 to-green-300",
    iconColor: "text-green-500"
  },
  {
    icon: Cpu,
    title: "AMD EPYC™",
    description: "Processeurs AMD EPYC™ de qualité entreprise pour une puissance inégalée",
    gradient: "from-red-500 via-red-400 to-red-300",
    iconColor: "text-red-500"
  },
  {
    icon: Zap,
    title: "Litespeed Enterprise",
    description: "Serveur web ultra-rapide optimisé pour notre infrastructure NVMe",
    gradient: "from-amber-500 via-amber-400 to-amber-300",
    iconColor: "text-amber-500"
  },
  {
    icon: Server,
    title: "Cloudlinux 8",
    description: "Solution éprouvée apportant stabilité et sécurité à notre plateforme",
    gradient: "from-cyan-500 via-cyan-400 to-cyan-300",
    iconColor: "text-cyan-500"
  }
];

const ServerFeatures = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003B73] mb-6">
            Notre Infrastructure Technique
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une infrastructure moderne et performante pour propulser vos projets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                >
                  <motion.div 
                    className="relative mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.iconColor} bg-current/10`}>
                      <Icon className="w-8 h-8 text-current" />
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServerFeatures;