# Tutorial  HTTP

Concepto de cliente servidor

## 1. Primeros GET

```bash
curl http://localhost:3000/prendas/1
```

```bash
curl http://localhost:3000/prendas/2
```

> 🤔 Para Pensar: ¿qué es una URL?
> ✍️ Autoevaluación: ¿para qué sirve CURL?

## 2. NOT FOUND

¿Y si no hay nada?

```bash
curl http://localhost:3000/prendas/500
```

```bash
curl http://localhost:3000/prendas/500 -i ## TODO si se pide un recurso inexistente, que devuelva  ''
```

```bash
curl http://localhost:3000/prendas/1 -i
```

> ✍️ Autoevaluación: ¿Para qué sirve -i?

```bash
curl http://localhost:3000/prindas/1 -i
```

```bash
curl http://localhost:3000/prindas/1 -i
```

```bash
curl http://localhost:3000/prindas/nueva-funcionalidad-que-a-veces-no-anda-bien -i ## TODO que rompa
```

> ✍️ Autoevaluación: ¿qué es un status code y para qué me sirve?

## 3. Parámetros

```bash
curl http://localhost:3000/prendas -i
```

> 🤔 Para pensar: ¿es lo mismo consultar prendas/ que prendas/1? ¿En qué se diferencian?

> 🤔 Para pensar: ¿qué hará ventas/2? ¿Ventas/?.

> 🏅 Desafío: hacé curl http://localhost:3000/ventas y curl http://localhost:3000/ventas/2 y contrastá el resultado con tu respuesta anterior

```bash
curl http://localhost:3000/prendas?tipo=pantalon
```

```bash
curl http://localhost:3000/prendas?tipo=saco
```

> 🏅 Desafío: obtené las remeras.

Es comun que las URL que admiten parámetros soporten más de uno, por ejemplo:

```bash
curl http://localhost:3000/prendas?talle=40
```

Además, los parámetros además se pueden combinar, utilizando el signo `&` (se llama _et_, aunque en informática es más común escucharlo por su nombre en inglés _ampersand_)

```bash
curl http://localhost:3000/prendas?talle=40&tipo=pantalaon
```

> 🏅 Desafío: Obtené las remeras XS
> ✍️ Autoevaluación: ¿Par qué sirven los parámetros?

## 4. Paginación

Volvamos a curl http://localhost:3000/prendas. ¿Qué pasaría si este listado fuera muy grande? ## TODO simular que creamos muchos productos. O usar ventas

> 🤔 Para pensar: ¿Qué problemas tiene esto?

Ejecutemos nuevamente...

```bash
curl http://localhost:3000/prendas -i
```

...pero esta vez prestemos atención a esta parte de la respuesta:

```
Content-Length: 794
```

y comparemos el resultado con el de

```bash
curl http://localhost:3000/ventas -i
```

> 🤔 Para pensar: ¿Cual es mayor? ¿Por qué? ¿Qué problema puede representar esto?

Como se observa, tienen tamaños diferentes: a mayor la cantidad de elementos, mayor es la respuesta, y "más pesada" es.

> 🤔 Para pensar: ¿Cuál será más rápido de descargar? ¿Por qué?

Ya sea porque la respuesta es demasiado "pesada", o porque simplemente sólo queremos una parte de la misma, en ocasiones querremos recorrer el resultado como
si fueran las páginas de un libro: de una a la vez. Macowins por eso nos permite utilizar un parámetro llamado `_page`, con el que podemos decirle qué número de página queremos.

```bash
curl http://localhost:3000/ventas/?_page=1 -i
```

```bash
curl http://localhost:3000/ventas/?_page=2 -i
```

```bash
curl http://localhost:3000/ventas/?_page=3 -i
```

> 🤔 Para pensar: observá las fechas de venta. ¿Tendrá alguna relación el número de página con la fecha de venta en Macowins?

> 📝 Nota: de la misma forma que que no todos los sitios soportarán los parámetros `talle` o `tipo`, tampoco todos soportarán `_page`

> 🏅 Desafío: ¿cuando pesan las páginas ahora? ¿Más o menos que todas las ventas?


## 6. Resolución de dominios

╰ curl http://localhost:300
curl: (7) Failed to connect to localhost port 300: Connection refused

curl http://hostlocal:300
curl: (6) Could not resolve host: hostlocal

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

> 📝 Nota: si bien en CURL se muestra de esta mantera (que a su vez tiene que ver con cómo funciona HTTP internamente), la primera línea NO se corresponde con una cabecera, sino que es el código de estado del que ya hemos hablado anteriormente.

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

curl http://localhost:3000/ventas -i
curl http://localhost:3000/ventas -i -H "Accept-Encoding: gzip"
curl http://localhost:3000/ventas -i -H "Accept-Encoding: gzip" --compressed
curl http://localhost:3000/prendas -i -H "Accept-Encoding: gzip"

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




