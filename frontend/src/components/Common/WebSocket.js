class WebSocketService {
    static instance = null;
    callbacks = {};
  
    static getInstance() {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    constructor() {
      this.socketRef = null
    }
  
    connect(path) {
      !(this.socketRef===null)&&this.socketRef.close();
      this.socketRef = new WebSocket(path);
      this.socketRef.onopen = () => {
        console.log('WebSocket open');
      };
      this.socketNewMessage(JSON.stringify({
        command: 'fetch_messages'
      }));
      this.socketRef.onmessage = e => {
        this.socketNewMessage(e.data);
      };
      this.socketRef.onerror = e => {
        console.log(e);
        this.connect(path)
      };
      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        // this.connect(path);
      };
    }
  
    disconnect() {
      if (this.socketRef) {
        this.socketRef.close();
      }
    }
    
    socketNewMessage(data) {
      const parsedData = JSON.parse(data);
      const command = parsedData.command;
      if (Object.keys(this.callbacks).length === 0) {
        return;
      }
      if (command === 'messages') {
        this.callbacks[command](parsedData.messages);
      }
      if (command === 'new_message') {
        this.callbacks[command](parsedData.message);
      }
    }
  
    fetchMessages(username) {
      this.sendMessage({ command: 'fetch_messages', username: username });
    }
  
    newChatMessage(message) {
      this.sendMessage({ command: 'new_message', from: message.from, message: message.content }); 
    }
  
    addCallbacks(messagesCallback, newMessageCallback) {
      this.callbacks['messages'] = messagesCallback;
      this.callbacks['new_message'] = newMessageCallback;
    }
  
    sendMessage(data) {
      try {
        this.socketRef.send(JSON.stringify({ ...data }));
      }
      catch(err) {
        console.log(err.message);
      }  
    }
    
    waitForSocketConnection(callback) {
      const socket = this.socketRef
      const recursion = this.waitForSocketConnection
      setTimeout(
        function() {
          if (socket.readyState === 1) {
            console.log('connection is secure')
            if (callback != null) {
              callback();
            }
            return
          } else {
            console.log('waiting for connection...')
            recursion(callback)
          }
        }, 1)
    }

    state() {
      return this.socketRef.readyState;
    }
  
  }
  
  const WebSocketInstance = WebSocketService.getInstance();
  
  export default WebSocketInstance;