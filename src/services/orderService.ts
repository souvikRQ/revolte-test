export interface Order {
  id: string
  date: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  totalAmount: number
  items: number
}

// Mock orders data for different users
const mockOrders: Record<string, Order[]> = {
  'user-001': [
    {
      id: 'ORD-001',
      date: '2024-05-20',
      status: 'completed',
      totalAmount: 299.99,
      items: 3,
    },
    {
      id: 'ORD-002',
      date: '2024-05-18',
      status: 'processing',
      totalAmount: 149.50,
      items: 2,
    },
    {
      id: 'ORD-003',
      date: '2024-05-15',
      status: 'completed',
      totalAmount: 89.99,
      items: 1,
    },
    {
      id: 'ORD-004',
      date: '2024-05-10',
      status: 'cancelled',
      totalAmount: 199.99,
      items: 2,
    },
    {
      id: 'ORD-005',
      date: '2024-05-05',
      status: 'completed',
      totalAmount: 449.99,
      items: 5,
    },
  ],
}

export async function fetchUserOrders(userId: string): Promise<Order[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  
  // Return orders for the user, or empty array if no orders
  return mockOrders[userId] || []
}

export function getStatusColor(status: Order['status']): string {
  switch (status) {
    case 'completed':
      return '#10b981'
    case 'processing':
      return '#3b82f6'
    case 'pending':
      return '#f59e0b'
    case 'cancelled':
      return '#ef4444'
    default:
      return '#6b7280'
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
