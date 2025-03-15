function fecha(datos) {
    console.log('Datos recibidos:', datos);

    // Título y fecha
    const fechaActualizacion = datos.items[0].createdDate;

    // Separar la fecha y la hora de la cadena
    const fecha = fechaActualizacion.substring(0, 8);
    const hora = fechaActualizacion.substring(9, 15);

    // Crear el objeto Date manualmente
    const año = parseInt(fecha.substring(0, 4));
    const mes = parseInt(fecha.substring(4, 6)) - 1; // Meses en JavaScript son 0-indexados
    const dia = parseInt(fecha.substring(6, 8));
    const horas = parseInt(hora.substring(0, 2));
    const minutos = parseInt(hora.substring(2, 4));
    const segundos = parseInt(hora.substring(4, 6));

    const fechaObjeto = new Date(Date.UTC(año, mes, dia, horas, minutos, segundos));

    // Opciones para el formato de la fecha
    const opcionesFecha = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Mexico_City'
    };

    const fechaFormateada = new Intl.DateTimeFormat('es-MX', opcionesFecha).format(fechaObjeto);

    // Actualizar el DOM con la fecha formateada
    const fechaActualizacionT = document.getElementById('titulo');
    const fechaActualizacionC = document.createElement('span');
    fechaActualizacionC.innerHTML = `
        <h4 class="d-flex justify-content-between align-items-center">   
            <span class="">Top 3</span>
            <span class="text-body-secondary" style="font-size: 0.7rem;">
                <small>${fechaFormateada}</small>
            </span>
        </h4>
    `;

    fechaActualizacionT.appendChild(fechaActualizacionC);
}
