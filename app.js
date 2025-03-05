import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { SodaGenerator } from './components/SodaGenerator.js';
import { SodaGallery } from './components/SodaGallery.js';
import { Header } from './components/Header.js';
import { initRoom } from './services/websocket.js';

const App = () => {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setupRoom = async () => {
      try {
        const roomInstance = await initRoom();
        setRoom(roomInstance);
      } catch (error) {
        console.error('Error initializing room:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setupRoom();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Connecting to soda universe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      {room && (
        <>
          <SodaGenerator room={room} />
          <SodaGallery room={room} />
        </>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

