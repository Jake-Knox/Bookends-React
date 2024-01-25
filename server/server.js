// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = config.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow Cross-Origin requests

// MongoDB connection
mongoose.connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
mongoose.set('debug', true);


// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Test endpoint
app.post('/api/test', async (req, res) => {
    console.log("test request");
    try {
        res.status(201).json({ message: 'Hello World' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Register endpoint
app.post('/api/register', async (req, res) => {
    console.log("register request");
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    console.log("login request");
    try {
        const { username, password } = req.body;
        console.log(`${username}, ${password}`);
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate and return JWT token here

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Change password endpoint
app.put('/api/change-password', async (req, res) => {
    console.log("change pw request");
    try {
        const { username, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(oldPassword, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing password' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
