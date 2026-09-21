export interface Hotspot {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  title: string;
  category: 'cabinetry' | 'materials' | 'appliances' | 'lighting' | 'windows' | 'flooring' | 'furniture';
  description: string;
  spec: string;
}

export interface VisualView {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  aspectRatio: '4:3' | '16:9';
  tag: string;
  description: string;
  hotspots: Hotspot[];
}

export interface ColorSwatch {
  id: string;
  nameUk: string;
  nameEn: string;
  hex: string;
  role: 'dominant' | 'secondary' | 'accent' | 'base';
  percentage: number;
  description: string;
  recommendedUse: string;
}

export interface MaterialItem {
  id: string;
  category: string;
  title: string;
  material: string;
  finish: string;
  colorTone: string;
  practicality: string;
  cozyFactor: string;
}

export interface LightingScenario {
  id: string;
  title: string;
  timeOfDay: string;
  temperature: string; // e.g. "2700K - 3000K"
  description: string;
  sources: string[];
  cozinessTip: string;
}

export interface RoomChallengeSolution {
  id: string;
  challenge: string;
  solution: string;
  details: string[];
  visualBenefit: string;
}
