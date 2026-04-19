import { useState, useRef, useEffect, useCallback } from 'react';
import { callAI } from '../utils/ai';
import { getWardAssistantPrompt } from '../utils/prompts';
import { appendKnowledge } from '../data/wardKnowledge';

const quickQuestions = [
  "How do I get no-parking signs for moving?",
  "When are the ward office hours?",
  "What is Participatory Budgeting?",
  "How do I request a block party permit?",
  "What mental health resources are available?",
  "What's happening with the Emanuel development?",
  "How do I report a parking violation?",
  "How do I request a speed bump?",
];

export default function WardAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Welcome! I'm the 48th Ward AI Assistant. I can answer questions about ward services, office hours, permits, development updates, community resources, and more.\n\nTry asking me anything about the 48th Ward, or use one of the quick questions below to get started!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [kbStatus, setKbStatus] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const kbInputRef = useRef(null);

  const handleKBUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target.result;
      appendKnowledge(content);
      setKbStatus(`Added "${file.name}" to knowledge base (${content.length.toLocaleString()} chars)`);
      setTimeout(() => setKbStatus(''), 5000);
    };
    reader.readAsText(file);
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || loading) return;

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const result = await callAI(getWardAssistantPrompt(), userMessage);
      setMessages([...newMessages, { role: 'assistant', content: result }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again, or contact the ward office directly at 773-784-5277 or info@the48thward.org.",
        },
      ]);
    }
    setLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "👋 Chat cleared! How can I help you today?",
      },
    ]);
  };

  return (
    <div className="assistant fade-in">
      <div className="tool-page-header">
        <div>
          <h1>🤖 Staff Assistant</h1>
          <p>Internal AI assistant trained on the48thward.org (527 pages). Upload documents to expand the knowledge base.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => kbInputRef.current?.click()}>
            📚 Upload to KB
          </button>
          <button className="btn btn-secondary btn-sm" onClick={clearChat}>
            🗑️ Clear Chat
          </button>
          <input
            ref={kbInputRef}
            type="file"
            accept=".txt,.csv,.md,.json,.tsv"
            style={{ display: 'none' }}
            onChange={handleKBUpload}
          />
        </div>
      </div>
      {kbStatus && <div className="upload-status" style={{ marginBottom: 'var(--space-md)' }}>📚 {kbStatus}</div>}

      <div className="chat-container card">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.role} fade-in`}>
              <div className="message-avatar">
                {msg.role === 'assistant' ? '🏛️' : '👤'}
              </div>
              <div className="message-content">
                <div className="message-role">
                  {msg.role === 'assistant' ? '48th Ward Assistant' : 'You'}
                </div>
                <div className="message-text">
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j}>{line || <br />}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant fade-in">
              <div className="message-avatar">🏛️</div>
              <div className="message-content">
                <div className="message-role">48th Ward Assistant</div>
                <div className="message-text">
                  <span className="loading-dots">
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 1 && (
          <div className="quick-questions">
            <label className="label">Quick Questions</label>
            <div className="quick-grid">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  className="quick-btn"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="Ask about 48th Ward services, permits, events..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className="btn btn-primary"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
