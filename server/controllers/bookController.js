const Book = require('../models/Book')

// GET all books - log in not needed
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ "isAvailable":true })
                                .sort({ updatedAt: 'desc' });
        if(books && books.length > 0  ){
            res.status(200).json(books);}
        else{
            res.send('No books are available');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a book by ID - This is for book detail page
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
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

// the book id and owner username are sending from a client server
// the user who does not own this book could not update the book
// So I added currentuser (decoded from token) is not matched with book owner
// the response http status will be 404 and send error 
// Edit a book - This is for editing a book (must be a book owner)
exports.updateBookById = async (req, res) => {
    try {
        const currentuser = req.decodedUser;
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!book) {
            return res.status(404).render("error", { message: "Book not found" });
        } else if (currentuser !== book.owner ){
        // if currentsuer in token and book owner is not matched 401 Unauthorized
            return res.status(401).json({ message: "Only book owner can update book" });  
        } else {
            const updatedBook = await Book.findOne({ _id:req.params.id });
            res.status(200).json(updatedBook); // Redirect to book detail page  
        }
        //res.redirect(`/books/${req.params.id}`); // Redirect to book detail page
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  };

// DELETE a book by ID
exports.deleteBookById = async (req, res) => {
    try {
        const currentuser = req.decodedUser;
        const book = await Book.findByIdAndDelete({ _id:req.params.id });
        if (!book) {
            return res.status(404).render('error', { message: 'Book not found' });
        } else if (currentuser !== book.owner ){
            return res.status(401).json({ message: "Only book owner can delete a book" });  
        } else {
            res.status(200).json(book); // Redirect to all books list
        }
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};


// Search a book by parameter - This is for search bar and MyList
// sample request url is 
// http://192.168.0.8:4000/api/book/searchBooks?owner=a
// http://192.168.0.8:4000/api/book/searchBooks?title=sql
exports.searchBooks = async (req, res) => {
    try {
        // req.query in request URL
        const title = req.query.title;
        const owner = req.query.owner;
        
        const query = {};
        
        if (owner) {
            query.owner = owner;
        } else if (title) {
            query.title = { $regex: title, $options: 'i' };
            query.isAvailable = "true";
        } else {
            query.isAvailable = "true";
        };
        
        const book = await Book.find(query).sort({ updatedAt: 'desc' });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.countBooks = async (req, res) => {
    try {
        const count = await Book.countDocuments( {"isAvailable":true})
        res.status(200).json(count)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}