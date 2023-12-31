const Book=require('../models/admin/BookModel')
const category=require('../models/admin/CategoryModel')
const Transaction=require('../models/admin/Transaction')
const user=require('../models/user/UserModel')

//...........................BOOK DETAILS....................//
const singlebook = async (req, res) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const BookId = id.trim(); 
      const singlebook = await Book.findById(BookId);
      console.log(singlebook);
      res.status(201).json(singlebook);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  

const AddBook = async (req, res) => {
  console.log(req.body)
    try {
        const allbook = await Book.find();
    const verify = await Book.findOne({
      ISBN: { $regex: new RegExp(req.body.ISBN, "i") },
    });
    console.log(verify)
    console.log(allbook)
    if (verify) {
      res.status(201).json({ err: "Book already exist" });
    } else {
      const newBook = new Book({
        name: req.body.name,
        ISBN:req.body.ISBN,
        image: req.file.path,
        author:req.body.author,
        category:req.body.category
      });
      await newBook.save();
      res.status(201).json({ message: "successfully added"});
    }
    } catch (error) {
      console.log(error)  
      res.status(500).json(error)
      
    }
    
  };

  const viewbook=async(req,res)=>{
    try {
      console.log('mkkk')
        const BooksData=await Book.find({})

        console.log(BooksData)
        return res.status(200).json(BooksData)
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json(error)
    }
}

const deleteBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      
      if (!book) {
        return res.status(404).json({ msg: "Book not found" });
      }
  
      await book.remove(); 
      
      return res.status(200).json({ msg: "Book deleted" });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const searchBook = async (req, res) => {
    const { name } = req.query;
  
    try {
      const searchResults = await Book.find({ name: { $regex: new RegExp(name, 'i') } });
      res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json(error);
    }
  };
  
//..................CATEGORY DETAILS..................//


const addcategory = async (req, res) => {
  try {
    const allcategory = await category.find();
    const verify = await category.findOne({
      name: { $regex: new RegExp(req.body.name, "i") },
    });

    if (verify) {
      res.status(201).json({ err: "category already exists" });
    } else {
      const newCategory = new category({
        name: req.body.name,
        image: req.file.path, // Assuming Multer is configured to store the file path in req.file.path
      });

      await newCategory.save();
      res.status(201).json({ message: "successfully added" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const viewcategory=async(req,res)=>{
  try {
      const categoryDetails=await category.find({})
      return res.status(200).json(categoryDetails)
  } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json(error)
  }
}

const deletecategory = async (req, res) => {
  try {
    const category = await category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ msg: "category not found" });
    }

    await category.remove(); 
    
    return res.status(200).json({ msg: "category deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};


const addTransaction = async (req, res) => {
  try {
    const { ISBN, userEmail, action } = req.body;
 

    const bookDetails = await Book.findOne({ ISBN });
    const userDetails = await user.findOne({ email: userEmail });
    console.log(bookDetails)
    console.log(userDetails)

    if (!bookDetails || !userDetails) {
      return res.status(404).json({ message: 'Book or User not found' });
    }
    

    const existingTransaction = await Transaction.findOne({
      userId: userDetails._id,
      bookId: bookDetails._id,
    });
console.log(existingTransaction)
    if (action === 'borrow') {
      if (bookDetails.available===false) {
        return res.status(404).json({ message: 'Book is not available' });
      }
      if (existingTransaction) {
        return res.status(400).json({ message: 'Book is already borrowed by the user' });
      }


      const transaction = new Transaction({
        userId: userDetails._id,
        bookId: bookDetails._id,
        transactionType: 'borrowed',
      });

      await transaction.save();
      console.log(transaction)
      bookDetails.available=false;
      await bookDetails.save();
      console.log(bookDetails)
      res.status(200).json({ message: 'Book borrowed successfully', transaction });
    } else if (action === 'return') {
      if (!existingTransaction) {
        return res.status(400).json({ message: 'No active transaction found for the user and book' });
      }
      console.log('returned')

 
      existingTransaction.transactionType = 'returned';
      existingTransaction.save();
      bookDetails.available=true;
      await bookDetails.save();

      res.status(200).json({ message: 'Book returned successfully', transaction: existingTransaction });
    } else {
      return res.status(400).json({ message: 'Invalid action specified' });
    }
  } catch (error) {
    console.error('Error processing transaction:', error);
  
  }
}

const viewTransaction = async (req, res) => {
  const userId = getUserFromToken(req.headers.authorization.split(' ')[1]);
console.log(userId)
  if (!userId) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    // Fetch book orders based on the user ID
    const userOrders = await BookOrder.find({ userId }).populate('bookId');

    res.json({ bookOrders: userOrders });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports={
  viewbook,singlebook,AddBook,deleteBook,addcategory,deletecategory,viewcategory,searchBook,addTransaction,viewTransaction}