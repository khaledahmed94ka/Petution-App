const SYNC_URL = import.meta.env.VITE_SHOPIFY_SYNC_URL || 'https://petution-workspace.onrender.com/api/sync';

const SHOP_DOMAIN = /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/;

export const isValidShopDomain = (shop) => SHOP_DOMAIN.test(String(shop || '').trim().toLowerCase());

// Sends a record to the clinic's own Shopify store. Does nothing unless the clinic
// switched sync on in Settings -> Integrations and entered its store domain.
export const syncToShopify = async ({ settings, getIdToken }, type, action, data) => {
  const shop = String(settings?.shopifyShop || '').trim().toLowerCase();
  if (!settings?.shopifySyncEnabled || !isValidShopDomain(shop)) return;

  const token = getIdToken ? await getIdToken() : null;
  const response = await fetch(SYNC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify({ shop, type, action, data })
  });
  if (!response.ok) {
    throw new Error(`Shopify sync failed (HTTP ${response.status})`);
  }
};
