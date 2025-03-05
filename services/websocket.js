export const initRoom = async () => {
  try {
    const room = new WebsimSocket();
    console.log('Connected to room!');
    
    room.onmessage = (event) => {
      const data = event.data;
      switch (data.type) {
        case "connected":
          console.log(`Client ${data.clientId} (${data.username}) connected`);
          break;
        case "disconnected":
          console.log(`Client ${data.clientId} (${data.username}) disconnected`);
          break;
        default:
          console.log("Received event:", data);
      }
    };
    
    return room;
  } catch (error) {
    console.error('Failed to connect to room:', error);
    throw error;
  }
};

