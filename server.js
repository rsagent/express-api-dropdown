const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to receive selected values
app.post('/submit', (req, res) => {
  const { language, city } = req.body;
  res.json({ language, city });
});

// API endpoint to extract details from a website
app.post('/extract', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    // Example: extract title and all h1 headings
    const title = $('title').text();
    const h1 = [];
    $('h1').each((i, el) => h1.push($(el).text()));
    res.json({ title, h1 });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch or parse the website.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
