// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  // For development
  // WEBSOCKET_URL: 'http://localhost:3000',
  WEBSOCKET_URL: 'http://192.168.1.23:3000',
  // For production (update with your actual domain)
  // WEBSOCKET_URL: 'https://your-domain.com',
  
  // Connection options
  options: {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  }
};
