const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// Đường dẫn cho trang đăng nhập
router.get('/login', (req, res) => {
  res.render('login');
});

// Xử lý đăng nhập
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.isValidPassword(password)) {
    req.session.userId = user._id; // Lưu ID người dùng vào session
    req.session.role = user.role; // Lưu vai trò người dùng vào session
    if (user.role === 'admin') {
      return res.redirect('/category');
    } else {
      return res.redirect('/customer/index');
    }
  } else {
    res.redirect('/login'); // Quay lại trang đăng nhập nếu không thành công
  }
});

// Đường dẫn cho đăng xuất
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid'); // Xoá cookie session
    res.redirect('/'); // Quay lại trang đăng nhập
  });
});

/*router.post('/signup', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      const newUser = new User({ name, email, password });
      await newUser.save();

      // Redirect to login after successful signup
      res.redirect('/login');
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
router.get('/signup', (req, res) => {
  res.render ('/signup');
});*/

// Đường dẫn cho trang admin


module.exports = router; // Xuất router

