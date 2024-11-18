"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroHebergement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Hébergement Web Professionnel au Maroc",
      subtitle: "Performance et Fiabilité Garanties",
      features: [
        "Serveurs haute performance",
        "Support technique 24/7",
        "99.9% de disponibilité"
      ],
      bgClass: "bg-gradient-to-br from-gray-50 to-gray-100",
      textColorClass: "text-[#003B73]",
      accentColorClass: "text-[#F26522]"
    },
    {
      title: "Solutions Cloud Évolutives",
      subtitle: "Infrastructure Moderne et Sécurisée",
      features: [
        "Protection DDoS avancée",
        "Backup automatique quotidien",
        "Certificat SSL gratuit"
      ],
      bgClass: "bg-gradient-to-br from-[#003B73] to-[#002347]",
      textColorClass: "text-white",
      accentColorClass: "text-[#F26522]"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`relative ${currentSlideData.bgClass} w-full overflow-hidden transition-colors duration-500`}>
      {/* Futuristic SVG Background */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid Pattern */}
          <pattern
            id="grid"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
            className={`${currentSlide === 0 ? 'text-[#003B73]' : 'text-white'}`}
          >
            <path
              d="M 4 0 L 0 0 0 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Animated Lines */}
          <g className={`${currentSlide === 0 ? 'text-[#003B73]' : 'text-white'}`}>
            <line
              x1="0"
              y1="20"
              x2="100"
              y2="20"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="100"
                dur="20s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="0"
              y1="40"
              x2="100"
              y2="40"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-100"
                dur="15s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="0"
              y1="60"
              x2="100"
              y2="60"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="100"
                dur="25s"
                repeatCount="indefinite"
              />
            </line>
            <line
              x1="0"
              y1="80"
              x2="100"
              y2="80"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="1,5"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-100"
                dur="18s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* Hexagon Pattern */}
          <pattern
            id="hexagons"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            className={`${currentSlide === 0 ? 'text-[#003B73]' : 'text-white'}`}
          >
            <path
              d="M5 0 L10 2.5 L10 7.5 L5 10 L0 7.5 L0 2.5 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.6;0.3"
                dur="4s"
                repeatCount="indefinite"
              />
            </path>
          </pattern>
          <rect width="100" height="100" fill="url(#hexagons)" opacity="0.5" />

          {/* Glowing Dots */}
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={20 + i * 15}
              cy={50}
              r="0.5"
              fill={currentSlide === 0 ? '#003B73' : 'white'}
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={`${3 + i}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className={`${currentSlideData.textColorClass} hover:bg-current/10 backdrop-blur-sm`}
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className={`${currentSlideData.textColorClass} hover:bg-current/10 backdrop-blur-sm`}
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl md:text-5xl font-bold ${currentSlideData.textColorClass} leading-tight animate-fade-in mb-6 drop-shadow-sm`}>
            {currentSlideData.title}
          </h1>
          <h2 className={`text-xl md:text-2xl font-extrabold ${currentSlideData.accentColorClass} animate-slide-up mb-8 drop-shadow-sm`}>
            {currentSlideData.subtitle}
          </h2>

          <div className={`space-y-4 text-lg ${currentSlideData.textColorClass} animate-fade-in-up mb-10`}>
            {currentSlideData.features.map((feature, index) => (
              <p key={index} className="flex items-center justify-center backdrop-blur-sm">
                <span className={`w-2 h-2 ${currentSlideData.textColorClass} rounded-full mr-3`}></span>
                {feature}
              </p>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg"
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Commander Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className={`border-current ${currentSlideData.textColorClass} hover:bg-current hover:text-white backdrop-blur-sm`}
            >
              Voir les Plans
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? `w-4 ${currentSlideData.accentColorClass} bg-current`
                : `${currentSlideData.textColorClass} bg-current/50`
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroHebergement;