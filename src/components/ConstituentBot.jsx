import { useState, useRef, useEffect } from 'react';
import { callAI } from '../utils/ai';
import { CONSTITUENT_BOT_PROMPT } from '../utils/prompts';

const quickQuestions = [
  "How do I submit a service request?",
  "What are the ward office hours?",
  "How do I get a block party permit?",
  "How do I get no-parking signs for moving?",
  "What mental health resources are available?",
  "How do I report a pothole or broken sidewalk?",
  "When is the next Ward Night?",
  "How do I sign up for the newsletter?",
];

export default function ConstituentBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi there! 👋 I'm here to help you navigate 48th Ward services and resources.\n\nYou can ask me about permits, office hours, service requests, events, and more. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
      const result = await callAI(CONSTITUENT_BOT_PROMPT, userMessage);
      setMessages([...newMessages, { role: 'assistant', content: result }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please contact the ward office directly at **773-784-5277** or email **info@the48thward.org** for assistance.",
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
        content: "Hi there! 👋 Chat cleared. How can I help you today?",
      },
    ]);
  };

  return (
    <div className="constituent-bot fade-in">
      {/* Preview Header */}
      <div className="tool-page-header">
        <div>
          <h1>🌐 Constituent Bot Preview</h1>
          <p>This is a preview of the public-facing chatbot. It can be embedded on the48thward.org as a widget for constituents to get instant answers.</p>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={clearChat}>
          🗑️ Clear Chat
        </button>
      </div>

      {/* Embed preview frame */}
      <div className="bot-preview-frame">
        <div className="bot-widget">
          {/* Widget header */}
          <div className="bot-widget-header">
            <div className="bot-header-left">
              <div className="bot-avatar">
                <span>48</span>
              </div>
              <div className="bot-header-info">
                <span className="bot-header-title">48th Ward Assistant</span>
                <span className="bot-header-status">
                  <span className="status-dot" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`bot-message ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="bot-msg-avatar">48</div>
                )}
                <div className={`bot-msg-bubble ${msg.role}`}>
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j}>{line || <br />}</p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="bot-message assistant">
                <div className="bot-msg-avatar">48</div>
                <div className="bot-msg-bubble assistant">
                  <span className="loading-dots">
                    <span /><span /><span />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions - only show at start */}
          {messages.length <= 1 && (
            <div className="bot-quick">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  className="bot-quick-btn"
                  onClick={() => sendMessage(q)}
                  disabled={loading}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="bot-input-area">
            <input
              ref={inputRef}
              type="text"
              className="bot-input"
              placeholder="Ask about ward services, permits, events..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="bot-send-btn"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>

          {/* Footer */}
          <div className="bot-widget-footer">
            Powered by 48th Ward Office • <a href="https://the48thward.org" target="_blank" rel="noopener noreferrer">the48thward.org</a>
          </div>
        </div>

        {/* Embed code section */}
        <div className="embed-info card">
          <h3>📦 Embed Instructions</h3>
          <p>When ready to deploy, this bot can be embedded on the48thward.org as a floating widget using an iframe or JavaScript snippet. The embed code will be generated once deployed to Vercel.</p>
          <div className="embed-features">
            <div className="embed-feature">
              <span className="tag tag-teal">Public-Safe</span>
              <span>No internal data exposed</span>
            </div>
            <div className="embed-feature">
              <span className="tag tag-gold">Branded</span>
              <span>Matches ward visual identity</span>
            </div>
            <div className="embed-feature">
              <span className="tag tag-accent">Responsive</span>
              <span>Works on mobile & desktop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
