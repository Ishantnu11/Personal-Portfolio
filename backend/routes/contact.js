const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long.' });
  }

  try {
    // If no SMTP configured, just log and return success (demo mode)
    if (!process.env.SMTP_USER) {
      console.log(`[Contact Form] From: ${name} <${email}>\nMessage: ${message}`);
      return res.json({ success: true, message: 'Message received! (Demo mode - configure SMTP to send emails)' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: monospace; background: #0a0a0f; color: #00d4ff; padding: 20px; border: 1px solid #00d4ff;">
          <h2 style="color: #00d4ff;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background: #111; padding: 10px; border-left: 3px solid #00d4ff;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
