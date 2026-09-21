/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroVisualizer from './components/HeroVisualizer';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import PaletteSection from './components/PaletteSection';
import LightingScenarios from './components/LightingScenarios';
import ArchitecturalSolutions from './components/ArchitecturalSolutions';
import MaterialsSpecification from './components/MaterialsSpecification';
import CozyChecklist from './components/CozyChecklist';
import ImageViewerModal from './components/ImageViewerModal';

import {
  KITCHEN_VIEWS,
  COLOR_PALETTE,
} from './data/kitchenProjectData';
import { VisualView } from './types';
import { Download, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [lightboxView, setLightboxView] = useState<VisualView | null>(null);

  const activeView = KITCHEN_VIEWS[activeViewIndex] || KITCHEN_VIEWS[0];

  const handleDownloadActive = () => {
    const link = document.createElement('a');
    link.href = activeView.imageUrl;
    link.download = `kitchen-design-${activeView.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-[#262925] flex flex-col selection:bg-[#5e6b56]/20 selection:text-[#283224]">
      {/* Top sticky navigation bar */}
      <Navbar
        activeSection="visualizer"
        onNavigate={scrollToSection}
        onDownloadActive={handleDownloadActive}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Render Visualizer with Hotspots */}
        <HeroVisualizer
          views={KITCHEN_VIEWS}
          activeViewIndex={activeViewIndex}
          onSelectView={setActiveViewIndex}
          onOpenLightbox={(view) => setLightboxView(view)}
        />

        {/* 2. Before & After Transformation Slider */}
        <BeforeAfterSlider afterImg={KITCHEN_VIEWS[0].imageUrl} />

        {/* 3. Color & Texture Palette Section */}
        <PaletteSection palette={COLOR_PALETTE} />

        {/* 4. Interactive Lighting Scenarios */}
        <LightingScenarios />

        {/* 5. Space & Architectural Solutions */}
        <ArchitecturalSolutions />

        {/* 6. Materials Specification */}
        <MaterialsSpecification />

        {/* 7. Cozy Home Checklist */}
        <CozyChecklist />
      </main>

      {/* Lightbox / High-Res Image Modal */}
      {lightboxView && (
        <ImageViewerModal
          isOpen={Boolean(lightboxView)}
          onClose={() => setLightboxView(null)}
          imageUrl={lightboxView.imageUrl}
          title={lightboxView.name}
          description={lightboxView.description}
        />
      )}

      {/* Footer */}
      <footer className="bg-[#242822] text-[#d8d3c7] py-12 border-t border-[#373d34]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-8 h-8 rounded-lg bg-[#5e6b56] text-white flex items-center justify-center font-bold text-sm font-display">
                  OK
                </span>
                <span className="text-lg font-semibold text-white font-display">
                  Дизайн Кухні в Оливково-Бежевих Тонах
                </span>
              </div>
              <p className="text-xs text-[#a39e92]">
                Концепція сучасного затишного інтер'єру, розроблена за індивідуальними характеристиками простору з вашого фото.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadActive}
                className="flex items-center gap-2 px-4 py-2 bg-[#5e6b56] hover:bg-[#4d5946] text-white text-xs sm:text-sm font-medium rounded-xl transition shadow"
              >
                <Download className="w-4 h-4" />
                <span>Завантажити рендер ({activeView.name})</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8c877a] gap-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5e6b56]" />
              <span>Сучасний стиль • Оливково-бежева палітра • Відчуття домашнього затишку</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Створено з любов'ю до затишку</span>
              <Heart className="w-3.5 h-3.5 text-[#a85942] fill-[#a85942]" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
