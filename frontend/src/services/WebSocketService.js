/**
 * WebSocketService - A service for managing WebSocket connections and communication
 */
class WebSocketService {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = {
      message: [],
      open: [],
      close: [],
      error: []
    };
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000;
    this.reconnectTimeoutId = null;
  }

  /**
   * Connect to the WebSocket server
   * @returns {Promise} A promise that resolves when the connection is established
   */
  connect() {
    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = (event) => {
          console.log('WebSocket connected');
          this.reconnectAttempts = 0;
          this._notifyListeners('open', event);
          resolve(event);
        };

        this.socket.onmessage = (event) => {
          this._notifyListeners('message', event);
        };

        this.socket.onclose = (event) => {
          console.log('WebSocket disconnected');
          this._notifyListeners('close', event);
          this._attemptReconnect();
        };

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          this._notifyListeners('error', error);
          reject(error);
        };
      } catch (error) {
        console.error('Failed to connect to WebSocket:', error);
        reject(error);
      }
    });
  }

  /**
   * Disconnect from the WebSocket server
   */
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.reconnectTimeoutId) {
      clearTimeout(this.reconnectTimeoutId);
      this.reconnectTimeoutId = null;
    }
  }

  /**
   * Send a message to the WebSocket server
   * @param {Object|string} message - The message to send
   * @returns {boolean} True if the message was sent, false otherwise
   */
  sendMessage(message) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return false;
    }

    try {
      const messageString = typeof message === 'string' ? message : JSON.stringify(message);
      this.socket.send(messageString);
      return true;
    } catch (error) {
      console.error('Failed to send message:', error);
      return false;
    }
  }

  /**
   * Add a listener for WebSocket events
   * @param {string} event - The event to listen for (message, open, close, error)
   * @param {Function} callback - The callback function
   */
  addListener(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Remove a listener for WebSocket events
   * @param {string} event - The event to stop listening for
   * @param {Function} callback - The callback function to remove
   */
  removeListener(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  /**
   * Attempt to reconnect to the WebSocket server
   * @private
   */
  _attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    this.reconnectTimeoutId = setTimeout(() => {
      this.connect().catch(error => {
        console.error('Reconnect failed:', error);
      });
    }, this.reconnectInterval);
  }

  /**
   * Notify all listeners of an event
   * @param {string} event - The event that occurred
   * @param {any} data - The event data
   * @private
   */
  _notifyListeners(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }
}

export default WebSocketService;