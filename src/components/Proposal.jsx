export default function Proposal() {
  return (
    <div className="proposal fade-in">
      <div className="tool-page-header">
        <div>
          <h1>📋 Implementation Proposal</h1>
          <p>Full proposal for building and deploying the Ward Intelligence Platform for the 48th Ward Office.</p>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="card proposal-section">
        <div className="proposal-badge">EXECUTIVE SUMMARY</div>
        <h2>Ward Intel — AI-Powered Intelligence Tools for the 48th Ward</h2>
        <p className="proposal-lead">
          This platform transforms the 48th Ward's constituent engagement workflow from manual review 
          to AI-assisted analysis. It reduces the time staff spend on feedback triage, content creation, 
          and constituent inquiries — while keeping humans in control of every decision.
        </p>
        <div className="proposal-stats-row">
          <div className="proposal-stat">
            <span className="proposal-stat-value">80%</span>
            <span className="proposal-stat-label">Time saved on feedback analysis</span>
          </div>
          <div className="proposal-stat">
            <span className="proposal-stat-value">5→1</span>
            <span className="proposal-stat-label">One input → all platforms</span>
          </div>
          <div className="proposal-stat">
            <span className="proposal-stat-value">24/7</span>
            <span className="proposal-stat-label">Constituent self-service</span>
          </div>
          <div className="proposal-stat">
            <span className="proposal-stat-value">$0</span>
            <span className="proposal-stat-label">Infrastructure cost (free tier)</span>
          </div>
        </div>
      </div>

      {/* What You're Looking At */}
      <div className="card proposal-section">
        <div className="proposal-badge accent">THIS DEMO</div>
        <h2>What This Demo Includes</h2>
        <div className="proposal-tools">
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🧠</div>
            <div>
              <h4>Feedback Analyzer</h4>
              <p>Paste 305 Emanuel development comments → get organized themes, sentiment breakdown, geographic clusters, and draft messaging in 3 tone options. Drag-and-drop file upload supports CSV, TXT, JSON, and MD files.</p>
              <span className="tag tag-teal">Working with live AI</span>
            </div>
          </div>
          <div className="proposal-tool">
            <div className="proposal-tool-icon">📬</div>
            <div>
              <h4>Content Generator</h4>
              <p>Input one event (like the Shred & Electronics event) → get newsletter HTML, Instagram caption, Facebook post, Twitter/X post, and SMS alert. All in the ward's voice.</p>
              <span className="tag tag-teal">Working with live AI</span>
            </div>
          </div>
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🤖</div>
            <div>
              <h4>Staff Assistant</h4>
              <p>Internal AI chatbot trained on the full 48thward.org website (527 pages). Answers staff questions about services, permits, development projects, construction schedules, and more.</p>
              <span className="tag tag-teal">Working with live AI</span>
            </div>
          </div>
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🌐</div>
            <div>
              <h4>Constituent Bot</h4>
              <p>Public-facing chatbot widget that can be embedded on the48thward.org. Answers resident questions 24/7 without exposing internal data. Sanitized prompt prevents political commentary.</p>
              <span className="tag tag-teal">Working with live AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Technically */}
      <div className="card proposal-section">
        <div className="proposal-badge">ARCHITECTURE</div>
        <h2>How It Works</h2>
        <div className="arch-diagram">
          <div className="arch-layer">
            <div className="arch-label">FRONTEND (React)</div>
            <div className="arch-items">
              <span>Dashboard</span><span>Feedback Analyzer</span><span>Content Generator</span>
              <span>Staff Assistant</span><span>Constituent Bot</span>
            </div>
          </div>
          <div className="arch-arrow">↓ Secure API Call ↓</div>
          <div className="arch-layer highlight">
            <div className="arch-label">SERVERLESS API (Vercel)</div>
            <div className="arch-items">
              <span>API key stored server-side</span><span>Never exposed to browser</span>
            </div>
          </div>
          <div className="arch-arrow">↓ Authenticated Request ↓</div>
          <div className="arch-layer">
            <div className="arch-label">AI PROVIDER (DeepSeek / OpenAI)</div>
            <div className="arch-items">
              <span>Processes text → returns structured analysis</span>
            </div>
          </div>
        </div>
        <div className="proposal-callout">
          <strong>🔒 Security:</strong> No constituent data is stored. All processing happens in-session. 
          The API key never touches the browser. The ward office controls the AI provider and can switch 
          between DeepSeek, OpenAI, or Anthropic at any time.
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="card proposal-section">
        <div className="proposal-badge accent">TIMELINE</div>
        <h2>Implementation Plan</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker done">✓</div>
            <div className="timeline-content">
              <h4>Phase 1: Demo Build <span className="tag tag-teal">COMPLETE</span></h4>
              <p>Full working prototype with all 4 tools, live AI integration, and ward knowledge base from 527 website pages.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker current">2</div>
            <div className="timeline-content">
              <h4>Phase 2: Deployment & Testing <span className="tag tag-gold">1-2 WEEKS</span></h4>
              <ul>
                <li>Deploy to Vercel (ward gets their own URL)</li>
                <li>Set up API key in Vercel environment variables</li>
                <li>Staff testing with real constituent data</li>
                <li>Refine prompts based on staff feedback</li>
                <li>Add password protection for internal tools</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker">3</div>
            <div className="timeline-content">
              <h4>Phase 3: Integration <span className="tag tag-purple">2-4 WEEKS</span></h4>
              <ul>
                <li>Embed constituent bot on the48thward.org</li>
                <li>Connect to existing workflows (Squarespace, Mailchimp)</li>
                <li>Train staff on daily usage</li>
                <li>Knowledge base updates from new blog posts</li>
              </ul>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker">4</div>
            <div className="timeline-content">
              <h4>Phase 4: Optimization <span className="tag tag-purple">ONGOING</span></h4>
              <ul>
                <li>Analytics on constituent bot usage patterns</li>
                <li>Expand knowledge base with new content</li>
                <li>Multi-language support (Spanish, Vietnamese, etc.)</li>
                <li>Integration with 311 API for real-time service tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cost */}
      <div className="card proposal-section">
        <div className="proposal-badge">COSTS</div>
        <h2>Operating Costs</h2>
        <table className="proposal-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Monthly Cost</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vercel Hosting</td>
              <td className="cost-free">$0</td>
              <td>Free tier handles ward-scale traffic</td>
            </tr>
            <tr>
              <td>AI API (DeepSeek)</td>
              <td>~$5-20</td>
              <td>Based on usage — ~500 queries/month</td>
            </tr>
            <tr>
              <td>Domain (optional)</td>
              <td>$0</td>
              <td>Can use Vercel subdomain or custom</td>
            </tr>
            <tr>
              <td>Database</td>
              <td className="cost-free">$0</td>
              <td>No database needed for MVP</td>
            </tr>
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td><strong>~$5-20/mo</strong></td>
              <td>Scales with usage</td>
            </tr>
          </tbody>
        </table>
        <div className="proposal-callout">
          <strong>💡 For comparison:</strong> A single commercial civic engagement platform like Bang The Table 
          or PublicInput costs $15,000-50,000/year. This platform costs under $240/year.
        </div>
      </div>

      {/* Handoff */}
      <div className="card proposal-section">
        <div className="proposal-badge accent">OWNERSHIP</div>
        <h2>Transfer & Compliance</h2>
        <div className="proposal-tools">
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🔐</div>
            <div>
              <h4>Data Privacy</h4>
              <p>No constituent data is stored or persisted. All processing is in-session only. No cookies, no tracking, no database. Compliant with City of Chicago data handling practices.</p>
            </div>
          </div>
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🏛️</div>
            <div>
              <h4>Full Ownership</h4>
              <p>The ward office owns the code, the deployment, and the API key. Transfer via GitHub or Vercel project transfer — one click. No vendor lock-in.</p>
            </div>
          </div>
          <div className="proposal-tool">
            <div className="proposal-tool-icon">🔧</div>
            <div>
              <h4>Easy Maintenance</h4>
              <p>Update the knowledge base by uploading new documents. Swap AI providers by changing one environment variable. No coding required for daily operations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="card proposal-cta">
        <h2>Ready to Move Forward?</h2>
        <p>This demo is already functional. The next step is deploying it to a live URL and having Nicole and Audrey test it with real constituent data.</p>
        <div className="cta-actions">
          <a href="mailto:info@the48thward.org?subject=Ward%20Intel%20Platform%20—%20Next%20Steps&body=Hi%20Nicole%20and%20Audrey%2C%0A%0AI%27d%20love%20to%20walk%20you%20through%20the%20Ward%20Intel%20platform%20demo.%20It%27s%20ready%20for%20testing.%0A%0ABest%2C%0APatrick" className="btn btn-primary btn-lg">
            📧 Email the Team
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
            🔗 View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
