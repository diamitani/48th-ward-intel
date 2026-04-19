export default function Dashboard() {
  const tools = [
    {
      id: 'feedback',
      icon: '🧠',
      title: 'Constituent Feedback Analyzer',
      description: 'Paste community comments, emails, or meeting notes. Get organized themes, sentiment analysis, key conflicts, and suggested messaging instantly.',
      tag: 'Intelligence',
      tagClass: 'tag-accent',
      stats: ['305 comments analyzed', 'Emanuel Development Data'],
    },
    {
      id: 'content',
      icon: '📬',
      title: 'Newsletter & Content Generator',
      description: 'Input one event or update. Get newsletter copy, Instagram captions, Facebook posts, tweets, and SMS alerts — all in the ward\'s voice.',
      tag: 'Communications',
      tagClass: 'tag-teal',
      stats: ['5 platforms', 'One-click copy'],
    },
    {
      id: 'assistant',
      icon: '🤖',
      title: 'Ward AI Assistant',
      description: 'Ask any question about 48th Ward services, office hours, permits, development updates, resources, and more. Trained on the48thward.org.',
      tag: 'Service',
      tagClass: 'tag-gold',
      stats: ['Full knowledge base', 'Instant answers'],
    },
  ];

  const wardStats = [
    { label: 'Neighborhoods', value: '3', detail: 'Edgewater • Andersonville • Uptown' },
    { label: 'Services Tracked', value: '20+', detail: 'Block parties to tree trimming' },
    { label: 'Blog Categories', value: '11', detail: 'Development, Events, Safety & more' },
    { label: 'Response Time', value: '2-3d', detail: 'Business days for inquiries' },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-hero">
        <div className="hero-content">
          <span className="tag tag-accent" style={{ marginBottom: '12px' }}>48th Ward • Chicago</span>
          <h1>Ward Intelligence Platform</h1>
          <p className="hero-subtitle">
            AI-powered tools for constituent analysis, content generation, and community engagement.
            Built to help the 48th Ward office make faster, more informed decisions.
          </p>
        </div>
        <div className="hero-glow" />
      </div>

      <div className="dashboard-stats">
        {wardStats.map((stat, i) => (
          <div key={i} className="stat-card card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-detail">{stat.detail}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Available Tools</h2>

      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div key={tool.id} className="tool-card card" style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="tool-header">
              <span className="tool-icon">{tool.icon}</span>
              <span className={`tag ${tool.tagClass}`}>{tool.tag}</span>
            </div>
            <h3>{tool.title}</h3>
            <p>{tool.description}</p>
            <div className="tool-stats">
              {tool.stats.map((stat, j) => (
                <span key={j} className="tool-stat">{stat}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-info card">
        <h3>🏛️ About This Platform</h3>
        <p>
          This platform was designed specifically for the Office of Alderwoman Leni Manaa-Hoppenworth
          to streamline constituent engagement, communications, and data analysis. All tools are
          trained on real 48th Ward data and match the office's communication style.
        </p>
        <div className="info-links">
          <a href="https://the48thward.org" target="_blank" rel="noopener noreferrer">the48thward.org</a>
          <a href="https://mailchi.mp/the48thward/newsletter-signup" target="_blank" rel="noopener noreferrer">Newsletter Signup</a>
          <a href="https://the48thward.org/service-request" target="_blank" rel="noopener noreferrer">Service Requests</a>
        </div>
      </div>
    </div>
  );
}
