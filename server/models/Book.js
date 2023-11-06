const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    owner: {
        type: String, 
        required: true
    },
    status: {
        type: String,
        enum: ['buying', 'selling', 'exchange'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    context: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean, 
        default: true
    }
}, { 
    timestamps: true, 
    collection: "books" 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
