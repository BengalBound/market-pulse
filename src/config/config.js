require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  hasLiveGemini: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '')
};
