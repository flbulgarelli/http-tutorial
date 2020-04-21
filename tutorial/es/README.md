# Tutorial  HTTP

> 🏁 Antes de empezar: ¿qué es una arquitectura cliente-servidor? ¿cómo funciona?

## 1. Primeros pedidos

```bash
$ curl 'http://localhost:3000/prendas/1'
{
  "id": 1,
  "tipo": "pantalon",
  "talle": 35
}
```

```bash
$ curl 'http://localhost:3000/prendas/20'
{
  "id": 20,
  "tipo": "saco",
  "talle": "XL"
}
```

> ✍️ Autoevaluación: ¿para qué sirve CURL?

> 🤔 Para Pensar: ¿qué es una URL?

## 2. Códigos de respuesta

¿Y si no hay nada?

```bash
$ curl 'http://localhost:3000/prendas/400'
```

```bash
$ curl 'http://localhost:3000/prendas/1' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 50
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 12:42:26 GMT
Connection: keep-alive

{
  "id": 1,
  "tipo": "pantalon",
  "talle": 35
}
```

> ✍️ Autoevaluación: ¿Para qué sirve -i?


```bash
$ curl 'http://localhost:3000/prendas/400' -i
HTTP/1.1 404 Not Found
X-Powered-By: Express
Expires: -1
Content-Type: text/html; charset=utf-8
Content-Length: 0
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 12:43:18 GMT
Connection: keep-alive
```

> ✍️ Para pensar: ¿Qué cambió? ¿Qué cambio o cambios te parecen relevates?
> 💡 Tip: Probá hacer `curl 'http://localhost:3000/prendas/400' -is | head -n1`


```bash
$ curl 'http://localhost:3000/prindas/1' -i
HTTP/1.1 404 Not Found
....
```

`404` y `200` son códigos de estado (_status code_, también llamados a veces _códigos de respuesta_) y forman parte de toda respuesta HTTP.

> ✍️ Autoevaluación: ¿qué es un status code y para qué me sirve?

Veamos otro código de respuesta más:

```bash
$ curl 'http://localhost:3000/nueva-funcionalidad-que-a-veces-no-anda-bien' -i
HTTP/1.1 500 Internal Server Error
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
Content-Security-Policy: default-src 'none'
X-Content-Type-Options: nosniff
Content-Type: text/html; charset=utf-8
Content-Length: 1594
Date: Tue, 21 Apr 2020 12:51:17 GMT
Connection: keep-alive

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>TypeError: req.ups is not a function<br> &nbsp; &nbsp;at module.exports (/home/usuario/Documents/http-tutorial/server/internal-error.js:3:9)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at trim_prefix (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:317:13)<br> &nbsp; &nbsp;at /home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:284:7<br> &nbsp; &nbsp;at Function.process_params (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:335:12)<br> &nbsp; &nbsp;at next (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:275:10)<br> &nbsp; &nbsp;at module.exports (/home/usuario/Documents/http-tutorial/server/not-found.js:12:3)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/layer.js:95:5)<br> &nbsp; &nbsp;at trim_prefix (/home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:317:13)<br> &nbsp; &nbsp;at /home/usuario/.nvm/versions/node/v10.20.1/lib/node_modules/json-server/node_modules/express/lib/router/index.js:284:7</pre>
</body>
</html>
```

¡Ups! 🙈

> ✍️ Autoevaluación: ¿qué representa el código `500`?


## 3. Parámetros

```bash
$ curl 'http://localhost:3000/prendas'
[
  {
    "id": 1,
    "tipo": "pantalon",
    "talle": 35
  },
  {
    "id": 2,
    "tipo": "pantalon",
    "talle": 36
  },
  {
    "id": 3,
    "tipo": "pantalon",
    "talle": 37
  },
  {
    "id": 4,
    "tipo": "pantalon",
    "talle": 38
  },
  ...
  {
    "id": 18,
    "tipo": "saco",
    "talle": "M"
  },
  {
    "id": 19,
    "tipo": "saco",
    "talle": "L"
  },
  {
    "id": 20,
    "tipo": "saco",
    "talle": "XL"
  }
]
```

> 🤔 Para pensar: ¿es lo mismo consultar `/prendas/` que `/prendas/1`? ¿En qué se diferencian?

> 🤔 Para pensar: ¿qué hará `/ventas/2`? ¿`/ventas/`?.

> 🏅 Desafío: hacé `curl 'http://localhost:3000/ventas'` y `curl 'http://localhost:3000/ventas/2'` y contrastá el resultado con tu respuesta anterior

```bash
$ curl 'http://localhost:3000/prendas?tipo=pantalon'
[
  {
    "id": 1,
    "tipo": "pantalon",
    "talle": 35
  },
  {
    "id": 2,
    "tipo": "pantalon",
    "talle": 36
  },
  ....
  {
    "id": 10,
    "tipo": "pantalon",
    "talle": 44
  }
]
```

```bash
$ curl 'http://localhost:3000/prendas?tipo=saco'
[
  {
    "id": 16,
    "tipo": "saco",
    "talle": "XS"
  },
  {
    "id": 17,
    "tipo": "saco",
    "talle": "S"
  },
  {
    "id": 18,
    "tipo": "saco",
    "talle": "M"
  },
  {
    "id": 19,
    "tipo": "saco",
    "talle": "L"
  },
  {
    "id": 20,
    "tipo": "saco",
    "talle": "XL"
  }
]
```

> 🏅 Desafío: Obtené las remeras.

Es común que las URL que admiten parámetros soporten más de uno, por ejemplo:

```bash
$ curl 'http://localhost:3000/prendas?talle=40'
[
  {
    "id": 6,
    "tipo": "pantalon",
    "talle": 40
  }
]
```

Además, los parámetros además se pueden combinar, utilizando el signo `&` (se llama _et_, aunque en informática es más común escucharlo por su nombre en inglés _ampersand_)

```bash
$ curl 'http://localhost:3000/prendas?talle=40&tipo=pantalon'
[
  {
    "id": 6,
    "tipo": "pantalon",
    "talle": 40
  }
]
```

> 🏅 Desafío: Obtené las remeras XS
> ✍️ Autoevaluación: ¿Para qué sirven los parámetros?

## 4. Paginación

Volvamos a `curl 'http://localhost:3000/prendas'`. ¿Qué pasaría si este listado fuera muy grande? ## TODO simular que creamos muchos productos. O usar ventas

> 🤔 Para pensar: ¿Qué problemas tiene esto?

Ejecutemos nuevamente...

```bash
$ curl 'http://localhost:3000/prendas' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 1237
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:05:09 GMT
Connection: keep-alive

[
  {
    "id": 1,
    "tipo": "pantalon",
    "talle": 35
  },
  {
    "id": 2,
    "tipo": "pantalon",
    "talle": 36
  },
...
```

...pero esta vez prestemos atención a esta parte de la respuesta:

```
Content-Length: 794
```

> 💡 Tip:  Probá hacer `curl 'http://localhost:3000/prendas' -is | grep 'Content-Length'`

y comparemos el resultado con el de:

```bash
$ curl 'http://localhost:3000/ventas' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 73800
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:06:18 GMT
Connection: keep-alive

[
  {
    "id": 1,
    "producto": {
      "id": 19,
      "tipo": "saco",
      "talle": "L"
    },
    "fecha": "1970-02-06T12:00:00.000Z"
  },
...
```

> 🤔 Para pensar: ¿Cual es mayor? ¿Por qué? ¿Qué problema puede representar esto?

Como se observa, tienen tamaños diferentes: a mayor la cantidad de elementos, mayor es la respuesta, y "más pesada" es.

> 🤔 Para pensar: ¿Cuál será más rápido de descargar? ¿Por qué?

Ya sea porque la respuesta es demasiado "pesada", o porque simplemente sólo queremos una parte de la misma, en ocasiones querremos recorrer el resultado como
si fueran las páginas de un libro: de una a la vez. Macowins por eso nos permite utilizar un parámetro llamado `_page`, con el que podemos decirle qué número de página queremos.

```bash
$ curl 'http://localhost:3000/ventas/?_page=1' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <http://localhost:3000/ventas/?_page=1>; rel="first", <http://localhost:3000/ventas/?_page=2>; rel="next", <http://localhost:3000/ventas/?_page=50>; rel="last"
Content-Type: application/json; charset=utf-8
Content-Length: 1456
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:07:23 GMT
Connection: keep-alive

[
  {
    "id": 1,
    "producto": {
      "id": 19,
      "tipo": "saco",
      "talle": "L"
    },
    "fecha": "1970-02-06T12:00:00.000Z"
  },
  {
    "id": 2,
    "producto": {
      "id": 13,
      "tipo": "remera",
      "talle": "M"
    },
    "fecha": "1970-03-15T00:00:00.000Z"
  },
  ...
  {
    "id": 9,
    "producto": {
      "id": 4,
      "tipo": "pantalon",
      "talle": 38
    },
    "fecha": "1970-11-25T12:00:00.000Z"
  },
  {
    "id": 10,
    "producto": {
      "id": 7,
      "tipo": "pantalon",
      "talle": 41
    },
    "fecha": "1971-01-01T00:00:00.000Z"
  }
]
```

```bash
$ curl 'http://localhost:3000/ventas/?_page=2' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <http://localhost:3000/ventas/?_page=1>; rel="first", <http://localhost:3000/ventas/?_page=1>; rel="prev", <http://localhost:3000/ventas/?_page=3>; rel="next", <http://localhost:3000/ventas/?_page=50>; rel="last"
Content-Type: application/json; charset=utf-8
Content-Length: 1464
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:07:51 GMT
Connection: keep-alive

[
  {
    "id": 11,
    "producto": {
      "id": 8,
      "tipo": "pantalon",
      "talle": 42
    },
    "fecha": "1971-02-06T12:00:00.000Z"
  },
....
```

```bash
$ curl 'http://localhost:3000/ventas/?_page=3' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <http://localhost:3000/ventas/?_page=1>; rel="first", <http://localhost:3000/ventas/?_page=2>; rel="prev", <http://localhost:3000/ventas/?_page=4>; rel="next", <http://localhost:3000/ventas/?_page=50>; rel="last"
Content-Type: application/json; charset=utf-8
Content-Length: 1467
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:09:14 GMT
Connection: keep-alive

[
  {
    "id": 21,
    "producto": {
      "id": 6,
      "tipo": "pantalon",
      "talle": 40
    },
    "fecha": "1972-02-06T12:00:00.000Z"
  },
....
```

> 🤔 Para pensar: observá las fechas de venta. ¿Tendrá alguna relación el número de página con la fecha de venta en Macowins?

> 📝 Nota: de la misma forma que que no todos los sitios soportarán los parámetros `talle` o `tipo`, tampoco todos soportarán `_page`

> 🏅 Desafío: ¿cuando pesan las páginas ahora? ¿Más o menos que todas las ventas?


## 6. Resolución de dominios

```bash
$ curl 'http://localhost:300
curl: (7) Failed to connect to localhost port 300: Connection refused
```

```bash
$ curl 'http://hostlocal:300
curl: (6) Could not resolve host: hostlocal
```

¿No era que iba a darnos status code particulares?

## 7. Cabeceras

Antes ya aparecieron. Formalicemos

```
HTTP/1.1 200 OK
X-Powered-By: Express
Vary: Origin, Accept-Encoding
Access-Control-Allow-Credentials: true
Cache-Control: no-cache
Pragma: no-cache
Expires: -1
X-Total-Count: 100
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <http://localhost:3000/posts/?_page=1>; rel="first", <http://localhost:3000/posts/?_page=2>; rel="next", <http://localhost:3000/posts/?_page=10>; rel="last"
X-Content-Type-Options: nosniff
Content-Type: application/json; charset=utf-8
Content-Length: 794
ETag: W/"31a-kfX25hKekB1DHqT0GE68BdzBP1Q"
Date: Sun, 19 Apr 2020 20:18:21 GMT
Connection: keep-alive
```

> 📝 Nota: si bien en CURL 'se muestra de esta mantera (que a su vez tiene que ver con cómo funciona HTTP internamente), la primera línea NO se corresponde con una cabecera, sino que es el código de estado del que ya hemos hablado anteriormente.

Algunas de estas no las entenderemos. Pero las que sí nos dan información relevante:

* `X-Powered-By: QUIEN`: nos dice que software es el que está corriendo en el servidor. No siempre es muy confiable
* `Content-Length: TAMAÑO`: nos dice el tamaño de la respuesta
* `Date: FECHA`: nos dice la fecha en que se generó la respuesta
* `Content-Type: TIPO`: nos dice el tipo de contenido que estamos recibiendo, el cual podría ser, por ejemplo:
  * sonido, como `audio/wav`o `audio/ogg`
  * video, como `video/ogg`
  * una imagen, como `image/jpeg` o `image/gif`
  * un XML `application/xml`
  * un archivo css `text/css`

> 🤔 Para pensar: ¿Cuál fue el `Content-Type` de las respuesta del ejemplo? ¿Por qué devolvió eso?

> 🏅 Desafío: ¿Qué devolverá la página principal (_home_) de nuestro sitio? Averiguá el `Content-Type` de /home

> ✍️ Autoevaluación: ¿Para qué sirven las cabeceras? Mencioná al menos dos.

## 8. Compresión

```bash
$ curl 'http://localhost:3000/ventas' -i
```

```bash
$ curl 'http://localhost:3000/ventas' -i -H "Accept-Encoding: gzip"
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Tue, 21 Apr 2020 13:10:58 GMT
Connection: keep-alive
Transfer-Encoding: chunked

^_<8B>^H^@^@^@^@^@^@^C<BD><9D>ˊ&<C7>^QF<F7>z<8A>a<D6>jS<91><F7><D4>3<D8>+kal<BC>^X<A4>1^VH<9A>a,<AF><8C><DF><DD>^?U<FA>^F<BF><BB><BE><D3><F8>#a<B4>Pk^PAT<D6><C9>Ȍ:^]^?<F8><EA>ݻ<BF>=<FE>y<F7><EE><FD>^O߿<FF><E6>]|<BD><FE><E5><F3><97>O<DF><FF><F5><BB>_>=~<B4><FE><F3><BF><FF><C2><FC><FA>_<FF><FE><CB>^O<9F><CF><FF><FE><FE>/^_<BE><FB><F4><FE>??<FD><F0><E3><8F>^_<CF>^_<FF><FA><FD><F5><A3><BF><FF><F3><FF><F8><A7><8F><DF><FD>
<F9><C3><F9><F3><98><FD>x9<D2><CB>Ѿ<8D><F4><CD>q<<FE><FC><EA>8<8E>ߟ^?<FD><FA><CB><FF>^]O<92><F1><E4><A7>x<BE>|<FC><E9><E3><97>^O<FF>#<A2><DF><DC>F<94>_<A2>~{<85>sESCQ<96>^Q%^^<D1>oo#*/<E9>^@9**<A2><E7>^T}<FE>
<F0><F3>#<86>O??<87><94><FB>]D<F5>%u<90><A3>*s4<E8>*<BA>^?f<FD><B1><90>@<86><9A><8C><A7><D3>x<EE><9F><D8>x<FC>^A<F9><E9>2<9E>F<E3><F9><DD>}@<F3>%2H<D0>ض<A8><E3>8^W<B5>N<D1>T^Q<95><B7>,<EA>q^WQ<BC><A4>
r^T<87>
...
```

> 💡 Tip: Probá hacer `curl 'http://localhost:3000/ventas' -i -H "Accept-Encoding: gzip" | less` para ver mejor el resultado

```bash
$ curl 'http://localhost:3000/ventas' -i -H "Accept-Encoding: gzip" --compressed
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Vary: Accept-Encoding
Content-Encoding: gzip
Date: Tue, 21 Apr 2020 13:13:22 GMT
Connection: keep-alive
Transfer-Encoding: chunked

[
  {
    "id": 1,
    "producto": {
      "id": 19,
      "tipo": "saco",
      "talle": "L"
    },
    "fecha": "1970-02-06T12:00:00.000Z"
  },
...
```

> ✍️ Autoevaluación: ¿Qué hizo el _flag_ `--compressed`?


```bash
$ curl 'http://localhost:3000/prendas/1' -i -H "Accept-Encoding: gzip"
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 50
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 13:15:39 GMT
Connection: keep-alive

{
  "id": 1,
  "tipo": "pantalon",
  "talle": 35
}
...
```

> 🤔 Para pensar: ¿Sucedió lo que esperábamos? ¿Por qué puede ser?


## 9. Negociación de contenido

Accept y Content Type

## 10. Borrando contenido

> ✍️ Autoevaluación: ¿qué es un método HTTP?

> 🤔 Para pensar: ¿es correcto que permitamos que cualquiera borre contenido?

> 🤔 Para pensar: ¿Habrá algo que impida que no borre nada con un DELETE, o que borre algo con un GET?

## 11. Creando contenido

`CREATED`

> 🏅 Desafío: Creá una venta.

> 🤔 Para pensar: A los métodos HTTP también se les dice verbos. ¿Por qué?

## 12. Sobre la semántica de los verbos

## 13. Recursos

Formalización de REST

> 🤔 Para pensar: ¿por qué es importante respetar estas convenciones?

## 14. Seguridad




