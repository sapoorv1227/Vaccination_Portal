require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const studentRoutes = require('./backend/routes/studentRoutes');
const vaccinationDriveRoutes = require('./backend/routes/vaccinationDriveRoutes');
const authRoutes = require('./backend/routes/authRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/vaccination-drives', vaccinationDriveRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});