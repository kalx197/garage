const express = require('express');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

const app = express();

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

app.use(express.json());

// Routes Hook setup
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server executing securely on port ${PORT}`);
});
