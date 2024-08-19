const Category = require('../models/CategoryModel'); // Đảm bảo rằng đường dẫn tới model chính xác

const fetchcategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.locals.categories = categories;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fetchcategories;