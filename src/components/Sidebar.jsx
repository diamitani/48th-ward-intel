import { useState } from 'react';

const internalTools = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'feedback', label: 'Feedback Analyzer', icon: '🧠' },
  { id: 'content', label: 'Content Generator', icon: '📬' },
  { id: 'assistant', label: 'Staff Assistant', icon: '🤖' },
];

const publicTools = [
  { id: 'constituent', label: 'Constituent Bot', icon: '🌐' },
  { id: 'proposal', label: 'Proposal', icon: '📋' },
];

export default function Sidebar({ activeView, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">48</div>
          {!collapsed && (
            <div className="brand-text">
              <span className="brand-name">Ward Intel</span>
              <span className="brand-sub">48th Ward • Chicago</span>
            </div>
          )}
        </div>
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!collapsed && <div className="sidebar-section-label">INTERNAL TOOLS</div>}
        {internalTools.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
            {activeView === item.id && <span className="sidebar-indicator" />}
          </button>
        ))}

        <div className="sidebar-divider" />
        {!collapsed && <div className="sidebar-section-label">PUBLIC TOOLS</div>}
        {publicTools.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
            {activeView === item.id && <span className="sidebar-indicator" />}
          </button>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-badge">
            <span className="badge-dot" />
            <span className="badge-text">AI-Powered</span>
          </div>
          <div className="sidebar-credit">
            Built for the 48th Ward
          </div>
        </div>
      )}
    </aside>
  );
}
