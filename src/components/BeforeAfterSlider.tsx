import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { beforeRenovationImg } from '../data/kitchenProjectData';
import { SlidersHorizontal, ArrowLeftRight, Check, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  afterImg: string;
}

export default function BeforeAfterSlider({ afterImg }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="before-after" className="py-8 sm:py-12 bg-[#efece4] border-y border-[#ded7ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Інтерактивне порівняння</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
            Трансформація вашого простору: До та Після
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#615e57]">
            Потягніть бігунок ліворуч або праворуч, щоб побачити, як незатишне приміщення з бетоном, котлом та трубами перетворюється на теплу, затишну сучасну кухню.
          </p>
        </div>

        {/* Comparison Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[580px] rounded-2xl overflow-hidden shadow-xl border border-[#d2cab9] select-none cursor-ew-resize bg-[#1b1d19]"
        >
          {/* AFTER Image (Full background) */}
          <img
            src={afterImg}
            alt="Після ремонту: кухня в оливково-бежевих тонах"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeRenovationImg}
              alt="До ремонту: чорновий стан приміщення"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                height: containerRef.current ? `${containerRef.current.clientHeight}px` : '100%',
              }}
            />
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]">
              {/* Central handle handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl border-2 border-[#5e6b56] flex items-center justify-center text-[#5e6b56] pointer-events-auto cursor-grab active:cursor-grabbing">
                <SlidersHorizontal className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/70 backdrop-blur-md text-white border border-white/20 shadow-md">
              До: Чорновий стан (за вашим фото)
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#5e6b56]/90 backdrop-blur-md text-white border border-white/20 shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Після: Оливково-бежевий дизайн</span>
            </span>
          </div>

          {/* Helper prompt bottom */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/50 text-white/90 backdrop-blur-sm">
              Рухайте слайдер для порівняння ({Math.round(sliderPosition)}%)
            </span>
          </div>
        </div>

        {/* Transformation Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-white border border-[#ded6c9] shadow-xs">
            <div className="flex items-center gap-2 mb-1.5 text-[#5e6b56] font-semibold text-sm">
              <Check className="w-4 h-4" />
              <span>Маскування комунікацій</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5d5a52]">
              Газовий котел, витяжна труба та виступ колони сховані у вентильований пенал в єдиному стилі гарнітура.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ded6c9] shadow-xs">
            <div className="flex items-center gap-2 mb-1.5 text-[#5e6b56] font-semibold text-sm">
              <Check className="w-4 h-4" />
              <span>Максимум природного світла</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5d5a52]">
              Два великі вікна розкривають простір: замість порожніх кутів з радіаторами — затишна їдальня з видом.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#ded6c9] shadow-xs">
            <div className="flex items-center gap-2 mb-1.5 text-[#5e6b56] font-semibold text-sm">
              <Check className="w-4 h-4" />
              <span>Теплота та домашній затишок</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5d5a52]">
              Заміна холодного сірого бетону на медовий дубовий паркет, м'які тканини букле та тепле багаторівневе світло.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
