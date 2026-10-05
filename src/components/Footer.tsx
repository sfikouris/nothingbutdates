import React from 'react';
import { Sparkles, Leaf, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f0e6e2] text-primary-dark pt-16 pb-8 border-t border-[#eae1de]/60 px-6 md:px-12 paper-texture">
      <div className="max-w-7xl mx-auto mb-12">
        {/* Brand Mission */}
        <div className="flex flex-col gap-4 max-w-xl">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-medjool-amber" />
            <h3 className="font-display text-xl font-bold tracking-tight">Nothing But Dates</h3>
          </div>
          <p className="font-sans text-sm text-[rgba(31,27,25,0.7)] leading-relaxed">
            Crafting the world's most honest snack provisions. Made in organic small-batches, hand-rolled with whole ingredients from our home kitchen to your shelf.
          </p>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-leaf-green font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Hand-Rolled
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#91502c] font-medium">
              <Shield className="w-3.5 h-3.5" /> 100% Organic
            </span>
          </div>
        </div>
      </div>

      {/* Row credits & links */}
      <div className="max-w-7xl mx-auto border-t border-[#eae1de]/60 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#83746f] gap-4">
        <span>
          © 2026 Nothing But Dates. Rooted in Nature. Hand-Rolled in Small Batches.
        </span>
        <div className="flex gap-6">
          <a href="#privacy" className="hover:underline" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#shipping" className="hover:underline" onClick={(e) => e.preventDefault()}>Shipping & Returns</a>
          <a href="#terms" className="hover:underline" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#contact" className="hover:underline" onClick={(e) => e.preventDefault()}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
