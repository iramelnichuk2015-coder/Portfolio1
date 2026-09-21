import { MATERIAL_SPECS } from '../data/kitchenProjectData';
import { PackageCheck, Shield, Sparkles, Sliders } from 'lucide-react';

export default function MaterialsSpecification() {
  return (
    <section id="specifications" className="py-8 sm:py-12 bg-[#f4efe6] border-t border-[#ded8cb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Специфікація оздоблення та матеріалів</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
            Матеріали для втілення проєкту
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#615e57]">
            Відібрані матеріали, що поєднують високу зносостійкість для щоденного приготування їжі з тактильним затишком справжнього дому.
          </p>
        </div>

        {/* Materials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MATERIAL_SPECS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ded8cb] shadow-xs flex flex-col justify-between hover:border-[#5e6b56]/40 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5e6b56] bg-[#5e6b56]/10 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-[#222] font-display mb-2">
                  {item.title}
                </h3>

                <div className="space-y-2 text-xs text-[#524e47] my-3">
                  <div className="flex justify-between py-1 border-b border-[#f0ebdF]">
                    <span className="text-[#847f75]">Основа:</span>
                    <span className="font-medium text-right text-[#333]">{item.material}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ebdF]">
                    <span className="text-[#847f75]">Обробка:</span>
                    <span className="font-medium text-right text-[#333]">{item.finish}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ebdF]">
                    <span className="text-[#847f75]">Відтінок:</span>
                    <span className="font-medium text-right text-[#333]">{item.colorTone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#eee7dc]">
                <div className="flex items-start gap-1.5 text-xs text-[#4b4740]">
                  <Shield className="w-3.5 h-3.5 text-[#5e6b56] shrink-0 mt-0.5" />
                  <span><strong>Практичність:</strong> {item.practicality}</span>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-[#825c38]">
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                  <span><strong>Фактор затишку:</strong> {item.cozyFactor}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Quick Summary Card */}
          <div className="bg-[#5e6b56] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Sliders className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">
                Рекомендація щодо виготовлення
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                Для досягнення 100% відповідності рендеру замовляйте кухонний гарнітур за індивідуальним кресленням із попереднім виїздом замірника після чистового вирівнювання стін та розведення електрики.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 text-xs text-white/80">
              Всі відтінки фасадів можна заколерувати за шкалами NCS або RAL Design.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
