// supress output on 404 responses
module.exports = (req, res, next) => {
  let jsonp = res.jsonp;
  res.jsonp = function(body) {
    res.jsonp = jsonp;
    if (res.statusCode == 404) {
      res.send('');
    } else {
      res.jsonp(body);
    }
  }
  next();
}
