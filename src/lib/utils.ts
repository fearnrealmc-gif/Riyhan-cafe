

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(amount: number, currency = 'USD'): string {
  if (currency === 'SYP') {
    return `${amount.toLocaleString('ar-SY')} ل.س`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function generateCartId(
  productId: string,
  size: string,
  addonNames: string[]
): string {
  const sortedAddons = [...addonNames].sort().join('|');
  return `${productId}__${size}__${sortedAddons}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    new: 'New Order',
    preparing: 'Preparing',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };
  return labels[status] || status;
}

export function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
