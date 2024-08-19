const express = require('express')
const router = express.Router()
const fetchcategories = require('../middleware/categories')
var CategoryModel = require('../models/CategoryModel')
const ToyModel = require('../models/ToyModel')

router.use(fetchcategories)
//Get all books
//URL: http://localhost:PORT/book


 router.get('/', async (req, res) => {
   let categories = await CategoryModel.find({}).sort({_id: -1})
   console.log(categories)
  res.render('category/index', { categories , layout : 'layoutadmin' })

 })

//Get book by id
//URL: http://localhost:PORT/book/detail/{id}

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/delete/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await CategoryModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/category')
})

router.get('/detail/:id',async(req,res) =>{
   let id = req.params.id
   let toys = await ToyModel.find({ category : id})
   res.render('toy/index', {toys ,layout : 'layoutadmin'})
})

//URL: http://localhost:PORT/book/add
//render form "Add book" for user to input
router.get('/add', async (req, res) => {
   let categories = await CategoryModel.find({})
   res.render('category/add', { categories , layout : 'layoutadmin' })
})

//get input data tu add book form va save vao database
router.post('/add',async(req,res)=>{
   try {
      //get input data
      let category = req.body
      //save book to DB
      await CategoryModel.create(category)
      //show message to console
      console.log('Add category succeed !')
   } catch (err) {
      console.error (err)
   }

   //redirect to book list page
   res.redirect('/category')
})


router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let category = await CategoryModel.findById(id)
   res.render('category/edit', { category, layout : 'layoutadmin' })
})
 
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let category = req.body
   try {
      await CategoryModel.findByIdAndUpdate(id, category)
      console.log('Edit category succeed !')
   } catch (err) {
      console.log("Edit category failed !")
      console.error(err)
   }
   res.redirect('/category')
})

module.exports = router