const express = require('express');
const router = express.Router();

// Placeholder routes for student management
router.get('/', (req, res) => {
  res.send('Get all students');
});

router.post('/', (req, res) => {
  res.send('Add a new student');
});

module.exports = router;