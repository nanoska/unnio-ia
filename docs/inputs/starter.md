Este proyecto es para generar un bot como el de vera, pero para abssa, otra empresa.
https://www.abssa.net/en
Esa es la pags genericasna, quiero que hagas un relevamiento de los servicios que ofrecen. La idea es generar un widget incristable mediante iframe en si aplicacion, que contenga un par de funcionalidades, siendo el chat la princial, donde se pueden hacer consultas para usuarios de la aplicacion, por ejemplo, ?Donde cargo la documentacion de tal empleado?' y el asistente devolveria el link de la aplicacion redirigiendo al usuario donde tiene que cargar la documentacion.. o solucitud de metricas, por ejemplo, cuandos empleados inactivos tengo? cosas asi, aparte otra funcionalidad (solapa) de acciones preseteadas y otra de acciones, por ejemplo, notificar tal cosa o mandar mail a tal o cual persona dentro del sistema.

Esto tiene que estar en un entorno de react + ts, con backend en django, y los flujos poderse orquestar con n8n? o que seria mejor? fastapi? la aplicacion tiene alta demanda de usuarios, ya que se vende a muchas empresas con muchos empleados.

El codigo lo tienen en c+ y manejan 'html' crudo con js creo. La base de datos eta en sqlserver.

Que informacion mas te puedo dar para que podamos inicializar el proyecto? igualmetente necesito preparar un mpv para presentar en una reunion de negocios y vender el producto que luego comenzaria a desarrollarse

Yo trabajo principalmente con Claude AI CLI entonces necesito generar un promt bien claro con una planificacion optimizada para consumir pocos tokens, o sea, necesito setear el contexto para que los token no se gasten rapido. Necesito tambien generar un contexto bien claro. En reliadad, la instruccion seria que claude mismo genere el contexto pero con la informacion que te estoy comentando.
Te adjunto unos archivos de otro proyecto que me gusto como quedo la idea.


You said:
1:  Ejemplos:
Que documentacion necesito cargar?
Cuantos empleados me falta dar de alta?
Cuantos documentos se vencieron een la ultima semana?

2: EJemplos:
Mandar un mail con informacion a un usuario registrado en la base de datos.
Pedir un reporte de la informacion de una empresa o empleado

3. El analisis de la base de datos tiene que estar integrado en el proyecto, ya que quiero generar un escaneador de base de datos, eso es una parte importante del proyecto, ya que la idea es vender el producto a distintos clientes que puedan tener distintas bases de datos. En este caso, es mejor consumir algun servicio (gratuito) que genere escaneos y resumenes de bases de datos? o es mejor crear un microservicio que pueda, teniendo las credenciales, barrer y entender la estructura y arquitectura de bases de datos en general?

4. Tiene que inicializar una carpeta aparte que se llame branding, donde se subiran los archivos pertinentes 
5.  No se que sera mejor opcion. Que decis vos? todo django o split con fast api? en principio necesito generar una primer version, pero estoy seguro que vamos a tener que escalar a asincronia fuerte ya que lo usaran aplicaciones de alta demanda.

No quiero que generes nada ahroa, quiero que me generes un promt suficientemente claro para darle a claude, que genere el contexto y todo.

Acordate siempre de integrar una filosofia de NO codigo original, excepto que sea imprescindible, sino hacer uso de librerias o componentes etc.
Asi como la creacion de django usando el cli de django y los modelos usando los comando de django las vistas usando las views genericas etc.

Tenemos que armar la logica tambien para el guardado de mensajes, respuestas y controles de funcionamiento de la aplicacion etc
You said:
Bien, tambien hay que aclarar que hay una carpeta docs/inputs donde estara toda la documentacion que tiene que ingestar para el entendimiento del proyecto y de la aplicacion 'abssa' y aparte tiene que generar otra carpeta de reports, donde se deben guardar los reportes generados luego de trabajar o definir cuestones, con fecha de reporte y la palabra REPORTE_{anio}-{mes}-{dia}_{Palabra clave para saber el tema/s principal}..


dejo tambien dentro de 'inputs' varios archivos de un componente de otro proyecto apra que tomes como referencia.

una vez que entiendas esos archivos, quiero que los traslades al proyecto de javascript, y elimines de la carpeta inputs
tambien copie unas imagenes para que tengas de referencia.


Opción B — Con framework (recomendado)

✅ Velocidad para iterar MVP y escalar features (tabs, formularios, acciones, theming, i18n, tests).

✅ Ecosistema: componentes headless, validadores, query caching, etc.

✅ Mejor DX con TypeScript.

❌ Bundle mayor (pero se puede mantener chico).

Recomendación práctica (balance peso/velocidad)

Usar React + TS con Vite, pero:

Alias a Preact para achicar bundle (vite resolve.alias react→preact/compat).

Code splitting + lazy (cargar “Acciones” al abrir la solapa).

CSS aislado + variables de tema por tenant.

postMessage para comunicarte con el host.

Meta de bundle <150 KB gzip (realista con Preact + lazy).

¿Por qué no Vue? También sirve, pero tu equipo ya usa React en otros proyectos y el ecosistema/recursos es enorme. Con Preact mantenés DX tipo React con tamaño de Vue/vanilla.

Si querés “cero framework” a futuro

Podemos envolver el widget en un Custom Element (Web Component) que internamente use React/Preact. Si algún cliente pide “sin framework”, podemos compilar una variante vanilla que mantenga el mismo contrato de postMessage. Así tenés dos builds con el mismo API de integración.

Integración con .NET/jQuery (host)

Sostené el iframe (sandbox, CORS, JWT).

El host no ve tu stack: sólo incrusta el <iframe> y envía/recibe mensajes.

Theming por querystring (logo/color) o postMessage:init.

Checklist técnico express

Vite + React/Preact + TS.

Tabs headless (lib existente), forms con react-hook-form/zod.

TanStack Query para cachear respuestas/métricas.

postMessage seguro (origen permitido).

Feature flags por tenant.

Telemetría básica (latencia por intent).

Si te va, lo dejo así en el prompt de Claude (que ya armamos) con la nota:

“Implementar widget en React+TS con Vite y alias a Preact para tamaño; preparar build alternativa Web Component wrapper para compatibilidad futura.”

recorda tambien usar estilos modernos, sobras (tanto obscuras como claras para dar buena profundidad) y bordes redondeados, botones modernos, e iconos intuitivos
