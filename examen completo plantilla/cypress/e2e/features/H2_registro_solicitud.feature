# language: es
@historia2
Característica: Registro de solicitud de certificado

  Antecedentes:
    Dado que el usuario ha iniciado sesión en el sistema

  @smoke
  Escenario: Registro exitoso de solicitud sin antecedentes
    Cuando el usuario hace click en el botón Nuevo
    Y el usuario ingresa el número de documento "5797681"
    Entonces el sistema debe autocompletar el nombre "ANDREA"
    Y el sistema debe autocompletar el primer apellido "GARCIA"
    Y el sistema debe autocompletar el departamento "SANTA CRUZ"
    Cuando el usuario completa la fecha de nacimiento "01/01/1990"
    Y el usuario completa el domicilio "AV PRINCIPAL 123"
    Y el usuario selecciona el motivo de la solicitud
    Y el usuario ingresa la descripción del motivo "SOLICITUD CERTIFICADO ANTECEDENTES PENALES TRAMITE"
    Y el usuario ingresa el número de valorado "5797681"
    Y el usuario marca el checkbox de documento identidad
    Y el usuario hace click en el botón Guardar
    Entonces el sistema debe mostrar el diálogo de confirmación
    Cuando el usuario ingresa observaciones "CERTIFICADO SOLICITADO TRAMITE LABORAL"
    Y el usuario hace click en Aceptar en el diálogo
    Entonces el certificado debe aparecer en la lista de impresión