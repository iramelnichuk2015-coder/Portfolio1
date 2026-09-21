import { useState } from 'react';
import { ColorSwatch } from '../types';
import { Palette, Copy, Check, Heart, Sparkles } from 'lucide-react';

interface PaletteSectionProps {
  palette: ColorSwatch[];
}

export default function PaletteSection({ palette }: PaletteSectionProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatch>(palette[0]);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="palette" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
              <Palette className="w-3.5 h-3.5" />
              <span>Колористика та психологія кольору</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
              Оливково-бежева колірна палітра
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#615e57] max-w-2xl">
              Гармонія теплих природних відтінків, створена для зниження стресу та наповнення простору відчуттям домашнього тепла й захищеності.
            </p>
          </div>

          <div className="text-xs text-[#736f66] bg-[#f0ede6] px-3.5 py-2 rounded-xl border border-[#ded8cc]">
            Формула пропорцій: <strong className="text-[#333]">45%</strong> Беж • <strong className="text-[#333]">30%</strong> Олива • <strong className="text-[#333]">15%</strong> Дуб • <strong className="text-[#333]">10%</strong> Акценти
          </div>
        </div>

        {/* Visual Color Balance Bar */}
        <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner mb-6 border border-black/10">
          {palette.map((swatch) => (
            <div
              key={swatch.id}
              style={{
                backgroundColor: swatch.hex,
                width: `${swatch.percentage}%`,
              }}
              title={`${swatch.nameUk} (${swatch.percentage}%)`}
              className="h-full transition-all hover:opacity-90 cursor-pointer"
              onClick={() => setSelectedSwatch(swatch)}
            />
          ))}
        </div>

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          {palette.map((swatch) => {
            const isSelected = selectedSwatch.id === swatch.id;
            const isCopied = copiedHex === swatch.hex;

            return (
              <div
                key={swatch.id}
                onClick={() => setSelectedSwatch(swatch)}
                className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#5e6b56] ring-2 ring-[#5e6b56]/20 shadow-md'
                    : 'bg-[#f4efe6] border-[#dfd8cc] hover:bg-white/80'
                }`}
              >
                <div>
                  {/* Swatch Color Circle */}
                  <div
                    style={{ backgroundColor: swatch.hex }}
                    className="w-full h-20 rounded-xl shadow-xs border border-black/10 mb-3 flex items-end justify-end p-2 relative group"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(swatch.hex);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-md text-xs flex items-center gap-1 shadow"
                      title="Скопіювати HEX код"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#736f66] block">
                    {swatch.percentage}% простору
                  </span>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#222] truncate mt-0.5">
                    {swatch.nameUk}
                  </h4>
                </div>

                <div className="mt-2 pt-2 border-t border-[#e8e2d5] flex items-center justify-between">
                  <span className="font-mono text-xs text-[#555] font-medium">
                    {swatch.hex}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(swatch.hex);
                    }}
                    className="text-[11px] text-[#5e6b56] hover:underline flex items-center gap-1"
                  >
                    {isCopied ? 'Скопійовано!' : 'Копіювати'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Swatch View & Design Reasoning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Color Detail Card */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#ded8cb] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  style={{ backgroundColor: selectedSwatch.hex }}
                  className="w-12 h-12 rounded-xl shadow-sm border border-black/10 shrink-0"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#222] font-display">
                    {selectedSwatch.nameUk}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-[#555] bg-[#f2ede4] px-2 py-0.5 rounded">
                      {selectedSwatch.hex}
                    </span>
                    <span className="text-xs text-[#736f66]">
                      Частка в інтер'єрі: {selectedSwatch.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-[#4d4a44]">
                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7a766c] mb-1">
                    Атмосфера та вплив на настрій
                  </h5>
                  <p className="leading-relaxed bg-[#faf8f4] p-3 rounded-xl border border-[#ede7dc]">
                    {selectedSwatch.description}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-[#7a766c] mb-1">
                    Де застосовується у проєкті
                  </h5>
                  <p className="leading-relaxed text-[#3b3833]">
                    {selectedSwatch.recommendedUse}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#ede7dc] flex justify-end">
              <button
                onClick={() => copyToClipboard(selectedSwatch.hex)}
                className="text-xs font-medium text-[#5e6b56] hover:text-[#45503e] flex items-center gap-1.5"
              >
                {copiedHex === selectedSwatch.hex ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Код {selectedSwatch.hex} скопійовано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Скопіювати HEX для підбору фарби</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Why Olive + Beige Card */}
          <div className="lg:col-span-5 bg-[#5e6b56]/10 p-6 rounded-2xl border border-[#5e6b56]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#465340] mb-2 font-semibold text-sm">
                <Heart className="w-4 h-4 text-[#5e6b56]" />
                <span>Чому саме оливковий та бежевий?</span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-[#2b3527] font-display mb-3">
                Секрет відчуття домашнього затишку
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#4b5545] leading-relaxed">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#5e6b56] shrink-0 mt-0.5" />
                  <span><strong>Природна біофілія:</strong> Олива нагадує про ліс, листя та природу, знижуючи пульс і допомагаючи розслабитися після робочого дня.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#5e6b56] shrink-0 mt-0.5" />
                  <span><strong>Світловий комфорт:</strong> Теплий беж м'яко відбиває сонячні промені з ваших двох вікон, наповнюючи кімнату ніжним золотавим теплом.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#5e6b56] shrink-0 mt-0.5" />
                  <span><strong>Поза часом:</strong> На відміну від холодних сірих інтер'єрів, оливково-бежева гама ніколи не старіє і залишається теплою в будь-яку пору року.</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/60 rounded-xl text-xs text-[#44503e] border border-[#5e6b56]/20">
              Порада дизайнера: для стін обирайте матову фарбу з шовковистим ефектом (Eggshell або Velvet), яка приємно розсіює світло.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
