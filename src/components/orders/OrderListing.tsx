import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  fetchUserOrders,
  formatCurrency,
  formatDate,
  getStatusColor,
  type Order,
} from '../../services/orderService'
import './order-listing.css'

export default function OrderListing() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        try {
          setLoading(true)
          const userOrders = await fetchUserOrders(user.id)
          setOrders(userOrders)
        } catch (error) {
          console.error('Failed to fetch orders:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    loadOrders()
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  const handleViewOrder = (orderId: string) => {
    // Placeholder for view order details
    console.log('View order:', orderId)
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">📊</div>
          {sidebarOpen && <span className="sidebar-title">Dashboard</span>}
        </div>

        <nav className="sidebar-nav">
          <a
            href="#"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault()
              navigate('/dashboard')
            }}
          >
            <span className="nav-icon">🏠</span>
            {sidebarOpen && <span>Home</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📊</span>
            {sidebarOpen && <span>Analytics</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👥</span>
            {sidebarOpen && <span>Users</span>}
          </a>
          <a
            href="#"
            className="nav-item active"
            onClick={(e) => {
              e.preventDefault()
              navigate('/orders')
            }}
          >
            <span className="nav-icon">📦</span>
            {sidebarOpen && <span>My Orders</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span>Settings</span>}
          </a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span className="nav-icon">🚪</span>
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <header className="dashboard-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
          <h1 className="dashboard-title">My Orders 📦</h1>
          <div className="header-actions">
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          <section className="orders-section">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h2>You have no orders yet</h2>
                <p>When you place orders, they will appear here.</p>
              </div>
            ) : (
              <div className="orders-table-container">
                <div className="orders-header">
                  <h2 className="section-title">Order History</h2>
                  <span className="order-count">{orders.length} orders</span>
                </div>
                <div className="table-wrapper">
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="order-id">{order.id}</td>
                          <td>{formatDate(order.date)}</td>
                          <td>
                            <span
                              className="status-badge"
                              style={{
                                backgroundColor: getStatusColor(order.status) + '20',
                                color: getStatusColor(order.status),
                              }}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td className="amount">
                            {formatCurrency(order.totalAmount)}
                          </td>
                          <td>
                            <button
                              className="view-btn"
                              onClick={() => handleViewOrder(order.id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
