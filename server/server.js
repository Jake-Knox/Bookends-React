// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const config = require('./config');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = config.PORT || 5000;
const uri = config.MONGODB_URI;
const jwtSecretKey = config.jwtSecretKey;

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
                    console.log("User not found");
                    res.status(401).json({ message: 'User not found' });
                } else {
                    // Compare the provided password with the hashed password stored in the user object
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            console.error('Error comparing passwords:', err);
                            res.sendStatus(500);
                        } else if (result) {
                            // Passwords match, authentication successful
                            console.log('Passwords match');

                            console.log(`un:${user.username}, _id:${user._id}`);
                            const token = jwt.sign({ username: user.username, _id: user._id }, jwtSecretKey);

                            // send status response and token
                            res.status(200).json({ message: 'Authentication successful', token });
                        } else {
                            // Passwords do not match, authentication failed
                            console.log(`Incorrect Password`);
                            res.status(401).json({ message: 'Incorrect Password' });
                        }
                    });
                }
            });
        });





    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
