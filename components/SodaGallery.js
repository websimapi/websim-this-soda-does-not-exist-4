import React from 'react';
import { SodaCard } from './SodaCard.js';

export const SodaGallery = ({ room }) => {
  const sodas = React.useSyncExternalStore(
    room.collection('sodas').subscribe,
    () => room.collection('sodas').getList()
  );
  
  // Sort sodas by timestamp, newest first
  const sortedSodas = [...sodas].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <section className="gallery-section">
      <h2 className="section-title">Soda Gallery</h2>
      
      {sortedSodas.length === 0 ? (
        <div className="empty-gallery">
          <p>No sodas have been generated yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="gallery-grid">
          {sortedSodas.map((soda) => (
            <SodaCard key={soda.id} soda={soda} />
          ))}
        </div>
      )}
    </section>
  );
};

