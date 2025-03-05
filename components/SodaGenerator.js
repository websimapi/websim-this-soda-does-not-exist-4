import React, { useState } from 'react';
import { generateSodaDescription, generateSodaImage } from '../services/aiService.js';

export const SodaGenerator = ({ room }) => {
  const [name, setName] = useState('');
  const [mainFlavor, setMainFlavor] = useState('');
  const [style, setStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !mainFlavor) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      // Step 1: Generate soda description using LLM
      const description = await generateSodaDescription(name, mainFlavor, style);
      
      // Step 2: Generate soda image based on the description
      const imageUrl = await generateSodaImage(name, description, style);
      
      // Step 3: Save to database
      await room.collection('sodas').create({
        name,
        mainFlavor,
        style,
        description,
        imageUrl,
        timestamp: new Date().toISOString()
      });
      
      // Clear form after successful submission
      setName('');
      setMainFlavor('');
      
    } catch (err) {
      setError('Failed to generate soda: ' + err.message);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="generator-section">
      <h2 className="section-title">Create a New Soda</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Soda Name</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Fizz Burst, Nebula Cola"
            disabled={isGenerating}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="mainFlavor">Main Flavor</label>
          <input 
            type="text" 
            id="mainFlavor" 
            value={mainFlavor} 
            onChange={(e) => setMainFlavor(e.target.value)}
            placeholder="E.g., strawberry, exotic fruit, cinnamon"
            disabled={isGenerating}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="style">Visual Style</label>
          <select 
            id="style" 
            value={style} 
            onChange={(e) => setStyle(e.target.value)}
            disabled={isGenerating}
          >
            <option value="modern">Modern</option>
            <option value="retro">Retro</option>
            <option value="futuristic">Futuristic</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="neon">Neon</option>
          </select>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Soda'}
        </button>
        
        {isGenerating && (
          <div className="generating-indicator">
            <div className="spinner"></div>
            <span>Creating your unique soda...</span>
          </div>
        )}
      </form>
    </section>
  );
};

