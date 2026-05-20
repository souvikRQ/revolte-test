import './recent-activity-modal.css'

interface Activity {
  id: number
  title: string
  timestamp: string
}

interface RecentActivityModalProps {
  activities: Activity[]
  isOpen: boolean
  onClose: () => void
}

export default function RecentActivityModal({
  activities,
  isOpen,
  onClose,
}: RecentActivityModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="recent-activity-modal">
        <div className="modal-header">
          <h2 className="modal-title">Recent Activity</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-content">
          <div className="activity-list">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-time">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
