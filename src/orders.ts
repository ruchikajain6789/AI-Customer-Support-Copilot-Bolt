export interface Order {
  orderNumber: string;
  orderValue: number;
  orderDate: string;
  status: string;
}

export const orders: Order[] = [
  {
    orderNumber: 'ORD-28491',
    orderValue: 200,
    orderDate: 'Sep 27, 2026',
    status: 'Delivered',
  },
  {
    orderNumber: 'ORD-12356',
    orderValue: 149,
    orderDate: 'Sep 29, 2026',
    status: 'Shipped',
  },
  {
    orderNumber: 'ORD-45678',
    orderValue: 89,
    orderDate: 'Sep 25, 2026',
    status: 'Delayed',
  },
  {
    orderNumber: 'ORD-78901',
    orderValue: 320,
    orderDate: 'Sep 22, 2026',
    status: 'Delivered',
  },
  {
    orderNumber: 'ORD-11223',
    orderValue: 59,
    orderDate: 'Sep 28, 2026',
    status: 'Cancelled',
  },
];