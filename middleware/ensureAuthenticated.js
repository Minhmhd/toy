const ensureAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next(); // Nếu đã đăng nhập, cho phép tiếp tục
    }
    res.redirect('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  };
  
  const ensureAdmin = (req, res, next) => {
    if (req.session.role === 'admin') {
      return next(); // Nếu là admin, cho phép tiếp tục
    }
    res.status(403).send('Forbidden'); // Nếu không phải admin, trả về mã lỗi 403
  };
  
  module.exports = {
    ensureAuthenticated,
    ensureAdmin,
  }; // Xuất cả middleware