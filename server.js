// server.js
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servíruj statické soubory ze složky, kde je index.html
app.use(express.static(__dirname));

// Explicitní endpoint pro hlavní stránku
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint pro vyhledávání přes SerpAPI
app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.SERPAPI_KEY;

  if (!query || !apiKey) {
    return res.status(400).json({ error: 'Chybí dotaz nebo API klíč' });
  }

  try {
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = Array.isArray(data.organic_results)
      ? data.organic_results.map(r => ({
          title: r.title,
          link: r.link,
          snippet: r.snippet
        }))
      : [];

    res.json(results);
  } catch (error) {
    console.error('Chyba při volání SerpAPI:', error);
    res.status(500).json({ error: 'Interní chyba serveru' });
  }
});

// Spusť server
app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});

