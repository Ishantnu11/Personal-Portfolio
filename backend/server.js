require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { error: 'Too many requests.' } });
app.use('/api/', limiter);

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields required.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email.' });

  if (!process.env.SMTP_USER) {
    console.log(`[CONTACT] ${name} <${email}>: ${message}`);
    return res.json({ success: true, message: 'Received! (Configure SMTP in .env to enable email)' });
  }

  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    await transporter.sendMail({
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `<div style="font-family:monospace;background:#0a0a0f;color:#00d4ff;padding:20px;border:1px solid #00d4ff">
        <h2>New Message — Ishantnu Portfolio</h2>
        <p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p style="background:#111;padding:10px;border-left:3px solid #00d4ff">${message.replace(/\n/g,'<br>')}</p>
      </div>`
    });
    res.json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send. Please email directly.' });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'OK', name: 'Ishantnu Portfolio API' }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Server error' }); });

app.listen(PORT, () => {
  console.log(`\n🚀  Portfolio API  →  http://localhost:${PORT}`);
  console.log(`📡  Health check  →  http://localhost:${PORT}/api/health\n`);
});
