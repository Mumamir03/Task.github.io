const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_secret_key';  // Use a real secret key

app.use(express.json());
app.use(cors());

// Connect to MongoDB (replace with MongoDB Atlas URI if needed)
mongoose.connect('your_mongo_uri', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Routes
app.use('/api/tasks', require('./routes/tasks'));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
