import { BoxOption } from './types';

export const BOX_OPTIONS: BoxOption[] = [
  { id: 'box-250g', weight: '250g Box', price: 10.0, bitesCount: 9 },
  { id: 'box-350g', weight: '350g Box', price: 14.0, bitesCount: 12 },
  { id: 'box-500g', weight: '500g Box', price: 20.0, bitesCount: 18, isPopular: true },
  { id: 'box-700g', weight: '700g Box', price: 28.0, bitesCount: 24 },
  { id: 'box-750g', weight: '750g Box', price: 30.0, bitesCount: 26 },
  { id: 'box-1kg',  weight: '1kg Box', price: 40.0, bitesCount: 36 },
];

export const INGREDIENTS_LIST = [
  'Organic Medjool Dates',
  'Tahini Creame (Sesame)',
  'Raw Walnuts',
  'Raw Pistachios',
  'Roasted Hazelnuts',
  'Mix of Raw & Roasted Almonds',
  'Pinch of Hand-Harvested Sea Salt',
  'Cocoa Powder',
  'Coconut Oil',
  'Maple Syrup'
];

export const NUTRITION_FACTS = {
  servingSize: '1 Bite (approx. 29 g)',
  calories: '134 kcal',
  fat: { total: '9.2 g', saturated: '2.35 g' },
  carbs: { total: '12.5 g', sugar: '8.3 g' },
  protein: '3.1 g',
  fiber: '2.2 g',
  sodium: '0.01 g'
};

export const IMAGES = {
  // Main header date presentation (gourmet coated hand-rolled date energy bites on a light elegant wooden board)
  hero_dates: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=1200&auto=format&fit=crop',
  
  // Born in a small kitchen (beautiful raw dates and ingredient seeds flatlay or bowl)
  kitchen_bars: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=1200&auto=format&fit=crop',
  
  // Artisan hand-rolling date paste/balls
  hand_rolling: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  
  // Clean jars with grains, sesame, nuts
  jars_ingredients: 'https://images.unsplash.com/photo-1511124444883-8207185c1f5a?q=80&w=800&auto=format&fit=crop',
  
  // Decorative small icons / products
  medjool_illus: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?q=80&w=400&auto=format&fit=crop',
  tahini_illus: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=400&auto=format&fit=crop',
  
  // General atmospheric snack shot
  bites_overhead: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1200&auto=format&fit=crop',
};
