export const generateSodaDescription = async (name, mainFlavor, style) => {
  try {
    console.log(`Generating description for ${name} with ${mainFlavor} flavor in ${style} style`);
    
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a creative soda marketing expert. Create an engaging, unique, and somewhat whimsical description for a fictional soda.
          Keep the description between 50-100 words. Focus on taste experience, sensations, and unique selling points.
          Make it sound appealing but slightly quirky and imaginative.`
        },
        {
          role: "user",
          content: `Create a description for a soda called "${name}" with ${mainFlavor} as the main flavor. 
          The visual style is ${style}. 
          Include details about:
          - Taste profile and sensation
          - Key ingredients (make some up if needed)
          - Why someone would want to drink it
          - Any special effects or feelings when drinking it`
        }
      ]
    });
    
    return completion.content.trim();
  } catch (error) {
    console.error('Error generating soda description:', error);
    throw new Error('Failed to generate soda description');
  }
};

export const generateSodaImage = async (name, description, style) => {
  try {
    console.log(`Generating image for ${name} based on the description`);
    
    // First, generate a detailed image prompt using the LLM
    const promptCompletion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert at creating detailed image generation prompts.
          Create a prompt for generating a photorealistic image of a fictional soda can or bottle.`
        },
        {
          role: "user",
          content: `Create a detailed image generation prompt for a soda called "${name}".
          Description: ${description}
          Style: ${style}
          
          Include details about:
          - Can/bottle design
          - Colors and visual elements
          - Label details
          - Background or environment
          - Lighting and mood
          
          Make it sound appealing and visually striking. The prompt should be detailed enough to generate a high-quality, photorealistic image.`
        }
      ]
    });
    
    const imagePrompt = promptCompletion.content.trim();
    
    // Then generate the actual image
    const result = await websim.imageGen({
      prompt: imagePrompt,
      aspect_ratio: "3:4"
    });
    
    return result.url;
  } catch (error) {
    console.error('Error generating soda image:', error);
    throw new Error('Failed to generate soda image');
  }
};

