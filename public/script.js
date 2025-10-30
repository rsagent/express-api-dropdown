document.getElementById('selectionForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const language = document.getElementById('language').value;
  const city = document.getElementById('city').value;

  const response = await fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language, city })
  });

  const data = await response.json();
  document.getElementById('result').textContent = `Selected: Language = ${data.language}, City = ${data.city}`;
});

// Extract details from website
document.getElementById('extractBtn').addEventListener('click', async function(e) {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  const extractResult = document.getElementById('extractResult');
  extractResult.textContent = 'Extracting...';
  try {
    const response = await fetch('/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    if (!response.ok) throw new Error('Failed to extract details');
    const data = await response.json();
    extractResult.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    extractResult.textContent = 'Error: ' + err.message;
  }
});
