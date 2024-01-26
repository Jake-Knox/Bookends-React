const mongoose = require('mongoose');

// Define the Book schema
const BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    publicationDate: String,
    pageCount: Number,
    thumbnail: String,
});

const ShelfBook = new mongoose.Schema({
    isbn: String,
    title: String,
    author: String,
    publicationDate: String,
    pageCount: Number,
    thumbnail: String,
    order: Number,
    facing: String,
})

// Define the Shelf schema
const ShelfSchema = new mongoose.Schema({
    order: Number,
    name: String,
    privacy: String,
    books: [ShelfBook]
});

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    privacy: String,
    following: [String],
    followers: [String],
    books: [BookSchema], // Array of Book subdocuments
    shelves: [ShelfSchema] // Array of Shelf subdocuments
});

// Create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
