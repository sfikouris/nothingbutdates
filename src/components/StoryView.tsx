import { useState } from 'react';
import { ArrowRight, Flame, Leaf, HelpCircle, Heart, Award, Sparkles, X, ChevronRight, Check } from 'lucide-react';
import { IMAGES } from '../data';
import { ViewName } from '../types';

interface StoryViewProps {
  onViewChange: (view: ViewName) => void;
}

export default function StoryView({ onViewChange }: StoryViewProps) {
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      title: '1. Sustainable Sourcing',
      description: 'We harvest sweet Medjool Dates from solar-irrigated palm groves that respect regional soil cycles.',
      detail: 'Our dates are selected for high moisture content and complex molasses undertones.',
      amberColor: 'text-[#91502c]'
    },
    {
      title: '2. Cold Destoning',
      description: 'Each single date is hand-pitted, cleaned, and pressure-inspected directly in our kitchen room.',
      detail: 'Standard industrial blades bruise date flesh; hand-pitting preserves original natural fibers.',
      amberColor: 'text-leaf-green'
    },
    {
      title: '3. Tahini Infusion',
      description: 'We stream slow-roasted, stone-ground Ethiopian sesame oil cream into the dates.',
      detail: 'This cuts the concentrated sweetness, rendering a savory, velvety, melt-in-the-mouth texture.',
      amberColor: 'text-pulp-orange'
    },
    {
      title: '4. Precision Roll',
      description: 'Hand-shaped on cool marble blocks to perfectly distribute premium crushed raw nuts.',
      detail: 'Exactly 22 grams per bite. No extruders, no artificial high heat, absolute texture integrity.',
      amberColor: 'text-[#4b2c20]'
    }
  ];

  return (
    <div className="w-full pb-20 bg-surface-bg">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1 text-left">
          <span className="font-label text-xs uppercase tracking-widest text-[#d98356] font-semibold">
            Hand-Rolled Tradition
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-primary-dark leading-[1.15] tracking-tight">
            Crafted with Intention,<br />
            <span className="font-display italic font-semibold text-medjool-amber">Rolled by Hand</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed max-w-lg">
            We believe that the finest snacks aren't made by complex industrial machines, but by hand-craft methods that understand the organic rhythm of raw texture and the true soul of uncompromised ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mt-4">
            <button
              onClick={() => onViewChange('shop')}
              className="px-8 py-3.5 bg-primary-brown hover:bg-neutral-800 text-white rounded-md font-sans font-medium text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              id="hero-shop-cta"
            >
              Shop Curated Selection
              <ArrowRight className="w-4 h-4 text-tahini-cream" />
            </button>
            <button
              onClick={() => {
                setShowProcessModal(true);
                setActiveStep(0);
              }}
              className="px-8 py-3.5 bg-stone-100 hover:bg-stone-200 text-primary-dark rounded-md font-sans font-medium text-xs uppercase tracking-wider transition-all duration-300 md:ml-2 text-center cursor-pointer"
              id="hero-process-cta"
            >
              Explore Our Process
            </button>
          </div>
        </div>

        {/* Hero image with decorative styling */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          <div className="relative rounded-lg overflow-hidden aspect-[4/5] w-full max-w-[500px] shadow-sm border border-stone-200/60">
            <img
              src={IMAGES.hero_dates}
              alt="Artisanal raw dates and tahini on rustic presentation table"
              className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            {/* Dark glass backdrop layout cover */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/40 to-transparent p-6 text-white">
              <span className="font-label text-[10px] uppercase tracking-wider text-stone-200">Featured Photo</span>
              <p className="font-sans text-xs italic">Our kitchen ingredients: Medjool dates, sesame, and raw nuts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BORN IN A SMALL KITCHEN SECTION */}
      <section className="bg-white py-16 md:py-24 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-lg overflow-hidden aspect-[16/10] shadow-sm border border-stone-200/50">
            <img
              src={IMAGES.kitchen_bars}
              alt="Raw hand rolled date bites on warm wood cutting boards"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col gap-6 text-left">
            <h2 className="font-display text-3xl md:text-4xl font-light text-primary-dark tracking-tight">
              Born in a Small Kitchen
            </h2>
            <div className="w-16 h-[1px] bg-medjool-amber" />
            <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed">
              Our story began in the simplest of ways: with a collective craving for something real. Tired of highly processed, preservative-laden protein bars lining public shelves, we stripped snacks back to their core. We took the softest dates and blended them with warm, freshly ground tahini cream.
            </p>
            <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed">
              What started as a simple family treat became a local passion for nutrient-dense snacking. Every recipe is a tribute to raw food, refined through months of kitchen trials to discover the exact sweet spots of chewy, creaminess, and toasted crunch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE PURITY OF TWO PILLARS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 mb-16">
          <span className="font-label text-xs uppercase tracking-widest text-[#d98356] font-semibold">The Core Blend</span>
          <h2 className="font-display text-3xl md:text-4xl font-light text-primary-dark tracking-tight">
            The Purity of Two Pillars
          </h2>
          <p className="font-sans text-xs md:text-sm text-stone-500 max-w-lg leading-relaxed">
            Our provisions are built on a solid foundation of absolute organic quality, sourced directly from pristine groves and stone mills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          {/* Pillar 1: Medjool Dates */}
          <div className="bg-white rounded-lg p-8 border border-stone-200/50 shadow-sm flex flex-col justify-between gap-8 hover:border-stone-400 transition-colors duration-300">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-medjool-amber">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-light text-primary-dark">Medjool Dates</h3>
              <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed">
                Known as 'the fruit of kings', our Medjool dates are sourced from sustainable groves where palm trees are nourished by pure aquifers. They are sun-ripened on the stem to achieve a rich caramel depth and buttery, luxurious texture.
              </p>
              <ul className="text-xs text-stone-500 font-sans space-y-1.5 list-disc pl-4 mt-2">
                <li>Rich in natural potassium and digestive fiber</li>
                <li>Zero refined sugars or high fructose additions</li>
                <li>Sun-dried naturally for maximum shelf stability</li>
              </ul>
            </div>
            <div>
              <span className="inline-block bg-stone-50 text-stone-600 font-sans text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-stone-200/40">
                Organic & Mineral Rich
              </span>
            </div>
          </div>

          {/* Pillar 2: Ethiopian Tahini */}
          <div className="bg-white rounded-lg p-8 border border-stone-200/50 shadow-sm flex flex-col justify-between gap-8 hover:border-stone-400 transition-colors duration-300">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-medjool-amber">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-light text-primary-dark">Ethiopian Tahini</h3>
              <p className="font-sans text-xs md:text-sm text-stone-600 leading-relaxed">
                We use exclusively premium Humera white sesame seeds from the historic volcanic soils of Ethiopia. The seeds are toasted on open-flame iron pans and slowly stone-ground, churning a thick dairy-free cream that keeps the healthy fats intact.
              </p>
              <ul className="text-xs text-stone-500 font-sans space-y-1.5 list-disc pl-4 mt-2">
                <li>Abundant source of calcium, zinc, and iron</li>
                <li>Provides a nutty, savory offset to date sweetness</li>
                <li>Silky emulsion without added vegetable oils</li>
              </ul>
            </div>
            <div>
              <span className="inline-block bg-stone-50 text-stone-600 font-sans text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm border border-stone-200/40">
                Stone-Ground & Pure
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SOUL OF SMALL BATCH SECTION */}
      <section className="bg-stone-50/50 py-24 px-6 md:px-12 border-y border-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left pictures grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden aspect-square shadow-sm border border-stone-200/50">
              <img
                src={IMAGES.hand_rolling}
                alt="Hand squeezing organic date energy balls meticulously"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-lg overflow-hidden aspect-square shadow-sm border border-stone-200/50 mt-6">
              <img
                src={IMAGES.jars_ingredients}
                alt="Beautiful dry storage jar with seeds and walnuts"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right points content */}
          <div className="flex flex-col gap-8 text-left">
            <div>
              <span className="font-label text-xs uppercase tracking-widest text-[#d98356] font-semibold">Our Philosophy</span>
              <h2 className="font-display text-3xl md:text-4xl font-light text-primary-dark tracking-tight mt-2">
                The Soul of Small Batch
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-stone-600 leading-relaxed">
              Industrial machinery crushes raw character. High speed extruders heat up tender nutrients, reducing natural taste to a uniform paste. We reject that. In our workshop, every single ball and bar is prepared, weighed, portioned, and hand-rolled.
            </p>

            {/* Point 1: Zero Machinery */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 shrink-0 bg-stone-100 text-stone-700 rounded-md flex items-center justify-center font-bold text-sm">
                🎛️
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-primary-dark">Zero Machinery</h4>
                <p className="font-sans text-xs text-stone-500 leading-relaxed mt-1">
                  We prioritize tactile control. Hand-kneaded date batter guarantees pockets of crunch, flake, and creamy paste that machines erase.
                </p>
              </div>
            </div>

            {/* Point 2: Small Batch Integrity */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 shrink-0 bg-stone-100 text-stone-700 rounded-md flex items-center justify-center font-bold text-sm">
                📦
              </div>
              <div>
                <h4 className="font-sans text-sm font-semibold text-primary-dark">Small Batch Integrity</h4>
                <p className="font-sans text-xs text-stone-500 leading-relaxed mt-1">
                  We mix in micro batches of only 42 boxes each day. This ensures strict organic inspection and unparalleled pantry freshness.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BRAND VALUE ACCENTS BLOCK (Earthy strip with icons) */}
      <section className="bg-primary-brown text-[#fff8f6] py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#fff8f6]/10 flex items-center justify-center text-tahini-cream text-lg">
              🍃
            </div>
            <h4 className="font-display text-lg font-bold">Organic Always</h4>
            <p className="font-sans text-xs text-tahini-cream/80 max-w-xs leading-relaxed">
              Strictly non-GMO dates grown without any synthetic chemical fertilizers, herbicides, or synthetic chemical pesticides. Verified sustainable agriculture.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4 border-y md:border-y-0 md:border-x border-[#fff8f6]/10">
            <div className="w-12 h-12 rounded-full bg-[#fff8f6]/10 flex items-center justify-center text-tahini-cream text-lg">
              ♻️
            </div>
            <h4 className="font-display text-lg font-bold">Plastic-Free</h4>
            <p className="font-sans text-xs text-tahini-cream/80 max-w-xs leading-relaxed">
              Our boxes and wraps are made from 100% biodegradable bamboo paper and plant resin. Zero microplastic pollution left behind.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#fff8f6]/10 flex items-center justify-center text-tahini-cream text-lg">
              🤝
            </div>
            <h4 className="font-display text-lg font-bold">Ethical Sourcing</h4>
            <p className="font-sans text-xs text-tahini-cream/80 max-w-xs leading-relaxed">
              Direct trade relationships. We secure crop price floors above free trade levels to ensure fair living wages for our farming partners.
            </p>
          </div>

        </div>
      </section>

      {/* 6. PROCESS OVERLAY MODAL */}
      {showProcessModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-primary-dark/80 backdrop-blur-sm">
          <div className="bg-[#fff8f6] rounded-2xl w-full max-w-2xl overflow-hidden border-2 border-primary-brown shadow-2xl relative">
            
            {/* Header */}
            <div className="bg-[#f5ece9] px-6 py-5 border-b border-[#eae1de] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-medjool-amber" />
                <h3 className="font-display text-xl font-bold text-primary-dark">Our Hand-Rolling Process</h3>
              </div>
              <button
                onClick={() => setShowProcessModal(false)}
                className="p-1 px-2.5 rounded-lg text-primary-dark hover:bg-gray-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {processSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-colors ${
                      idx <= activeStep ? 'bg-medjool-amber' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              <div className="min-h-[140px] flex flex-col gap-3 text-left">
                <h4 className={`font-display text-2xl font-extrabold ${processSteps[activeStep].amberColor}`}>
                  {processSteps[activeStep].title}
                </h4>
                <p className="font-sans text-base text-primary-brown font-semibold leading-relaxed">
                  {processSteps[activeStep].description}
                </p>
                <p className="font-sans text-sm text-[rgba(31,27,25,0.7)] italic">
                  — {processSteps[activeStep].detail}
                </p>
              </div>

              {/* Navigation arrows inside modal */}
              <div className="flex items-center justify-between pt-4 border-t border-[#eae1de]">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-bold font-sans text-primary-brown disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-gray-400 font-sans">
                  Step {activeStep + 1} of {processSteps.length}
                </span>
                {activeStep < processSteps.length - 1 ? (
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(processSteps.length - 1, prev + 1))}
                    className="px-5 py-2.5 bg-medjool-amber text-[#fff8f6] rounded-lg text-xs font-bold font-sans flex items-center gap-1 cursor-pointer"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowProcessModal(false);
                      onViewChange('shop');
                    }}
                    className="px-5 py-2.5 bg-leaf-green text-white rounded-lg text-xs font-bold font-sans flex items-center gap-1 cursor-pointer animate-pulse"
                  >
                    Enter Shop <Check className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
