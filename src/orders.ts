export interface Order {
  orderNumber: string;
  orderValue: number;
  orderDate: string;
  status: string;
}

export const orders: Order[] = [
  {
    orderNumber: '100',
    orderValue: 200,
    orderDate: 'Sep 27, 2026',
    status: 'Delivered',
  },
  {
    orderNumber: '101',
    orderValue: 149,
    orderDate: 'Sep 29, 2026',
    status: 'Shipped',
  },
  {
    orderNumber: '102',
    orderValue: 89,
    orderDate: 'Sep 25, 2026',
    status: 'Delayed',
  },
  {
    orderNumber: '103',
    orderValue: 320,
    orderDate: 'Sep 22, 2026',
    status: 'Delivered',
  },
  {
    orderNumber: '104',
    orderValue: 59,
    orderDate: 'Sep 28, 2026',
    status: 'Cancelled',
  },
  {
    orderNumber: '105',
    orderValue: 175,
    orderDate: 'Sep 30, 2026',
    status: 'Processing',
  },
];