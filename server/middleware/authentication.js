import jwt from 'jsonwebtoken';

/**
 * Check if logged-in user has a valid session token
 * @param{Object} req - api request
 * @param{Object} res - route response
 * @param{Object} next - jumping to next handler
 * @return{undefined}
 */
export default function checkUserSession(req, res, next) {
  const token = req.body.token || req.headers.token;
  if (!token) {
    res.status(403).send({ status: 403, message: 'Session token is required!' });
  } else {
    // Check if token matches the one provided at login
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        res.status(500).send({ status: 500, message: 'Invalid token!' });
      } else {
        next();
      }
    });
  }
}