module.exports = (req, res, next) => {
  if (req.url.startsWith('/nueva-funcionalidad-que-a-veces-no-anda-bien')) {
    req.ups();
  }
  next()
}
