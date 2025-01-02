require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const playerRoutes = require('./routes/playerRoutes');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
connectDB();

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: [process.env.APP_URI_LOCAL, process.env.APP_URI_LIVE], // Whitelist domains
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions)); // Apply CORS middleware

app.use('/api/players', playerRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

