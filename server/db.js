module.exports = () => {
  function sample(list) {
    return list[Math.round(Math.random() * (list.length - 1))]
  }

  const data = {
    prendas: [],
    ventas: []
  }

  let prendaId = 1;
  for (let i = 0; i < 10; i++) {
    data.prendas.push({ id: prendaId++, tipo: 'pantalon', talle: (35+i) })
  }

  data.prendas.push({ id: prendaId++, tipo: 'remera', talle: 'XS' })
  data.prendas.push({ id: prendaId++, tipo: 'remera', talle: 'S' })
  data.prendas.push({ id: prendaId++, tipo: 'remera', talle: 'M' })
  data.prendas.push({ id: prendaId++, tipo: 'remera', talle: 'L' })
  data.prendas.push({ id: prendaId++, tipo: 'remera', talle: 'XL' })

  data.prendas.push({ id: prendaId++, tipo: 'saco', talle: 'XS' })
  data.prendas.push({ id: prendaId++, tipo: 'saco', talle: 'S' })
  data.prendas.push({ id: prendaId++, tipo: 'saco', talle: 'M' })
  data.prendas.push({ id: prendaId++, tipo: 'saco', talle: 'L' })
  data.prendas.push({ id: prendaId++, tipo: 'saco', talle: 'XL' })

  let now = new Date().getTime()
  for (let i = 1; i <= 500; i++) {
    data.ventas.push({ id: i, producto: sample(data.prendas), fecha: new Date(Math.trunc(now / 31536000000) * ((31536000000 / 500) * i)) })
  }
  return data
}
