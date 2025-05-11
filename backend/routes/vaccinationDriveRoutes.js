const express = require('express');
const router = express.Router();

// Placeholder routes for vaccination drive management
router.get('/', (req, res) => {
  res.send('Get all vaccination drives');
});

router.post('/', (req, res) => {
  res.send('Create a new vaccination drive');
});

module.exports = router;