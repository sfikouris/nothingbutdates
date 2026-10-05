/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StoryView from './components/StoryView';
import ShopView from './components/ShopView';
import CheckoutView from './components/CheckoutView';
import { ViewName, SelectedItem, BoxOption } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewName>('story');
  
  // Initialize with some dummy preloaded items to perfectly match "Screen 2" and "Screen 3" from the user request
  const [cart, setCart] = useState<SelectedItem[]>([
    {
      id: 'box-750g',
      name: 'Tahini Nut Bites - 750g Box',
      type: 'box',
      weight: 'Approx. 26 pieces',
      qty: 1,
      priceSingle: 34.0,
      priceTotal: 34.0
    },
    {
      id: 'individual-bar',
      name: 'Individual Bars',
      type: 'bar',
      weight: '40G SNACK BAR',
      qty: 2,
      priceSingle: 3.5,
      priceTotal: 7.0
    }
  ]);

  // Scroll to top on page transition for smooth seamless feel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleAddBox = (box: BoxOption) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === box.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        const nextQty = updated[existingIdx].qty + 1;
        updated[existingIdx] = {
          ...updated[existingIdx],
          qty: nextQty,
          priceTotal: nextQty * updated[existingIdx].priceSingle,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: box.id,
            name: `Tahini Nut Bites - ${box.weight}`,
            type: 'box',
            weight: `Approx. ${box.bitesCount} pieces`,
            qty: 1,
            priceSingle: box.price,
            priceTotal: box.price,
          },
        ];
      }
    });
  };

  const handleAddBars = (qty: number) => {
    if (qty <= 0) return;
    setCart((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === 'individual-bar');
      if (existingIdx > -1) {
        const updated = [...prev];
        const nextQty = updated[existingIdx].qty + qty;
        updated[existingIdx] = {
          ...updated[existingIdx],
          qty: nextQty,
          priceTotal: nextQty * updated[existingIdx].priceSingle,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: 'individual-bar',
            name: 'Individual Bars',
            type: 'bar',
            weight: '40G SNACK BAR',
            qty,
            priceSingle: 4.5,
            priceTotal: qty * 4.5,
          },
        ];
      }
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-surface-bg antialiased selection:bg-medjool-amber/20 selection:text-primary-dark">
      
      {/* GLOBAL NAVIGATION HEADER */}
      <Navbar currentView={currentView} onViewChange={setCurrentView} cart={cart} />

      {/* CORE SCREENS DISPATCH ROUTER */}
      <main className="flex-1">
        {currentView === 'story' && (
          <StoryView onViewChange={setCurrentView} />
        )}

        {currentView === 'shop' && (
          <ShopView
            cart={cart}
            onAddBox={handleAddBox}
            onAddBars={handleAddBars}
            onRemoveItem={handleRemoveItem}
            onViewChange={setCurrentView}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            cart={cart}
            onClearCart={handleClearCart}
            onViewChange={setCurrentView}
          />
        )}
      </main>

      {/* GLOBAL HIGH-CONTRAST CRAFTED FOOTER */}
      <Footer />

    </div>
  );
}

