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
    isavailable: {
        type: Boolean, 
        default: 1
    }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
