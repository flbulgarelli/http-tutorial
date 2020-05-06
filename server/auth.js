const basicAuth = require('express-basic-auth')

let auth = basicAuth({
  users: {
    'danix232': 'danix232',
    'feliCart': 'feliCart',
    'punpun': 'punpun'
   },
   challenge: true
});

module.exports = (req, res, next) => {
  if (req.url.startsWith('/sucursales/') && req.method !== 'GET') {
    auth(req, res, next);
  } else {
    next();
  }
};
