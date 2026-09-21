import { useState } from 'react';
import { Home, Sparkles, Download, Share2, Check, SlidersHorizontal, Sun, Layers } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onDownloadActive: () => void;
}

export default function Navbar({ activeSection, onNavigate, onDownloadActive }: NavbarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const navItems = [
    { id: 'visualizer', label: 'Візуалізація', icon: Sparkles },
    { id: 'before-after', label: 'До та Після', icon: SlidersHorizontal },
    { id: 'palette', label: 'Палітра кольорів', icon: Layers },
    { id: 'lighting', label: 'Освітлення', icon: Sun },
    { id: 'solutions', label: 'Рішення планування', icon: Home },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#f7f5f0]/95 backdrop-blur-md border-b border-[#e5ded0] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Brand & Project info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5e6b56] text-white flex items-center justify-center shadow-sm font-display text-lg font-bold tracking-wider">
              OK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-semibold text-[#262925] tracking-tight">
                  Оливково-Бежевий Затишок
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#5e6b56]/10 text-[#4c5746] border border-[#5e6b56]/20">
                  Сучасний стиль
                </span>
              </div>
              <p className="text-xs text-[#706d64] hidden sm:block">
                Дизайн-візуалізація інтер'єру кухні за фото приміщення
              </p>
            </div>
          </div>

          {/* Navigation links for tablet/desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#5e6b56] text-white shadow-sm'
                      : 'text-[#57534e] hover:text-[#262925] hover:bg-[#eae3d5]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              id="btn-share-project"
              onClick={handleShare}
              title="Скопіювати посилання на проєкт"
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[#d8d0c2] text-[#4a463f] hover:bg-[#ece5d8] transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#5e6b56]" />
                  <span className="hidden sm:inline text-[#5e6b56] font-medium">Скопійовано!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Поділитися</span>
                </>
              )}
            </button>

            <button
              id="btn-download-render"
              onClick={onDownloadActive}
              className="bg-[#5e6b56] hover:bg-[#4d5946] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center gap-1.5 hover:shadow"
            >
              <Download className="w-4 h-4" />
              <span>Зберегти рендер</span>
            </button>
          </div>
        </div>

        {/* Mobile quick scrollbar nav */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-[#e8e1d3] no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#5e6b56] text-white'
                    : 'bg-[#ede7da] text-[#4a463f] hover:bg-[#e2dacb]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
