import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import RecentActivityModal from './RecentActivityModal'
import './dashboard.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface DashboardCard {
  id: number
  title: string
  value: string | number
  icon: string
  trend?: string
  trendUp?: boolean
}

interface Activity {
  id: number
  description: string
  timestamp: string
  type: 'success' | 'info' | 'warning'
  icon: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  const cards: DashboardCard[] = [
    {
      id: 1,
      title: 'Total Users',
      value: '2,431',
      icon: '👥',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      id: 2,
      title: 'Revenue',
      value: '$12,345',
      icon: '💰',
      trend: '+8.2%',
      trendUp: true,
    },
    {
      id: 3,
      title: 'Orders',
      value: '1,234',
      icon: '📦',
      trend: '-3.1%',
      trendUp: false,
    },
    {
      id: 4,
      title: 'Conversion Rate',
      value: '3.24%',
      icon: '📈',
      trend: '+2.4%',
      trendUp: true,
    },
  ]

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 40000, 42000],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: unknown) {
            return '$' + (value as number).toLocaleString()
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const activities: Activity[] = [
    {
      id: 1,
      description: 'New user registration',
      timestamp: '2 hours ago',
      type: 'success',
      icon: '✓',
    },
    {
      id: 2,
      description: 'Payment processed successfully',
      timestamp: '4 hours ago',
      type: 'success',
      icon: '✓',
    },
    {
      id: 3,
      description: 'System maintenance scheduled',
      timestamp: '1 day ago',
      type: 'warning',
      icon: '⚠',
    },
    {
      id: 4,
      description: 'New feature deployed',
      timestamp: '2 days ago',
      type: 'info',
      icon: 'ℹ',
    },
  ]

  const handleLogout = () => {
    navigate('/auth/login')
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
          <a href="#" className="nav-item active">
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
          <a href="#" className="nav-item">
            <span className="nav-icon">📦</span>
            {sidebarOpen && <span>Orders</span>}
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
          <h1 className="dashboard-title">Welcome Back, Admin! 👋</h1>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
            <button
              className="notification-btn"
              onClick={() => setIsActivityModalOpen(true)}
              aria-label="View notifications"
            >
              🔔
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {/* Stats Cards */}
          <section className="stats-section">
            <h2 className="section-title">Overview</h2>
            <div className="stats-grid">
              {cards.map((card) => (
                <div key={card.id} className="stat-card">
                  <div className="card-header">
                    <span className="card-icon">{card.icon}</span>
                    {card.trend && (
                      <span
                        className={`card-trend ${card.trendUp ? 'up' : 'down'}`}
                      >
                        {card.trendUp ? '↑' : '↓'} {card.trend}
                      </span>
                    )}
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-value">{card.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="chart-card">
              <h2 className="section-title">Revenue Chart</h2>
              <div className="chart-wrapper">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="activity-card">
              <div className="activity-header">
                <h2 className="section-title">Recent Activity</h2>
                <span className="notification-badge">{activities.length}</span>
              </div>
              <div className="activity-list">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-notification ${activity.type}`}>
                      {activity.icon}
                    </div>
                    <div className="activity-details">
                      <p className="activity-description">
                        {activity.description}
                      </p>
                      <span className="activity-time">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <RecentActivityModal
        activities={activities.map((activity) => ({
          id: activity.id,
          title: activity.description,
          timestamp: activity.timestamp,
        }))}
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
      />
    </div>
  )
}
