const express = require('express')
const router = express.Router()
var ToyModel = require('../models/ToyModel')
var OriginModel = require('../models/OriginModel')
var CategoryModel = require('../models/CategoryModel')
const fetchcategories = require('../middleware/categories')
const fetchorigins = require('../middleware/origins')
//Get all books
//URL: http://localhost:PORT/book
router.use(fetchcategories)
router.use(fetchorigins)

router.get('/', async (req, res) => {
  let toys = await ToyModel.find({}).sort({_id: -1}).populate('origin')
  console.log(toys)
 res.render('toy/index', { toys,   layout : 'layoutadmin' } )
})

//Get book by id
//URL: http://localhost:PORT/book/detail/{id}
router.get('/details/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   //return book data based on id
   let toy = await ToyModel.findById(id).populate('origin')
   
   //render view with book data
   res.render('toy/details', { toy , layout : 'layoutadmin'})
})

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/delete/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await ToyModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/toy')
})

//URL: http://localhost:PORT/book/add
//render form "Add book" for user to input
router.get('/add', async (req, res) => {
   let toys = await ToyModel.find({})
   let origins = await OriginModel.find({})
   console.log(origins)
   res.render('toy/add',{ toys, origins, layout : 'layoutadmin'})
})

//get input data tu add book form va save vao database
router.post('/add',async(req,res)=>{
  // get input data
  let toy = req.body
  // save book to DB
  await ToyModel.create(toy)
  //show mesage to console 
  console.log('add toy succeed!!')
  //redirect to book list page
  res.redirect('/toy')
})


router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = await ToyModel.findById(id)
   res.render('toy/edit', { toy , layout : 'layoutadmin' })
})
 
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = req.body
   try {
      await ToyModel.findByIdAndUpdate(id, toy)
      console.log('Edit Toy succeed !')
   } catch (err) {
      console.log("Edit Toy failed !")
      console.error(err)
   }
   res.redirect('/toy')
})

module.exports = router