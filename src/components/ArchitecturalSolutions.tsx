import { ROOM_CHALLENGES } from '../data/kitchenProjectData';
import { ShieldCheck, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

export default function ArchitecturalSolutions() {
  return (
    <section id="solutions" className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Архітектурні рішення простору</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
            Як вирішено особливості приміщення з вашого фото
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#615e57]">
            Продумані інженерні та дизайнерські прийоми, що перетворюють складні комунікації, котел та труби на бездоганний сучасний інтер'єр.
          </p>
        </div>

        {/* Challenges & Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROOM_CHALLENGES.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-[#ded8cb] shadow-xs flex flex-col justify-between hover:shadow-sm transition"
            >
              <div>
                {/* Challenge tag */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#a85942] uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#a85942]" />
                  <span>Вихідна задача з фото</span>
                </div>

                <h3 className="text-lg font-semibold text-[#222] font-display mb-1">
                  {item.challenge}
                </h3>

                {/* Solution badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5e6b56]/10 text-[#42503d] text-xs font-semibold my-2 border border-[#5e6b56]/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5e6b56]" />
                  <span>Рішення: {item.solution}</span>
                </div>

                {/* Details list */}
                <ul className="space-y-2 mt-3 text-xs sm:text-sm text-[#524e47]">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-[#5e6b56] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefit Footer */}
              <div className="mt-4 pt-3 border-t border-[#ede7db] flex items-center gap-2 text-xs text-[#5e6b56] font-medium bg-[#faf8f4] p-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#5e6b56]" />
                <span>{item.visualBenefit}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
