var express = require('express');
var router = express.Router();
const fetchcategories = require('../middleware/categories')
var CategoryModel = require('../models/CategoryModel')
const ToyModel = require('../models/ToyModel')
router.use(fetchcategories)

// search toy
router.post('/search',async(req,res)=>{
  let keyword = req.body.name;
  let toys = await ToyModel.find({name:new RegExp(keyword,"i")});
  res.render('customer/toy',{toys})
})

/* GET home page. */
router.get('/', async(req, res, next) => {
  let categories = await CategoryModel.find({}).sort({_id: -1})
  console.log(categories)
 res.render ('customer/index', { categories });
 //res.redirect('/category')
});

router.get('/customer/toy/:id', async (req, res) => {
  let id = req.params.id
  let toys = await ToyModel.find({category:id}).sort({_id: -1})
  console.log(toys)
 res.render('customer/toy', { toys })
}) 

router.get('/customer/detail/:id', async (req, res) => {
  //get book id value from url
  let id = req.params.id
  //return book data based on id
  let toy = await ToyModel.findById(id)
  //render view with book data
  res.render('customer/detail', { toy })
})

router.get('/login', function(req,res,next){
  res.render('login')
})




router.get('/signup', function(req,res,next){
  res.render('signup')
})

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});







module.exports = router;
