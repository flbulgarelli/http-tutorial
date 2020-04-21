module.exports = (req, res, next) => {
  let end = res.end;
  res.end = function(chunk, encoding) {
    res.end  = end;

    res.removeHeader('Vary');
    res.removeHeader('Pragma');
    res.removeHeader('Access-Control-Allow-Origin');
    res.removeHeader('Access-Control-Allow-Credentials');
    res.removeHeader('Cache-Control');
    res.removeHeader('ETag');

    res.end(chunk, encoding);
  }

  next()
}
