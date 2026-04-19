import { useState } from 'react';
import { callAI, extractJSON } from '../utils/ai';
import { CONTENT_GENERATOR_PROMPT } from '../utils/prompts';

const contentTypes = [
  { id: 'event', label: '📅 Event', placeholder: 'e.g., Shred & Electronics Recycling Event, Saturday March 21st, 11am-2pm at 5853 N Broadway' },
  { id: 'update', label: '📢 Update', placeholder: 'e.g., PB voting is open! Vote by Sunday at midnight...' },
  { id: 'alert', label: '🚨 Alert', placeholder: 'e.g., Street cleaning begins April 1st on the following streets...' },
  { id: 'recap', label: '📝 Recap', placeholder: 'e.g., At the March 3 Ward Night, neighbors discussed zoning, development, and housing...' },
];

const platformIcons = {
  newsletter: '📬',
  instagram: '📸',
  facebook: '👥',
  twitter: '🐦',
  sms: '📱',
};

export default function ContentGenerator() {
  const [contentType, setContentType] = useState('event');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');

  const generate = async () => {
    if (!inputText.trim()) {
      setError('Please enter event or update information.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const userMessage = `Content type: ${contentType.toUpperCase()}\n\nInformation:\n${inputText}`;
      const raw = await callAI(CONTENT_GENERATOR_PROMPT, userMessage);

      let parsed;
      try {
        parsed = extractJSON(raw);
      } catch {
        setResult({ raw });
        setLoading(false);
        return;
      }
      setResult(parsed);
    } catch (err) {
      setError(err.message || 'Generation failed. Please check your API configuration.');
    }
    setLoading(false);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const loadSampleEvent = () => {
    setInputText(
      'Shred & Electronics Recycling Event\n' +
      'Date: Saturday, March 21st\n' +
      'Time: 11:00 AM to 2:00 PM\n' +
      'Location: 5853 N. Broadway\n' +
      'Details: Free document shredding and small electronics recycling for 48th Ward residents. ' +
      'Bring old papers, documents, and small electronics. No appointment needed. ' +
      'Hosted by the Office of Alderwoman Leni Manaa-Hoppenworth.'
    );
    setContentType('event');
    setResult(null);
    setError('');
  };

  const loadSampleUpdate = () => {
    setInputText(
      'Participatory Budgeting (PB) Voting is NOW OPEN!\n' +
      'Vote for the infrastructure projects you want to see in the 48th Ward.\n' +
      'Voting closes Sunday at midnight.\n' +
      'Vote online or at the ward office at 1129 W Bryn Mawr.\n' +
      'This year\'s projects include accessible pedestrian signals, street resurfacing, and park improvements.\n' +
      'Every 48th Ward resident aged 14+ can vote.'
    );
    setContentType('update');
    setResult(null);
    setError('');
  };

  return (
    <div className="content-gen fade-in">
      <div className="tool-page-header">
        <div>
          <h1>📬 Newsletter & Content Generator</h1>
          <p>Input one event or update. Get newsletter, Instagram, Facebook, Twitter, and SMS content instantly — all in the 48th Ward's voice.</p>
        </div>
      </div>

      <div className="card">
        <div className="content-type-selector">
          <label className="label">Content Type</label>
          <div className="type-buttons">
            {contentTypes.map((type) => (
              <button
                key={type.id}
                className={`btn ${contentType === type.id ? 'btn-teal' : 'btn-secondary'} btn-sm`}
                onClick={() => setContentType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="input-header" style={{ marginTop: '20px' }}>
          <label className="label">Event / Update Information</label>
          <div className="input-actions">
            <button className="btn btn-secondary btn-sm" onClick={loadSampleEvent}>
              📋 Sample Event
            </button>
            <button className="btn btn-secondary btn-sm" onClick={loadSampleUpdate}>
              📋 Sample Update
            </button>
          </div>
        </div>

        <textarea
          className="textarea"
          placeholder={contentTypes.find(t => t.id === contentType)?.placeholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={6}
        />

        <div className="input-footer">
          <span className="char-count">{inputText.length.toLocaleString()} characters</span>
          <button
            className="btn btn-primary btn-lg"
            onClick={generate}
            disabled={loading || !inputText.trim()}
          >
            {loading ? (
              <>
                Generating
                <span className="loading-dots">
                  <span /><span /><span />
                </span>
              </>
            ) : (
              '⚡ Generate All Content'
            )}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}
      </div>

      {result && !result.raw && (
        <div className="content-outputs">
          {Object.entries(result).map(([platform, content], i) => (
            <div key={platform} className="card output-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="output-header">
                <div className="output-platform">
                  <span className="platform-icon">{platformIcons[platform] || '📝'}</span>
                  <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
                </div>
                <button
                  className={`btn btn-sm ${copiedField === platform ? 'btn-teal' : 'btn-secondary'}`}
                  onClick={() => copyToClipboard(content, platform)}
                >
                  {copiedField === platform ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="output-content">
                {platform === 'newsletter' ? (
                  <div
                    className="newsletter-preview"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                ) : (
                  <pre className="output-text">{content}</pre>
                )}
              </div>
              <div className="output-meta">
                <span className="char-count">{content.length} chars</span>
                {platform === 'twitter' && content.length > 280 && (
                  <span className="char-warning">⚠️ Over 280 char limit</span>
                )}
                {platform === 'sms' && content.length > 160 && (
                  <span className="char-warning">⚠️ Over 160 char limit</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {result && result.raw && (
        <div className="card fade-in">
          <h3>Generated Content</h3>
          <pre className="raw-result">{result.raw}</pre>
        </div>
      )}
    </div>
  );
}
