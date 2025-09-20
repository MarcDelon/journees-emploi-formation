'use client';

import { useEffect, useState, useRef } from 'react';

export default function PartenairesSection() {
  // logos locaux (et faciles à mettre en cache)
  const logos = Array.from({ length: 9 }).map((_, i) => ({
    id: `p${i + 1}`,
    src: `/images/p${i + 1}.jpeg`,
    alt: `Partenaire ${i + 1}`,
  }));

  // Dupliquer les logos pour un défilement infini
  const duplicatedLogos = [...logos, ...logos, ...logos];

  // petit effet d'apparition progressive pour le confort
  const [mounted, setMounted] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMounted(true);
    
    // Animation de rotation continue optimisée
    if (wheelRef.current) {
      const wheel = wheelRef.current;
      let rotation = 0;
      let animationId: number;
      
      const animate = () => {
        rotation += 0.15; // Vitesse de rotation plus lente et douce
        wheel.style.transform = `rotateY(${rotation}deg)`;
        animationId = requestAnimationFrame(animate);
      };
      
      // Démarrer l'animation
      animationId = requestAnimationFrame(animate);
      
      // Nettoyer l'animation au démontage
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Entreprises & Partenaires</h2>
          <p className="text-gray-600">Ils soutiennent l'événement</p>
        </div>

        {/* Conteneur 3D pour la roue */}
        <div className="flex justify-center items-center h-[500px] perspective-1000 overflow-hidden">
          <div 
            ref={wheelRef}
            className="relative w-[600px] h-[300px] transform-style-preserve-3d"
            style={{
              transformStyle: 'preserve-3d',
              animation: 'none' // Désactiver l'animation CSS pour utiliser JS
            }}
          >
            {duplicatedLogos.map((logo, index) => {
              const angle = (360 / logos.length) * index;
              const radius = 200; // Rayon de la roue agrandi
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const z = Math.sin((angle * Math.PI) / 180) * radius;
              
              return (
                <div
                  key={`${logo.id}-${index}`}
                  className="absolute w-40 h-24 bg-white/95 border border-gray-200 rounded-xl flex items-center justify-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-110"
                  style={{
                    transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                    transformStyle: 'preserve-3d',
                    opacity: mounted ? 1 : 0,
                    transitionDelay: `${index * 30}ms`,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-80px', // -w/2
                    marginTop: '-48px'   // -h/2
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${logo.src}?v=2`}
                    alt={logo.alt}
                    width={140}
                    height={80}
                    loading="lazy"
                    decoding="async"
                    className="max-w-[90%] max-h-[85%] object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Lien de contact */}
        <div className="text-center mt-10">
          <a href="/contact" className="inline-flex items-center px-5 py-2 rounded-full border border-black bg-white hover:bg-gray-50 font-medium transition-colors">
            Devenir partenaire
          </a>
        </div>
      </div>
    </section>
  );
}






