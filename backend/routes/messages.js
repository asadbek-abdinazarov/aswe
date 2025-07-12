const express = require('express');
const axios = require('axios');
const { messagesValidation } = require('../middleware/validation');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const router = express.Router();

// Contact form: receive message and send to Telegram
router.post('/', messagesValidation, async (req, res) => {
  try {
    const { name, email, message } = req.body;
  
    // Send to Telegram
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      
      const text = `📩 <b>New Contact Message</b>\n\n<b>Name:</b> ${name}\n<b>Email:</b> ${email}\n<b>Message:</b> ${message}`;
      console.log(text);
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML'
      });
    }
    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    if (error.response) {

      console.error('Telegram API error:', error.response.data);
      res.status(500).json({ error: 'Failed to send message', telegram: error.response.data });
    } else {

      console.error('Error sending message to Telegram:', error.message);
      res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
  }
});

module.exports = router; 