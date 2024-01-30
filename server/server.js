// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;
const uri = config.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow Cross-Origin requests

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});



// Connect to the MongoDB server
client.connect()
    .then(() => {

        // all of this code is kept inside the db connection so that the site doesn't have to reconnect. Inefficient?
        console.log('Connected to MongoDB');
        const db = client.db('bookshelf-db');

        // Set up database route handlers
        // Test endpoint
        app.post('/api/test', async (req, res) => {
            console.log("test request");
            try {
                res.status(201).json({ message: 'Hello World' });
            } catch (error) {
                res.status(500).json({ error: 'Error registering user' });
            }
        });


        app.post('/api/books', (req, res) => {
            // console.log("books request");
            const collection = db.collection('books');
            collection.find().toArray((err, books) => {
                if (err) {
                    console.error('Error retrieving books:', err);
                    res.sendStatus(500);
                } else {
                    res.json(books);
                }
            });
        });


        // Login endpoint
        app.post('/api/login', async (req, res) => {
            console.log("login request");

            const { username, password } = req.body;
            console.log(`${username}, ${password}`);

            db.collection('users').findOne({ username }, (err, user) => {
                if (err) {
                    console.error('Error finding user:', err);
                    res.sendStatus(500);
                } else if (!user) {
                    res.status(401).json({ message: 'User not found' });
                } else {
                    // Compare the provided password with the hashed password stored in the user object
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            console.error('Error comparing passwords:', err);
                            res.sendStatus(500);
                        } else if (result) {
                            // Passwords match, authentication successful
                            // req.session.isLoggedIn = true;
                            // req.session.username = username;
                            // console.log('isLoggedIn:', req.session.isLoggedIn);
                            // console.log('username:', req.session.username);
                            res.status(200).json({ message: 'Authentication successful' });
                            // res.redirect('/profile'); // redirected from login.js       
                        } else {
                            // Passwords do not match, authentication failed
                            res.status(401).json({ message: 'Invalid username or password' });
                        }
                    });
                }
            });
        });





    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
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
