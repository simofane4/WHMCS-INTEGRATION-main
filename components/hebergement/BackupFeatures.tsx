"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Sauvegardes Automatiques Gratuites",
    description: "Vos comptes sont automatiquement sauvegardés quotidiennement pour une récupération optimale en cas de sinistre. Restaurez l'intégralité de votre site ou choisissez de restaurer sélectivement les fichiers, les enregistrements DNS, les comptes de messagerie et plus encore en un seul clic.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <path d="M32 8C19.85 8 10 17.85 10 30c0 9.15 5.65 17.05 13.65 20.35V56h16.7v-5.65C48.35 47.05 54 39.15 54 30c0-12.15-9.85-22-22-22z" fill="#E3F2FD"/>
        <path d="M32 44c-7.732 0-14-6.268-14-14s6.268-14 14-14 14 6.268 14 14-6.268 14-14 14z" fill="#90CAF9"/>
        <path d="M32 20v10l7 7" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 4v4M56 30h4M32 52v4M8 30h4" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Stockage Hors Site Sécurisé",
    description: "Les sauvegardes sont stockées sur des serveurs distants pour garantir leur disponibilité en cas de sinistre, assurant une protection maximale de vos données.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <path d="M12 20h40v24H12z" fill="#E3F2FD"/>
        <path d="M16 28h32v8H16z" fill="#90CAF9"/>
        <path d="M32 12v8M22 12v8M42 12v8" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
        <rect x="12" y="20" width="40" height="24" stroke="#1976D2" strokeWidth="2" rx="2"/>
        <path d="M24 32h16M24 36h8" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    title: "Restauration Ultra Rapide",
    description: "Une erreur ? Remettez votre site en ligne en quelques minutes seulement grâce à notre système de restauration instantanée.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <path d="M32 8C19.85 8 10 17.85 10 30s9.85 22 22 22 22-9.85 22-22S44.15 8 32 8z" fill="#E3F2FD"/>
        <path d="M32 16c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14z" fill="#90CAF9"/>
        <path d="M32 22v8l6 6" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 16c7.732 0 14 6.268 14 14" stroke="#1976D2" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    )
  },
  {
    title: "Solution Professionnelle JetBackup",
    description: "Propulsé par JetBackup, notre solution de récupération est leader sur le marché et garantit une fiabilité maximale.",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <path d="M16 12h32v40H16z" fill="#E3F2FD"/>
        <path d="M22 20h20v4H22zM22 28h20v4H22zM22 36h20v4H22z" fill="#90CAF9"/>
        <rect x="16" y="12" width="32" height="40" stroke="#1976D2" strokeWidth="2" rx="2"/>
        <path d="M28 44l4 4 4-4" stroke="#1976D2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const BackupFeatures = () => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#003B73] mb-6">
            Sauvegardes Automatiques Incluses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une protection complète de vos données avec notre système de sauvegarde avancé
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
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
              <div className="bg-white rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#003B73] mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BackupFeatures;