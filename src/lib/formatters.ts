export function formatCurrency(value: number, currency: string = 'BRL'): string {
  if (isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency,
  }).format(value);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('pt-BR');
  } catch {
    return dateString;
  }
}

export function calculateSubtotal(items: { quantity: number; unitPrice: number }[]): number {
  return items.reduce((acc, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return acc + qty * price;
  }, 0);
}

export function calculateDiscountAmount(
  subtotal: number,
  discount: number,
  discountType: 'percentage' | 'fixed'
): number {
  const disc = Number(discount) || 0;
  if (disc <= 0) return 0;
  if (discountType === 'percentage') {
    return (subtotal * disc) / 100;
  }
  return Math.min(disc, subtotal);
}

export function calculateTotal(
  subtotal: number,
  discountAmount: number
): number {
  return Math.max(0, subtotal - discountAmount);
}
