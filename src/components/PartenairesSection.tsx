'use client';

import { useEffect, useState, useRef } from 'react';

export default function PartenairesSection() {
  // 1. Définition des Logos (Utilise votre structure originale)
  // J'ai inclus le p13.png et assumé le format JPEG pour les autres.
  const logos = [
    { id: 'p1', src: '/images/p1.jpeg', alt: 'Partenaire 1' },
    { id: 'p2', src: '/images/p2.jpeg', alt: 'Partenaire 2' },
    { id: 'p3', src: '/images/p3.jpeg', alt: 'Partenaire 3' },
    { id: 'p4', src: '/images/p4.jpeg', alt: 'Partenaire 4' },
    { id: 'p5', src: '/images/p5.jpeg', alt: 'Partenaire 5' },
    { id: 'p6', src: '/images/p6.jpeg', alt: 'Partenaire 6' },
    { id: 'p7', src: '/images/p7.jpeg', alt: 'Partenaire 7' },
    { id: 'p8', src: '/images/p8.jpeg', alt: 'Partenaire 8' },
    { id: 'p9', src: '/images/p9.jpeg', alt: 'Partenaire 9' },
    { id: 'p10', src: '/images/p10.jpg', alt: 'Partenaire 10' },
    { id: 'p11', src: '/images/p11.jpg', alt: 'Partenaire 11' },
    { id: 'p12', src: '/images/p12.jpg', alt: 'Partenaire 12' },
    { id: 'p13', src: '/images/p13.png', alt: 'Partenaire 13' } // Notez le PNG
  ];

  const numberOfFaces = logos.length; 
  
  const [mounted, setMounted] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // PARAMÈTRES CRITIQUES POUR LA STABILITÉ 3D
  const FACE_WIDTH = 208; // w-52 (208px)
  const FACE_HEIGHT = 144; // h-36 (144px)
  
  // Calcul du rayon (RADIUS) : Assure que les faces ne se chevauchent pas et sont bien espacées
  const faceAngle = 360 / numberOfFaces;
  const RADIUS = Math.round((FACE_WIDTH / 2) / Math.tan((faceAngle / 2) * Math.PI / 180)) + 20; 

  useEffect(() => {
    setMounted(true);
    
    if (wheelRef.current) {
      const wheel = wheelRef.current;
      let rotation = 0;
      let animationId: number;
      
      const animate = () => {
        rotation += 0.1; // Vitesse de rotation très douce (ajustez si besoin)
        wheel.style.transform = `rotateY(${rotation}deg)`;
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      
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

        {/* Conteneur 3D ajusté : perspective plus large, hauteur ajustée */}
        <div className="flex justify-center items-center h-[500px] perspective-[1200px] overflow-hidden"> 
          <div 
            ref={wheelRef}
            className="relative w-[700px] h-[300px]" // Conteneur pour la roue
            style={{
              transformStyle: 'preserve-3d',
              opacity: mounted ? 1 : 0,
              transition: 'opacity 1s ease-in' // Animation d'apparition
            }}
          >
            {logos.map((logo, index) => {
              const angle = (360 / numberOfFaces) * index;
              
              return (
                <div
                  key={`${logo.id}-${index}`}
                  className="absolute w-52 h-36 bg-white/95 border border-gray-200 shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{
                    // Formule 3D canonique : rotation puis translation
                    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                    // Centrage de l'élément à l'intérieur du conteneur parent
                    left: '50%',
                    top: '50%',
                    marginLeft: `-${FACE_WIDTH / 2}px`, // -104px
                    marginTop: `-${FACE_HEIGHT / 2}px`, // -72px
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${logo.src}?v=2`}
                    alt={logo.alt}
                    width={180}
                    height={100}
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