# Flujo de interaccion Cliente - Servidor para un CRUD basico para tienda de peliculas

estructura de cada pelicula
{
    "id":Number,
    "nombre":String,
    "Director":String,
    "anio":Number,
    "Duracion":Number,
    "genero:String
}

* 1. Crear una Pelicula.
Descripcion:Crear una pelicula
Metodo HTTP:POST
URI:/movies
Json Enviado:
{
    "id":1,
    "nombre":Backrooms,
    "Director":Steven,
    "anio":2026,
    "Duracion":309,
    "genero:Terror   
}
Json Recibido:
{
    code:200
    msj:"Pelicula Creada"
}

* 2. Consulta una pelicula por su ID.

Descripcion:Consultar Pelicula
Metodo HTTP:GET
URI:/movies/1
Json Enviado:
{

}
Json Recibido:
{
    
    "id":1,
    "nombre":Backrooms,
    "Director":Steven,
    "anio":2026,
    "Duracion":309,
    "genero:Terror    
}

* 3. Actualiza el año,director y duracion de una pelcula por su id.

Descripcion:editar una pelicula
Metodo HTTP:PUT
URI:/movies/1
Json Enviado:
{
    anio:2009
    director:Jose Eduardo
    duracion:290
}
Json Recibido:
{
    code:201
    msj:Libro actualizado
}

* 4. Borra una pelicula por su ID.

Descripcion:Borrar pelicula 
Metodo HTTP:DELETE
URI:/movies/1
Json Enviado:
{
    
}

Json Recibido:{
    code:200
    msg:Borrado Correctamente
}

