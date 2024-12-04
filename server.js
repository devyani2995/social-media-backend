const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectMongoDB = require('./config/dbConfig');
const userController = require('./src/auth/controllers/userController.js');
const postRoutes = require('./src/post/routes/postRoutes.js');
const likeRoutes = require('./src/likes/routes/likeRoutes.js');

const cors = require('cors');

//Load environment variable from .env file
dotenv.config();

//Create instance of file
const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from specific origin
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

// Or, allow requests from all origins (not recommended for production):
// app.use(cors());

app.use(bodyParser.json());

app.use('/api/users', userController);
app.use('/api/posts',postRoutes);
app.use('/api/likes',likeRoutes)

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js Backend server!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectMongoDB();
});
