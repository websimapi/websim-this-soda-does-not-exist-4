import React from 'react';

export const SodaCard = ({ soda }) => {
  const { name, description, imageUrl, mainFlavor, style, username, timestamp } = soda;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="soda-card">
      <img 
        src={imageUrl} 
        alt={`${name} soda`} 
        className="soda-image"
        loading="lazy"
      />
      
      <div className="soda-content">
        <h3 className="soda-name">{name}</h3>
        <p className="soda-description">{description}</p>
        
        <div className="soda-tags">
          <span className="tag">{mainFlavor}</span>
          <span className="tag">{style}</span>
        </div>
        
        <div className="soda-meta">
          <span>Created by {username}</span>
          <span>{formatDate(timestamp)}</span>
        </div>
      </div>
    </div>
  );
};

