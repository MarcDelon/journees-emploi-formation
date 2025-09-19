'use client';

import { useEffect, useState } from 'react';

export default function PartenairesSection() {
  // logos locaux (et faciles à mettre en cache)
  const logos = Array.from({ length: 9 }).map((_, i) => ({
    id: `p${i + 1}`,
    src: `/images/p${i + 1}.jpeg`,
    alt: `Partenaire ${i + 1}`,
  }));

  // petit effet d'apparition progressive pour le confort
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Entreprises & Partenaires</h2>
          <p className="text-gray-600">Ils soutiennent l'événement</p>
        </div>

        {/* Grille performante et accessible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {logos.map((logo, index) => (
            <div
              key={logo.id}
              className={`group relative mx-auto w-[140px] h-[90px] sm:w-[160px] sm:h-[100px] bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 hover:shadow-md`}
              style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'none' : 'translateY(8px)', transitionDelay: `${index * 40}ms` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${logo.src}?v=2`}
                alt={logo.alt}
                width={280}
                height={160}
                loading="lazy"
                decoding="async"
                className="max-w-[80%] max-h-[70%] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
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






