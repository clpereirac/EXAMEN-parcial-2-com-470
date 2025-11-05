# language: es
@historia1 @login
Característica: Acceso al sistema REJAP Fast
  Como Usuario de Ventanilla
  Quiero acceder a la aplicación REJAP Fast con usuario y contraseña válidos
  Para buscar información de solicitudes registradas, impresos, entregados, anulados, etc.

  Antecedentes:
    Dado que el usuario está en la página de login de REJAP Fast

  @smoke @critico
  Escenario: Login exitoso con credenciales válidas
    Cuando el usuario ingresa el nombre de usuario "inava"
    Y el usuario ingresa la contraseña "123"
    Y el usuario hace click en el botón "Ingresar"
    Entonces el sistema debe mostrar el dashboard principal
    Y debe visualizar el menú superior con las siguientes opciones:
      | Solicitudes |
      | Respuestas  |
      | Entregados  |
      | Anulados    |
      | Reportes    |
      | Contraseña  |
      | Salir       |
    Y debe mostrar el nombre del usuario "inava" en la parte superior

  @negativo
  Escenario: Intento de login con credenciales inválidas
    Cuando el usuario ingresa el nombre de usuario "usuario_invalido"
    Y el usuario ingresa la contraseña "password_incorrecta"
    Y el usuario hace click en el botón "Ingresar"
    Entonces el sistema debe mostrar un mensaje de error
    Y el usuario debe permanecer en la página de login

  @negativo
  Escenario: Intento de login con campos vacíos
    Cuando el usuario deja el campo de usuario vacío
    Y el usuario deja el campo de contraseña vacío
    Y el usuario hace click en el botón "Ingresar"
    Entonces el sistema debe mostrar un mensaje de validación
    Y el usuario debe permanecer en la página de login

  @funcional
  Escenario: Verificar acceso a cada opción del menú después del login
    Dado que el usuario ha iniciado sesión con credenciales válidas
    Cuando el usuario navega por las opciones del menú
    Entonces debe poder acceder a la opción "Solicitudes"
    Y debe poder acceder a la opción "Respuestas"
    Y debe poder acceder a la opción "Entregados"
    Y debe poder acceder a la opción "Anulados"
    Y debe poder acceder a la opción "Reportes"

  @funcional
  Escenario: Cerrar sesión correctamente
    Dado que el usuario ha iniciado sesión con credenciales válidas
    Cuando el usuario hace click en el botón "Salir"
    Entonces el sistema debe cerrar la sesión
    Y el usuario debe ser redirigido a la página de login