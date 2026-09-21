import { useState } from 'react';
import { Heart, CheckCircle2, Circle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

const INITIAL_ITEMS: ChecklistItem[] = [
  {
    id: 'c-1',
    title: 'Тепле світло 2700K замість холодного офісного',
    description: 'Всі світильники, підвіси та вбудована підсвітка стільниці мають мати теплий спектр світла.',
    checked: true,
  },
  {
    id: 'c-2',
    title: 'Живі рослини та пряні трави на підвіконні',
    description: 'Оливкове карликове дерево в глиняному кашпо, горщики з базиліком і м\'ятою біля двох вікон.',
    checked: true,
  },
  {
    id: 'c-3',
    title: 'Тактильний текстиль (льон та букле)',
    description: 'Лляні римські штори на вікнах та м\'яка фактурна оббивка крісел створюють акустичний затишок.',
    checked: true,
  },
  {
    id: 'c-4',
    title: 'Кераміка та дерево замість глянцевого пластику',
    description: 'Дерев\'яні обробні дошки з дуба, керамічні глечики, чашки ручної роботи на відкритих поличках.',
    checked: true,
  },
  {
    id: 'c-5',
    title: 'Безшумні доводчики на всіх шафах',
    description: 'Відсутність стукоту дверей і шумів зберігає спокійну, умиротворену атмосферу в домі.',
    checked: true,
  },
  {
    id: 'c-6',
    title: 'Захований візуальний шум',
    description: 'Всі дрібні прилади, кабелі та засоби для миття мають своє закрите місце у шафах.',
    checked: false,
  },
];

export default function CozyChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = items.filter((i) => i.checked).length;

  return (
    <section className="py-8 sm:py-12 bg-white border-t border-[#ded8cb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
            <Heart className="w-3.5 h-3.5 text-[#5e6b56]" />
            <span>Інтерактивний чекліст</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
            Складові затишку: як оживити рендер у реальному житті
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#615e57]">
            Відзначте деталі, які ви хочете реалізувати на своїй кухні, щоб щодня насолоджуватися справжнім домашнім комфортом ({checkedCount} з {items.length} реалізовано).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                item.checked
                  ? 'bg-[#5e6b56]/5 border-[#5e6b56]/30 text-[#252b21]'
                  : 'bg-[#faf8f4] border-[#ded8cb] text-[#666] hover:bg-white'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-[#5e6b56] focus:outline-none shrink-0"
              >
                {item.checked ? (
                  <CheckCircle2 className="w-5 h-5 fill-[#5e6b56] text-white" />
                ) : (
                  <Circle className="w-5 h-5 text-[#9e988c]" />
                )}
              </button>

              <div className="flex-1">
                <h4
                  className={`text-sm font-semibold mb-0.5 ${
                    item.checked ? 'text-[#2b3327]' : 'text-[#333]'
                  }`}
                >
                  {item.title}
                </h4>
                <p className="text-xs text-[#635f56] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
