import { useState } from 'react';
import { LIGHTING_SCENARIOS } from '../data/kitchenProjectData';
import { Sun, Lamp, Moon, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function LightingScenarios() {
  const [activeScenarioId, setActiveScenarioId] = useState(LIGHTING_SCENARIOS[2].id); // Default to evening hygge

  const activeScenario = LIGHTING_SCENARIOS.find((s) => s.id === activeScenarioId) || LIGHTING_SCENARIOS[0];

  const getAmbianceGradient = () => {
    switch (activeScenario.id) {
      case 'light-morning':
        return 'from-[#fcfaf2] via-[#f7f2e4] to-[#ebe1cc] text-[#2c2820]';
      case 'light-cooking':
        return 'from-[#faf9f5] via-[#f2ece0] to-[#e4dccd] text-[#22211e]';
      case 'light-evening':
      default:
        return 'from-[#2a261f] via-[#3a3328] to-[#1f1d19] text-[#f4efe4]';
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'light-morning':
        return Sun;
      case 'light-cooking':
        return Lamp;
      case 'light-evening':
      default:
        return Moon;
    }
  };

  return (
    <section id="lighting" className="py-8 sm:py-12 bg-[#f4efe6] border-t border-[#ded8cb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#5e6b56]/15 text-[#3b4735] mb-2 border border-[#5e6b56]/20">
            <Sun className="w-3.5 h-3.5" />
            <span>Сценарії світла та затишку</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#222621] font-display">
            Освітлення: як створити відчуття тепла
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-[#615e57]">
            Справжній затишок формується не однією люстрою по центру, а трьома незалежними рівнями світла. Перемикайте сценарії, щоб побачити атмосферу у різний час доби.
          </p>
        </div>

        {/* Interactive Scenario Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {LIGHTING_SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeScenarioId;
            const Icon = getIcon(scenario.id);

            return (
              <button
                key={scenario.id}
                id={`btn-scenario-${scenario.id}`}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={`p-5 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-[#5e6b56] ring-2 ring-[#5e6b56]/25 shadow-md scale-[1.01]'
                    : 'bg-[#ebe5d8] border-[#ded5c5] hover:bg-white/60 text-[#555]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`p-2 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#5e6b56] text-white'
                          : 'bg-[#ded6c6] text-[#555]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#dfd6c5] text-[#444]">
                      {scenario.temperature.split('–')[0]}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-[#222] font-display mb-1">
                    {scenario.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#736f66] mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{scenario.timeOfDay}</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-[#5e6b56] font-medium flex items-center gap-1">
                  {isSelected ? 'Активний сценарій' : 'Натисніть для перегляду'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Scenario Ambiance Simulation Card */}
        <div
          className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${getAmbianceGradient()} transition-all duration-500 shadow-lg border border-black/10`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeScenario.temperature}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 font-display">
                {activeScenario.title}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed max-w-xl mb-4">
                {activeScenario.description}
              </p>

              {/* Light sources */}
              <div className="space-y-2 mt-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider opacity-75">
                  Працюючі джерела світла:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeScenario.sources.map((src, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 opacity-90" />
                      <span className="truncate">{src}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cozy Tip Card */}
            <div className="lg:col-span-5 bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/20">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider opacity-85">
                <Sparkles className="w-4 h-4" />
                <span>Секрет затишку</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                {activeScenario.cozinessTip}
              </p>
              <div className="mt-4 pt-3 border-t border-white/15 text-[11px] opacity-80">
                Рекомендована колірна температура для житлової кухні: 2700K (теплий затишок). Уникайте холодного білого світла 5000K-6000K, яке позбавляє дім затишку.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
