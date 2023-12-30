const Book=require('../models/admin/BookModel')
const upload=require('../utility/multer')


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
    try {
        const allbook = await Book.find();
    const verify = await Book.findOne({
      name: { $regex: new RegExp(req.body.name, "i") },
    });
    if (verify) {
      res.status(201).json({ err: "Book already exist" });
    } else {
      const newBook = new Book({
        name: req.body.name,
        image: req.file,
        author:req.body.author,
        available:req.body.available,
        category:req.body.author
      });
      await newBook.save();
      res.status(201).json({ message: "successfully added"});
    }
    } catch (error) {
        res.status(500).json(error)
    }
    
  };

  const viewBook=async(req,res)=>{
    try {
        const BooksData=await Book.find({})
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
  

module.exports={
    viewBook,singlebook,AddBook,deleteBook
}