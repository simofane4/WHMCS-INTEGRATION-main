"use client";

import { useEffect, useRef } from 'react';

const DomainSSLAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Animation properties
    let frame = 0;
    const domains: Array<{
      text: string;
      x: number;
      y: number;
      targetY: number;
      speed: number;
      status: 'checking' | 'available' | 'registered';
      opacity: number;
    }> = [];

    const certificates: Array<{
      x: number;
      y: number;
      size: number;
      rotation: number;
      status: 'generating' | 'complete';
      opacity: number;
    }> = [];

    // Domain names to animate
    const domainNames = [
      'example.ma',
      'mysite.ma',
      'business.ma',
      'startup.ma',
      'company.ma'
    ];

    // Create new domain check
    const createDomainCheck = () => {
      const text = domainNames[Math.floor(Math.random() * domainNames.length)];
      domains.push({
        text,
        x: canvas.width * 0.2,
        y: -20,
        targetY: canvas.height * (0.2 + Math.random() * 0.4),
        speed: 2,
        status: 'checking',
        opacity: 1
      });
    };

    // Create new certificate
    const createCertificate = () => {
      certificates.push({
        x: canvas.width * 0.7,
        y: canvas.height * 0.5,
        size: 40,
        rotation: 0,
        status: 'generating',
        opacity: 0
      });
    };

    // Draw domain check
    const drawDomain = (domain: typeof domains[0]) => {
      ctx.save();
      ctx.globalAlpha = domain.opacity;
      
      // Domain text
      ctx.font = '16px monospace';
      ctx.fillStyle = domain.status === 'available' ? '#22c55e' : 
                     domain.status === 'registered' ? '#ef4444' : 
                     '#64748b';
      ctx.fillText(domain.text, domain.x, domain.y);

      // Status indicator
      ctx.beginPath();
      ctx.arc(domain.x - 20, domain.y - 5, 5, 0, Math.PI * 2);
      ctx.fillStyle = domain.status === 'available' ? '#22c55e' : 
                     domain.status === 'registered' ? '#ef4444' : 
                     '#64748b';
      ctx.fill();

      // Loading animation for checking status
      if (domain.status === 'checking') {
        ctx.beginPath();
        ctx.arc(domain.x - 20, domain.y - 5, 8, 0, Math.PI * 2);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        const startAngle = (-Math.PI / 2) + (frame * 0.1);
        ctx.beginPath();
        ctx.arc(domain.x - 20, domain.y - 5, 8, startAngle, startAngle + Math.PI);
        ctx.strokeStyle = '#0ea5e9';
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw SSL certificate
    const drawCertificate = (cert: typeof certificates[0]) => {
      ctx.save();
      ctx.globalAlpha = cert.opacity;
      ctx.translate(cert.x, cert.y);
      ctx.rotate(cert.rotation);

      // Certificate body
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-cert.size/2, -cert.size/2, cert.size, cert.size * 1.4, 5);
      ctx.fill();
      ctx.stroke();

      // Certificate details
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(-cert.size/3, -cert.size/3, cert.size/1.5, 4);
      ctx.fillRect(-cert.size/3, -cert.size/6, cert.size/2, 4);
      ctx.fillRect(-cert.size/3, 0, cert.size/4, 4);

      // SSL lock icon
      if (cert.status === 'complete') {
        ctx.beginPath();
        ctx.arc(0, cert.size/4, 8, Math.PI, 2 * Math.PI);
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(-6, cert.size/4, 12, 10);
        ctx.strokeRect(-6, cert.size/4, 12, 10);
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new domain check
      if (frame % 120 === 0) {
        createDomainCheck();
      }

      // Create new certificate
      if (frame % 180 === 0) {
        createCertificate();
      }

      // Update and draw domains
      domains.forEach((domain, index) => {
        // Move domain to target position
        if (domain.y < domain.targetY) {
          domain.y += domain.speed;
        }

        // Update domain status
        if (domain.status === 'checking' && domain.y >= domain.targetY) {
          domain.status = Math.random() > 0.3 ? 'available' : 'registered';
          
          // If domain is available, create a certificate
          if (domain.status === 'available') {
            createCertificate();
          }
        }

        // Fade out completed domains
        if (domain.status !== 'checking' && frame % 2 === 0) {
          domain.opacity -= 0.01;
        }

        drawDomain(domain);

        // Remove faded domains
        if (domain.opacity <= 0) {
          domains.splice(index, 1);
        }
      });

      // Update and draw certificates
      certificates.forEach((cert, index) => {
        if (cert.status === 'generating') {
          cert.opacity = Math.min(cert.opacity + 0.02, 1);
          cert.rotation = Math.sin(frame * 0.05) * 0.1;
          
          if (cert.opacity >= 1) {
            cert.status = 'complete';
          }
        } else {
          cert.rotation = 0;
          cert.opacity -= 0.01;
        }

        drawCertificate(cert);

        // Remove faded certificates
        if (cert.opacity <= 0) {
          certificates.splice(index, 1);
        }
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
    </div>
  );
};

export default DomainSSLAnimation;