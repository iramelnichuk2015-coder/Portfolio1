import { useState } from 'react';
import { VisualView, Hotspot } from '../types';
import { Maximize2, MapPin, Eye, EyeOff, CheckCircle2, Sparkles, Download } from 'lucide-react';

interface HeroVisualizerProps {
  views: VisualView[];
  activeViewIndex: number;
  onSelectView: (index: number) => void;
  onOpenLightbox: (view: VisualView) => void;
}

export default function HeroVisualizer({
  views,
  activeViewIndex,
  onSelectView,
  onOpenLightbox,
}: HeroVisualizerProps) {
  const [showHotspots, setShowHotspots] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const activeView = views[activeViewIndex] || views[0];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activeView.imageUrl;
    link.download = `${activeView.id}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="visualizer" className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title & intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Візуалізація інтер'єру за вашим фото</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#222621] tracking-tight font-display">
              Кухня в оливково-бежевих тонах
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-[#615e57] max-w-2xl">
              Сучасний дизайн інтер'єру, створений під планування вашої кімнати з двома вікнами та прихованою зоною котла. Баланс тепла, світла та природного спокою.
            </p>
          </div>

          {/* Controls: toggle hotspots & fullscreen */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              id="btn-toggle-hotspots"
              onClick={() => {
                setShowHotspots(!showHotspots);
                setSelectedHotspot(null);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                showHotspots
                  ? 'bg-[#5e6b56]/10 border-[#5e6b56]/30 text-[#3d4937]'
                  : 'bg-white border-[#d8d0c2] text-[#6b675e] hover:bg-[#ede7da]'
              }`}
            >
              {showHotspots ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{showHotspots ? 'Мітки дизайну (Увімк)' : 'Мітки дизайну (Вимк)'}</span>
            </button>

            <button
              id="btn-open-lightbox"
              onClick={() => onOpenLightbox(activeView)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-[#d8d0c2] text-[#333] hover:bg-[#ede7da] transition shadow-xs"
              title="Відкрити на весь екран"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="hidden sm:inline">Повний розмір</span>
            </button>
          </div>
        </div>

        {/* View selection tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {views.map((view, idx) => {
            const isCurrent = idx === activeViewIndex;
            return (
              <button
                key={view.id}
                id={`btn-view-${view.id}`}
                onClick={() => {
                  onSelectView(idx);
                  setSelectedHotspot(null);
                }}
                className={`flex flex-col text-left p-2.5 sm:p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-white border-[#5e6b56] ring-2 ring-[#5e6b56]/20 shadow-sm'
                    : 'bg-[#f0ece3] border-[#ded7ca] hover:bg-[#e7e1d3] text-[#555]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      isCurrent
                        ? 'bg-[#5e6b56] text-white'
                        : 'bg-[#ded7c9] text-[#5c5950]'
                    }`}
                  >
                    {view.tag}
                  </span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-[#5e6b56] animate-pulse" />
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#222] truncate w-full">
                  {view.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Render Visual Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d8d0c2] bg-[#1a1c18] shadow-lg group">
          <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[640px] flex items-center justify-center overflow-hidden">
            <img
              src={activeView.imageUrl}
              alt={activeView.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover sm:object-contain bg-[#1c1e1a] transition-all duration-300"
            />

            {/* Interactive Hotspot Pins */}
            {showHotspots &&
              activeView.hotspots.map((hs) => {
                const isSelected = selectedHotspot?.id === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  >
                    <button
                      id={`hotspot-${hs.id}`}
                      onClick={() => setSelectedHotspot(isSelected ? null : hs)}
                      className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shadow-lg transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#c5a059] text-white ring-4 ring-white/50 scale-125'
                          : 'bg-[#5e6b56] text-white hover:scale-110 hover:bg-[#4a5544]'
                      }`}
                      title={hs.title}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="sr-only">{hs.title}</span>
                      {/* Pulse effect */}
                      {!isSelected && (
                        <span className="absolute inset-0 rounded-full bg-[#5e6b56] animate-ping opacity-30 pointer-events-none" />
                      )}
                    </button>
                  </div>
                );
              })}

            {/* Quick badge on image */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#7ca36b]" />
                {activeView.tag}: {activeView.name}
              </span>
            </div>

            {/* Zoom / Fullscreen trigger button overlay */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => onOpenLightbox(activeView)}
                className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/15 transition shadow-sm"
                title="Відкрити детальний перегляд"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Hotspot Detail Card (Pop-up or docked) */}
          {selectedHotspot && (
            <div className="p-4 sm:p-5 bg-[#262a24] text-white border-t border-white/10 animate-fadeIn transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#5e6b56] text-white shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-semibold text-white">
                        {selectedHotspot.title}
                      </h4>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-white/80 font-mono">
                        {selectedHotspot.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-white/80 leading-relaxed max-w-3xl">
                      {selectedHotspot.description}
                    </p>
                    <div className="mt-2 text-xs text-[#c5a059] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Специфікація: {selectedHotspot.spec}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="text-white/60 hover:text-white text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition shrink-0"
                >
                  Закрити
                </button>
              </div>
            </div>
          )}
        </div>

        {/* View narrative & rationale */}
        <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-white border border-[#ded7cb] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <h3 className="text-base sm:text-lg font-semibold text-[#222] font-display">
              {activeView.subtitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-[#5f5c54] leading-relaxed">
              {activeView.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5e6b56] hover:bg-[#4e5947] text-white text-xs sm:text-sm font-medium transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Завантажити ракурс</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
