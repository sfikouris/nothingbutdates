import type { OrderDetails, SelectedItem } from './types';

interface OrderSubmission extends OrderDetails {
  cart: SelectedItem[];
  subtotal: number;
  grandTotal: number;
  orderNumber: string;
}

export async function submitOrder(endpoint: string | undefined, order: OrderSubmission) {
  if (!endpoint || !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) {
    throw new Error('Online ordering is not available yet. Please try again later.');
  }
  if (order.cart.length === 0) {
    throw new Error('Please add an item to your basket before placing an order.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      subject: `Nothing But Dates order ${order.orderNumber}`,
      orderNumber: order.orderNumber,
      fullName: order.fullName,
      telephone: order.telephone,
      ...(order.email.trim() ? { email: order.email.trim() } : {}),
      pickupDate: order.pickupDate,
      specialRequests: order.specialRequests || 'None',
      items: order.cart.map(item =>
        `${item.name} (${item.weight}) × ${item.qty} — €${item.priceTotal.toFixed(2)}`
      ).join('\n'),
      subtotal: `€${order.subtotal.toFixed(2)}`,
      grandTotal: `€${order.grandTotal.toFixed(2)}`,
      payment: 'Pay on collection; no payment taken online',
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'Ordering is temporarily unavailable. Please try again later.'
      : 'Your order could not be submitted. Please try again.');
  }
  const data = await response.json();
  if (data.ok !== true) {
    throw new Error('Your order was not confirmed by the order service. Please try again.');
  }
}
