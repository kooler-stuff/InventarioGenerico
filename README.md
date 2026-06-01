un gestor de inventario CRUD para contabilizar y mantener registro de los insumos disponibles, buscando ser intituitivo y sencillo de utilizar.
permite subir imagenes, etiquetarlas y comentarlas.
Cuenta con un registro de todos los cambios (entradas y salidas) en la cantidad de insumos disponibles. 

Desarrollo empezado 04/05/26

para nota personal, este proyecto esta usando:
-html (04/05)
-css (04/05)
-JavaScript (06/05)
-Node.js (06/05)
-api.REST (06/05)
-Express (+ Express-session) (06/05)
- ENV (06/05)
- BabelJS (06/05 implementado pero no lo estamos usando realmente?)
- CORS (06/05 instalado aun no se implemento??) (12/05 utilizandose)

falta preparar:

- MongoDB (implementado 08/05)

changelog:

11/05: 

Ahora necesario revisar el diseño de la página, y deberia arreglarse que se pueda hacer bypass al login si simplemente escribis /main_menu.html en la direccion web?

12/05: 

arreglado ese tal bypass al login, es la que vaaaaa
Agregado funcion para subir y ver imagenes, se optó por guardar las imagenes localmente 
Faltaría unicamente diseño?


14/05: 

Agregado historial de cambios en stock, siguiendo adelante con algunos retoques a la pag, se debe eliminar la pestaña de añadir y moverla al menu principal/inventario

15/05: 

Haciendo algunos retoques de diseño porque es la que recontra va, ahora se pueden subir y ver imagenes de los objetos del inventario.
Responsividad de historiales mejorada. 

18/05: 

funcion de agregar item ahora en menu principal, agregada vista previa de imagen subida, despues hacer que el popup en el que aparece la funcion de subir imagen
tambien sirva para las funciones de cambiar stock.
y como siempre, falta diseño

ah, y tener que arreglar esta tontera de que las imagenes subidas como vista previa de insumos se esta subiendo a la carpeta de insumos PRESTADOS, checate eso 

19/05: 

diseño personalizado de la barra lateral para tirar mas facha
eso de imagenes arreglado ok 

parece estar funcional pero no me confiaria, hubo mucho problema y renegar con tonterias hoy

20/05: 

Solucionado textos haciendo sobreflujo o como se diga si eran demasiado largos en los historiales, y agregada vista previa de imagen a la seccion de prestados y pedidos. 
Pagina de agregar ha sido eliminada, la funcionalidad esta completa en el menu principal
y parece que el trillonesimo arreglo a que la fuente no cargue finalmente funco???

hay q mover las credenciales a base de datos pa k no esten en el env pos nomas we

no dije nada, ya esta hecho, a dormir!!!

21/05: 

Agregada funcion para que imagen se borre automaticamente si se borra su insumo, pos nomas!
cambios menores al diseño 
arreglado formulario no reiniciandose de quitar/agregar stock en menu principal
yo juro que si esta lista ahorita

22/05: 

toca subir el nivel, a implementar diferentes roles de usuarios (admin con todo lo actual y user generico que solo tenga acceso a una pantalla donde puedan hacer pedidos)
tambien añadir filtrado por categoria al buscador de menu principal 

26/05:

FIltrado por categoría de objeto ahora funcional, y ahora ya no se puede acceder a páginas de solo admin si accedes como usuario genérico. 
A aplicar backend de la pagina para usuario basico y por extensión la seccion para ver los pedidos especiales (los cuales solo seran hechos por el usuario basico) desde el lado de admin.

27/05:

Errores visuales menores en filtrado de categoría solucionado. 
Backend de pag de usuario basico funcional y asi mismo con el lado para admin. 
Cosas que recibimos para hacer:
- Permitir subida de multiples pedidos a la vez (bulk) para usuario básico.
- Permitir que todos los cambios a los pedidos especiales sean registrados en el historial. 

28/05: 

Agregado subida de pedidos en masa y ese tal registro de pedidos especiales en historial. 
Mas cambios menores de diseño.

A HACER: 
Extender pantalla de Registro - Insumos pedidos, agregar una seccion de pedido realizado/pendiente, similar a la seccion igualmente llamada en pedidos especiales, 
también para conveniencia agregar también un filtro para poder buscar entre pedidos realizados o pendientes.

29/05: 

Agregado seccion de realizado/en proceso/pendiente para pedidos. 
Cambios de diseño a unos cuantos botones y asi. 
Filtro aun no agregado a sección de pedidos.

01/06: 

Comenzando overhaul completo del diseño de la página porque el otro estaba feo y así, habrá mucho por hacer.... 
Aun se debe migrar a React, y agregar opcion para multiples subidas que tiene pedidos especiales a pedidos normales, y agregar opciones predeterminadas de insumos para evitar duplicados un poco. Y unas cuantas cosas mas, como uhhh agregar opcion para cerrar sesion
hashear usuario y contraseña x tokens

-- lista ultima vez actualizada 01/06

  if (req.session.permissionLevel === "user" && !allowedGenericUserPaths.includes(req.path)){
    return res.status(401).json({ success: false, message: "No autorizado"});
  }
