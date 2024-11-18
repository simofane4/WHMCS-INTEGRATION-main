"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSiteInternet = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Particle class
    class Particle {
      x: number;
      y: number;
      baseY: number;
      speed: number;
      size: number;
      color: string;
      amplitude: number;
      frequency: number;
      phase: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        // Spread particles across the entire canvas
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.baseY = this.y;
        this.speed = Math.random() * 0.05 + 0.02; // Further reduced speed
        this.size = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 60 + 200}, 100%, 70%)`;
        this.amplitude = Math.random() * 10 + 5; // Reduced amplitude
        this.frequency = Math.random() * 0.005 + 0.002; // Reduced frequency
        this.phase = Math.random() * Math.PI * 2;
      }

      update(frame: number) {
        this.phase += this.speed;
        this.y = this.baseY + Math.sin(frame * this.frequency + this.phase) * this.amplitude;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 10000); // Adjust density based on canvas area

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation variables
    let frame = 0;
    const mousePosition = { x: 0, y: 0 };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.x = e.clientX - rect.left;
      mousePosition.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'; // Reduced fade speed
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update(frame);
        particle.draw(ctx);

        // Connect particles with lines
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { // Increased connection distance
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${(150 - distance) / 1500})`; // Reduced opacity
            ctx.stroke();
          }
        }

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) { // Increased interaction radius
          const angle = Math.atan2(dy, dx);
          const force = (200 - distance) / 200;
          particle.y += Math.sin(angle) * force * 2; // Reduced force
        }
      });

      frame += 0.01; // Further reduced frame increment
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-[600px] overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Création de Sites Web Professionnels
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-400 mb-8 animate-slide-up">
            Des solutions web sur mesure pour votre entreprise
          </h2>
          <div className="space-y-4 text-lg text-gray-300 mb-10 animate-fade-in-up">
            <p>Design moderne et responsive</p>
            <p>Optimisation SEO incluse</p>
            <p>Support technique dédié</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Button 
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Commencer votre Projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Voir nos Réalisations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSiteInternet;