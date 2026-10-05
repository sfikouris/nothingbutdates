import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { submitOrder } from '../src/submitOrder';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

const order = {
  fullName: 'Test Customer', telephone: '+123456789', email: '',
  pickupDate: '2027-01-10', specialRequests: 'Test order',
  cart: [{ id: 'box-250g', name: '250g Box', type: 'box' as const,
    weight: '9 pieces', qty: 2, priceSingle: 10, priceTotal: 20 }],
  subtotal: 20, shippingFee: 4.5, grandTotal: 24.5, orderNumber: 'NBD-TEST',
};
const endpoint = 'https://formspree.io/f/abcdefgh';

test('missing or untrusted endpoint fails before transmitting customer details', async () => {
  globalThis.fetch = async () => { assert.fail('Must not send'); };
  for (const url of [undefined, 'https://example.com/f/abcdefgh', 'https://formspree.io.evil.com/f/a']) {
    await assert.rejects(submitOrder(url, order), /not available/);
  }
});

test('empty baskets are not submitted', async () => {
  globalThis.fetch = async () => { assert.fail('Must not send'); };
  await assert.rejects(submitOrder(endpoint, { ...order, cart: [] }), /add an item/);
});

test('accepted submission includes readable basket and totals; omits blank reply-to', async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(url, endpoint);
    assert.equal(options?.method, 'POST');
    const body = JSON.parse(options?.body as string);
    assert.equal(body.items, '250g Box (9 pieces) × 2 — €20.00');
    assert.equal(body.grandTotal, '€24.50');
    assert.equal(body.telephone, order.telephone);
    assert.equal(body.orderNumber, order.orderNumber);
    assert.equal('email' in body, false);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  await submitOrder(endpoint, order);
});

test('HTTP errors including quota exhaustion do not confirm orders', async () => {
  for (const status of [400, 429, 500]) {
    globalThis.fetch = async () => new Response('{}', { status });
    await assert.rejects(submitOrder(endpoint, order));
  }
});

test('HTTP success without explicit acceptance does not confirm orders', async () => {
  for (const body of ['{}', '{"ok":false}', '<html>Unexpected response</html>']) {
    globalThis.fetch = async () => new Response(body, { status: 200 });
    await assert.rejects(submitOrder(endpoint, order));
  }
});

test('network failures propagate instead of generating a local confirmation', async () => {
  globalThis.fetch = async () => { throw new TypeError('Network unavailable'); };
  await assert.rejects(submitOrder(endpoint, order), /Network unavailable/);
});
