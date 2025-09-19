'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Building } from 'lucide-react';
import { Partenaire } from '@/lib/types';

export default function PartenairesSection() {
  const [partenaires, setPartenaires] = useState<Partenaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    loadPartenaires();
  }, []);

  const loadPartenaires = async () => {
    try {
      const response = await fetch('/api/partenaires');
      const data = await response.json();
      if (data.success) {
        setPartenaires(data.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des partenaires:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      platine: 'bg-gray-100 text-gray-800 border-gray-300',
      or: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      argent: 'bg-gray-100 text-gray-600 border-gray-300',
      bronze: 'bg-orange-100 text-orange-800 border-orange-300',
      media: 'bg-blue-100 text-blue-800 border-blue-300',
      institutionnel: 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      platine: 'Platine',
      or: 'Or',
      argent: 'Argent',
      bronze: 'Bronze',
      media: 'Média',
      institutionnel: 'Institutionnel'
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Déterminer les slides (ordre par type puis ordre personnalisé si dispo)
  const orderedSlides: Partenaire[] = useMemo(() => {
    const typeOrder = ['platine', 'or', 'argent', 'bronze', 'media', 'institutionnel'];
    const sortedByType = [...partenaires].sort((a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type));
    return sortedByType.sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0));
  }, [partenaires]);

  // Auto-play
  useEffect(() => {
    if (hovering) return;
    if ((orderedSlides?.length || 0) <= 1) return;
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % orderedSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [orderedSlides, hovering]);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-event-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des partenaires...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si l'API ne renvoie rien, utiliser les 9 logos locaux p1..p9
  const isEmpty = orderedSlides.length === 0;
  const slides: Partenaire[] = isEmpty
    ? Array.from({ length: 9 }).map((_, i) => ({
        id: `static-${i + 1}`,
        nom: `Partenaire ${i + 1}`,
        // On stocke ici le « baseName » sans extension; on gèrera les extensions en rendu
        logoUrl: `p${i + 1}`,
        description: '',
        siteWeb: undefined,
        type: 'media' as const,
        active: true,
        ordre: i,
      }))
    : orderedSlides;

  const renderLogo = (baseOrPath: string, alt: string) => {
    // Si l'URL contient déjà une extension, on l'utilise telle quelle
    const hasExt = /\.(png|jpe?g|webp|svg)$/i.test(baseOrPath);
    if (hasExt) {
      const src = baseOrPath.startsWith('/') ? baseOrPath : `/images/${baseOrPath}`;
      return (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80vw, 50vw"
          priority
        />
      );
    }
    // Sinon, on essaie successivement .png, .jpg, .jpeg, .webp
    const candidates = [`.png`, `.jpg`, `.jpeg`, `.webp`].map(ext => `/images/${baseOrPath}${ext}`);
    // On rend la première source; on laisse le navigateur échouer silencieusement si manquante via key change
    return (
      <picture className="contents">
        {/* ordre des sources: webp puis jpeg/jpg puis png */}
        <source srcSet={`/images/${baseOrPath}.webp`} type="image/webp" />
        <source srcSet={`/images/${baseOrPath}.jpeg`} type="image/jpeg" />
        <source srcSet={`/images/${baseOrPath}.jpg`} type="image/jpeg" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/${baseOrPath}.png`} alt={alt} className="w-full h-full object-contain" />
      </picture>
    );
  };

  const goTo = (index: number) => {
    const len = slides.length || 1;
    setCurrent(((index % len) + len) % len);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const handleDragEnd = (_: any, info: { offset: { x: number, y: number }, velocity: { x: number, y: number } }) => {
    setDragging(false);
    const swipeThreshold = 50;
    const velocityThreshold = 300;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      next();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      prev();
    }
  };

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Entreprises & Partenaires</h2>
          <p className="text-gray-600">Ils soutiennent l'événement</p>
        </div>

        {/* Slider */}
        <motion.div
          className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={() => { setDragging(true); setHovering(true); }}
          onDragEnd={handleDragEnd}
        >
          {slides.map((p, index) => {
            const isActive = index === current;
            return (
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ pointerEvents: isActive ? 'auto' : 'none' }}
              >
                {/* Logo principal */}
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="relative w-full h-full">
                    {renderLogo(p.logoUrl, p.nom)}
                  </div>
                </div>

                {/* Contenu */}
                <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-6 pb-6 pointer-events-none">
                  <motion.span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(p.type)}`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    {getTypeLabel(p.type)}
                  </motion.span>
                  <motion.h3 className="mt-3 text-xl md:text-2xl font-semibold text-gray-900 drop-shadow-sm" initial={{ y: 10, opacity: 0 }} animate={{ y: isActive ? 0 : 10, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
                    {p.nom}
                  </motion.h3>
                </div>
              </motion.div>
            );
          })}

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={`dot-${i}`}
                aria-label={`Aller au slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-black w-6' : 'bg-gray-400/60'}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </motion.div>

        {/* (Grille supprimée: les logos sont affichés dans le slider) */}
      </div>
    </section>
  );
}






