module.exports = (server) => {
  server.get('/negocios', (req, res) => {
    res.redirect(301, '/sucursales')
  });

  server.get('/catalogo', (req, res) => {
    res.redirect(302, '/prendas')
  });
};


