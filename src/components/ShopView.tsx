import { useState } from 'react';
import { Trash2, Plus, Minus, Check, Sparkles, Leaf, ShoppingCart, ArrowRight } from 'lucide-react';
import { BOX_OPTIONS, INGREDIENTS_LIST, NUTRITION_FACTS, IMAGES } from '../data';
import { SelectedItem, BoxOption, ViewName } from '../types';
import datesPackImage from '../assets/datespack.jpeg';

interface ShopViewProps {
  cart: SelectedItem[];
  onAddBox: (box: BoxOption) => void;
  onAddBars: (qty: number) => void;
  onRemoveItem: (id: string) => void;
  onViewChange: (view: ViewName) => void;
}

export default function ShopView({ cart, onAddBox, onAddBars, onRemoveItem, onViewChange }: ShopViewProps) {
  // Current user customizer configuration (before clicking "Add to Selection")
  const [selectedBoxId, setSelectedBoxId] = useState<string>('box-500g');
  const [barQty, setBarQty] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'nutrition'>('ingredients');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Math for current selection panel (for instant preview)
  const chosenBox = BOX_OPTIONS.find(b => b.id === selectedBoxId);
  const aggregateCartTotal = cart.reduce((acc, item) => acc + item.priceTotal, 0);

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  const handleAddSelection = () => {
    let addedCount = 0;
    
    // Add box if selected
    if (chosenBox) {
      onAddBox(chosenBox);
      addedCount += 1;
    }
    
    // Add individual bars if positive qty
    if (barQty > 0) {
      onAddBars(barQty);
      addedCount += barQty;
      setBarQty(0); // reset qty counter for bars
    }

    triggerToast(`Added ${addedCount > 1 ? 'items' : 'item'} successfully to selection!`);
  };

  return (
    <div className="w-full bg-surface-bg pb-24">
      {/* 1. FRESH TOAST NOTIFICATION */}
      {successToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          {successToast}
        </div>
      )}

      {/* 2. CATEGORY HERO BANNER */}
      <section className="relative bg-stone-900 text-white overflow-hidden min-h-[300px] flex items-center md:rounded-b-2xl shadow-sm">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img
            src={IMAGES.bites_overhead}
            alt="Warm dates pattern background"
            className="w-full h-full object-cover filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 w-full relative z-10 text-left">
          
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="inline-block bg-white/10 text-stone-200 font-sans text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-sm w-max">
              Est. 2024 • Hand-Rolled
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight leading-none text-white">
              Artisanal Energy,<br />
              <span className="text-stone-300 italic">Naturally Sweet.</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-stone-300 max-w-xl leading-relaxed">
              Discover our signature Tahini Nut Bites. A sophisticated blend of organic select Medjool dates and creamy stone-ground tahini paste, slow-crafted in small batches for the conscious epicurean.
            </p>
          </div>

        </div>
      </section>

      {/* 3. TWO COLUMN SHOP ENGINE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COMPILER PANEL (Customizer & Specs) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Main Product Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-white p-6 rounded-lg border border-stone-200/50 shadow-sm">
            
            {/* Left Image aspect */}
            <div className="md:col-span-5 rounded-xl overflow-hidden aspect-square self-center shadow-inner border border-gray-100">
              <img
                src={datesPackImage}
                alt="Box of Tahini Nut Bites closeup"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Product Intro */}
            <div className="md:col-span-7 flex flex-col justify-between text-left gap-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-primary-dark tracking-tight">
                  Tahini Nut Bites
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-medjool-amber font-sans font-bold block mt-1">
                  Signature Collection
                </span>
              </div>

              {/* Pillars list detail */}
              <div className="space-y-3 mt-2">
                <div className="flex gap-3 text-xs">
                  <span className="p-1 px-2.5 bg-stone-50 border border-stone-200/50 rounded text-[9px] font-bold text-stone-600">
                    THE CORE
                  </span>
                  <p className="font-sans text-stone-500 self-center leading-relaxed">
                    100% Organic Medjool Dates sourced from sustainable groves.
                  </p>
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="p-1 px-2.5 bg-stone-50 border border-stone-200/50 rounded text-[9px] font-bold text-stone-600">
                    THE TWIST
                  </span>
                  <p className="font-sans text-stone-500 self-center leading-relaxed">
                    Stone-ground Ethiopian Tahini sesame seed cream for a savory depth.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quantity Size selection grid */}
          <div className="flex flex-col gap-4 text-left">
            <h3 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary-dark flex items-center gap-2">
              <span>Select Quantity</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-sans font-normal">(Box Weight Units)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOX_OPTIONS.map((box) => (
                <button
                  key={box.id}
                  onClick={() => setSelectedBoxId(box.id)}
                  className={`relative p-5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedBoxId === box.id
                      ? 'border-hairline ring-1 ring-stone-900 bg-stone-50 shadow-sm'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  {box.isPopular && (
                    <span className="absolute -top-2 right-4 bg-medjool-amber text-[#fff8f6] font-sans text-[8px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase">
                      Most Popular
                    </span>
                  )}
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-sans text-sm font-semibold text-primary-dark">{box.weight}</span>
                    <span className="font-sans text-sm font-semibold text-stone-900">€{box.price.toFixed(2)}</span>
                  </div>
                  <p className="font-sans text-[11px] text-stone-500">
                    Approx. {box.bitesCount} premium signature hand-rolled bites
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Individual Bars Counter option */}
          <div className="bg-white p-5 rounded-lg border border-stone-200/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-left gap-4">
            <div>
              <h4 className="font-sans text-sm font-semibold text-primary-dark">
                Individual Bar (40g)
              </h4>
              <p className="font-sans text-[11px] text-stone-500">
                Perfect for quick on-the-go pure pocket energy bites
              </p>
            </div>

            <div className="flex items-center gap-6 justify-between sm:justify-end">
              <span className="font-sans text-sm font-semibold text-stone-900">
                €4.50
              </span>
              <div className="flex items-center gap-3 bg-stone-100 rounded-md p-1 border border-stone-200/40">
                <button
                  onClick={() => setBarQty(prev => Math.max(0, prev - 1))}
                  className="w-7 h-7 rounded bg-white text-primary-dark flex items-center justify-center hover:bg-stone-50 disabled:opacity-40 cursor-pointer text-xs"
                  disabled={barQty === 0}
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="font-sans font-semibold text-xs px-2 text-stone-900 min-w-[16px] text-center">
                  {barQty}
                </span>
                <button
                  onClick={() => setBarQty(prev => prev + 1)}
                  className="w-7 h-7 rounded bg-white text-primary-dark flex items-center justify-center hover:bg-stone-50 cursor-pointer text-xs"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Trigger ADD TO SELECTION button */}
          <button
            onClick={handleAddSelection}
            className="w-full py-4 bg-primary-brown hover:bg-stone-900 text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-md transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            id="add-selection-btn"
          >
            <ShoppingCart className="w-4 h-4" />
            Add To Selection
          </button>

          {/* Lower Tabs detailing lists of ingredients or nutritional index */}
          <div className="bg-white rounded-lg border border-stone-200/60 overflow-hidden text-left shadow-sm">
            <div className="flex border-b border-stone-200/40">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 py-3 text-center font-sans text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'bg-stone-50 text-medjool-amber border-b border-medjool-amber'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                Ingredients List
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`flex-1 py-3 text-center font-sans text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  activeTab === 'nutrition'
                    ? 'bg-stone-50 text-medjool-amber border-b border-medjool-amber'
                    : 'text-stone-400 hover:text-stone-800'
                }`}
              >
                Nutrition Facts
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'ingredients' ? (
                <div className="space-y-4">
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    Our raw ingredients list contains nothing artificially synthesized. Raw organic plant food.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {INGREDIENTS_LIST.map((ing, i) => (
                      <div key={i} className="flex gap-2 text-xs text-gray-700 font-sans items-center">
                        <span className="w-2 h-2 rounded-full bg-medjool-amber shrink-0" />
                        <span>{ing}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-stone-200 mt-4">
                    <span className="bg-stone-100 text-stone-600 text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      Vegan Friendly
                    </span>
                    <span className="bg-stone-100 text-stone-600 text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      Gluten-Free
                    </span>
                    <span className="bg-stone-50 text-stone-600 text-[9px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      No Soy lecithin
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="border border-stone-200/60 p-3 rounded bg-stone-50/50">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider">Calories</span>
                      <strong className="block text-base text-primary-dark font-sans font-semibold">{NUTRITION_FACTS.calories}</strong>
                    </div>
                    <div className="border border-stone-200/60 p-3 rounded bg-stone-50/50">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider">Total Fat</span>
                      <strong className="block text-base text-primary-dark font-sans font-semibold">{NUTRITION_FACTS.fat.total}</strong>
                    </div>
                    <div className="border border-stone-200/60 p-3 rounded bg-stone-50/50">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider">Total Carbs</span>
                      <strong className="block text-base text-primary-dark font-sans font-semibold">{NUTRITION_FACTS.carbs.total}</strong>
                    </div>
                    <div className="border border-stone-200/60 p-3 rounded bg-stone-50/50">
                      <span className="text-[9px] text-stone-400 uppercase tracking-wider">Natural Sugar</span>
                      <strong className="block text-base text-primary-dark font-sans font-semibold">{NUTRITION_FACTS.carbs.sugar}</strong>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-400 italic">
                    * Values based on a serving size of {NUTRITION_FACTS.servingSize}. Hand-rolled portions might vary tiny fractions.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN ACTIVE CART SUM (Sticky Side-Cart) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg border border-stone-200/60 p-6 text-left sticky top-28 space-y-6 shadow-sm">
            
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <h3 className="font-sans text-sm uppercase tracking-wider font-semibold text-primary-dark">
                Your Selection
              </h3>
              <span className="bg-stone-100 text-stone-600 py-0.5 px-2.5 rounded text-[10px] font-semibold font-sans">
                {cart.reduce((ac, x) => ac + x.qty, 0)} Items
              </span>
            </div>

            {/* Selection list rows */}
            {cart.length === 0 ? (
              <div className="py-8 text-center space-y-3">
                <span className="text-2xl text-stone-300">☕</span>
                <p className="font-sans text-xs text-stone-400 leading-relaxed">
                  Your batch selection is currently empty.<br />Add a fresh box above!
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start gap-2 border-b border-stone-50 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <h4 className="font-sans text-xs font-semibold text-primary-dark">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-sans font-medium text-stone-500 bg-stone-50 border border-stone-200/40 rounded px-1">
                          Qty: {item.qty}
                        </span>
                        <span className="text-[10px] text-stone-400 font-sans">
                          {item.weight}
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <span className="font-sans text-xs font-bold text-stone-900">
                        €{item.priceTotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => {
                          onRemoveItem(item.id);
                          triggerToast('Removed item from selection.');
                        }}
                        className="p-1 text-stone-300 hover:text-stone-700 hover:bg-stone-50 rounded transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Math break block */}
            <div className="border-t border-stone-100 pt-4 space-y-2 text-xs">
              <div className="flex justify-between font-sans">
                <span className="text-stone-400">Subtotal</span>
                <span className="font-semibold text-stone-900">€{aggregateCartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm font-semibold pt-2 border-t border-stone-55">
                <span>Order Total</span>
                <span>€{aggregateCartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout proceed action */}
            {cart.length > 0 ? (
              <button
                onClick={() => onViewChange('checkout')}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-sans text-xs uppercase tracking-wider font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow"
                id="shop-proceed-checkout"
              >
                Proceed to Checkout
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                disabled
                className="w-full py-3.5 bg-stone-100 text-stone-400 font-sans text-xs uppercase tracking-wider font-semibold rounded-md cursor-not-allowed"
              >
                Add items to proceed
              </button>
            )}

            <div className="pt-2">
              <p className="text-[9px] text-stone-400 flex items-center justify-center gap-1">
                🛡️ Secure payment & carbon-neutral fulfillment guaranteed
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* 4. THREE CONCENTRIC ACCENTS BANNER AT FOOTER */}
      <section className="bg-stone-50 py-16 px-6 md:px-12 border-t border-stone-200/50 text-center">
        <p className="font-display italic text-lg sm:text-2xl font-light max-w-2xl mx-auto mb-10 text-primary-dark leading-relaxed">
          "Hand-rolled in small batches to ensure the perfect chewy texture and balanced crunch in every single bite."
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg border border-stone-200/40 flex flex-col items-center gap-2">
            <span className="text-lg">🌿</span>
            <h5 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary-dark">Sustainably Sourced</h5>
            <p className="font-sans text-xs text-stone-500 max-w-xs leading-relaxed">
              We partner directly with family date growers in humid alluvial plains that practice chemical-free agriculture.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-stone-200/40 flex flex-col items-center gap-2">
            <span className="text-lg">👩‍🍳</span>
            <h5 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary-dark">Artisanal Method</h5>
            <p className="font-sans text-xs text-stone-500 max-w-xs leading-relaxed">
              Continuous hand-inspecting before packing. Zero factory lines, heavy presses, or high heat.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-stone-200/40 flex flex-col items-center gap-2">
            <span className="text-lg">♻️</span>
            <h5 className="font-sans text-xs uppercase tracking-wider font-semibold text-primary-dark">Compostable Pack</h5>
            <p className="font-sans text-xs text-stone-500 max-w-xs leading-relaxed">
              Fully biodegradable wraps made of corn starch and soy ink. Disappears without trace in backyard soil.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
