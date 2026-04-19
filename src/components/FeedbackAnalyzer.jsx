import { useState, useRef, useCallback } from 'react';
import { callAI, extractJSON } from '../utils/ai';
import { FEEDBACK_ANALYZER_PROMPT } from '../utils/prompts';
import { emanuelFeedbackSummary, sampleFeedbackComments } from '../data/emanuelFeedback';

function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  if (lines.length < 2) return text;
  // Try to find a "comment" or "feedback" or "message" column
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''));
  const commentIdx = headers.findIndex(h =>
    ['comment', 'comments', 'feedback', 'message', 'text', 'response', 'note', 'notes', 'description', 'input'].includes(h)
  );
  if (commentIdx === -1) return text; // No comment column found, return raw
  return lines.slice(1).map(line => {
    const cols = line.match(/(".*?"|[^,]+)/g) || [];
    return (cols[commentIdx] || '').replace(/^"|"$/g, '').trim();
  }).filter(Boolean).join('\n');
}

export default function FeedbackAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeMessagingTone, setActiveMessagingTone] = useState('neutral');
  const [uploadStatus, setUploadStatus] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const loadDemoData = () => {
    setInputText(emanuelFeedbackSummary + '\n\nIndividual comments:\n' + sampleFeedbackComments.join('\n'));
    setResult(null);
    setError('');
    setUploadStatus('');
  };

  const processFile = useCallback((file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const supported = ['txt', 'csv', 'md', 'tsv', 'json'];
    if (!supported.includes(ext)) {
      setError(`Unsupported file type: .${ext}. Supported: .txt, .csv, .md, .tsv, .json`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      let content = ev.target.result;
      if (ext === 'csv' || ext === 'tsv') {
        content = parseCSV(content);
        setUploadStatus(`Parsed ${file.name} — extracted ${content.split('\n').length} rows`);
      } else if (ext === 'json') {
        try {
          const data = JSON.parse(content);
          content = Array.isArray(data) ? data.map(d => typeof d === 'string' ? d : JSON.stringify(d)).join('\n') : content;
          setUploadStatus(`Parsed ${file.name} — ${Array.isArray(data) ? data.length + ' entries' : 'loaded'}`);
        } catch { setUploadStatus(`Loaded ${file.name} as raw text`); }
      } else {
        setUploadStatus(`Loaded ${file.name} — ${content.length.toLocaleString()} characters`);
      }
      setInputText(content);
      setResult(null);
      setError('');
    };
    reader.readAsText(file);
  }, []);

  const handleFileUpload = (e) => processFile(e.target.files[0]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const analyze = async () => {
    if (!inputText.trim()) {
      setError('Please paste feedback text or load demo data first.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const raw = await callAI(FEEDBACK_ANALYZER_PROMPT, inputText);
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
      setError(err.message || 'Analysis failed. Please check your API configuration.');
    }
    setLoading(false);
  };

  const sentimentColor = (sentiment) => {
    const map = { positive: '#4ecdc4', negative: '#e94560', neutral: '#8b95a5', mixed: '#f0c040' };
    return map[sentiment] || '#8b95a5';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="analyzer fade-in">
      <div className="tool-page-header">
        <div>
          <h1>🧠 Constituent Feedback Analyzer</h1>
          <p>Paste community comments, upload a file, or drag & drop data to get organized themes, sentiment analysis, and suggested messaging.</p>
        </div>
      </div>

      <div className="analyzer-input-section card">
        <div className="input-header">
          <label className="label">Constituent Feedback</label>
          <div className="input-actions">
            <button className="btn btn-secondary btn-sm" onClick={loadDemoData}>
              📋 Load Emanuel Demo Data
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => fileInputRef.current?.click()}>
              📁 Upload File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.csv,.md,.tsv,.json"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        <div
          className={`drop-zone ${dragOver ? 'drag-over' : ''} ${inputText ? 'has-content' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {!inputText && !dragOver && (
            <div className="drop-placeholder">
              <span className="drop-icon">📄</span>
              <span>Drag & drop a file here, or paste/type feedback below</span>
              <span className="drop-formats">Supports: .txt, .csv, .md, .tsv, .json</span>
            </div>
          )}
          {dragOver && (
            <div className="drop-placeholder active">
              <span className="drop-icon">⬇️</span>
              <span>Drop file to upload</span>
            </div>
          )}
          <textarea
            className="textarea"
            placeholder="Paste constituent feedback, meeting notes, emails, or public comments here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            style={{ display: inputText || dragOver ? undefined : 'none' }}
          />
        </div>

        {uploadStatus && <div className="upload-status">✓ {uploadStatus}</div>}

        <div className="input-footer">
          <span className="char-count">{inputText.length.toLocaleString()} characters</span>
          <button
            className="btn btn-primary btn-lg"
            onClick={analyze}
            disabled={loading || !inputText.trim()}
          >
            {loading ? (
              <>
                Analyzing
                <span className="loading-dots">
                  <span /><span /><span />
                </span>
              </>
            ) : (
              '⚡ Analyze Feedback'
            )}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}
      </div>

      {result && !result.raw && (
        <div className="analysis-results">
          {/* Summary */}
          {result.summary && (
            <div className="card result-summary fade-in">
              <h3>📋 Executive Summary</h3>
              <p>{result.summary}</p>
            </div>
          )}

          <div className="results-grid">
            {/* Top Issues */}
            {result.topIssues && (
              <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
                <h3>🔥 Top Issues</h3>
                <div className="issues-list">
                  {result.topIssues.map((issue, i) => (
                    <div key={i} className="issue-row">
                      <div className="issue-rank">#{i + 1}</div>
                      <div className="issue-info">
                        <div className="issue-name">{issue.issue}</div>
                        <div className="issue-bar">
                          <div
                            className="issue-bar-fill"
                            style={{
                              width: `${issue.percentage || 0}%`,
                              background: sentimentColor(issue.sentiment),
                            }}
                          />
                        </div>
                      </div>
                      <div className="issue-meta">
                        <span className="issue-pct">{issue.percentage || 0}%</span>
                        <span
                          className="issue-sentiment"
                          style={{ color: sentimentColor(issue.sentiment) }}
                        >
                          {issue.sentiment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sentiment Breakdown */}
            {result.sentimentBreakdown && (
              <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
                <h3>💭 Sentiment Breakdown</h3>
                <div className="sentiment-chart">
                  {Object.entries(result.sentimentBreakdown).map(([key, val]) => (
                    <div key={key} className="sentiment-row">
                      <span className="sentiment-label">{key}</span>
                      <div className="sentiment-bar">
                        <div
                          className="sentiment-bar-fill"
                          style={{
                            width: `${val}%`,
                            background: sentimentColor(key),
                          }}
                        />
                      </div>
                      <span className="sentiment-val">{val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Conflicts */}
          {result.keyConflicts && result.keyConflicts.length > 0 && (
            <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
              <h3>⚡ Key Conflicts & Tensions</h3>
              <div className="conflicts-grid">
                {result.keyConflicts.map((conflict, i) => (
                  <div key={i} className="conflict-card">
                    <div className="conflict-topic">{conflict.topic}</div>
                    <div className="conflict-sides">
                      <div className="conflict-side side-a">
                        <span className="side-label">Position A</span>
                        <span className="side-text">{conflict.sideA}</span>
                      </div>
                      <div className="conflict-vs">
                        <span>{conflict.split || 'vs'}</span>
                      </div>
                      <div className="conflict-side side-b">
                        <span className="side-label">Position B</span>
                        <span className="side-text">{conflict.sideB}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geographic Clusters */}
          {result.geographicClusters && result.geographicClusters.length > 0 && (
            <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
              <h3>📍 Geographic Clusters</h3>
              <div className="clusters-grid">
                {result.geographicClusters.map((cluster, i) => (
                  <div key={i} className="cluster-card">
                    <div className="cluster-area">{cluster.area}</div>
                    <div className="cluster-concerns">
                      {cluster.mainConcerns?.map((c, j) => (
                        <span key={j} className="tag tag-purple">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Messaging */}
          {result.suggestedMessaging && (
            <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
              <h3>💬 Suggested Messaging</h3>
              <div className="messaging-tabs">
                {['neutral', 'empathetic', 'actionOriented'].map((tone) => (
                  <button
                    key={tone}
                    className={`btn ${activeMessagingTone === tone ? 'btn-teal' : 'btn-ghost'} btn-sm`}
                    onClick={() => setActiveMessagingTone(tone)}
                  >
                    {tone === 'actionOriented' ? 'Action-Oriented' : tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                ))}
              </div>
              <div className="messaging-content">
                <p>{result.suggestedMessaging[activeMessagingTone]}</p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => copyToClipboard(result.suggestedMessaging[activeMessagingTone])}
                  style={{ marginTop: '12px' }}
                >
                  📋 Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Raw text fallback */}
      {result && result.raw && (
        <div className="card fade-in">
          <h3>Analysis Results</h3>
          <pre className="raw-result">{result.raw}</pre>
        </div>
      )}
    </div>
  );
}
