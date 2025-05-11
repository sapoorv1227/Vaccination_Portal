const express = require('express');
const router = express.Router();

// Hardcoded credentials for simulated login
const adminCredentials = {
  username: 'admin',
  password: 'password123',
};

// Login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Debugging: Log received credentials
  console.log('Received credentials:', { username, password });

  if (username === adminCredentials.username && password === adminCredentials.password) {
    // Simulated token
    const token = 'simulated-jwt-token';
    return res.status(200).json({ token });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

module.exports = router;