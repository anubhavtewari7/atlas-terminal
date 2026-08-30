const POLLINATIONS_ENDPOINT = "https://text.pollinations.ai/";

export async function connectTheDots(newsItem, materialProfile) {
  const prompt = `
    You are Project ATLAS, a Strategic Sourcing Intelligence AI.
    USER PROFILE: ${materialProfile.industry} focusing on ${materialProfile.material}.
    
    NEWS ITEM: "${newsItem.title}" - ${newsItem.description}
    
    TASK: Perform "Impact Chain Propagation" analysis. 
    1. Determine if this news directly or indirectly affects the user's supply chain.
    2. Trace the causality (e.g. Weather -> Crop Yield -> Prices -> Supply).
    3. Suggest a strategic sourcing move to mitigate the risk.
    
    FORMAT: JSON
    {
      "isRelevant": boolean,
      "severity": "low" | "med" | "high",
      "impactChain": string,
      "recommendation": string
    }
  `;

  try {
    const response = await fetch(POLLINATIONS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        jsonMode: true
      })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ATLAS AI Error:", error);
    return null;
  }
}
