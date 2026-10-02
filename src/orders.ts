export interface Order {
  orderNumber: string;
  customerName: string;
  orderValue: number;
  orderDate: string;
  orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Delayed' | 'Cancelled';
}

export const orders: Order[] = [
  {
    orderNumber: '101',
    customerName: 'Sarah Miller',
    orderValue: 149.99,
    orderDate: 'Sep 28, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '102',
    customerName: 'James Wilson',
    orderValue: 89.50,
    orderDate: 'Sep 29, 2026',
    orderStatus: 'Delivered',
  },
  {
    orderNumber: '103',
    customerName: 'Emma Davis',
    orderValue: 249.00,
    orderDate: 'Sep 30, 2026',
    orderStatus: 'Processing',
  },
  {
    orderNumber: '104',
    customerName: 'Daniel Brown',
    orderValue: 59.99,
    orderDate: 'Oct 1, 2026',
    orderStatus: 'Delayed',
  },
  {
    orderNumber: '105',
    customerName: 'Olivia Taylor',
    orderValue: 179.99,
    orderDate: 'Oct 1, 2026',
    orderStatus: 'Delivered',
  },
  {
    orderNumber: '106',
    customerName: 'Michael Anderson',
    orderValue: 329.00,
    orderDate: 'Oct 1, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '107',
    customerName: 'Sophia Thomas',
    orderValue: 74.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Processing',
  },
  {
    orderNumber: '108',
    customerName: 'William Jackson',
    orderValue: 199.50,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '109',
    customerName: 'Ava White',
    orderValue: 129.00,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Delivered',
  },
  {
    orderNumber: '110',
    customerName: 'Ethan Harris',
    orderValue: 449.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Delayed',
  },
  {
    orderNumber: '111',
    customerName: 'Mia Martin',
    orderValue: 99.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Processing',
  },
  {
    orderNumber: '112',
    customerName: 'Noah Thompson',
    orderValue: 279.00,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '113',
    customerName: 'Isabella Garcia',
    orderValue: 159.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Delivered',
  },
  {
    orderNumber: '114',
    customerName: 'Lucas Martinez',
    orderValue: 219.00,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Processing',
  },
  {
    orderNumber: '115',
    customerName: 'Amelia Robinson',
    orderValue: 69.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '116',
    customerName: 'Benjamin Clark',
    orderValue: 389.00,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Delayed',
  },
  {
    orderNumber: '117',
    customerName: 'Charlotte Lewis',
    orderValue: 119.50,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Delivered',
  },
  {
    orderNumber: '118',
    customerName: 'Henry Lee',
    orderValue: 299.99,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Shipped',
  },
  {
    orderNumber: '119',
    customerName: 'Grace Walker',
    orderValue: 139.00,
    orderDate: 'Oct 2, 2026',
    orderStatus: 'Processing',
  },
];