const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    const apiKey = process.env.BEEHIIV_API_KEY;

    if (!publicationId || !apiKey) {
      console.error('Missing Beehiiv configuration');
      return res.status(500).json({ error: 'Service configuration error. Please contact support.' });
    }

    const beehiivResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'newsletter_signup',
          referring_site: req.headers.referer || 'direct',
        }),
      }
    );

    const beehiivData = await beehiivResponse.json();

    if (!beehiivResponse.ok) {
      console.error('Beehiiv API error:', beehiivData);

      if (beehiivResponse.status === 400 && beehiivData.errors) {
        return res.status(400).json({ error: beehiivData.errors[0]?.message || 'Invalid request' });
      }

      if (beehiivResponse.status === 409) {
        return res.status(409).json({ error: 'This email is already subscribed' });
      }

      return res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
    }

    return res.json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running on port ${PORT}`);
});
