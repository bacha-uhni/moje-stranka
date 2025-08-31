// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/search', async (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.SERPAPI_KEY;
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google&api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.organic_results.map(r => ({
    title: r.title,
    link: r.link,
    snippet: r.snippet
  }));

  res.json(results);
});

app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
