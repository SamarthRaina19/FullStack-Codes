export async function fetchDeezerTracks(query = "chill") {
  try {
    const targetUrl = `https://api.deezer.com/search?q=${query}&limit=6`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Deezer API fetch failed:', error);
    // Fallback logic could go here, but returning empty array avoids crash
    return [];
  }
}
