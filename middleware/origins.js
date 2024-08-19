const Origin = require('../models/OriginModel'); // Đảm bảo rằng đường dẫn tới model chính xác

const fetchorigins = async (req, res, next) => {
  try {
    const origins = await Origin.find({});
    res.locals.origins = origins;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = fetchorigins;