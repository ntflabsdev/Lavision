import { Send, MessageCircle, X, Trash2, User, Bot } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { WEBSOCKET_CONFIG } from '../../config/websocket';

interface AiChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'bot';
}

const AiChatPopup = ({ isOpen, onClose }: AiChatPopupProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Connect to WebSocket when chat opens
      const newSocket = io(WEBSOCKET_CONFIG.WEBSOCKET_URL, WEBSOCKET_CONFIG.options);
      setSocket(newSocket);

      newSocket.on('connect', () => {
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        setIsConnected(false);
      });

      // Handle bot messages
      newSocket.on('bot_message', (data: Message) => {
        setMessages(prev => [...prev, data]);
        setBotTyping(false);
      });

      // Handle bot typing
      newSocket.on('bot_typing', (typing: boolean) => {
        setBotTyping(typing);
      });

      // Handle chat cleared
      newSocket.on('chat_cleared', () => {
        setMessages([]);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, botTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (inputMessage.trim() && socket && isConnected) {
      const userMessage: Message = {
        id: Date.now().toString(),
        message: inputMessage,
        timestamp: new Date(),
        type: 'user'
      };

      setMessages(prev => [...prev, userMessage]);
      socket.emit('user_message', { message: inputMessage });
      setInputMessage('');
    }
  };

  const clearChat = () => {
    if (socket) {
      socket.emit('clear_chat');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 w-100 h-[20vh] max-h-[500px] bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col z-[999] transition-all duration-300 ease-in-out font-sans">

      {/* Input */}
      <div className="border-t p-4 bg-transparent rounded-b-2xl">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about dreams, wellness, or LAvision..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50"
              rows={2}
              disabled={!isConnected}
            />
          </div>
          <button 
            onClick={sendMessage} 
            disabled={!isConnected || !inputMessage.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-transparent text-center py-2 border-t rounded-b-2xl">
        <p className="text-xs text-gray-400">Powered by LaVision AI</p>
      </div>
    </div>
  );
};

export default AiChatPopup;
