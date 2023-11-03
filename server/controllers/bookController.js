const Book = require('../models/Book')

// GET all books - log in not needed
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if(books && books.length > 0  ){
            res.status(200).json(books);}
        else{
            res.send('No books are available');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a book - log in needed, owner is auto entered using token
exports.addBooks = async (req, res) => {
    const owner = req.decodedUser;
    const book = new Book({
        owner: owner,
        status: req.body.status,
        title: req.body.title,
        price: req.body.price,
        context: req.body.context
    });

    try {
        await book.save();
        res.status(201).json({ message: "The book is successfully added"});
    } catch (err) {
        res.status(401).json({ error: err.message});
        console.log(err)
    }
}

// UPDATE a book 

