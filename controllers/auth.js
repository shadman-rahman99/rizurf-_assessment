/* eslint-disable no-unused-vars */
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    // eslint-disable-next-line no-use-before-define
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// eslint-disable-next-line consistent-return
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // eslint-disable-next-line no-use-before-define
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      sucess: false,
      error: error.message,
    });
  }
};
//! Future Work
// exports.forgotpassword = (req, res, next) => {
//   res.send('Forgot Password Route');
// };

// exports.resetpassword = (req, res, next) => {
//   res.send('Reset Password Route');
// };

const sendToken = (user, statusCode, res) => {
  const token = user.getSignToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
