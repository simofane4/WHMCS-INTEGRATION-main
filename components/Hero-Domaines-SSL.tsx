"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroDomainesSSL = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [domain, setDomain] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const slides = [
    {
      title: "Votre Nom de Domaine .ma",
      subtitle: "Renforcez votre présence en ligne au Maroc",
      features: [
        "Protection Whois gratuite",
        "Support technique 24/7",
        "Gestion DNS simplifiée"
      ],
      bgClass: "bg-[#070B14]",
      textColorClass: "text-white",
      accentColorClass: "text-[#F26522]"
    },
    {
      title: "Certificats SSL Premium",
      subtitle: "Sécurisez votre site web",
      features: [
        "Chiffrement 256-bit",
        "Installation gratuite",
        "Compatibilité maximale"
      ],
      bgClass: "bg-[#070B14]",
      textColorClass: "text-white",
      accentColorClass: "text-[#F26522]"
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Node class
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.5})`;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create nodes
    const nodes: Node[] = Array.from({ length: 100 }, () => new Node(canvas.width, canvas.height));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient for background
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        300
      );
      gradient.addColorStop(0, 'rgba(30, 64, 175, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height);
        node.draw(ctx);

        // Draw connections
        nodes.forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(100, 150, 255, ${(150 - distance) / 150 * 0.2})`;
            ctx.stroke();
          }
        });

        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(242, 101, 34, ${(200 - distance) / 200 * 0.3})`;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle domain search
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`relative ${currentSlideData.bgClass} w-full overflow-hidden transition-colors duration-500`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className={`${currentSlideData.textColorClass} hover:bg-white/10 backdrop-blur-sm`}
          aria-label="Diapositive précédente"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className={`${currentSlideData.textColorClass} hover:bg-white/10 backdrop-blur-sm`}
          aria-label="Diapositive suivante"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl md:text-5xl font-bold ${currentSlideData.textColorClass} leading-tight animate-fade-in mb-6`}>
              {currentSlideData.title}
            </h1>
            <h2 className={`text-xl md:text-2xl font-extrabold ${currentSlideData.accentColorClass} animate-slide-up mb-8`}>
              {currentSlideData.subtitle}
            </h2>
            <div className={`space-y-4 text-lg ${currentSlideData.textColorClass} animate-fade-in-up mb-10`}>
              {currentSlideData.features.map((feature, index) => (
                <p key={index} className="flex items-center">
                  <span className={`w-2 h-2 ${currentSlideData.textColorClass} rounded-full mr-3`}></span>
                  {feature}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Domain Search */}
          <div className="w-full space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Rechercher votre nom de domaine..."
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-[#F26522] focus:ring-[#F26522]"
                  />
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto bg-[#F26522] hover:bg-[#d54d0d] text-white font-semibold sm:min-w-[200px] h-12"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Vérifier
                </Button>
              </div>
              <p className="text-sm text-gray-300">
                Exemple: monentreprise.ma, monsite.ma
              </p>
            </form>
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

export default HeroDomainesSSL;