import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import FeedbackAnalyzer from './components/FeedbackAnalyzer';
import ContentGenerator from './components/ContentGenerator';
import WardAssistant from './components/WardAssistant';
import ConstituentBot from './components/ConstituentBot';
import Proposal from './components/Proposal';
import './App.css';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'feedback': return <FeedbackAnalyzer />;
      case 'content': return <ContentGenerator />;
      case 'assistant': return <WardAssistant />;
      case 'constituent': return <ConstituentBot />;
      case 'proposal': return <Proposal />;
      default: return <Dashboard />;
    }
  };

  const handleNavigate = (view) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Mobile header */}
      <header className="mobile-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        <div className="mobile-brand">
          <span className="brand-icon-sm">48</span>
          <span>Ward Intel</span>
        </div>
      </header>

      {/* Sidebar overlay for mobile */}
      {mobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className={`sidebar-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      </div>

      <main className="main-content">
        <div className="content-wrapper">
          {renderView()}
        </div>
      </main>

      {/* Demo Banner */}
      <div className="demo-banner">
        <span className="demo-pulse" />
        <span>DEMO</span> — Built by Patrick Diamitani for the 48th Ward
      </div>

      {/* Background ambient effects */}
      <div className="ambient-bg">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>
    </div>
  );
}
