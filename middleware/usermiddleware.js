const ensureAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next(); // Nếu đã đăng nhập, cho phép tiếp tục
    }
    res.redirect('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  };
  
  module.exports = ensureAuthenticated; // Xuất middleware