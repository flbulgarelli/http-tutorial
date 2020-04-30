# Tutorial  HTTP

- [Tutorial HTTP](#tutorial--http)
  * [1. Primeros pedidos](#1-primeros-pedidos)
  * [2. Códigos de respuesta](#2-codigos-de-respuesta)
  * [3. Parámetros](#3-parametros)
  * [4. Paginación](#4-paginacion)
  * [6. URLs y URIs](#6-urls-y-uris)
  * [7. Resolución de dominios](#7-resolucion-de-dominios)
  * [8. Cabeceras](#8-cabeceras)
  * [9. Compresión](#9-compresion)
  * [10. Desde el navegador](#10-desde-el-navegador)
  * [11. Borrando contenido](#11-borrando-contenido)
  * [12. Creando y actualizando contenido](#12-creando-y-actualizando-contenido)
  * [13. Sobre la semántica de los verbos](#13-sobre-la-semantica-de-los-verbos)
  * [14. Recursos](#14-recursos)
  * [15. Paréntesis: servidores y despliegue](#15-parentesis-servidores-y-despliegue)
  * [16. HTTP es stateless](#16-http-es-stateless)
  * [17. Redirecciones](#17-redirecciones)
  * [18. Negociación de contenido](#18-negociacion-de-contenido)
  * [19. Seguridad](#19-seguridad)
  * [20. Requests condicionales](#20-requests-condicionales)
  * [21. Contenido estático y dinámico](#21-contenido-estatico-y-dinamico)

> 🏁 Antes de empezar: ¿qué es una arquitectura cliente-servidor? ¿cómo funciona?
>
> 🏁 Antes de empezar: ¿qué es un cliente? ¿y un servidor? ¿Cuál es el cliente por antomasia de la Web?
>
> 🏁 Antes de empezar: ¿qué tecnologías se usan en la Web? ¿En qué se desarrolla un cliente? ¿Y un servidor?
>
> 🏁 Antes de empezar: ¿Cuál es la diferencia entre un sitio Web y una API web?

## 1. Primeros pedidos

Hagamos nuestro primer pedido:

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/1'
{
  "id": 1,
  "tipo": "pantalon",
  "talle": 35
}
```

Veremos que lo que nos devuelve no es HTML, sino un formato llamado JSON

> 🤔 Para pensar: ¿por qué devolver JSON? ¿Quién puede leerlo? ¿A quién le sirve?

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/20'
{
  "id": 20,
  "tipo": "saco",
  "talle": "XL"
}
```

> ✍️ Autoevaluación: ¿para qué sirve CURL?

> 🤔 Para pensar: ¿qué es una URL?

## 2. Códigos de respuesta

¿Y si no hay nada?

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/400'
```

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/1' -i
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
$ curl 'https://macowins-server.herokuapp.com/prendas/400' -i
HTTP/1.1 404 Not Found
X-Powered-By: Express
Expires: -1
Content-Type: text/html; charset=utf-8
Content-Length: 0
Vary: Accept-Encoding
Date: Tue, 21 Apr 2020 12:43:18 GMT
Connection: keep-alive
```

> 🤔 Para pensar: ¿Qué cambió? ¿Qué cambio o cambios te parecen relevates?
>
> 💡 Tip: Probá hacer `curl 'https://macowins-server.herokuapp.com/prendas/400' -is | head -n1`


```bash
$ curl 'https://macowins-server.herokuapp.com/prindas/1' -i
HTTP/1.1 404 Not Found
....
```

`404` y `200` son códigos de estado (_status code_, también llamados a veces _códigos de respuesta_) y forman parte de toda respuesta HTTP.

> ✍️ Autoevaluación: ¿qué es un status code y para qué me sirve?

Veamos otro código de respuesta más:

```bash
$ curl 'https://macowins-server.herokuapp.com/nueva-funcionalidad-que-a-veces-no-anda-bien' -i
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
$ curl 'https://macowins-server.herokuapp.com/prendas'
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

> 🏅 Desafío: hacé `curl 'https://macowins-server.herokuapp.com/ventas'` y `curl 'https://macowins-server.herokuapp.com/ventas/2'` y contrastá el resultado con tu respuesta anterior

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas?tipo=pantalon'
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
$ curl 'https://macowins-server.herokuapp.com/prendas?tipo=saco'
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
$ curl 'https://macowins-server.herokuapp.com/prendas?talle=40'
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
$ curl 'https://macowins-server.herokuapp.com/prendas?talle=40&tipo=pantalon'
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

Volvamos a `curl 'https://macowins-server.herokuapp.com/prendas'`. ¿Qué pasaría si este listado fuera muy grande? ## TODO simular que creamos muchos productos. O usar ventas

> 🤔 Para pensar: ¿Qué problemas tiene esto?

Ejecutemos nuevamente...

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas' -i
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

> 💡 Tip:  Probá hacer `curl 'https://macowins-server.herokuapp.com/prendas' -is | grep 'Content-Length'`

y comparemos el resultado con el de:

```bash
$ curl 'https://macowins-server.herokuapp.com/ventas' -i
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
$ curl 'https://macowins-server.herokuapp.com/ventas/?_page=1' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <https://macowins-server.herokuapp.com/ventas/?_page=1>; rel="first", <https://macowins-server.herokuapp.com/ventas/?_page=2>; rel="next", <https://macowins-server.herokuapp.com/ventas/?_page=50>; rel="last"
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
$ curl 'https://macowins-server.herokuapp.com/ventas/?_page=2' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <https://macowins-server.herokuapp.com/ventas/?_page=1>; rel="first", <https://macowins-server.herokuapp.com/ventas/?_page=1>; rel="prev", <https://macowins-server.herokuapp.com/ventas/?_page=3>; rel="next", <https://macowins-server.herokuapp.com/ventas/?_page=50>; rel="last"
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
$ curl 'https://macowins-server.herokuapp.com/ventas/?_page=3' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
X-Total-Count: 500
Access-Control-Expose-Headers: X-Total-Count, Link
Link: <https://macowins-server.herokuapp.com/ventas/?_page=1>; rel="first", <https://macowins-server.herokuapp.com/ventas/?_page=2>; rel="prev", <https://macowins-server.herokuapp.com/ventas/?_page=4>; rel="next", <https://macowins-server.herokuapp.com/ventas/?_page=50>; rel="last"
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


## 6. URLs y URIs

Pero ¿qué es `https://macowins-server.herokuapp.com/ventas/?_page=3`? Informalmente le diremos dirección, aunque su nombre técnico es URL.

¿Y qué es una URL? Es cualquier _string_ con un formato particular llamado _URI_ nos permita _localizar un recurso_, por ejemplo en internet.

Las URIs se componente de:

  * un protocolo
  * un dominio
  * una ruta
  * opcionalmente, parémtros
  * opcionalmente, un fragmento

> 🤔 Para pensar: ¿cuál es el protocolo que estamos estudiando? ¿Se observa en las URLs que venimos mencionando?

> ✍️ Autoevaluación: ¿es el string _tutoriales://http/introductorio#7_ una URI? ¿Y una URL?


## 7. Resolución de dominios

> 🤔 Para pensar: ¿Qué ocurrirá si hacemos un pedido a un dominio inexistente? ¿Qué código de estado HTTP obtendremos?

Observemos los siguientes pedidos

```bash
$ curl 'http://localhost:300
curl: (7) Failed to connect to localhost port 300: Connection refused
```

```bash
$ curl 'http://unSitioQueProbablementeNoExistaEnInternet
curl: (6) Could not resolve host: unSitioQueProbablementeNoExistaEnInternet
```

¡Ups! En un caso no pudo resolver el dominio, y en el otro, no había nada escuchando en el puerto.

> ✍️ Autoevaluación: ¿Por qué ante problemas de conexión obtenemos errores que no son de HTTP, sino de más bajo nivel?


## 8. Cabeceras

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
Link: <https://macowins-server.herokuapp.com/posts/?_page=1>; rel="first", <https://macowins-server.herokuapp.com/posts/?_page=2>; rel="next", <https://macowins-server.herokuapp.com/posts/?_page=10>; rel="last"
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

## 9. Compresión

```bash
$ curl 'https://macowins-server.herokuapp.com/ventas' -i
```

```bash
$ curl 'https://macowins-server.herokuapp.com/ventas' -i -H "Accept-Encoding: gzip"
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

> 💡 Tip: Probá hacer `curl 'https://macowins-server.herokuapp.com/ventas' -i -H "Accept-Encoding: gzip" | less` para ver mejor el resultado

```bash
$ curl 'https://macowins-server.herokuapp.com/ventas' -i -H "Accept-Encoding: gzip" --compressed
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
$ curl 'https://macowins-server.herokuapp.com/prendas/1' -i -H "Accept-Encoding: gzip"
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

## 10. Desde el navegador

¡Probemos estas mismas ideas desde el navegador!

> 🏅 Desafío: consultá 4 sitios diferentes y averiguá para todos ellos qué servidor utilizan,
> si el contenido se transfiere encriptado, y la fecha de expieración del contenido.

## 11. Borrando contenido

> ✍️ Autoevaluación: ¿qué es un método HTTP?

> 🤔 Para pensar: ¿es correcto que permitamos que cualquiera borre contenido?

> 🤔 Para pensar: ¿Habrá algo que impida que no borre nada con un DELETE, o que borre algo con un GET?


## 12. Creando y actualizando contenido

Probemos ahora crear una prenda:

```bash
$ curl -XPOST 'https://macowins-server.herokuapp.com/prendas/'
{
  "id": 21
}
```

Como vemos, se creó una prenda con el id `21`, y lo que obtenemos como respuesta es el _recurso_ creado.

> 🏅 Desafío: ¿qué código de estado devuelve cuando un _recurso_ es creado? Averigualo

> 🤔 Para pensar: ¿Nos es realmente útil crear una prenda sin especificar más nada?

> 🤔 Para pensar: ¿Por qué se creó con el id `21`?

Pero para que las cosas sean más interesantes, vamos a especificar _el cuerpo_ del pedido HTTP, con el contenido de la prenda que queremos crear.

```bash
curl -XPOST 'https://macowins-server.herokuapp.com/prendas/' -i --data '{ "tipo": "chomba", "talle": "XS" }'
{
  "{ \"tipo\": \"chomba\", \"talle\": \"XS\" }": "",
  "id": 22
}
```

> ✍️ Autoevaluación: ¿para qué sirve la opción `--data`?

> 🤔 Para pensar: Hmm, funcionó, pero ¿creó el contenido que queríamos? ¿Por qué?


El servidor de QMP necesita que le especifiquemos el tipo de contenido, para que cuando creemos algo sepa de qué tipo de cosa estamos hablando. Usemos para eso la
cabecera que vimos anteriormente: `Content-Type`


```bash
curl -XPOST 'https://macowins-server.herokuapp.com/prendas/' --data '{ "tipo": "chomba", "talle": "XS" }' -H 'Content-Type: application/json'
{
  "tipo": "chomba",
  "talle": "XS",
  "id": 25
}
```

> 🤔 Para pensar: ¿por qué no especificamos el ID en el cuerpo?

> 🏅 Desafío: Nos quedaron prendas con ids `21` y `22` que no nos sirve; ¡borralas!

> 📝 Nota: el servidor de QMP aceptó la prenda aún sin especificar el tipo de contenido, pero la guardó de una forma incorrecta. Otros servidores podrían haber hecho un intento por descubrir el tipo de
> todas maneras, o haber rechazado el pedido completamente, con un error de la familia `400`.

Como vemos, haciendo POST sobre la ruta de `/prendas` creamos una prenda, sin especificar un id, dado que se generará solo. De todas formas, si quisieramos podríamos haberlo especificado
agregándolo en el cuerpo.

> 🏅 Desafío: Creá una venta.

> 🏅 Desafío: Intentá hacer POST sobre una venta concreta, como por ejemplo `https://macowins-server.herokuapp.com/prendas/1`. ¿Qué sucede?

## 13. Sobre la semántica de los verbos

> 🤔 Para pensar: A los métodos HTTP también se les dice verbos. ¿Por qué?

Como vemos, hay varios verbos (métodos) HTTP:

* `OPTIONS`
* `GET`
* `POST`
* `PUT`
* `PATCH`
* `DELETE`

Nada nos impide borrar con GET, eliminar con POST o consultar con PUT. ¡Son todas convenciones!
Estas convenciones nos hablan de una semántica para cada uno de los verbos, y es importante respetarlas:

* `OPTIONS`: consultar meta-datos o configuraciones de HTTP
* `GET`: consultar un contenido sin efecto
* `POST`: crear un contenido
* `PUT`: actualizar de forma total un contenido
* `PATCH`: actualizar de forma parcial un contenido
* `DELETE`: eliminar un contenido

> 🤔 Para pensar: ¿por qué es importante respetar estas convenciones?


> 🤔 Para pensar: `POST` es uno de los métodos con efecto más antiguos de HTTP, y por eso es común que a veces se lo use
> para resolver operaciones que no encajan en otras semánticas. ¿Se te ocurre algún otro ejemplo fuera de HTTP en que pase algo así?


## 14. Recursos

Formalización de REST: organizaremos nuestras rutas, tanto de una API como de **un sitio común y corriente**, en forma de recursos y _colecciones_.

* `GET /ventas/`: consultar todos (listar)
* `DELETE /ventas/`: borrar todos
* `POST /ventas/`: crear uno
* `POST /ventas/1` crear uno con ID (QMP no lo soporta)
* `GET /ventas/1`: consultar uno
* `PUT /ventas/1`: modificar uno
* `DELETE /ventas/1`: eliminar uno

> 🤔 Para pensar: nuevamente, ¿por qué es importante respetar estas convenciones?

> 🏅 Desafío: ¿cuales de los siguientes sitios tiene (o parecen tener, al menos) rutas REST?
>
>   * Github
>   * Youtube
>   * Facebook
>   * Infobae, Pagina12, La Nacion
>   * UNQ, UCEMA
>
> 🏅 Desafío: si no se organizan de forma REST, ¿cómo se organizan sus rutas?

> 💬 Para discutir: recursos anidados

> 🏋️ Ejercicio: Pongamos a prueba nuestros conocimientos de REST [con este problema](https://docs.google.com/document/d/1lNQERQZuWsve0k7VUVVPtliX9aR6JE0NC8tamYON_9A/edit)

## 15. Paréntesis: servidores y despliegue

> 🤔 Para pensar: ¿Dónde está desplegado QMP? ¿En la máquina de uno de los docentes? ¿En su máquina?

> 🏅 Desafío: ¿En dónde está desplegado QMP? ¿Podés averiguarlo las cabeceras HTTP y/o la URL?

> 💬 Para discutir: qué es Heroku y cómo se despliega allí

## 16. HTTP es stateless

> 💬 Para discutir:
> - Concepto de sesión
> - Tipos de sesión:
>   - server side vs client side
>   - en memoria vs en cookie
> - `Cookie` y `Set-Cookie`

## 17. Redirecciones

## 18. Negociación de contenido

> 💬 Para discutir:
> - Accept
> - Content Type

## 19. Seguridad

> 💬 Para discutir:
>   - `Authorization`
>   - `Basic` y `Bearer`

## 20. Requests condicionales

Pidamos la prenda número 20:

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/20' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"
Vary: Accept-Encoding
Date: Thu, 30 Apr 2020 01:40:19 GMT
Connection: keep-alive

{
  "id": 20,
  "tipo": "saco",
  "talle": "XL"
}
```

Pero esta vez observemos la cabecera `ETag` (por _entity-tag_):

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/4' -is | grep 'ETag'
ETag: W/"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"
```

¿Qué es ésto? Es un código que identifica unívocamente al estado del recurso. Es decir, el valor `"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"` representa exactamente a una
prenda que tiene `id` `20`, `tipo` `"saco"` y `talle` `"XL"`, ni más ni menos.


Saber esto nos permite hacer uso de una nueva cabecera: `If-None-Match`, que nos permite hacer pedidos especificar uno o más `ETags`, de forma que cuando el `ETag` dado **NO coincida**
con el que tiene el servidor, responda normalmente:

```bash
$ curl 'https://macowins-server.herokuapp.com/prendas/20' -i -H 'If-None-Match: "otracosa"'
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"
Vary: Accept-Encoding
Date: Thu, 30 Apr 2020 01:40:19 GMT
Connection: keep-alive

{
  "id": 20,
  "tipo": "saco",
  "talle": "XL"
}
```

> 🏅 Desafío: ¿Qué sucede cuando coincide? Probá consultar con el valor `"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"` (comillas incluidas)


Como vemos cuando **SÍ coincide**, nos dice que el el recurso _sigue siendo el mismo_, mediante un código `304`:


```bash
curl 'https://macowins-server.herokuapp.com/prendas/20' -i -H 'If-None-Match: "31-OlDFK7SS8oUCKcn/LZE2poJFDDo"'
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Expires: -1
ETag: W/"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"
Date: Thu, 30 Apr 2020 01:40:04 GMT
Connection: keep-alive
```

> 🤔 Para pensar: ¿Y para qué nos podría servir ésto? ¿Por qué creés que no responde un cuerpo en este caso?

Supongamos que ahora modificamos el contenido de la prenda 20, indicando que no tiene stock:

```bash
$ curl -XPATCH 'https://macowins-server.herokuapp.com/prendas/20' --data '{ "enStock": false }' -H 'Content-Type: application/json' -i
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-38RNDuIjR/nqwDhm73CxIQFBqWc"
Vary: Accept-Encoding
Date: Thu, 30 Apr 2020 02:04:18 GMT
Connection: keep-alive

{
  "id": 20,
  "tipo": "saco",
  "talle": "XL",
  "enStock": false
}
```

> ⚠️ ¡Cuidado! Notá que esta vez usamos (por primera vez) `PATCH`, no `PUT`. ¿Por qué pensás que lo hicimos?

Ahora vevmos que el `ETag` es diferente: `"45-38RNDuIjR/nqwDhm73CxIQFBqWc"`. Porque claro, ¡la prenda cambió!

> 🏅 Desafío: si ahora consultamos por la prenda 20, ¿el `ETag` seguirá siendo el mismo? ¿Será `"45-38RNDuIjR/nqwDhm73CxIQFBqWc"` (el nuevo), `"31-OlDFK7SS8oUCKcn/LZE2poJFDDo"` (el viejo) u otro?
> Averigualo obteniendo con `curl` y `grep` el `ETag` de la prenda 20.

Si ahora hacemos un _pedido condicional_ con el viejo `ETag`, la respusta cambiará:

```bash
$ curl 'http://localhost:3000/prendas/20' -i -H 'If-None-Match: "31-OlDFK7SS8oUCKcn/LZE2poJFDDo"'
HTTP/1.1 200 OK
X-Powered-By: Express
Expires: -1
Content-Type: application/json; charset=utf-8
Content-Length: 69
ETag: W/"45-38RNDuIjR/nqwDhm73CxIQFBqWc"
Vary: Accept-Encoding
Date: Thu, 30 Apr 2020 02:15:18 GMT
Connection: keep-alive

{
  "id": 20,
  "tipo": "saco",
  "talle": "XL",
  "enStock": false
}
```

> 🏅 Desafío: ¿Y si lo hacemos con el nuevo? ¿Qué debería suceder? ¡Averigualo!

> 👀 Para más detalles, ver: https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests

> 🔎 Para investigar: ¿Qué significa la `W/` en los `ETags`?

## 21. Contenido estático y dinámico

Consultar: `https://macowins-server.herokuapp.com/`.
Observar el pie de página
