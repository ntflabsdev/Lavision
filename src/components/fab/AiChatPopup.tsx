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
    <div className="fixed bottom-24 right-6 w-80 h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-[999] transition-all duration-300 ease-in-out font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center">
          <MessageCircle size={20} className="mr-2" />
          <div>
            <h3 className="font-semibold">🌙 LAvision AI</h3>
            <span className={`text-xs ${isConnected ? 'text-green-200' : 'text-red-200'}`}>
              {isConnected ? '🟢 Online' : '🔴 Offline'}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={clearChat} 
            className="text-white hover:bg-white/20 p-1 rounded"
            title="Clear chat"
          >
            <Trash2 size={16} />
          </button>
          <button 
            onClick={onClose} 
            className="text-white hover:bg-white/20 p-1 rounded"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="mb-4">
              <MessageCircle size={48} className="mx-auto text-purple-300" />
            </div>
            <h4 className="font-semibold text-gray-700 mb-2">Welcome to LAvision AI! 👋</h4>
            <p className="text-sm">Ask me anything about dreams, wellness, goals, or how LAvision can help you!</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                  : 'bg-gray-300'
              }`}>
                {msg.type === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gray-600" />}
              </div>
              <div>
                <div className={`rounded-lg p-3 ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
                <div className={`text-xs text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {botTyping && (
          <div className="flex items-start space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <Bot size={16} className="text-gray-600" />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500">LAvision AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white rounded-b-2xl">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about dreams, wellness, or LAvision..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
      <div className="bg-gray-50 text-center py-2 border-t rounded-b-2xl">
        <p className="text-xs text-gray-400">Powered by LaVision AI</p>
      </div>
    </div>
  );
};

export default AiChatPopup;
