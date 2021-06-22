const Cookies = require('js-cookie');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

//Middleware will look for the token in the cookies from the request and then validate it
const withAuth = function(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    console.log('No token found')
    res.status(401).json({auth: false, message: 'No token provided.'});
  } else {   
    //Token validation
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = withAuth;