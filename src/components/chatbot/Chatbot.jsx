// Chatbot.jsx

import React, { useState, useEffect } from 'react';
import './Chatbot.scss';
import { useChatMessages } from './hooks/useChatMessages';
import ChatMessages from './components/ChatMessages';
import ChatInput from './components/ChatInput';
import ChatHeader from './components/ChatHeader';
import ChatToggle from './components/ChatToggle';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage } = useChatMessages();

  // Close the chat when the Escape key is pressed.
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <div className="chatbot-container" aria-live="polite">
      <ChatToggle
        isOpen={isOpen}
        onClick={toggleChat}
        aria-controls="chatbot"
        aria-expanded={isOpen}
      />

      {isOpen && (
        <div
          id="chatbot"
          className={`chatbot ${isOpen ? 'open' : ''}`}
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          <ChatHeader onClose={toggleChat} />
          {/* Pass the isOpen state to ChatMessages so it can trigger auto-scroll */}
          <ChatMessages messages={messages} isOpen={isOpen} />
          <ChatInput onSend={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
