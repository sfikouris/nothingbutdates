import { ShoppingBag, Eye, Heart, Leaf } from 'lucide-react';
import { ViewName, SelectedItem } from '../types';

interface NavbarProps {
  currentView: ViewName;
  onViewChange: (view: ViewName) => void;
  cart: SelectedItem[];
}

export default function Navbar({ currentView, onViewChange, cart }: NavbarProps) {
  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 bg-surface-bg/80 backdrop-blur-md border-b border-stone-200/40 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => onViewChange('shop')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
          id="nav-logo"
        >
          <Leaf className="w-4 h-4 text-medjool-amber transition-transform duration-500 ease-out group-hover:scale-110" />
          <span className="font-display text-2xl font-medium text-primary-dark tracking-wide">
            Nothing But Dates
          </span>
        </button>

        {/* Center navigation */}
        <nav className="flex items-center gap-8 md:gap-10">
          <button
            onClick={() => onViewChange('shop')}
            className={`font-sans text-xs uppercase tracking-wider font-semibold transition-all py-1 relative cursor-pointer ${
              currentView === 'shop'
                ? 'text-medjool-amber'
                : 'text-stone-400 hover:text-stone-800'
            }`}
            id="nav-shop-btn"
          >
            Shop
            {currentView === 'shop' && (
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-medjool-amber" />
            )}
          </button>
        </nav>

        {/* Cart Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => onViewChange('shop')}
            aria-label="View selection"
            className="relative p-2 text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            id="nav-cart-btn"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-medjool-amber text-[#fff8f6] text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-surface-bg">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
