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

// auth middleware 
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, jwtSecretKey, (err, decodedToken) => {
        if (err) return res.sendStatus(403); // Invalid or expired token
        req.user = decodedToken.username; // Attach username from decoded token to the request object
        req._id = decodedToken._id; // Attach _id from decoded token to the request object
        next();
    });
};

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
            console.log("books request");
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
            // console.log("login request");
            const { username, password } = req.body;
            // console.log(`${username}, ${password}`);

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
                            console.log('Logged in successful');

                            // console.log(`un:${user.username}, _id:${user._id}`);
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

        app.get('/getMyBookhelf', authenticateToken, (req, res) => {
            // console.log("get my books request")
            const username = req.user
            // console.log(`getMyBookshelf:${username} (me)`);

            // find the username in the books collection
            // send the shelf (and book) data back to the user
            db.collection('users').findOne({ username }, (err, user) => {
                if (err) {
                    console.error('Error finding user:', err);
                    res.sendStatus(500);
                } else if (!user) {
                    console.log("user not found");
                    res.status(401).json({ message: 'User not found' });
                } else {
                    // User found, send data
                    // console.log("data found");
                    // console.log(user);

                    const bookshelfData = {
                        username: user.username,
                        privacy: user.privacy,
                        following: user.following,
                        followers: user.followers,
                        books: user.books,
                        shelves: user.shelves,
                    }

                    res.status(200).json({ bookshelf: bookshelfData });
                }
            });
        });

        app.get('/getUserBookshelf/:username', (req, res) => {
            // console.log("get user books request");
            const username = req.params.username;
            // console.log(`getUserBookshelf:${username}`);

            db.collection('users').findOne({ username }, (err, user) => {
                if (err) {
                    console.error('Error finding user:', err);
                    res.sendStatus(500);
                } else if (!user) {
                    console.log("user not found");
                    res.status(401).json({ message: 'User not found' });
                } else {
                    // User found, send data
                    let bookshelfData = {
                        username: user.username,
                        privacy: user.privacy,
                        following: [],
                        followers: [],
                        shelves: [],
                    }

                    if (user.privacy == "public") {
                        // console.log("profile is public");
                        bookshelfData.following = user.following;
                        bookshelfData.followers = user.followers;

                        for (let i = 0; i < user.shelves.length; i++) {
                            if (user.shelves[i].privacy == "public") {
                                bookshelfData.shelves.push(user.shelves[i]);
                            }
                        }
                    }
                    else {
                        // console.log("profile is private");
                    }
                    res.status(200).json({ bookshelf: bookshelfData });
                }
            });
        });


        // working with mobile

        const janeAustenNovels = [
            { title: "Sense and Sensibility", description: "Two sisters navigate the complexities of love.", image: "https://cdn.penguin.co.uk/dam-assets/books/9780141439662/9780141439662-jacket-large.jpg" },
            { title: "Pride and Prejudice", description: "A classic tale of love and social status.", image: "https://cdn.penguin.co.uk/dam-assets/books/9780141439518/9780141439518-jacket-large.jpg" },
            { title: "Mansfield Park", description: "A young woman navigates love and morality.", image: "https://cdn.penguin.co.uk/dam-assets/books/9780141439808/9780141439808-jacket-large.jpg" },
            { title: "Emma", description: "A well-meaning but misguided matchmaker.", image: "https://productimages.worldofbooks.com/0141439580.jpg" },
            { title: "Northanger Abbey", description: "A young woman discovers love and mystery.", image: "https://cdn.penguin.co.uk/dam-assets/books/9780141439792/9780141439792-jacket-large.jpg" },
            { title: "Persuasion", description: "A tale of second chances and lost love.", image: "https://cdn.penguin.co.uk/dam-assets/books/9780141439686/9780141439686-jacket-large.jpg" }
        ];

        app.get('/api/andoridTest', (req, res) => {
            console.log("Mobile - test");

            const randomIndex = Math.floor(Math.random() * janeAustenNovels.length);
            const selectedNovel = janeAustenNovels[randomIndex];
            const book = {
                title: selectedNovel.title,
                description: selectedNovel.description,
                image: selectedNovel.image
            };

            console.log("sending response to phone")
            res.json(book);
        });

        app.get('/api/andoridBooks', (req, res) => {
            console.log("Mobile - books");

            const books = [
                {
                    "title": "Sense and Sensibility",
                    "description": "The book I am reading atm",
                    "image": "https://cdn.penguin.co.uk/dam-assets/books/9780141439662/9780141439662-jacket-large.jpg"
                },
                {
                    "title": "Pride and Prejudice",
                    "description": "The book of hers I enjoyed the most",
                    "image": "https://cdn.penguin.co.uk/dam-assets/books/9780141439518/9780141439518-jacket-large.jpg"
                },
                {
                    "title": "Northanger Abbey",
                    "description": "I plan on reading this last",
                    "image": "https://cdn.penguin.co.uk/dam-assets/books/9780141439792/9780141439792-jacket-large.jpg"
                }
            ]

            console.log("sending response to phone")
            res.json(books);
        });







        // end of work with mobile




    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
