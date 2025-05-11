// middleware/isLoggedIn.js
import ErrorHandler from '../error/error.js';

export const isLoggedIn = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return next(new ErrorHandler('Login required for reservation', 401));
  }
  next();
};